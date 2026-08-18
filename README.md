# YOU-IL Mobile App Monorepo

Welcome to the **YOU-IL** monorepo, a client-first goal manager application powered by AI (Google Gemini) and built for procrastinators (hệ P). This repository is dedicated exclusively to the Mobile Frontend application.

---

## 1. Tech Stack & Core Tooling

- **Framework**: Expo (React Native SDK 54 / React 19)
- **Routing**: Expo Router (File-system routing)
- **Language**: TypeScript (Strict Mode)
- **Styling**: NativeWind v4 (Tailwind CSS)
- **State Management**: Zustand (Global UI State & Local State Cache)
- **Engine & Bundler**: Hermes JS Engine, Metro Bundler, Turborepo, pnpm Workspaces

---

## 2. Monorepo Structure

```text
YOU_1_APP/
├── apps/
│   └── mobile/                         # Expo React Native App (Expo Router)
├── packages/
│   ├── api/                            # Axios Client SDK, Zustand Stores & Mocking Layer
│   ├── types/                          # Shared Type Contracts, DTOs (OpenAPI auto-generated)
│   ├── ui/                             # Design System (Tailwind UI Components)
│   └── config/                         # Common Config Presets (TS Strict Rules)
├── package.json                        # Monorepo root configuration
├── pnpm-workspace.yaml                 # PNPM Workspace packages registry
└── turbo.json                          # Turborepo task pipeline configs
```

---

## 3. Monorepo Bundling & Resolvers

To guarantee maximum stability under strict package managers like `pnpm`, we implemented:

1. **Symlink Resolution**: `unstable_enableSymlinks: true` and `disableHierarchicalLookup: false` inside `apps/mobile/metro.config.js` to allow Metro to resolve transitive dependencies inside the `.pnpm` virtual store.
2. **React Singleton Interception**: A custom `resolveRequest` handler in `metro.config.js` to intercept and redirect React, React DOM, React Native, and React Native Web resolving to the local `apps/mobile/node_modules` folder, eliminating the "Multiple React Instances" crash.

---

## 4. Getting Started & Environment Setup

> [!IMPORTANT]
> All startup commands (`pnpm dev`, `pnpm install`, etc.) should be executed from the **ROOT directory of the workspace (`YOU_1_APP/`)**, not inside individual package directories.

### 1. Installation

Install all dependencies across the monorepo from the root directory:

```bash
pnpm install
```

### 2. Configure Environment Variables

Copy the template to create your local `.env` configuration file inside `apps/mobile`:

```bash
cp apps/mobile/.env.example apps/mobile/.env
```

#### Environment Variables Explanation:

- **`EXPO_PUBLIC_API_URL`**: Points to the Backend REST API Server.
  - _Default_: `http://10.0.2.2:5000` (optimized for Android Emulator).
  - _Development_: Replace with `http://localhost:5000` for iOS Simulator / Web, or your machine's local LAN IP (e.g. `http://192.168.1.x:5000`) for testing on physical devices.
- **`EXPO_PUBLIC_USE_MOCK`**: Flag to toggle static Mocking Data fallback (`true` | `false`). Setting to `true` allows the app to run with mock database fallbacks even when the backend is offline.
- **`EXPO_PUBLIC_APP_ENV`**: Application build target environment (`development` | `staging` | `production`).

### 3. Run Development Server

Start the Expo Mobile Bundler on port `8081` from the root directory:

```bash
pnpm run dev
```

- **Platform Shortcuts**: Press `a` for Android Emulator, `i` for iOS Simulator, `w` for Web Browser, or `r` to reload the application.
- **Reset Cache**: If you make package changes and need to reset the bundler cache, run:
  ```bash
  pnpm --filter mobile start -- --clear
  ```

### 4. Code Quality & Validation

Run type checks and lints across all workspaces:

```bash
# Typecheck everything (TypeScript strict mode verification)
pnpm run typecheck

# Lint files
pnpm run lint
```

---

## 5. How to Test with Expo Go

To test the application on a physical device using **Expo Go**:

1.  Ensure your mobile device and development computer are connected to the **same local Wi-Fi network**.
2.  Open your `apps/mobile/.env` file and replace `10.0.2.2` in `EXPO_PUBLIC_API_URL` with your computer's local network IP address (e.g. `http://192.168.1.50:5000`).
3.  Run the development server (`pnpm run dev`).
4.  Scan the QR code displayed in the terminal:
    - **Android**: Scan using the **Expo Go** application (downloadable from Google Play Store).
    - **iOS**: Scan using the native **Camera** application, which will prompt you to open the link in Expo Go (downloadable from Apple App Store).
