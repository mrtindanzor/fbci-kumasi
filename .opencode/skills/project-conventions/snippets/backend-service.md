# Backend Service Snippets

## Error Hierarchy

```tsx
// core/errors/AppError.ts
export class AppError extends Error {
  statusCode: number
  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.name = this.constructor.name
  }
}

export class NotFoundError extends AppError {
  constructor(resource = "Resource") {
    super(`${resource} not found`, 404)
  }
}

export class UnauthorizedError extends AppError {
  constructor() {
    super("Unauthorized", 401)
  }
}

export class ForbiddenError extends AppError {
  constructor() {
    super("Forbidden", 403)
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400)
  }
}

export class RateLimitExceededError extends AppError {
  constructor() {
    super("Too many requests", 429)
  }
}
```

## Entity Types + Contracts

```tsx
// entities/resource/resource.types.ts
export type Resource = {
  id: string
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
}

export type CreateResourceInput = {
  name: string
  description?: string
}

export type ResourceFilters = {
  page?: number
  limit?: number
  search?: string
  sort?: "newest" | "oldest" | "popular"
}

// entities/resource/resource.contract.ts
import type { Resource, CreateResourceInput, ResourceFilters } from "./resource.types"
import type { PaginateType } from "@/shared/types"

export interface IResourceRepository {
  create(data: CreateResourceInput): Promise<Resource>
  findById(id: string): Promise<Resource | null>
  find(filters: ResourceFilters): Promise<PaginateType<Resource>>
  update(id: string, data: Partial<Resource>): Promise<Resource>
  delete(id: string): Promise<void>
}

export interface IResourceService {
  create(data: CreateResourceInput): Promise<Resource>
  getById(id: string): Promise<Resource | null>
  list(filters: ResourceFilters): Promise<PaginateType<Resource>>
  update(id: string, data: Partial<Resource>): Promise<Resource>
  delete(id: string): Promise<void>
}
```

## Mongoose Model

```tsx
// features/resource/resource.model.ts
import mongoose, { type Model, type Document } from "mongoose"

type ResourceDocument = Document & {
  name: string
  description: string
}

const resourceSchema = new mongoose.Schema<ResourceDocument>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
  },
  { timestamps: true },
)

resourceSchema.index({ name: "text" })

export const ResourceModel: Model<ResourceDocument> = mongoose.model("Resource", resourceSchema)
```

## Repository

```tsx
// features/resource/resource.repository.ts
import { ResourceModel } from "./resource.model"
import type { IResourceRepository } from "@/entities/resource/resource.contract"
import type { Resource, CreateResourceInput, ResourceFilters } from "@/entities/resource/resource.types"

export class ResourceRepository implements IResourceRepository {
  async create(data: CreateResourceInput): Promise<Resource> {
    const doc = await ResourceModel.create(data)
    return doc.toObject()
  }

  async findById(id: string): Promise<Resource | null> {
    return ResourceModel.findById(id).lean()
  }

  async find(filters: ResourceFilters): Promise<PaginateType<Resource>> {
    const { page = 1, limit = 20, search, sort = "newest" } = filters
    const query: Record<string, unknown> = {}

    if (search) {
      query.$text = { $search: search }
    }

    const sortOption = sort === "newest" ? { createdAt: -1 }
      : sort === "oldest" ? { createdAt: 1 }
      : { views: -1 }

    const [data, total] = await Promise.all([
      ResourceModel.find(query)
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      ResourceModel.countDocuments(query),
    ])

    return {
      data: data as unknown as Resource[],
      nextpage: page * limit < total ? page + 1 : null,
    }
  }

  async update(id: string, data: Partial<Resource>): Promise<Resource> {
    const doc = await ResourceModel.findByIdAndUpdate(id, { $set: data }, { new: true })
    if (!doc) throw new NotFoundError("Resource")
    return doc.toObject()
  }

  async delete(id: string): Promise<void> {
    await ResourceModel.findByIdAndDelete(id)
  }
}
```

## Service

```tsx
// features/resource/resource.service.ts
import type { IResourceService, IResourceRepository } from "@/entities/resource/resource.contract"
import type { Resource, CreateResourceInput, ResourceFilters } from "@/entities/resource/resource.types"
import type { PaginateType } from "@/shared/types"
import { ValidationError } from "@/core/errors/AppError"

export class ResourceService implements IResourceService {
  constructor(private repository: IResourceRepository) {}

  async create(data: CreateResourceInput): Promise<Resource> {
    // Business logic goes here
    if (data.name.length < 2) {
      throw new ValidationError("Name must be at least 2 characters")
    }

    return this.repository.create(data)
  }

  async getById(id: string): Promise<Resource | null> {
    return this.repository.findById(id)
  }

  async list(filters: ResourceFilters): Promise<PaginateType<Resource>> {
    return this.repository.find(filters)
  }

  async update(id: string, data: Partial<Resource>): Promise<Resource> {
    return this.repository.update(id, data)
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}

// Singleton setup
const resourceRepository = new ResourceRepository()
export const resourceService: IResourceService = new ResourceService(resourceRepository)
```
