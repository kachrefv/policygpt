import { RegisterForm } from "@/components/auth/register-form";
import { Logo } from "@/components/logo";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <div className="bg-ios-panel p-6 rounded-lg border animate-fade-in">
            <div className="flex justify-center mb-6">
                <Logo />
            </div>
            <h1 className="text-3xl font-bold mb-6 text-center">Create an Account</h1>
            <RegisterForm />
            <div className="mt-6 text-center text-sm">
                <p className="text-ios-text-secondary">
                    Already have an account?{' '}
                    <Link href="/login" className="text-ios-blue hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
}