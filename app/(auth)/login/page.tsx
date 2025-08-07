import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/logo";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="bg-ios-panel p-6 rounded-lg border animate-fade-in">
            <div className="flex justify-center mb-6">
                <Logo />
            </div>
            <h1 className="text-3xl font-bold mb-6 text-center">Log In</h1>
            <LoginForm />
            <div className="mt-6 text-center text-sm space-y-2">
                <p className="text-ios-text-secondary">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-ios-blue hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}