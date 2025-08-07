export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-ios-bg dark:bg-ios-bg p-4">
            <main className="w-full max-w-md">
                {children}
            </main>
        </div>
    );
}