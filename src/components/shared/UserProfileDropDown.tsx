import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { UserAvatar } from '@/components/shared/UserAvatar'
import { authClient } from '@/lib/auth-client'
import { Toaster } from '@/components/shared/Toaster'
import { toast } from 'sonner'
import { getErrorMessage } from '@/lib/errors'
import type { Session } from '@/types/session'
import { LINKS } from '@/constants/navigation'

export function UserProfileDropDown({ session }: { session: Session }) {
	const filteredLinks = LINKS.filter((link) => {
		if (link.showAlways) return true
		if (session && link.showOnlyWhenLoggedIn) return true
		if (!session && link.showOnlyWhenLoggedOut) return true
		return false
	})
	console.log('Dropdown session: ', session)

	const clientLogout = () => {
		return async () => {
			try {
				await authClient.signOut({
					fetchOptions: {
						onSuccess: () => {
							toast.success('Sesión cerrada correctamente', {
								duration: 3000,
								position: 'top-center'
							})
							setTimeout(() => {
								window.location.href = '/'
							}, 3000)
						}
					}
				})
			} catch (error) {
				const errorMessage =
					error instanceof Error ? error.message : 'Error Desconocido'
				toast.error(getErrorMessage(errorMessage, 'es'))
			}
		}
	}

	return (
		<DropdownMenu>
			<Toaster />
			<DropdownMenuTrigger asChild className='flex justify-start p-1 h-12'>
				<Button variant='ghost'>
					<UserAvatar session={session} />
					<div className='flex flex-col text-left'>
						<span className='font-bold'>{session.user?.name}</span>
						<span>{session.user?.email}</span>
					</div>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56' align='start'>
				<DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
				<DropdownMenuGroup>
					{filteredLinks.map((link) => (
						<DropdownMenuItem
							key={link.href}
							onClick={() => (window.location.href = link.href)}
						>
							{link.label}
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>Equipo</DropdownMenuItem>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>Invitar usuarios</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuItem>Email</DropdownMenuItem>
								<DropdownMenuItem>Mensaje</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Más...</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
					<DropdownMenuItem>
						Nuevo equipo
						{/* <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut> */}
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={clientLogout()}>
					Cerrar sesión
					{/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
