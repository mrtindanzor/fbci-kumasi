# Project Conventions Skill

A portable architectural standard for building and restructuring full-stack web applications (frontend + backend).

## Purpose

This skill provides a complete application architecture encoded into reusable rules, conventions, and templates. It covers frontend (React, TanStack Router, React Query, Zustand, Tailwind CSS) and backend (Express, GraphQL, MongoDB, Redis, Socket.IO) patterns.

Key architectural principles:
- **Contract-first design** — Types define the data shape; validation schemas satisfy contracts
- **Separated workflows** — Each use case (create, edit, view) has its own dedicated module
- **Composition over configuration** — Small, focused modules composed into larger behavior
- **Thin screens/controllers** — Business logic lives in hooks and services
- **Dependency injection** — Infrastructure abstracted behind interfaces
- **No `any`, no type suppressions** — Every value has a well-defined type
- **Defensive consistency** — Refactor legacy code when introducing new conventions

## Entry Point

See `SKILL.md` for the required workflow and reading guide.
