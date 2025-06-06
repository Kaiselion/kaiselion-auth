import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import type { Session } from "@/types/session"

export function UserAvatar({ session }: { session: Session }) {
  // Generar iniciales del usuario
  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex flex-row flex-wrap items-center gap-12">
      <Avatar>
        <AvatarImage 
          src={session.user?.image || undefined} 
          alt={`Avatar de ${session.user?.name || 'Usuario'}`} 
        />
        <AvatarFallback>
          {getInitials(session.user?.name)}
        </AvatarFallback>
      </Avatar>
    </div>
  )
}
