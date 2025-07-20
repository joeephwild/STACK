# **Coding Standards**

  * **Critical Rules**:
      * NEVER commit secret keys or environment variables to the repository.
      * All API routes must have input validation using Zod.
      * All frontend components must be styled using NativeWind classes.
      * Shared types must be defined in the `packages/shared-types` directory and imported from there.
  * **Naming Conventions**:
      * **Components**: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
      * **Hooks**: `useCamelCase.ts` (e.g., `useAuth.ts`)
      * **API Files**: `camelCase.ts` (e.g., `getBaskets.ts`)
      * **Services**: `camelCaseService.ts` (e.g., `portfolioService.ts`)

-----
