import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: 'Is PolicyGPT a law firm?',
        answer: 'No, PolicyGPT is not a law firm and does not provide legal advice. Our service provides AI-generated legal document templates for informational purposes. We recommend consulting with a qualified attorney for your specific legal needs.'
    },
    {
        question: 'Which countries and regulations do you support?',
        answer: 'We support major global regulations like GDPR (Europe), CCPA (California), and LGPD (Brazil), and are constantly adding support for more regions. Our policy wizard allows you to specify your target countries for tailored compliance.'
    },
    {
        question: 'Can I cancel my subscription at any time?',
        answer: 'Yes, you can cancel your Pro or Agency plan at any time from your account settings. You will retain access to your plan\'s features until the end of the current billing period.'
    }
];

export const FAQ = () => {
    return (
        <section id="faq" className="py-20 md:py-32 max-w-3xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <details key={index} className="bg-ios-panel p-4 rounded-lg group">
                        <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                            {faq.question}
                            <ChevronDown className="h-5 w-5 transform group-open:rotate-180 transition-transform" />
                        </summary>
                        <p className="mt-4 text-ios-text-secondary">{faq.answer}</p>
                    </details>
                ))}
            </div>
        </section>
    );
};