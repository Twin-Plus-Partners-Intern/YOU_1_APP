# YOU-IL (AI Goal Manager) Monorepo

Welcome to the **YOU-IL** monorepo, a client-first goal manager application powered by AI (Google Gemini) and built for procrastinators (hệ P).

---

## Project Structure

- `apps/mobile`: Expo application built with React Native (New Architecture enabled), Expo Router, and NativeWind v4.
- `packages/api`: Client SDK Layer (Axios HTTP instance + API Services + Zustand global store) with offline mock fallbacks.
- `packages/ui`: Shared design system component library using NativeWind v4 (Tailwind).
- `packages/config`: Common configuration presets (strict TypeScript config).
- `packages/types`: Shared TypeScript typings for User, Goal, Task, MBTI, DTOs, and API response structures.

---

## Monorepo Bundling & Resolvers

To guarantee maximum stability under strict package managers like `pnpm`, we implemented:
1. **Symlink Resolution**: `unstable_enableSymlinks: true` and `disableHierarchicalLookup: false` inside `apps/mobile/metro.config.js` to allow Metro to resolve transitive dependencies inside the `.pnpm` virtual store.
2. **React Singleton Interception**: A custom `resolveRequest` handler in `metro.config.js` to intercept and redirect React, React DOM, React Native, and React Native Web resolving to the local `apps/mobile/node_modules` folder, eliminating the "Multiple React Instances" crash.
3. **Explicit Hoisted Dependencies**: Configured package metadata (`@expo/metro-runtime`, `expo-modules-core`, `react-native-css-interop`, and `@babel/runtime`) to prevent resolution crashes on web bundling.

---

## Setup & Running Guide

> [!IMPORTANT]
> All startup commands (`pnpm dev`, `pnpm install`, etc.) should be executed from the **ROOT directory of the workspace (`YOU_1_APP/`)**, not inside individual package directories.

### 1. Installation
Install all dependencies across the monorepo:
```bash
pnpm install
```

### 2. Configure Environment Variables
Copy the templates and fill in your API URLs, Supabase credentials, and Gemini API Key:
```bash
# Copy mobile app environment variables
cp apps/mobile/.env.example apps/mobile/.env
```

### 3. Run Development Server
Start the Expo Mobile Bundler on port `8081` from the root directory:
```bash
pnpm run dev
```
- **Run on Simulators/Browser**: Press `w` for Web Browser, `a` for Android Emulator, or `i` for iOS Simulator.
- **Run on Physical Device**: Scan the QR code in the terminal using the **Expo Go** application.
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
