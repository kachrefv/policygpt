"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Policy, PolicyHistory } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Code } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EmbedModal } from './embed-modal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface PolicyDetailClientProps {
    policy: Policy & { history: PolicyHistory[] };
}

export const PolicyDetailClient = ({ policy }: PolicyDetailClientProps) => {
    const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);

    return (
        <div className="animate-fade-in">
            <div className="mb-6">
                <Link href="/dashboard" className="text-primary hover:underline text-sm flex items-center">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold mt-2">{policy.type}</h1>
                <p className="text-muted-foreground">{policy.website}</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-grow">
                    <Card>
                        <CardContent className="pt-6">
                            <div 
                                className="prose dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: policy.content }}
                            />
                        </CardContent>
                    </Card>
                    
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Version History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Version</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Change Summary</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {policy.history.sort((a, b) => parseFloat(b.version) - parseFloat(a.version)).map(item => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium">{item.version}</TableCell>
                                            <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                                            <TableCell>{item.change}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                <div className="w-full lg:w-80 flex-shrink-0">
                    <Card className="sticky top-24">
                        <CardContent className="p-6 space-y-4">
                            <div>
                                <h3 className="font-semibold text-card-foreground">Status</h3>
                                <Badge className={cn(
                                    'mt-1 w-full justify-center',
                                    policy.status === 'Up-to-date' 
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-transparent hover:bg-green-200' 
                                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400 border-transparent hover:bg-amber-200'
                                )}>
                                    {policy.status}
                                </Badge>
                            </div>
                            <div className="border-t"></div>
                            <div>
                                <h3 className="font-semibold text-card-foreground">Last Updated</h3>
                                <p className="text-sm text-muted-foreground">{new Date(policy.updatedAt).toLocaleDateString()}</p>
                            </div>
                            <div className="border-t"></div>
                            <div>
                                <h3 className="font-semibold text-card-foreground">Compliance</h3>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {policy.compliance && policy.compliance.length > 0 ? policy.compliance.split(',').map(tag => (
                                        <Badge key={tag} variant="secondary">{tag.trim()}</Badge>
                                    )) : <p className="text-sm text-muted-foreground">N/A</p>}
                                </div>
                            </div>
                            <div className="border-t"></div>
                            <div className="space-y-2 pt-2">
                                <Button onClick={() => setIsEmbedModalOpen(true)} className="w-full">
                                    <Code className="h-4 w-4 mr-2" />
                                    Get Embed Code
                                </Button>
                                <Button variant="secondary" className="w-full">
                                    <Download className="h-4 w-4 mr-2" />
                                    Download PDF
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
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