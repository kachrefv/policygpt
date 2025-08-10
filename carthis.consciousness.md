# Technical Summary and Architectural Overview: Carthus (PolicyGPT)

## 1. High-Level Summary

Carthus, publicly branded as "PolicyGPT," is a full-stack Software-as-a-Service (SaaS) application designed to facilitate the generation, management, and embedding of legal policies for websites and applications. Built with the Next.js App Router, it provides user authentication, a multi-step policy generation wizard, a dashboard for policy oversight, detailed policy views with version history, and a unique feature allowing users to embed dynamic, real-time updated policies via a JavaScript snippet on their own platforms.

## 2. Tech Stack

The project utilizes a modern, robust, and type-safe technology stack:

*   **Framework**: Next.js (v13+ with App Router)
*   **Language**: TypeScript
*   **Database ORM**: Prisma
*   **Database**: Primarily configured for SQLite (development), but easily adaptable to PostgreSQL (as mentioned in `Carthus.md`'s setup section).
*   **Authentication**: NextAuth.js (with Credentials Provider)
*   **Styling**: Tailwind CSS (with custom iOS-like color palette)
*   **UI Components**: shadcn/ui (leveraging Radix UI) for foundational components, augmented with custom components.
*   **Icons**: Lucide React
*   **API Communication**: Next.js Route Handlers (backend), Axios (client-side mutations)
*   **Notifications**: React Hot Toast
*   **Theming**: next-themes for light/dark mode
*   **Security**: bcrypt for password hashing

## 3. Architecture

The application follows a well-structured modular architecture, heavily influenced by the Next.js App Router paradigm:

*   **Frontend (Next.js App Router)**: The application's UI is built with React and Next.js. It leverages server components for data fetching and rendering, and client components for interactive UI elements. Route groups (`(app)`, `(auth)`) are used to logically segment authenticated and unauthenticated parts of the application, each with its own layout. The root `layout.tsx` handles global providers (Auth, Theme).
*   **Authentication Flow**: NextAuth.js is central to authentication. It uses a Credentials Provider for email/password login and registration. Authentication is enforced via Next.js Middleware (`middleware.ts`) and `getServerSession` checks in server components (e.g., `app/(app)/layout.tsx`, `app/(app)/dashboard/page.tsx`). User sessions are managed using JWTs.
*   **Backend (Next.js Route Handlers)**: API endpoints are implemented as Next.js Route Handlers within the `app/api` directory. These handlers serve as the backend, responsible for user registration (`/api/register`), policy creation (`/api/policies`), and NextAuth.js operations (`/api/auth/[...nextauth]`). They interact directly with the database via Prisma.
*   **Database Interaction (Prisma)**: Prisma serves as the ORM, abstracting database operations. The `prisma/schema.prisma` defines the `User`, `Account`, `Session`, `VerificationToken`, `Policy`, and `PolicyHistory` models. The `lib/prisma.ts` file ensures a single, reusable Prisma client instance across the application. Policies include fields for type, website, content (HTML string), compliance (comma-separated string), and a linked version history.
*   **State Management**: For client-side form management (e.g., `PolicyWizard`), local React `useState` is used. Global state for authentication is managed by NextAuth.js's context (`SessionProvider`). Data fetching on server components bypasses client-side state management frameworks.
*   **Styling and UI**: Tailwind CSS is used for utility-first styling, complemented by `shadcn/ui` for high-quality, reusable UI components (`Button`, `Input`, `Card`, `Table`, `Badge`). A custom color palette mimicking iOS design is defined via CSS variables and consumed by Tailwind.

## 4. Key Components/Files

*   `app/layout.tsx`: The root layout for the entire application, setting up global providers (authentication, theme, toast notifications) and fonts.
*   `app/(app)/layout.tsx`: Layout for authenticated routes, enforcing user session presence and displaying the application sidebar and header.
*   `app/(auth)/layout.tsx`: Layout for public authentication pages (login, register), providing a distinct UI.
*   `app/api/auth/[...nextauth]/route.ts`: NextAuth.js catch-all route, handling all authentication requests (login, logout, session management).
*   `app/api/register/route.ts`: API endpoint for new user registration, including password hashing with `bcrypt`.
*   `app/api/policies/route.ts`: API endpoint for creating new policies, including a mock policy content generation function.
*   `app/(app)/dashboard/page.tsx`: Server component fetching user's policies from the database and passing them to the client-side `DashboardClient` component.
*   `app/(app)/generate/page.tsx`: Entry point for the multi-step `PolicyWizard` component.
*   `app/(app)/policies/[policyId]/page.tsx`: Dynamic route for displaying a specific policy's details and version history, fetching data on the server.
*   `components/app/policy-wizard.tsx`: Client component managing the multi-step form for generating policies, handling state locally with `useState` and submitting data via Axios.
*   `components/app/embed-modal.tsx`: Client component providing an embeddable JavaScript snippet for policies.
*   `lib/auth.ts`: Configuration for NextAuth.js, including Credentials provider logic and JWT/session callbacks.
*   `lib/prisma.ts`: Singleton instance of PrismaClient for database interactions.
*   `prisma/schema.prisma`: Defines the database schema, including `User`, `Policy`, and `PolicyHistory` models, and specifies SQLite as the development database provider.
*   `middleware.ts`: Next.js middleware used to protect authenticated routes, redirecting unauthenticated users to the login page.

## 5. Potential Improvements

1.  **Integrate a Real AI for Policy Generation**: The `generatePolicyContent` function in `app/api/policies/route.ts` uses a simplistic string template. To fulfill the "PolicyGPT" promise, this should be replaced with an actual Large Language Model (LLM) service integration (e.g., OpenAI API). This would require creating a dedicated service module to handle LLM interactions, passing structured form data as detailed prompts, and storing the AI-generated content in the database. This is critical for the core value proposition.
2.  **Refactor Data Models and Fetching for User Data**: The `AccountPage` currently displays mock data for `memberSince` and a hardcoded "Pro Plan." The `User` model in `prisma/schema.prisma` should be extended to include `createdAt` (for `memberSince`) and fields related to subscription status (e.g., `plan`, `planStatus`, `subscriptionId`). The `AccountPage` should then be refactored to be an `async` server component that fetches this live user data, providing accurate information and laying the groundwork for a billing system.
3.  **Implement Robust Form Management for PolicyWizard**: The `PolicyWizard` component manages complex multi-step form state using multiple `useState` hooks, which can become unwieldy. Refactoring this to use a dedicated form library like `react-hook-form` in conjunction with a schema validation library such as `zod` would significantly improve maintainability, centralize state logic, enhance validation feedback to the user, and make the wizard more scalable for future feature additions.