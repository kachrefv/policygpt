import { User } from 'next-auth';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
    user: Pick<User, 'name' | 'image'>;
    className?: string;
}

export const UserAvatar = ({ user, className }: UserAvatarProps) => {
    const getInitials = (name: string | null | undefined) => {
        if (!name) return 'U';
        const names = name.split(' ');
        if (names.length > 1) {
            return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <div className={cn(
            'w-10 h-10 rounded-full bg-ios-blue flex items-center justify-center text-white font-bold',
            className
        )}>
            {user.image ? (
                <img src={user.image} alt={user.name || 'User'} className="w-full h-full rounded-full object-cover" />
            ) : (
                <span>{getInitials(user.name)}</span>
            )}
        </div>
    );
};