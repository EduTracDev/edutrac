# Edutrac – Foundation & Next Phase

Edutrac is a **school learning management system (LMS)**. This document describes what exists in the repo after the initial foundation work and what to do in the next phase. The foundation is aligned with patterns and packages used in the **whitepenguin** workspace where applicable.

---

## 1. What Exists

### 1.1 Directory structure

```
src/
├── app/                          # Next.js App Router
│   ├── (landing)/                # Landing section (no layout group name in URL)
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── pricing/page.tsx
│   │   └── product/page.tsx
│   ├── auth/                     # Auth section
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   └── select-role/page.tsx
│   ├── super-admin/dashboard/
│   ├── school-owner/dashboard/
│   ├── teacher/dashboard/
│   ├── parent/dashboard/
│   ├── student/dashboard/
│   ├── layout.tsx                # Root layout (fonts, Providers)
│   ├── page.tsx                  # Home (landing)
│   ├── Providers.tsx             # Redux + React Query + Notistack
│   └── globals.css
├── components/                   # (Reserved for shared UI components)
├── lib/                         # Shared runtime libs (e.g. socket later)
├── modules/
│   └── shared/
│       └── assets/               # SVGs, images (see README there)
├── redux/
│   └── store/
│       ├── index.ts
│       ├── combine.reducers.ts
│       ├── hooks.ts
│       ├── types.ts
│       └── slices/
│           └── authSlice.ts
├── routes/                      # Route enums (no file-based routing here)
│   ├── auth.routes.ts
│   ├── landing.routes.ts
│   ├── superAdmin.routes.ts
│   ├── schoolOwner.routes.ts
│   ├── teacher.routes.ts
│   ├── parent.routes.ts
│   └── student.routes.ts
├── services/
│   └── auth.service.ts          # Auth API endpoints + types
└── utils/
    ├── client.ts                # Axios-based API client (CORS, interceptors, 401 → sessionEventEmitter)
    ├── eventEmitters.ts         # sessionEventEmitter (e.g. "unauthorized")
    ├── debounceHandler.ts       # debounceHandler, useDebounce
    ├── helper.ts                # getToken, getGreeting, getRelativeTime, calculateAge, etc.
    ├── helpers.ts               # capitalizeFirstLetter, appendQueryParams, dateFormatter, etc.
    └── hooks/
        ├── useMutationService.ts  # API mutations + toast (notistack) + optional redirect/invalidate
        └── useAuthSession.ts     # Logout + refresh token on "unauthorized"
```

- **Landing**: Home, About, Pricing, Product, Contact.
- **Auth**: Login, Select role, Forgot password (route only), etc. (see `routes/auth.routes.ts`).
- **Modules**: Super-admin, School owner, Teacher, Parent, Student – each has at least a dashboard placeholder under `app/<role>/dashboard/page.tsx`.

### 1.2 Packages (from whitepenguin where relevant)

- **API / state**: `axios`, `@reduxjs/toolkit`, `react-redux`, `redux-persist` (store only; persist can be added later if needed).
- **Data / forms**: `@tanstack/react-query`, `react-hook-form`, `@hookform/resolvers`, `yup`.
- **UI / feedback**: `notistack` (toasts used in `useMutationService`).
- **Utils**: `dayjs`, `classnames`, `clsx`, `eventemitter3`.
- **Next/React**: `next`, `react`, `react-dom`, Tailwind v4.

Path alias: `@/*` → `src/*` (see `tsconfig.json`).

### 1.3 API client and CORS

- **`utils/client.ts`**: Single Axios instance; base URL from `NEXT_PUBLIC_API_URL`; request interceptor adds `Authorization: Bearer <token>` from `getToken()`; on 401, emits `"unauthorized"` on `sessionEventEmitter` (so `useAuthSession` can refresh or logout).
- **CORS**: Handled by the backend. Ensure the API allows the app’s origin and credentials if you use cookies later.

### 1.4 Redux and auth

- **Store**: `redux/store/index.ts` (no persist in initial setup).
- **Slice**: `authSlice` – user, accessToken, refreshToken, isLoading, isLoggingOut, resetEmail; syncs to `localStorage` in actions.
- **Selectors**: `selectCurrentUser`, `selectIsAuthenticated`, `selectAccessToken`, etc.
- **Hooks**: `useAppDispatch`, `useAppSelector` from `redux/store/hooks.ts`.

### 1.5 Auth service and routes

