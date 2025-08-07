import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import { UserAvatar } from "@/components/app/user-avatar";

export default async function AccountPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) return notFound();

    const user = session.user;
    const memberSince = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); // Mock data

    return (
        <div className="max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

            <div className="bg-ios-panel p-6 rounded-lg border">
                <div className="flex items-center space-x-4">
                    <UserAvatar user={user} className="w-16 h-16 text-2xl" />
                    <div>
                        <p className="text-xl font-semibold">{user.name || 'User'}</p>
                        <p className="text-ios-text-secondary">{user.email}</p>
                    </div>
                </div>

                <div className="border-t my-6"></div>
                
                <h2 className="text-lg font-semibold mb-4">Plan & Billing</h2>
                <div className="bg-ios-panel-contrast p-4 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center space-y-3 sm:space-y-0">
                    <div>
                        <p className="font-medium">Current Plan: <span className="text-ios-blue font-bold">Pro Plan</span></p>
                        <p className="text-sm text-ios-text-secondary">Member since {memberSince}</p>
                    </div>
                    <button className="bg-ios-panel px-4 py-2 rounded-lg font-semibold border hover:bg-ios-panel-contrast transition">Manage Plan</button>
                </div>
            </div>
        </div>
    );
}