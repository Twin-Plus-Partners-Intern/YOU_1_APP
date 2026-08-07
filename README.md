# YOU-IL (AI Goal Manager) Monorepo

Welcome to the **YOU-IL** monorepo, a goal manager application powered by AI (Google Gemini) and built for procrastinators (hệ P).

---

## Project Structure

- `apps/mobile`: Expo application built with React Native (New Architecture enabled), Expo Router, and NativeWind v4.
- `apps/api`: Node.js + Express Backend API server (running on port `5000`) with Google Gemini AI integration.
- `packages/ui`: Shared design system component library using NativeWind v4 (Tailwind).
- `packages/config`: Common configuration presets (strict TypeScript config).
- `packages/api`: Supabase and Google Gemini API client integration wrapper with Zustand state synchronization.
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
Copy the templates and fill in your Supabase credentials and Gemini API Key:
```bash
# Root variables
cp .env.example .env

# Backend API variables (PORT, GEMINI_API_KEY, etc.)
cp apps/api/.env.example apps/api/.env

# Mobile App variables (EXPO_PUBLIC_ prefixed keys)
cp apps/mobile/.env.example apps/mobile/.env
```

### 3. Run Development Server

You can choose to start both frontend and backend concurrently, or run them individually. Ensure you run these commands from the **root directory**:

#### A. Run BOTH Backend & Frontend Concurrently (Recommended)
This starts both the Express API server and the Expo Mobile Bundler in parallel in a single terminal session:
```bash
pnpm dev
```

#### B. Run ONLY the Backend API (Express Server)
Starts only the Express backend server on port `5000` with hot-reloading:
```bash
pnpm --filter api dev
```
- **Verify Backend**: Open your browser at [http://localhost:5000/health](http://localhost:5000/health). You should see a JSON status `"OK"`.
- **API Endpoint**: Accessible at `POST http://localhost:5000/api/ai/breakdown`.

#### C. Run ONLY the Frontend Mobile App (Expo / React Native)
Starts only the Metro Bundler for the mobile client on port `8081`:
```bash
pnpm --filter mobile start
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