- **`services/auth.service.ts`**: Endpoints for login, register, refresh, forgot-password, verify-email, reset-password, profile, logout (path + method only; actual calls use `client.request()` e.g. via `useMutationService`).
- **`routes/auth.routes.ts`**: Enum for `/auth/*` paths.
- **`routes/landing.routes.ts`**: Home, about, pricing, product, contact.
- **`routes/superAdmin.routes.ts`**, **schoolOwner**, **teacher**, **parent**, **student**: Enums for each module’s routes (dashboard, profile, settings, etc.).

### 1.6 Global CSS and fonts

- **`app/globals.css`**:
  - Tailwind import and `@theme inline` with **color variables** (you can change these as you go):
    - Brand: `--color-brand-primary`, `--color-brand-primary-inactive`, `--color-brand-accent`
    - Semantic: `--color-success`, `--color-error`, `--color-warning`, `--color-info`
    - Neutrals: `--color-border-*`, `--color-text-primary`, `--color-text-secondary`, `--color-dashboard-bg`, etc.
  - Autofill and `.hide-scrollbar` utilities.
- **Fonts**: Inter, Source Sans 3, Open Sans are loaded in `app/layout.tsx` via `next/font/google` and applied as CSS variables (`--font-inter`, `--font-source-sans`, `--font-open-sans`) and `font-sans` on `body`.

### 1.7 Reusable pieces (from whitepenguin)

- **Client, eventEmitters, debounceHandler, helper, helpers**: Adapted and live under `utils/`.
- **Redux store + auth slice + hooks**: Simplified (auth only; no property slice).
- **Auth service + route enums**: Structure mirrors whitepenguin; endpoints are placeholders for your API.
- **useMutationService**: Uses notistack for success/error toasts and supports redirect/invalidate; uses `state.auth` for mutation keys.
- **useAuthSession**: Listens for `"unauthorized"`, tries refresh, then logout and redirect to login (or role select) when appropriate.

**Not yet copied (recommended for next phase):**

- **Shared components**: e.g. `TextField`, `CWTextField` (react-hook-form + MUI) – add when you introduce MUI or build Tailwind-only form components.
- **Shared SVGs/assets**: Copy from whitepenguin `src/modules/shared/assets/` into `src/modules/shared/assets/` (see README there).
- **Socket**: `lib/socket.ts` when you need real-time features.

---

## 2. Next phase (suggested order)

1. **Environment**
   - Set `NEXT_PUBLIC_API_URL` in `.env.local` to your backend base URL.

2. **Auth flow**
   - Implement login page (form with react-hook-form + yup, call `authServices.login` via `useMutationService`, dispatch `setCredentials`, redirect to select-role or role-specific dashboard).
   - Add register, forgot-password, reset-password, verify-email pages and wire to auth service.
   - Optionally add route guards (e.g. redirect unauthenticated users to `/auth/login`).

3. **Landing**
   - Flesh out About, Pricing, Product, Contact (copy from whitepenguin or design new).
   - Add shared landing layout/header/footer if needed.

4. **Dashboards**
   - Add layout + sidebar per role (super-admin, school-owner, teacher, parent, student).
   - Implement dashboard pages and sub-routes using the route enums under `routes/`.

5. **Shared UI**
   - Add reusable components (forms, buttons, modals, tables). Either introduce MUI and reuse whitepenguin’s `TextField`/`CWTextField` or build Tailwind-based equivalents.
   - Copy needed SVGs/images from whitepenguin into `src/modules/shared/assets/`.

6. **API and data**
   - Add more services (e.g. school, teacher, student, class) following `auth.service.ts` and call them via `useMutationService` or a similar `useQueryService` (you can copy from whitepenguin).
   - Optionally add `useQueryService` for GET requests and list pages.

7. **Global CSS**
   - Adjust `globals.css` color variables to match your brand; add any extra utilities or theme tokens.

8. **Real-time (optional)**
   - Add `lib/socket.ts` and wire it where needed (e.g. notifications, chat).

---

## 3. Quick reference

| Area           | Location / note                                      |
|----------------|--------------------------------------------------------|
| API base URL   | `NEXT_PUBLIC_API_URL`; used in `utils/client.ts`      |
| Auth state     | `redux/store/slices/authSlice.ts`                     |
| Route enums    | `src/routes/*.routes.ts`                              |
| Color vars     | `app/globals.css` → `@theme inline`                   |
| Fonts          | `app/layout.tsx` (Inter, Source_Sans_3, Open_Sans)   |
| Toasts         | Notistack in `Providers`; used in `useMutationService`|
| 401 handling   | `sessionEventEmitter.emit("unauthorized")` in client  |

You can update this doc as you implement each phase.
