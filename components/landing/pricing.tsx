import { Check } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const plans = [
    {
        name: 'Free',
        description: 'For individuals and new projects.',
        price: '$0',
        features: ['1 Policy document', 'Manual updates', 'Standard templates'],
        isPopular: false,
    },
    {
        name: 'Pro',
        description: 'For startups and growing businesses.',
        price: '$15',
        features: ['Unlimited documents', 'Automatic legal updates', 'Compliance tracking', 'Multi-language support', 'Embeddable widget'],
        isPopular: true,
    },
    {
        name: 'Agency',
        description: 'For agencies managing client sites.',
        price: '$49',
        features: ['All Pro features', 'Multi-client dashboards', 'White-label policies', 'Priority support'],
        isPopular: false,
    },
];

export const Pricing = () => {
    return (
        <section id="pricing" className="py-20 md:py-32">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Simple, transparent pricing.</h2>
                <p className="mt-4 text-lg text-ios-text-secondary">Choose the plan that's right for your business.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
                {plans.map(plan => (
                    <div key={plan.name} className={cn('bg-ios-panel p-8 rounded-2xl border relative', plan.isPopular && 'border-2 border-ios-blue')}>
                        {plan.isPopular && <span className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-ios-blue text-white px-3 py-1 rounded-full text-sm font-semibold">Most Popular</span>}
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                        <p className="mt-2 text-ios-text-secondary">{plan.description}</p>
                        <p className="mt-6 text-4xl font-bold">{plan.price}<span className="text-xl font-normal text-ios-text-secondary">/mo</span></p>
                        <Button asChild className="w-full mt-6" variant={plan.isPopular ? 'primary' : 'secondary'}>
                            <Link href="/register">{plan.isPopular ? 'Choose Pro' : 'Get Started'}</Link>
                        </Button>
                        <ul className="mt-8 space-y-4 text-ios-text-secondary">
                            {plan.features.map(feature => (
                                <li key={feature} className="flex items-center">
                                    <Check className="h-5 w-5 text-ios-green mr-2 flex-shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};