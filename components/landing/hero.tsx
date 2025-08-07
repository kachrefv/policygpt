import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const Hero = () => {
    return (
        <section className="text-center max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">Generate Legal Policies in Minutes, Not Weeks.</h1>
            <p className="mt-6 text-lg md:text-xl text-ios-text-secondary">PolicyGPT uses AI trained on legal templates to create compliant Privacy Policies, ToS, and more. Built for startups, e-commerce, and agencies.</p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button asChild size="lg">
                    <Link href="/dashboard">Generate Your First Policy</Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                    <a href="#features">Learn More</a>
                </Button>
            </div>
        </section>
    );
};