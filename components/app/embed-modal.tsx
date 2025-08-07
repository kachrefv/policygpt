"use client";

import { X, Copy } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';

interface EmbedModalProps {
    isOpen: boolean;
    onClose: () => void;
    policyId: string;
}

export const EmbedModal = ({ isOpen, onClose, policyId }: EmbedModalProps) => {
    if (!isOpen) return null;

    const embedCode = `<div id='policygpt-embed-${policyId}'></div>\n<script src='https://cdn.policygpt.com/embed.js?id=${policyId}' async defer></script>`;

    const handleCopy = () => {
        navigator.clipboard.writeText(embedCode);
        toast.success('Copied to clipboard!');
    };

    return (
        <div onClick={onClose} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div onClick={e => e.stopPropagation()} className="bg-ios-panel w-full max-w-2xl rounded-lg p-6 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Embed Your Policy</h2>
                    <button onClick={onClose} className="text-ios-text-secondary">
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <p className="text-ios-text-secondary mb-4">Copy and paste this snippet into your website's HTML where you want the policy to appear. It will update automatically.</p>
                <textarea 
                    readOnly 
                    className="w-full h-32 p-2 font-mono text-sm bg-ios-panel-contrast rounded-lg border focus:ring-2 focus:ring-ios-blue focus:outline-none"
                    value={embedCode}
                />
                <div className="mt-4 text-right">
                    <Button onClick={handleCopy}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Code
                    </Button>
                </div>
            </div>
        </div>
    );
};