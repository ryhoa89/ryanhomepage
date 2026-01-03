# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack TypeScript application with a React frontend and Express backend, designed to mimic a desktop operating system interface in the browser. The project uses:
- **Frontend**: React 19 + Vite + TailwindCSS + shadcn/ui components
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Routing**: Wouter (client-side)

## Common Commands

### Development
```bash
npm run dev              # Start development server (both client & server on port 5000)
npm run dev:client       # Start only Vite dev server on port 5000
```

### Build & Production
```bash
npm run build           # Build both client (Vite) and server (esbuild)
npm start               # Run production build (requires DATABASE_URL)
```

### Type Checking & Database
```bash
npm run check           # TypeScript type checking (tsc --noEmit)
npm run db:push         # Push Drizzle schema changes to database
```

## Architecture

### Project Structure
```
client/               # React frontend (Vite root)
  src/
    pages/            # Page components (Desktop.tsx is main)
    components/
      ui/             # shadcn/ui component library
      WindowFrame.tsx # Reusable window component
      DesktopIcon.tsx # Desktop icon component
    lib/              # Utilities (queryClient, utils)
    hooks/            # React hooks
    App.tsx           # Root component with Wouter routing
    main.tsx          # Entry point
server/               # Express backend
  index.ts            # Server setup, middleware, logging
  routes.ts           # API routes (register routes here)
  storage.ts          # Storage interface (IStorage + MemStorage)
  vite.ts             # Vite dev server integration
  static.ts           # Static file serving for production
shared/               # Shared code between client and server
  schema.ts           # Drizzle schema definitions + Zod schemas
script/
  build.ts            # Custom build script (esbuild + Vite)
```

### Key Architecture Patterns

**Full-Stack Single Port**: The Express server serves both the API and client on port 5000 (required by Replit environment). In development, Vite middleware is integrated into Express; in production, static files are served from `dist/public`.

**Storage Abstraction**: The `IStorage` interface in `server/storage.ts` defines all database operations. Currently uses `MemStorage` (in-memory), but can be swapped for a PostgreSQL implementation using Drizzle ORM. When implementing database operations:
- Define schema in `shared/schema.ts` using Drizzle ORM
- Add methods to `IStorage` interface
- Implement in the storage class
- Use `storage` singleton in routes

**Client-Server Type Sharing**: Types and schemas live in `shared/` directory and are imported by both client and server using the `@shared` path alias.

**Component Library**: Uses shadcn/ui (New York variant) with extensive Radix UI components. Components are in `client/src/components/ui/`. Configuration in `components.json`.

**Desktop UI Pattern**: The application simulates a desktop OS:
- `Desktop.tsx` manages window state (open, minimized, z-index)
- `WindowFrame.tsx` provides draggable, resizable window chrome
- `DesktopIcon.tsx` renders desktop icons
- Each "application" is a page component (Docs.tsx, Photos.tsx, TextPad.tsx)

### Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets/*` → `attached_assets/*`

### Build Process
The custom build script (`script/build.ts`):
1. Clears `dist/` directory
2. Runs Vite build (outputs to `dist/public/`)
3. Runs esbuild on server (bundles to `dist/index.cjs`)
4. Bundles frequently-used dependencies (see allowlist) to reduce cold start syscalls
5. Externalizes other dependencies

### Environment & Deployment
- **Development**: Uses Vite dev server integrated into Express
- **Production**: Serves static files from `dist/public/`, runs bundled `dist/index.cjs`
- **Port**: Always use port 5000 (env var `PORT`), other ports are firewalled
- **Database**: Requires `DATABASE_URL` environment variable for Drizzle

## Development Workflow

### Adding a New API Route
1. Add endpoint handler in `server/routes.ts` under `registerRoutes()`
2. Prefix all routes with `/api`
3. Use `storage` methods for data operations
4. Import types from `@shared/schema`

### Adding Database Tables
1. Define table in `shared/schema.ts` using Drizzle's `pgTable()`
2. Create insert/update schemas with `createInsertSchema()` from `drizzle-zod`
3. Export types using `z.infer<>` and `typeof table.$inferSelect`
4. Add CRUD methods to `IStorage` interface in `server/storage.ts`
5. Implement methods in storage class
6. Run `npm run db:push` to sync with database

### Adding UI Components
- Use existing shadcn/ui components from `@/components/ui/`
- For new shadcn components, configure via `components.json`
- Custom components go in `@/components/`
- Icons: Use `lucide-react`

### Adding a New "Application" Window
1. Create page component in `client/src/pages/` (e.g., `MyApp.tsx`)
2. Export a window component using `WindowFrame`
3. Add to `openWindows` and `minimizedWindows` state in `Desktop.tsx`
4. Add `DesktopIcon` that calls `handleOpenWindow()` with the window ID
5. Conditionally render window based on `openWindows` state

### Working with WebSockets
The server creates an `httpServer` instance that can be used for WebSocket upgrades. Import `ws` and attach to the server in `server/routes.ts`.

## Important Notes

- **Type Safety**: The project uses strict TypeScript. Run `npm run check` frequently.
- **Database**: Schema is in `shared/schema.ts`. The current storage implementation is in-memory; switch to Drizzle for persistence.
- **Styling**: TailwindCSS v4 with shadcn/ui. Custom utilities in `@/lib/utils.ts` (e.g., `cn()` for conditional classes).
- **React Query**: Client uses `@tanstack/react-query` for data fetching. Query client is in `@/lib/queryClient.ts`.
- **Session Management**: Express sessions are configured but authentication routes need implementation.
- **Logging**: Use the `log()` function from `server/index.ts` for consistent server-side logging.
