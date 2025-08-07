import { Zap, Globe, RefreshCw, Code, Languages, History } from 'lucide-react';

const featureList = [
    { icon: Zap, title: 'AI Document Generator', description: 'Our GPT-powered engine is trained on thousands of real legal documents and templates for accurate, reliable policies.' },
    { icon: Globe, title: 'Localization Engine', description: 'Automatically adapts legal clauses for GDPR, CCPA, LGPD, and other regional frameworks based on your business location.' },
    { icon: RefreshCw, title: 'Auto-Update System', description: 'Get notified and approve updates with one click when legal frameworks change, keeping you compliant effortlessly.' },
    { icon: Code, title: 'Embeddable Widget', description: 'A simple copy-paste snippet to embed live, always up-to-date policies directly on your website or app.' },
    { icon: Languages, title: 'Multi-Language Support', description: 'Instantly generate legal documents in multiple languages to serve your global user base effectively.' },
    { icon: History, title: 'Changelog & History', description: 'Track every version and update to your policies with a clear, auditable history log for complete transparency.' },
];

export const Features = () => {
    return (
        <section id="features" className="py-20 md:py-32">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Everything you need for compliance.</h2>
                <p className="mt-4 text-lg text-ios-text-secondary">From generation to auto-updates, we've got you covered.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featureList.map((feature, index) => (
                    <div key={index} className="bg-ios-panel p-6 rounded-xl border">
                        <feature.icon className="h-8 w-8 text-ios-blue mb-4" />
                        <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                        <p className="text-ios-text-secondary">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};