import { DashboardClient } from "@/components/app/dashboard-client";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function getPolicies(userId: string) {
    const policies = await prisma.policy.findMany({
        where: { userId },
        orderBy: { updatedAt: 'desc' },
        select: {
            id: true,
            type: true,
            website: true,
            status: true,
            updatedAt: true,
        }
    });
    return policies.map(p => ({...p, updatedAt: p.updatedAt.toISOString().split('T')[0]}));
}

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return null;

    const policies = await getPolicies(session.user.id);

    return (
        <DashboardClient initialPolicies={policies} userName={session.user.name || 'User'} />
    );
}