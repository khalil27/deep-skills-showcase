# AI Copilot Instructions for Deep Skills Showcase

## Project Overview
This is a **React + TypeScript skills/training showcase website** built with Vite, shadcn-ui, and Tailwind CSS. It displays technology training courses (React, Python, DevOps, UX/UI, Security, AI) with detail pages, contact forms, and animations.

**Stack**: Vite, React 18, TypeScript, React Router, Framer Motion, shadcn-ui, Tailwind CSS, React Query, React Hook Form

## Architecture

### Component Structure
- **Pages** (`src/pages/`): Route-level components - `Index`, `Formations` (training list), `TrainingDetail` (single course), `Contact`, `NotFound`
- **Layout** (`src/components/Layout.tsx`): Wraps pages with `Header` and `Footer` in a flex column layout (min-h-screen)
- **UI Components** (`src/components/ui/`): shadcn-ui library components (button, card, form, dialog, etc.) - DO NOT manually edit these
- **Custom Components** (`src/components/`): `Header`, `Footer`, `Hero`, `TrainingCard`, `NavLink`

### Data Flow
1. **Training data** is static in `src/data/trainings.ts` with `trainings[]` array and `Training` interface
2. **Helper function** `getTrainingById(id: string)` already exists in trainings.ts - returns `Training | undefined`
3. `Formations` page maps `trainings` array → `TrainingCard` components with staggered animation delays
4. `TrainingDetail` page uses `useParams()` + `getTrainingById()` to fetch single training
5. Client state managed via React hooks; React Query setup exists but queries not actively used

### Key Dependencies
- **Routing**: React Router v6 (BrowserRouter, Link, useParams) - routes in App.tsx
- **Animations**: Framer Motion (`motion.div`, initial/whileInView/viewport, staggered delays)
- **Icons**: lucide-react (e.g., Clock, Monitor, Users, ArrowLeft)
- **Forms**: React Hook Form + shadcn/form components (Contact page pattern)
- **Styling**: Tailwind CSS + custom classes (gradient-bg, gradient-text, card-hover, font-display) + cn() utility

## Developer Workflows

### Setup & Running
```bash
npm install          # Install deps (bun.lockb exists but npm works)
npm run dev          # Start dev server on localhost:8080 with HMR
npm run build        # Production build to dist/
npm run build:dev    # Development mode build
npm run lint         # ESLint check (rules in eslint.config.js)
npm run preview      # Preview production build
npm test             # Run vitest (unit tests)
npm test:watch       # Watch mode for tests
```

### Build Configuration
- **Vite config** (`vite.config.ts`): Uses React SWC plugin for fast refresh, path alias `@/` → `src/`, HMR overlay disabled, server on port 8080
- **TypeScript**: `baseUrl: .` with `@/*` path alias; **strict null checks disabled** (`strictNullChecks: false`), `noImplicitAny: false`, unused params/vars allowed
- **Testing**: Vitest + jsdom + @testing-library/react, setup file at `src/test/setup.ts` (mocks matchMedia for Radix UI components)
- **Linting**: Flat ESLint config (eslint.config.js), React Hooks rules enforced, unused vars warnings disabled

## Code Patterns & Conventions

### Component Pattern
- **Functional components** with TypeScript interfaces for props (e.g., `interface LayoutProps { children: ReactNode }`)
- **Framer Motion scroll animations**: Use `motion.div` with `initial`/`whileInView`/`viewport`/`transition`
  ```tsx
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
  ```
- **Staggered animations**: Pass `index * 0.1` as delay when mapping arrays (see `TrainingCard` in Formations.tsx)
- **Conditional icon rendering**: Use switch statements in helper functions (e.g., `getModeIcon()` in TrainingCard.tsx, TrainingDetail.tsx)

### Styling Pattern
- **CSS Variables**: Use semantic tokens - `text-foreground`, `bg-card`, `border-border`, `text-muted-foreground` (defined in `src/index.css` with HSL values)
- **Custom utility classes**: 
  - `gradient-bg` - animated gradient background
  - `gradient-text` - gradient text effect
  - `card-hover` - subtle hover animations for cards
  - `font-display` - Space Grotesk display font
  - `glass` - glassmorphism effect (used in TrainingDetail back button)
- **className utility**: Always use `cn()` from `src/lib/utils.ts` to merge Tailwind + conditional classes
  ```tsx
  className={cn("base-class", isActive && "active-class", className)}
  ```

### Routing Pattern
- **Route registration**: Add routes in `App.tsx` ABOVE the catch-all `*` route (NotFound)
- **Navigation**: Use `<Link to="/path">` component, never `<a href>`
- **Dynamic routes**: `useParams<{ id: string }>()` for URL params (e.g., `/formation/:id`)
- **Page wrapper**: All pages must be wrapped in `<Layout>` component for consistent header/footer

### Data Pattern
- **Training data**: Static array in `src/data/trainings.ts` with predefined structure
- **Adding trainings**: 
  1. Import image at top of file: `import newImage from "@/assets/training-name.jpg"`
  2. Add object to `trainings[]` array matching `Training` interface (id, title, shortDescription, fullDescription, objectives[], program[], duration, mode, image, category)
- **Helper function**: Use existing `getTrainingById(id: string)` - handles not found case (returns undefined)

## Critical Integration Points

- **React Query Provider**: Initialized in `App.tsx` with `QueryClient`
- **Tooltip/Toast Providers**: Both Radix UI (tooltip) and Sonner (toast) providers wrap Routes
- **Router wraps everything**: BrowserRouter is the root provider for routing
- **shadcn-ui dependency**: All UI components from `src/components/ui/` - regenerate with `npx shadcn-ui@latest add [component]` if needed

## ESLint Rules
- React Hooks plugin enabled (enforces hooks rules)
- React Refresh enabled with "export components" warning
- Unused vars and params disabled (`"@typescript-eslint/no-unused-vars": "off"`)
- Flat config format (eslint.config.js) - ignores `dist/` folder

## File Paths to Remember
- Page components: `src/pages/*.tsx`
- Custom components: `src/components/*.tsx`
- Data definitions: `src/data/trainings.ts` (Training interface + trainings array + getTrainingById)
- Shared utils: `src/lib/utils.ts` (cn function for className merging)
- Global styles: `src/index.css` (CSS variables, custom utilities), `src/App.css`
- Config: `vite.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `vitest.config.ts`

## Common Tasks

**Add a new training**: Edit `src/data/trainings.ts` - import image, add object to `trainings[]` array with all required Training fields

**Add a UI component**: Use `npx shadcn-ui@latest add [component]` to add shadcn components, or create custom components in `src/components/`

**Add a page**: 1) Create `.tsx` file in `src/pages/`, 2) Add `<Route>` in `App.tsx` ABOVE `*` route, 3) Wrap content with `<Layout>`

**Style changes**: Use Tailwind utility classes or add custom CSS to `src/index.css` for global styles

**Test a component**: Create `.test.tsx` or `.spec.tsx` in `src/test/`, Vitest auto-discovers files matching pattern
