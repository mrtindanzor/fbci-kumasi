# Backend Controller Snippet

## Controller Pattern

Controllers are thin orchestration layers: validate input, call service, return response. Let validators and services throw — centralized error middleware handles all errors.

```tsx
// transports/http/<domain>/<domain>.controller.ts
import type { Request, Response } from "express"
import { createResourceValidator, listResourcesValidator } from "@/features/resource/resource.validator"
import { resourceService } from "@/features/resource/resource.service"
import { responseHandler } from "@/shared/lib/response.lib"
import { NotFoundError } from "@/core/errors/AppError"

export async function createResource(req: Request, res: Response) {
  const parsed = createResourceValidator.parse(req.body)
  const result = await resourceService.create(parsed)

  responseHandler(res).created("Resource created", result)
}

export async function listResources(req: Request, res: Response) {
  const parsed = listResourcesValidator.parse(req.query)
  const result = await resourceService.list(parsed)

  responseHandler(res).ok("Resources fetched", result)
}

export async function getResource(req: Request, res: Response) {
  const { id } = req.params
  const result = await resourceService.getById(id)
  if (!result) throw new NotFoundError("Resource")

  responseHandler(res).ok("Resource fetched", result)
}

export async function updateResource(req: Request, res: Response) {
  const { id } = req.params
  const parsed = createResourceValidator.parse(req.body)
  const result = await resourceService.update(id, parsed)

  responseHandler(res).ok("Resource updated", result)
}

export async function deleteResource(req: Request, res: Response) {
  const { id } = req.params
  await resourceService.delete(id)

  responseHandler(res).ok("Resource deleted")
}
```

## Route Setup

```tsx
// transports/http/<domain>/<domain>.routes.ts
import { Router } from "express"
import * as controller from "./<domain>.controller"
import { authRequired } from "../middleware/auth"
import { rateLimit } from "../middleware/rateLimit"

const router = Router()

router.post("/resources", authRequired, rateLimit, controller.createResource)
router.get("/resources", controller.listResources)
router.get("/resources/:id", controller.getResource)
router.put("/resources/:id", authRequired, controller.updateResource)
router.delete("/resources/:id", authRequired, controller.deleteResource)

export default router
```

## Middleware Pattern

```tsx
// transports/http/middleware/auth.ts
import type { Request, Response, NextFunction } from "express"
import { jwtVerify } from "jose"
import { authConfig } from "@/config/auth.config"

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string; role: string }
    }
  }
}

export async function attachUser(req: Request, _res: Response, next: NextFunction) {
  const token = req.cookies?.token || req.headers.authorization?.replace("Bearer ", "")

  if (!token) {
    req.user = undefined
    return next()
  }

  try {
    const { payload } = await jwtVerify(token, authConfig.jwtSecret)
    req.user = payload as { id: string; email: string; role: string }
  } catch {
    req.user = undefined
  }

  next()
}

export function authRequired(req: Request, _res: Response, next: NextFunction) {
  if (!req.user) {
    throw new UnauthorizedError()
  }
  next()
}

export function adminOnly(req: Request, _res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== "admin") {
    throw new ForbiddenError()
  }
  next()
}
```

## Error Handler Middleware

```tsx
// transports/http/middleware/errorHandler.ts
import type { Request, Response, NextFunction } from "express"
import { formatAppError } from "@/core/errors/formatAppError"
import { AppError } from "@/core/errors/AppError"

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(formatAppError(err))
  }

  console.error("Unhandled error:", err)
  return res.status(500).json(formatAppError(new Error("Internal server error")))
}
```
