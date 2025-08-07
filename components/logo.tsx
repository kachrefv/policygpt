import { FileText } from 'lucide-react';
import Link from 'next/link';

export const Logo = () => {
    return (
        <Link href="/" className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-ios-blue" />
            <span className="text-xl font-bold text-ios-text-primary">PolicyGPT</span>
        </Link>
    );
};