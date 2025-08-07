import { PolicyDetailClient } from "@/components/app/policy-detail-client";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

async function getPolicy(policyId: string, userId: string) {
    const policy = await prisma.policy.findFirst({
        where: { id: policyId, userId },
        include: {
            history: {
                orderBy: { createdAt: 'desc' }
            }
        }
    });

    if (!policy) {
        return null;
    }

    return policy;
}

export default async function PolicyDetailPage({ params }: { params: { policyId: string } }) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return notFound();

    const policy = await getPolicy(params.policyId, session.user.id);

    if (!policy) {
        return notFound();
    }

    return <PolicyDetailClient policy={policy} />;
}
