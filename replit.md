# Fusion Starter - Eco Engineering

A production-ready full-stack React application for managing telecommunication infrastructure projects and equipment.

## Project Overview

This is a complete full-stack application featuring:
- **Frontend**: React 18 + TypeScript + Vite + TailwindCSS
- **Backend**: Express server with integrated API
- **Routing**: React Router 6 (SPA mode)
- **UI Library**: Radix UI components + Lucide React icons
- **Package Manager**: pnpm

## Recent Changes

### November 27, 2025 - Replit Environment Setup
- Configured Vite dev server for Replit environment (port 5000, host 0.0.0.0)
- Set up HMR with proper client port configuration
- Configured deployment with autoscale target
- Installed all project dependencies using pnpm

## Project Structure

```
client/                   # React SPA frontend
├── pages/               # Route components
│   ├── Index.tsx        # Home page (Eco Engineering landing)
│   ├── Admin.tsx        # Admin panel for project management
│   └── NotFound.tsx     # 404 page
├── components/          # React components
│   ├── ui/             # Radix UI component library
│   └── Layout.tsx      # Main layout wrapper
├── App.tsx             # App entry point with routing
└── global.css          # TailwindCSS theming

server/                  # Express API backend
├── routes/             # API route handlers
│   └── demo.ts
├── index.ts            # Server setup and configuration
└── node-build.ts       # Production server entry point

shared/                  # Shared types between client/server
└── api.ts              # API interfaces
```

## Development

### Running the Application
The application runs on port 5000 in development mode. The workflow "Start application" is configured to run `pnpm dev`, which starts both the Vite dev server and the Express backend on a single port.

### Available Routes
- `/` - Home page (Eco Engineering landing page)
- `/admin` - Admin panel for managing projects and equipment
- `/api/ping` - Test API endpoint
- `/api/demo` - Demo API endpoint

### Key Features
- Single-port development (Vite + Express integration)
- Hot module replacement (HMR) for rapid development
- Type-safe API communication via shared interfaces
- Comprehensive UI component library
- Project and equipment management interface

## Production Deployment

The application is configured for deployment with:
- **Build command**: `pnpm build` (builds both client and server)
- **Run command**: `node dist/server/production.mjs`
- **Deployment target**: Autoscale

### Build Process
1. Client build: Vite bundles the React SPA to `dist/spa`
2. Server build: Vite bundles the Express server to `dist/server`
3. Production server serves the built SPA and handles API routes

## Architecture Notes

- Uses React Router 6 for client-side routing
- Express server integrated with Vite during development
- TypeScript throughout for type safety
- TailwindCSS for styling with custom theme
- Path aliases: `@/*` for client, `@shared/*` for shared code

## User Preferences

- Package manager: pnpm (preferred)
- Component library: Radix UI with TailwindCSS
- Testing: Vitest
