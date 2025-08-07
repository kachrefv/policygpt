"use client";

import { useState } from "react";
import { Policy, PolicyHistory } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EmbedModal } from "./embed-modal";

// The type received by the client component after serialization from the server component.
// Dates are converted to ISO strings.
type SerializedPolicy = Omit<Policy, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
};

type SerializedPolicyHistory = Omit<PolicyHistory, "createdAt"> & {
    createdAt: string;
};

type PolicyWithHistory = SerializedPolicy & {
    history: SerializedPolicyHistory[];
};

interface PolicyDetailClientProps {
    policy: PolicyWithHistory;
}

export function PolicyDetailClient({ policy }: PolicyDetailClientProps) {
    const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);

    return (
        <>
            <EmbedModal
                isOpen={isEmbedModalOpen}
                onClose={() => setIsEmbedModalOpen(false)}
                policyId={policy.id}
            />
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Policy Details</CardTitle>
                                <CardDescription>
                                    Overview of your {policy.type} policy for {policy.website}.
                                </CardDescription>
                            </div>
                            <Button onClick={() => setIsEmbedModalOpen(true)}>Embed</Button>
                        </div>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Website</p>
                            <p>{policy.website}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Policy Type</p>
                            <p>{policy.type}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Status</p>
                            <Badge variant={policy.status === 'active' ? 'default' : 'secondary'}>{policy.status}</Badge>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Language</p>
                            <p>{policy.language}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                            <p>{new Date(policy.updatedAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Created On</p>
                            <p>{new Date(policy.createdAt).toLocaleDateString()}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Policy Content</CardTitle>
                        <CardDescription>The full text of your generated policy.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="prose max-w-none rounded-md border bg-muted/40 p-4 dark:prose-invert">
                            <pre className="whitespace-pre-wrap bg-transparent p-0 font-sans text-sm">{policy.content}</pre>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Version History</CardTitle>
                        <CardDescription>Review the changes made to this policy over time.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Version</TableHead>
                                    <TableHead>Change Description</TableHead>
                                    <TableHead className="text-right">Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {policy.history.length > 0 ? (
                                    policy.history.map((entry) => (
                                        <TableRow key={entry.id}>
                                            <TableCell className="font-medium">{entry.version}</TableCell>
                                            <TableCell>{entry.change}</TableCell>
                                            <TableCell className="text-right">{new Date(entry.createdAt).toLocaleDateString()}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center">
                                            No version history found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
