# Backend Architecture

## Stack

- Express 5.x — HTTP framework
- Apollo GraphQL — GraphQL server (integrated with Express)
- MongoDB with Mongoose — Primary database
- Redis — Caching, rate limiting, pub/sub, Socket.IO adapter
- Socket.IO — Real-time WebSocket communication
- Zod 4.x — Input validation
- JWT (jose) — Authentication tokens

## Folder Structure

```
src/
  server.ts                -- Entry: Express + HTTP server, DB, Redis, WebSocket
  routes.ts                -- Express router chain

  config/
    env.config.ts
    db.config.ts
    auth.config.ts
    origins.ts

  core/
    errors/
      AppError.ts
      formatAppError.ts
    utils/

  entities/
    <domain>/
      index.ts
      <domain>.types.ts     -- Data types and discriminated unions
      <domain>.contract.ts  -- IService and IRepository interfaces

  features/
    <domain>/
      index.ts
      <domain>.service.ts     -- Business logic
      <domain>.repository.ts  -- Data access
      <domain>.validator.ts   -- Zod schemas
      <domain>.model.ts       -- Mongoose schema/model

  transports/
    http/
      index.ts
      middleware/
        errorHandler.ts
        auth.ts
        rateLimit.ts
        logger.ts
      <domain>/
        <domain>.routes.ts
        <domain>.controller.ts
    graphql/
      config.ts
      index.ts
      context/
        context.ts
      resolvers/
        <domain>.resolver.ts
      typeDefs/
        <domain>.graphql
    ws/
      wsServer.ts
      connectionHandler.ts
      handlers/
        <domain>.handler.ts

  infra/
    db.ts
    redis.ts
    rate-limit.ts

  publishers/
    appBus.ts

  subscribers/
    appSubscriber.ts

  jobs/
    scheduled.ts
```

## Entry Point Pattern

```
server.ts creates:
  1. Express app with middleware
  2. HTTP server from Express
  3. MongoDB connection
  4. Redis client + subscriber
  5. Socket.IO server with Redis adapter
  6. Apollo GraphQL server
  7. Publishers/subscribers (event bus)
  8. Graceful shutdown handler
```

## Contract-First Validation

Validators satisfy the contract type, not the other way around:

```ts
// entities/<domain>/<domain>.types.ts
export type CreateInput = {
  name: string
  email: string
  metadata?: Record<string, string>
}

// features/<domain>/<domain>.validator.ts
export const createValidator = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  metadata: z.record(z.string()).optional(),
}) satisfies z.ZodType<CreateInput>
```

## Response Handler Utility

All controllers use the `responseHandler` helper for consistent JSON responses. It provides typed helpers for common HTTP status codes.

```ts
// shared/lib/response.lib.ts
import type { Response } from "express"

class ResponseHandler {
  constructor(private res: Response) {}

  private handler(message: unknown, status: number) {
    return this.res.status(status).json({ status, message })
  }

  ok(message: unknown) { return this.handler(message, 200) }
  created(message: unknown) { return this.handler(message, 201) }
  bad(message: unknown) { return this.handler(message, 400) }
  forbidden(message: unknown) { return this.handler(message, 403) }
  notFound(message: unknown) { return this.handler(message, 404) }
  serverError(message: unknown) { return this.handler(message, 500) }
}

export function responseHandler(res: Response) {
  return new ResponseHandler(res)
}
```

## Controller Pattern

Controllers are thin orchestration layers: parse input, call service, format response with `responseHandler`. No business logic. Let validators and services throw — a centralized error handler formats and responds to all errors.

```ts
async function createEntity(req: Request, res: Response) {
  const parsed = createValidator.parse(req.body)
  const result = await entityService.create(parsed)

  responseHandler(res).created("Entity created", result)
}

async function listEntities(req: Request, res: Response) {
  const parsed = listValidator.parse(req.query)
  const result = await entityService.list(parsed)

  responseHandler(res).ok("Entities fetched", result)
}

async function getEntity(req: Request, res: Response) {
  const { id } = req.params
  const result = await entityService.getById(id)
  if (!result) throw new NotFoundError("Entity")

  responseHandler(res).ok("Entity fetched", result)
}

async function updateEntity(req: Request, res: Response) {
  const { id } = req.params
  const parsed = updateValidator.parse(req.body)
  const result = await entityService.update(id, parsed)

  responseHandler(res).ok("Entity updated", result)
}

async function deleteEntity(req: Request, res: Response) {
  const { id } = req.params
  await entityService.delete(id)

  responseHandler(res).ok("Entity deleted")
}
```

**Error propagation principle:** Controllers, route handlers, and resolvers do not wrap operations in `tryCatch` simply to rethrow or forward the error. Synchronous `Zod.parse()` throws on invalid input. Service calls throw on failure. The centralized error handler middleware (or GraphQL error formatting) catches everything and returns a consistent response. Only introduce local error handling when you need to recover, retry, transform, or enrich an error differently before allowing it to continue.

## Service Layer Pattern

Services contain business logic and orchestrate repositories:

