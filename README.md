# PolicyGPT - AI Policy Generator

This is a full-stack application built with Next.js, Prisma, NextAuth.js, and Tailwind CSS. It allows users to generate, manage, and embed legal policies for their websites.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [SQLite](https://www.sqlite.org/index.html)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: Custom components, `lucide-react` for icons.

## Getting Started

Follow these steps to get the project up and running on your local machine.

### 1. Prerequisites

- Node.js (v18 or later)
- npm or yarn

### 2. Clone the Repository

```bash
git clone <repository-url>
cd policy-gpt
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Set Up Environment Variables

Create a `.env` file in the root of the project by copying the example file:

```bash
cp .env.example .env
```

Now, open the `.env` file and fill in the required values:

- `NEXTAUTH_SECRET`: A random string used to hash tokens. You can generate one with the following command:
  ```bash
  openssl rand -base64 32
  ```
- `NEXTAUTH_URL`: The canonical URL of your application. For local development, this is `http://localhost:3000`.

Your `.env` file should look like this:

```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-super-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 5. Run Database Migrations

This project uses Prisma with SQLite. To create the database file (`dev.db`) and apply the schema, run the following command:

```bash
npx prisma migrate dev --name init
```

This will:
1. Create the `prisma/dev.db` SQLite database file.
2. Apply the migrations to create the necessary tables (`User`, `Policy`, etc.).
3. Generate the Prisma Client based on your schema.

### 6. Run the Development Server

Now you can start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Runs the linter.
