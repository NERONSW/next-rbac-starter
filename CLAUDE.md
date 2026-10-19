# RouteShield / Next RBAC Boilerplate — Claude Code Guidelines

## 1. Primary Commands

- **Dev Server:** `pnpm dev`
- **Build:** `pnpm build`
- **Start Production:** `pnpm start`
- **Lint:** `pnpm lint`

## 2. Protected Foundation Rules & Design System

- **Design System Rules:** Strictly adhere to established design tokens and UI conventions. Do not introduce arbitrary inline hex colors or custom utility classes outside defined globals.
- **CSS & Tokens:** `src/app/globals.css` contains core design variables. Do NOT edit CSS variables or design tokens without asking for explicit permission first.
- **Dependencies:** Core packages are already installed in `package.json`. Do NOT run `pnpm add` or modify `package.json` without asking for explicit permission first.
- **Package Manager:** Exclusively use `pnpm` for all script execution and package management.

## 3. Directory Architecture & Conventions

Always adhere strictly to this standard Next.js App Router tree inside `src/`:

```text
src/
├── app/
│   ├── (dashboard)/            # Grouped layouts for authenticated/role views
│   │   ├── dashboard/          # User / general dashboard
│   │   ├── admin/              # Admin-only management routes
│   │   └── super-admin/        # Super-admin restricted routes
│   ├── unauthorized/           # Access denied fallback page
│   ├── globals.css             # Protected design tokens
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Landing / login entry page
├── components/
│   ├── layout/                 # TopNavbar.tsx, SideNavbar.tsx, Footer.tsx
│   └── ui/                     # Reusable UI components (Button, Card, etc.)
├── config/
│   └── navigation.ts           # Centralized role mappings & navigation config
├── proxy.ts                    # Edge route protection & role guard
└── lib/                        # utils.ts (cn helper, auth helpers)
```
