import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// Mock content generator
function generatePolicyContent(form: any) {
    const dataCollectedString = Object.keys(form.dataCollected).filter(k => form.dataCollected[k]).join(', ');
    return `<h2>1. Introduction</h2><p>This ${form.policyType} is for ${form.businessName} (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;), operating the website ${form.websiteUrl}.</p><h2>2. Scope</h2><p>This policy has been generated based on operations in the ${form.industry} sector and for compliance in ${form.country}.</p><h3>Data Practices</h3><p>This policy covers data practices including: ${dataCollectedString}.</p>`;
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return new NextResponse('Unauthenticated', { status: 401 });
    }

    try {
        const body = await request.json();
        const { newPolicyForm } = body;

        if (!newPolicyForm.businessName || !newPolicyForm.websiteUrl) {
            return new NextResponse('Missing required fields', { status: 400 });
        }

        const content = generatePolicyContent(newPolicyForm);
        const compliance = Object.keys(newPolicyForm.regulations).filter(k => newPolicyForm.regulations[k]).map(k => k.toUpperCase());

        const newPolicy = await prisma.policy.create({
            data: {
                type: newPolicyForm.policyType,
                website: newPolicyForm.websiteUrl,
                language: newPolicyForm.language,
                content: content,
                compliance: compliance.join(','),
                status: 'Up-to-date',
                userId: session.user.id,
                history: {
                    create: {
                        version: '1.0',
                        change: 'Initial document generation.'
                    }
                }
            }
        });

        return NextResponse.json(newPolicy);
    } catch (error) {
        console.error('POLICY_CREATION_ERROR', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
