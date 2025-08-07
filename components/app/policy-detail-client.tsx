"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Policy, PolicyHistory } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Code } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EmbedModal } from './embed-modal';

interface PolicyDetailClientProps {
    policy: Policy & { history: PolicyHistory[] };
}

export const PolicyDetailClient = ({ policy }: PolicyDetailClientProps) => {
    const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);

    return (
        <div className="animate-fade-in">
            <div className="mb-6">
                <Link href="/dashboard" className="text-ios-blue hover:underline text-sm flex items-center">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold mt-2">{policy.type}</h1>
                <p className="text-ios-text-secondary">{policy.website}</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-grow">
                    <div 
                        className="bg-ios-panel p-6 rounded-lg border prose dark:prose-invert max-w-none prose-h2:font-semibold prose-p:text-ios-text-secondary"
                        dangerouslySetInnerHTML={{ __html: policy.content }}
                    />
                    
                    <h2 className="text-2xl font-bold mt-8 mb-4">Version History</h2>
                    <div className="space-y-3">
                        {policy.history.map(item => (
                            <div key={item.id} className="bg-ios-panel p-4 rounded-lg border">
                                <p className="font-semibold">Version {item.version} - {new Date(item.createdAt).toLocaleDateString()}</p>
                                <p className="mt-2 text-ios-text-secondary">{item.change}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full lg:w-80 flex-shrink-0">
                    <div className="bg-ios-panel p-4 rounded-lg border space-y-4 sticky top-24">
                        <div>
                            <h3 className="font-semibold">Status</h3>
                            <span className={cn(
                                'mt-1 inline-block px-2 py-1 text-xs font-medium rounded-full',
                                policy.status === 'Up-to-date' ? 'bg-ios-green/20 text-ios-green' : 'bg-ios-orange/20 text-ios-orange'
                            )}>
                                {policy.status}
                            </span>
                        </div>
                        <div className="border-t my-2"></div>
                        <div>
                            <h3 className="font-semibold">Last Updated</h3>
                            <p className="text-ios-text-secondary">{new Date(policy.updatedAt).toLocaleDateString()}</p>
                        </div>
                        <div className="border-t my-2"></div>
                        <div>
                            <h3 className="font-semibold">Compliance</h3>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {policy.compliance.length > 0 ? policy.compliance.map(tag => (
                                    <span key={tag} className="bg-ios-panel-contrast text-xs font-medium px-2 py-1 rounded-full">{tag}</span>
                                )) : <span className="text-ios-text-secondary text-sm">N/A</span>}
                            </div>
                        </div>
                        <div className="border-t my-2"></div>
                        <div className="space-y-2">
                            <Button onClick={() => setIsEmbedModalOpen(true)} className="w-full">
                                <Code className="h-4 w-4 mr-2" />
                                Get Embed Code
                            </Button>
                            <Button variant="secondary" className="w-full">
                                <Download className="h-4 w-4 mr-2" />
                                Download PDF
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <EmbedModal 
                isOpen={isEmbedModalOpen} 
                onClose={() => setIsEmbedModalOpen(false)} 
                policyId={policy.id}
            />
        </div>
    );
};