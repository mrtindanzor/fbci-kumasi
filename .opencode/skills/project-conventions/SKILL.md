---
name: project-conventions
description: A portable architectural standard for building full-stack applications with consistent structure, contracts, and patterns
when: |
  Use this skill when:
  - Scaffolding new full-stack projects with a proven architecture
  - Building or refactoring frontend code (React, TanStack Router, React Query, Zustand, Tailwind)
  - Building or refactoring backend code (Express, GraphQL, MongoDB, Redis, Socket.IO)
  - Organizing code by domain with explicit contracts, separated workflows, and thin screens/controllers
  - Ensuring type safety, no `any`, no type suppressions, and contract-first validation
---

# Project Conventions

## Required Workflow

1. **Determine the task** — What needs to be built or refactored
2. **Read architecture** — Review architecture.md for layer rules, contracts, composition, vertical slicing
3. **Review features** — Read features.md for domain module anatomy and separated workflow hooks
4. **Scaffold structure** — Use folder-structure.md to set up directories
5. **Study relevant patterns** — Read the pattern documents for your specific task
6. **Use snippets** — Copy templates from snippets/ and replace placeholders
7. **Follow conventions** — Adhere to best-practices.md and avoid anti-patterns in anti-patterns.md
8. **Validate** — Run through checklists.md
9. **Migrate (if applicable)** — Use migration-guide.md for restructuring existing projects

## Supporting Documents

| File | Purpose |
|------|---------|
| architecture.md | Layers, dependency rules, contracts-first, composition, DI, route hierarchy |
| folder-structure.md | Directory organization (frontend + backend) |
| frontend.md | React patterns, hooks, separated workflows, state management, routing |
| backend.md | API architecture (Express, GraphQL, MongoDB, Redis, Socket.IO) |
| features.md | Domain module design, contract types, validators, services, workflow hooks |
| data-layer.md | API client patterns (REST + GraphQL), data fetching, validation, error handling |
| design-system.md | Styling system, CVA, component patterns, workflow-unaware components |
| best-practices.md | No `any`, no type suppressions, single responsibility, defensive consistency |
| anti-patterns.md | Conditional form components, deriving types from validation, mixed conventions |
| checklists.md | Validation checklists for features, screens, components, backend |
| migration-guide.md | Converting projects into this architecture |

### Snippets

| Snippet | Use For |
|---------|---------|
| api-client.md | API client factory pattern (REST + GraphQL) |
| barrel-export.md | Directory barrel exports |
| backend-controller.md | Express controller with Zod validation |
| backend-resolver.md | GraphQL resolver with DataLoader |
| backend-service.md | Backend service with repository pattern |
| component.md | UI components (simple, CVA, compound, polymorphic) |
| context-provider.md | React context providers and composition |
| dropdown.md | Dropdown compound component with auto-hide |
| feature-module.md | Complete feature module with contract-first validation |
| folder-layouts.md | Full and minimal application scaffolds |
| hook.md | Custom React hooks (simple, overloaded, composed) |
| modal.md | Modal system (provider, core, compound components) |
| pagination.md | Infinite query pagination with flattened data |
| route.md | Route definitions and constants |
| screen-module.md | Screen pages with sections |
| service.md | Frontend service layer with dependency injection |
| zustand-store.md | Zustand store for client-side state |

### Task-Specific Reading Guide

| Task | Read First | Then Read | Use Snippet |
|------|-----------|-----------|-------------|
| New feature module | architecture.md, features.md | data-layer.md | feature-module.md |
| New screen/page | architecture.md, frontend.md | — | screen-module.md |
| New UI component | architecture.md, design-system.md | — | component.md |
| New route | frontend.md | — | route.md |
| New context provider | frontend.md | — | context-provider.md |
| New hook | frontend.md, best-practices.md | — | hook.md |
| New service/data layer | data-layer.md | features.md | service.md |
| Project migration | migration-guide.md | architecture.md | folder-layouts.md |
| Validation | checklists.md | anti-patterns.md | — |
| Modal/Dialog | design-system.md, frontend.md | — | modal.md |
| Dropdown | design-system.md, frontend.md | — | dropdown.md |
| Paginated list | frontend.md | best-practices.md | pagination.md |
| Client state store | frontend.md | best-practices.md | zustand-store.md |
| Backend controller | backend.md | data-layer.md | backend-controller.md |
| Backend service | backend.md | — | backend-service.md |
| GraphQL resolver | backend.md | — | backend-resolver.md |
| API client setup | data-layer.md | — | api-client.md |

## Completion Criteria

- [ ] All files follow the conventions in best-practices.md
- [ ] Feature modules are self-contained (no cross-feature imports)
- [ ] Components use named function exports, type props, and cn()
- [ ] Data flow respects the unidirectional dependency rules in architecture.md
- [ ] Validation checklists from checklists.md pass
- [ ] No anti-patterns from anti-patterns.md are present
- [ ] Snippet placeholders have been adapted to the project context
- [ ] Contract types are the source of truth (not derived from validation schemas)
- [ ] Each workflow (create/edit/view) has its own dedicated hook/controller
- [ ] No conditional mode flags in shared components
- [ ] No `any` or `@ts-ignore`/`@ts-expect-error` anywhere
- [ ] Services use constructor injection for API clients
- [ ] Backend follows layered architecture (controller → service → repository)
- [ ] No duplicated primitive components exist
- [ ] All buttons use the shared Button primitive
- [ ] Primitives in `shared/ui/primitives/`, domain components in their feature's `components/`
