# Carthus.md - Project Guide

## 1. Project Overview

Carthus (publicly branded as "PolicyGPT") is a full-stack Software-as-a-Service (SaaS) application developed with the Next.js App Router. Its primary function is to provide users with a streamlined platform for generating, managing, and embedding legal policies for their websites or applications. The system supports user authentication, a multi-step policy generation wizard, a dashboard for an overview of all created policies, and detailed views for individual policies including version history. A key feature is the ability to provide users with an embeddable JavaScript snippet, allowing for dynamic, real-time updates of policies on their own websites.

## 2. Key Technologies

The project leverages a modern, type-safe, and scalable technology stack.

*   **Framework**: [Next.js](https://nextjs.org/) (v13+ with App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Database ORM**: [Prisma](https://www.prisma.io/)
*   **Database**: [PostgreSQL](https://www.postgresql.org/)
*   **Authentication**: [NextAuth.js](https://next-auth.js.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (built on Radix UI)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **API Communication**: Next.js Route Handlers, [Axios](https://axios-http.com/) for client-side mutations.
*   **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
*   **Theming**: [next-themes](https://github.com/pacocoursey/next-themes) for light/dark mode support.
*   **Security**: [bcrypt](https://github.com/kelektiv/node.bcrypt.js) for password hashing.

## 3. File Structure Analysis

The project follows a feature-colocated structure within the Next.js App Router paradigm. This organization enhances maintainability by grouping related logic, UI, and server-side code.

*   `app/` - The core of the application, containing all routes and API endpoints.
    *   `layout.tsx`: The root layout, responsible for injecting global providers (`ThemeProvider`, `AuthProvider`), fonts, and metadata.
    *   `page.tsx`: The main public landing page.
    *   `(app)/`: A route group for all authenticated application pages. The layout (`(app)/layout.tsx`) enforces the authentication boundary.
        *   `dashboard/`: The user's main dashboard, listing their policies.
        *   `account/`: User profile and settings page.
        *   `generate/`: The page hosting the policy generation wizard.
        *   `policies/[policyId]/`: A dynamic route to display the details and history of a specific policy.
    *   `(auth)/`: A route group for unauthenticated pages like login and registration, using a distinct, simpler layout.
    *   `api/`: Backend API endpoints implemented as Next.js Route Handlers.
        *   `auth/[...nextauth]/`: Catch-all route for NextAuth.js authentication logic.
        *   `register/`: Handles new user registration.
        *   `policies/`: Handles the creation of new policies.
*   `components/` - Contains all reusable React components.
    *   `app/`: Components used exclusively within the authenticated `(app)` routes (e.g., `dashboard-client.tsx`, `policy-wizard.tsx`).
    *   `auth/`: Components specific to authentication forms.
    *   `landing/`: Components used on the public marketing page.
    *   `providers/`: Client-side context provider components.
    *   `ui/`: Generic, low-level UI components from shadcn/ui (e.g., `Button`, `Input`).
*   `lib/` - Houses utility functions, library configurations, and shared logic.
    *   `auth.ts`: Configuration object (`authOptions`) for NextAuth.js.
    *   `prisma.ts`: Singleton instance of the Prisma client.
    *   `utils.ts`: General utility functions, such as the `cn` helper for Tailwind CSS classes.
*   `prisma/` - (Assumed) Contains the `schema.prisma` file defining the database models and migrations.

## 4. Setup Instructions

Follow these steps to set up and run the project locally for development.

1.  **Clone the Repository**
    ```bash
    git clone <repository-url>
    cd carthus-project
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    # or yarn install, pnpm install
    ```

3.  **Set Up Environment Variables**
    Create a `.env` file in the root of the project by copying the example file.
    ```bash
    cp .env.example .env
    ```
    Populate the `.env` file with your local configuration:
    ```env
    # Example .env content
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
    NEXTAUTH_URL="http://localhost:3000"
    NEXTAUTH_SECRET="your-super-secret-key-for-nextauth"
    ```

4.  **Database Migration**
    Ensure you have a running PostgreSQL instance configured in your `.env` file. Run the Prisma migration command to set up the database schema.
    ```bash
    npx prisma migrate dev
    ```
    This will also generate the Prisma Client based on your schema.

5.  **Run the Development Server**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## 5. CI/CD Pipeline Proposal (GitHub Actions)

A robust CI/CD pipeline is crucial for maintaining code quality and automating deployments. The following GitHub Actions workflow is proposed.

**File**: `.github/workflows/ci-cd.yml`

**Triggers**:
*   On push to the `main` branch.
*   On any pull request targeting the `main` branch.

**Jobs**:

1.  **`lint-and-test`**:
    *   **Purpose**: Ensures code quality and correctness on every commit and PR.
    *   **Steps**:
        1.  Checkout code.
        2.  Set up Node.js environment.
        3.  Install dependencies (`npm ci`).
        4.  Run ESLint to check for code style and errors (`npm run lint`).
        5.  Run TypeScript compiler to check for type errors (`npm run typecheck` or `tsc --noEmit`).
        6.  (Optional) Run unit/integration tests (`npm test`).

2.  **`build`**:
    *   **Purpose**: Verifies that the application can be successfully built for production.
    *   **Steps**:
        1.  Checkout code.
        2.  Set up Node.js environment.
        3.  Install dependencies (`npm ci`).
        4.  Run the production build command (`npm run build`).

3.  **`deploy`**:
    *   **Purpose**: Automatically deploys the application to production.
    *   **Condition**: Runs only on a successful push to the `main` branch, and depends on the `build` job completing successfully.
    *   **Strategy**: Deployment to Vercel is recommended for Next.js projects due to its seamless integration.
        1.  The Vercel for GitHub integration can be configured to automatically deploy the `main` branch.
        2.  No explicit `deploy` job is needed in the YAML file if using the Vercel integration. The `build` job serves as the gatekeeper.
        3.  Environment variables must be configured in the Vercel project settings.

## 6. Architecture Diagram

This diagram illustrates the high-level architecture of the Carthus system, showing the main components and their interactions.

```mermaid
graph TD
    subgraph "User's Browser"
        A[User] --> B{Next.js Frontend};
    end

    subgraph "Carthus Platform (Vercel/Server)"
        B -- "HTTP Requests" --> C[Next.js App Router];
        C -- "Serves Pages" --> B;
        
        subgraph "Backend Logic"
            C -- "Calls" --> D[API Route Handlers];
            D -- "Authenticates via" --> E[NextAuth.js];
            D -- "Uses" --> F[Prisma ORM];
        end

        E -- "Validates Credentials" --> F;
        F -- "CRUD Operations" --> G[(PostgreSQL DB)];
    end

    subgraph "External Services"
        H[User's Website] -- "Loads Script" --> I[CDN for embed.js];
    end

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style G fill:#bbf,stroke:#333,stroke-width:2px
    style I fill:#9f9,stroke:#333,stroke-width:2px
```

## 7. Potential Improvements

While the current architecture is solid, the following actionable improvements are recommended to enhance functionality and robustness.

1.  **Integrate a Real AI for Policy Generation**: The core value proposition of "PolicyGPT" is currently unfulfilled. The `generatePolicyContent` function in `app/api/policies/route.ts` uses a simple string template. This should be replaced with a service like the OpenAI API.
    *   **Action**: Create a new service module for interacting with an LLM. Pass the structured data from the `PolicyWizard` form to the model as a detailed prompt. Store the AI-generated content in the database. This will deliver on the product's promise and create a significant competitive advantage.

2.  **Refactor Data Models and Fetching**: The application contains mock or incomplete data flows. For example, the `AccountPage` uses a hardcoded `memberSince` date, and the `User` model lacks fields for subscription status.
    *   **Action**: Extend the `User` model in `prisma/schema.prisma` to include `createdAt` (for "member since") and fields for a subscription plan (e.g., `plan`, `planStatus`, `subscriptionId`). Refactor the `AccountPage` to be an `async` server component that fetches this live data. This will provide real user data and lay the groundwork for implementing billing.

3.  **Implement Robust Form Management**: The `PolicyWizard` uses multiple `useState` calls to manage form state across several steps. This approach is prone to becoming complex and difficult to maintain.
    *   **Action**: Refactor the wizard using a dedicated form library like `react-hook-form` combined with a schema validation library like `zod`. This will centralize state management, simplify validation logic, provide a better user experience with instant feedback, and make the component more scalable for future additions.