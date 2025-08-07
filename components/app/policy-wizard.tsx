"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const industries = ['SaaS', 'E-commerce', 'Mobile App', 'Agency', 'Blog/Content', 'Freelance'];
const countries = ['United States', 'United Kingdom', 'Germany', 'Brazil', 'Canada', 'Australia'];
const policyTypes = ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Refund Policy', 'Acceptable Use Policy'];
const languages = ['English', 'Spanish', 'German', 'French', 'Portuguese'];

const initialFormState = {
    businessName: '',
    websiteUrl: '',
    industry: 'SaaS',
    country: 'United States',
    regulations: { gdpr: false, ccpa: false, lgpd: false },
    dataCollected: { pii: true, analytics: true, cookies: true, payment: false, location: false },
    policyType: 'Privacy Policy',
    language: 'English'
};

export const PolicyWizard = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formState, setFormState] = useState(initialFormState);
    const [isLoading, setIsLoading] = useState(false);

    const progress = (step / 5) * 100;

    const handleGenerate = async () => {
        if (!formState.businessName || !formState.websiteUrl) {
            toast.error('Please fill in Business Name and Website URL.');
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.post('/api/policies', { newPolicyForm: formState });
            toast.success('Policy generated successfully!');
            router.push(`/policies/${response.data.id}`);
        } catch (error) {
            toast.error('Failed to generate policy.');
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">New Policy Wizard</h1>
            <p className="text-ios-text-secondary mb-6">Create a new policy in 5 simple steps.</p>

            <div className="mb-8">
                <div className="bg-ios-panel-contrast rounded-full h-2">
                    <div className="bg-ios-blue h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-sm text-ios-text-secondary mt-2 text-right">Step {step} of 5</p>
            </div>

            <div className="space-y-6">
                {step === 1 && <Step1 formState={formState} setFormState={setFormState} />}
                {step === 2 && <Step2 formState={formState} setFormState={setFormState} />}
                {step === 3 && <Step3 formState={formState} setFormState={setFormState} />}
                {step === 4 && <Step4 formState={formState} setFormState={setFormState} />}
                {step === 5 && <Step5 formState={formState} />}
            </div>

            <div className="mt-8 flex justify-between">
                <Button variant="secondary" onClick={() => setStep(s => s - 1)} disabled={step === 1}>Back</Button>
                {step < 5 ? (
                    <Button onClick={() => setStep(s => s + 1)}>Next</Button>
                ) : (
                    <Button onClick={handleGenerate} disabled={isLoading}>
                        {isLoading ? 'Generating...' : 'Generate Policy'}
                    </Button>
                )}
            </div>
        </div>
    );
};

// Sub-components for each step
const Step1 = ({ formState, setFormState }: any) => (
    <div className="space-y-4 animate-fade-in">
        <h2 className="text-xl font-semibold">1. Business Details</h2>
        <div>
            <Label>Business Name</Label>
            <Input value={formState.businessName} onChange={e => setFormState({...formState, businessName: e.target.value})} placeholder="e.g., Innovate Inc." />
        </div>
        <div>
            <Label>Website URL</Label>
            <Input value={formState.websiteUrl} onChange={e => setFormState({...formState, websiteUrl: e.target.value})} placeholder="https://innovateinc.com" />
        </div>
        <div>
            <Label>Industry</Label>
            <select value={formState.industry} onChange={e => setFormState({...formState, industry: e.target.value})} className="w-full mt-1 p-2 bg-ios-panel-contrast rounded-lg border focus:ring-2 focus:ring-ios-blue focus:outline-none">
                {industries.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
        </div>
    </div>
);

const Step2 = ({ formState, setFormState }: any) => (
    <div className="space-y-4 animate-fade-in">
        <h2 className="text-xl font-semibold">2. Location & Compliance</h2>
        <div>
            <Label>Primary Country of Operation</Label>
            <select value={formState.country} onChange={e => setFormState({...formState, country: e.target.value})} className="w-full mt-1 p-2 bg-ios-panel-contrast rounded-lg border focus:ring-2 focus:ring-ios-blue focus:outline-none">
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
        </div>
        <div>
            <Label>Specific Regulations (Optional)</Label>
            <div className="mt-2 space-y-2">
                {Object.keys(formState.regulations).map(reg => (
                    <label key={reg} className="flex items-center p-3 bg-ios-panel-contrast rounded-lg cursor-pointer">
                        <input type="checkbox" checked={formState.regulations[reg]} onChange={e => setFormState({...formState, regulations: {...formState.regulations, [reg]: e.target.checked}})} className="h-5 w-5 rounded text-ios-blue focus:ring-ios-blue" />
                        <span className="ml-3">{reg.toUpperCase()}</span>
                    </label>
                ))}
            </div>
        </div>
    </div>
);

const Step3 = ({ formState, setFormState }: any) => (
    <div className="space-y-4 animate-fade-in">
        <h2 className="text-xl font-semibold">3. Data Practices</h2>
        <p className="text-ios-text-secondary !-mt-2">What kind of data do you collect or process?</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.keys(formState.dataCollected).map(key => (
                <label key={key} className="flex items-center p-3 bg-ios-panel-contrast rounded-lg cursor-pointer">
                    <input type="checkbox" checked={formState.dataCollected[key]} onChange={e => setFormState({...formState, dataCollected: {...formState.dataCollected, [key]: e.target.checked}})} className="h-5 w-5 rounded text-ios-blue focus:ring-ios-blue" />
                    <span className="ml-3 capitalize">{key} {key === 'pii' && '(Personal Info)'}</span>
                </label>
            ))}
        </div>
    </div>
);

const Step4 = ({ formState, setFormState }: any) => (
    <div className="space-y-4 animate-fade-in">
        <h2 className="text-xl font-semibold">4. Policy Type & Language</h2>
        <div>
            <Label>Document Type</Label>
            <select value={formState.policyType} onChange={e => setFormState({...formState, policyType: e.target.value})} className="w-full mt-1 p-2 bg-ios-panel-contrast rounded-lg border focus:ring-2 focus:ring-ios-blue focus:outline-none">
                {policyTypes.map(pt => <option key={pt} value={pt}>{pt}</option>)}
            </select>
        </div>
        <div>
            <Label>Language</Label>
            <select value={formState.language} onChange={e => setFormState({...formState, language: e.target.value})} className="w-full mt-1 p-2 bg-ios-panel-contrast rounded-lg border focus:ring-2 focus:ring-ios-blue focus:outline-none">
                {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
            </select>
        </div>
    </div>
);

const Step5 = ({ formState }: any) => (
    <div className="space-y-4 animate-fade-in">
        <h2 className="text-xl font-semibold">5. Review & Generate</h2>
        <div className="bg-ios-panel p-4 rounded-lg border space-y-3 text-sm">
            <p><strong>Business:</strong> {formState.businessName} ({formState.industry})</p>
            <p><strong>Website:</strong> {formState.websiteUrl}</p>
            <p><strong>Location:</strong> {formState.country}</p>
            <p><strong>Regulations:</strong> {Object.keys(formState.regulations).filter(k => formState.regulations[k]).map(k => k.toUpperCase()).join(', ') || 'None selected'}</p>
            <p><strong>Data Types:</strong> {Object.keys(formState.dataCollected).filter(k => formState.dataCollected[k]).join(', ')}</p>
            <p><strong>Document:</strong> {formState.policyType} in {formState.language}</p>
        </div>
        <p className="text-sm text-ios-text-secondary">By clicking "Generate Policy", you agree that PolicyGPT is not providing legal advice. Review the generated document carefully.</p>
    </div>
);