"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileText, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Policy {
    id: string;
    type: string;
    website: string;
    status: string;
    updatedAt: string;
}

interface DashboardClientProps {
    initialPolicies: Policy[];
    userName: string;
}

export const DashboardClient = ({ initialPolicies, userName }: DashboardClientProps) => {
    const router = useRouter();

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 space-y-4 sm:space-y-0">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-ios-text-secondary">Welcome back, {userName}!</p>
                </div>
                <Button onClick={() => router.push('/generate')}>
                    <PlusCircle className="h-5 w-5 mr-2" />
                    Generate New Policy
                </Button>
            </div>

            <div className="space-y-4">
                {initialPolicies.length > 0 ? (
                    initialPolicies.map(policy => (
                        <div 
                            key={policy.id}
                            onClick={() => router.push(`/policies/${policy.id}`)}
                            className="bg-ios-panel p-4 rounded-lg border flex flex-col sm:flex-row justify-between sm:items-center cursor-pointer hover:border-ios-blue transition space-y-3 sm:space-y-0"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="bg-ios-panel-contrast p-3 rounded-lg">
                                    <FileText className="h-6 w-6 text-ios-text-secondary" />
                                </div>
                                <div>
                                    <p className="font-semibold">{policy.type}</p>
                                    <p className="text-sm text-ios-text-secondary">{policy.website}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-6">
                                <div className="text-left sm:text-right">
                                    <span className={cn(
                                        'px-2 py-1 text-xs font-medium rounded-full',
                                        policy.status === 'Up-to-date' ? 'bg-ios-green/20 text-ios-green' : 'bg-ios-orange/20 text-ios-orange'
                                    )}>
                                        {policy.status}
                                    </span>
                                    <p className="text-sm text-ios-text-secondary mt-1">Updated: {policy.updatedAt}</p>
                                </div>
                                <ChevronRight className="h-5 w-5 text-ios-text-secondary hidden sm:block" />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-ios-panel rounded-lg border border-dashed">
                        <h3 className="text-xl font-semibold">No policies yet</h3>
                        <p className="text-ios-text-secondary mt-2">Get started by generating your first policy.</p>
                        <Button onClick={() => router.push('/generate')} className="mt-4">
                            <PlusCircle className="h-5 w-5 mr-2" />
                            Generate Policy
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};