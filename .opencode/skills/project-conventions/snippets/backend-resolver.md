# Backend GraphQL Resolver Snippet

## GraphQL Schema

```graphql
# transports/graphql/typeDefs/resource.graphql
type Resource {
  id: ID!
  name: String!
  description: String
  createdAt: String!
  updatedAt: String!
}

input CreateResourceInput {
  name: String!
  description: String
}

input ResourceFilters {
  page: Int
  limit: Int
  search: String
  sort: SortOption
}

enum SortOption {
  NEWEST
  OLDEST
  POPULAR
}

type PaginatedResources {
  data: [Resource!]!
  nextpage: Int
}

type Query {
  resources(filters: ResourceFilters): PaginatedResources!
  resource(id: ID!): Resource
}

type Mutation {
  createResource(input: CreateResourceInput!): Resource!
  updateResource(id: ID!, input: UpdateResourceInput!): Resource!
  deleteResource(id: ID!): Boolean!
}
```

## GraphQL Context

```tsx
// transports/graphql/context/context.ts
import DataLoader from "dataloader"
import type { Request } from "express"
import { resourceService } from "@/features/resource/resource.service"

export type GraphQLContext = {
  user: { id: string; email: string; role: string } | null
  isAuthenticated: boolean
  loaders: {
    resource: DataLoader<string, Resource>
  }
}

export async function createContext({ req }: { req: Request }): Promise<GraphQLContext> {
  const user = (req as any).user ?? null

  return {
    user,
    isAuthenticated: !!user,
    loaders: {
      resource: new DataLoader<string, Resource>(async (ids) => {
        const resources = await resourceService.list({ ids: ids as string[] })
        return ids.map((id) => resources.data.find((r) => r.id === id) ?? null)
      }),
    },
  }
}
```

## Auth Assertions

```tsx
// transports/graphql/rules/auth.ts
import type { GraphQLContext } from "../context/context"

export function assertAuthenticated(context: GraphQLContext) {
  if (!context.isAuthenticated) {
    throw new Error("Authentication required")
  }
}

export function assertAdmin(context: GraphQLContext) {
  assertAuthenticated(context)
  if (context.user?.role !== "admin") {
    throw new Error("Admin access required")
  }
}
```

## Resolver

Resolvers are thin orchestration layers. Let validators and services throw — GraphQL's built-in error handling formats and returns errors to the client.

```tsx
// transports/graphql/resolvers/resource.resolver.ts
import { createResourceValidator } from "@/features/resource/resource.validator"
import { resourceService } from "@/features/resource/resource.service"
import { assertAuthenticated } from "../rules/auth"
import type { GraphQLContext } from "../context/context"

type ResourceFiltersArgs = {
  filters?: {
    page?: number
    limit?: number
    search?: string
    sort?: "NEWEST" | "OLDEST" | "POPULAR"
  }
}

type CreateResourceArgs = {
  input: { name: string; description?: string }
}

export const resourceResolvers = {
  Query: {
    resources: async (_: unknown, args: ResourceFiltersArgs, context: GraphQLContext) => {
      const sortMap = { NEWEST: "newest", OLDEST: "oldest", POPULAR: "popular" } as const
      const filters = {
        page: args.filters?.page ?? 1,
        limit: args.filters?.limit ?? 20,
        search: args.filters?.search,
        sort: args.filters?.sort ? sortMap[args.filters.sort] : "newest",
      }

      return resourceService.list(filters)
    },

    resource: async (_: unknown, { id }: { id: string }, context: GraphQLContext) => {
      return context.loaders.resource.load(id)
    },
  },

  Mutation: {
    createResource: async (_: unknown, args: CreateResourceArgs, context: GraphQLContext) => {
      assertAuthenticated(context)
      const parsed = createResourceValidator.parse(args.input)
      return resourceService.create(parsed)
    },
  },
}
```

## Configuration

```tsx
// transports/graphql/config.ts
import { loadFilesSync } from "@graphql-tools/load-files"
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge"
import path from "path"

const typeDefsArray = loadFilesSync(path.join(__dirname, "./typeDefs"), {
  extensions: ["graphql"],
})

const resolversArray = loadFilesSync(path.join(__dirname, "./resolvers"), {
  extensions: ["ts", "js"],
})

export const typeDefs = mergeTypeDefs(typeDefsArray)
export const resolvers = mergeResolvers(resolversArray)
```

## Apollo Server Setup

```tsx
// transports/graphql/index.ts
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import { typeDefs, resolvers } from "./config"
import { createContext } from "./context/context"
import type { Express } from "express"

export async function setupGraphQL(app: Express) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  await server.start()

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: createContext,
    }),
  )
}
```