```ts
interface IEntityService {
  create(data: CreateInput): Promise<Entity>
  list(filters: FilterOptions): Promise<PaginateType<Entity>>
  getById(id: string): Promise<Entity>
  update(id: string, data: Partial<Entity>): Promise<Entity>
  delete(id: string): Promise<void>
}

class EntityService implements IEntityService {
  constructor(private repository: IEntityRepository) {}

  async create(data: CreateInput): Promise<Entity> {
    const existing = await this.repository.findByKey(data.key)
    if (existing) throw new ValidationError("Entity already exists")
    return this.repository.create(data)
  }
}
```

## Repository Pattern

Repositories handle data access only:

```ts
interface IEntityRepository {
  create(data: CreateInput): Promise<Entity>
  findById(id: string): Promise<Entity | null>
  find(filters: FilterOptions): Promise<Entity[]>
  update(id: string, data: Partial<Entity>): Promise<Entity>
  delete(id: string): Promise<void>
}

class EntityRepository implements IEntityRepository {
  constructor(private model: MongooseModel<EntityDoc>) {}

  async create(data: CreateInput): Promise<Entity> {
    const doc = await this.model.create(data)
    return doc.toObject()
  }

  async findById(id: string): Promise<Entity | null> {
    return this.model.findById(id).lean()
  }
}
```

## Error Handling

### Error Hierarchy

```ts
class AppError extends Error {
  statusCode: number
  constructor(message: string, statusCode: number)
}

class NotFoundError extends AppError {
  constructor(resource: string) { super(`${resource} not found`, 404) }
}

class UnauthorizedError extends AppError {
  constructor() { super("Unauthorized", 401) }
}

class ForbiddenError extends AppError {
  constructor() { super("Forbidden", 403) }
}

class ValidationError extends AppError {
  constructor(message: string) { super(message, 400) }
}

class RateLimitExceededError extends AppError {
  constructor() { super("Too many requests", 429) }
}
```

### Error Handling Flow

```
Validator throws (Zod.parse failure)
Service throws (NotFoundError, ValidationError, etc.)
  → Controller lets error propagate (no tryCatch wrapper)
  → Express error middleware catches it
  → formatAppError() converts to JSON response
```

**Key principle:** Controllers, route handlers, and resolvers do not wrap operations in `tryCatch` simply to rethrow or forward the error. Synchronous validator calls and async service calls throw directly. The centralized error middleware handles everything. Only introduce local error handling when you need to recover, retry, transform, or enrich an error before allowing it to continue.

## GraphQL Resolver Pattern

Same principle applies: let validators and services throw. GraphQL's built-in error handling formats and returns errors to the client.

```ts
const entityResolvers = {
  Query: {
    entities: async (_: unknown, args: FilterArgs, context: GraphQLContext) => {
      return entityService.list(args.filters)
    },
    entity: async (_: unknown, { id }: { id: string }, context: GraphQLContext) => {
      return context.loaders.entity.load(id)
    },
  },
  Mutation: {
    createEntity: async (_: unknown, args: CreateArgs, context: GraphQLContext) => {
      assertAuthenticated(context)
      const parsed = createValidator.parse(args.input)
      return entityService.create(parsed)
    },
  },
}
```

### GraphQL Context with DataLoader

```ts
type GraphQLContext = {
  user: UserPayload | null
  isAuthenticated: boolean
  loaders: {
    entity: DataLoader<string, Entity>
  }
}

export async function createContext({ req }: { req: Request }): Promise<GraphQLContext> {
  return {
    user: (req as any).user ?? null,
    isAuthenticated: !!req.user,
    loaders: {
      entity: new DataLoader<string, Entity>(async (ids) => {
        const entities = await entityService.list({ ids: ids as string[] })
        return ids.map((id) => entities.data.find((e) => e.id === id) ?? null)
      }),
    },
  }
}
```

## Validation Pattern

All input validation uses Zod 4.x. Validators are defined in feature-specific files and satisfy contract types:

```ts
export const createEntityValidator = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  metadata: z.record(z.string()).optional(),
}) satisfies z.ZodType<CreateInput>

export const listEntitiesValidator = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  sort: z.enum(["newest", "oldest", "popular"]).default("newest"),
}) satisfies z.ZodType<ListInput>
```

## Auth Middleware Chain

```
attachUser → resolves JWT → sets req.user
authRequired → throws UnauthorizedError if no user
adminOnly → throws ForbiddenError if not admin
```

## WebSocket / Socket.IO Pattern

```
Socket.IO server → Redis adapter → connectionHandler → handlers/
```

## Event Bus (Publishers/Subscribers)

```ts
type AppEvents = {
  error: (payload: { message: string; stack?: string }) => void
  "entity:created": (payload: { entityId: string }) => void
}

const appBus = new EventEmitter() as TypedEmitter<AppEvents>
```

## Graceful Shutdown

```ts
function gracefulShutDown(server: http.Server) {
  const shutdown = async () => {
    await server.close()
    await mongoose.disconnect()
    await redis.disconnect()
    process.exit(0)
  }
  process.on("SIGTERM", shutdown)
  process.on("SIGINT", shutdown)
}
```
