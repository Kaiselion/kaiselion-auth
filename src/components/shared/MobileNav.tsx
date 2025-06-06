import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/sheet'
import { LINKS } from '@/constants/navigation'
import { UserProfileDropDown } from '@/components/shared/UserProfileDropDown'
import type { Session } from '@/types/session'
import { UserAvatar } from '@/components/shared/UserAvatar'

export default function MobileNav({ session }: { session: Session | null }) {
	const filteredLinks = LINKS.filter((link) => {
		if (link.showAlways) return true
		if (session && link.showOnlyWhenLoggedIn) return true
		if (!session && link.showOnlyWhenLoggedOut) return true
		return false
	})

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='ghost' size='icon'>
					{/* <Menu className='h-6 w-6' /> */}
					{session ? (
						<UserAvatar session={session} />
					) : (
						<Menu className='h-6 w-6' />
					)}
					<span className='sr-only'>Abrir menú</span>
				</Button>
			</SheetTrigger>
			<SheetContent
				side='right'
				className='w-64 [&>button]:hidden rounded-l-2xl'
			>
				<SheetHeader className='flex flex-row h-14 items-center content-center justify-between text-xl border-b'>
					<SheetTitle>Menu</SheetTitle>
					<SheetClose asChild>
						<Button variant='ghost' size='icon'>
							<X className='h-6 w-6' />
							<span className='sr-only'>Cerrar menú</span>
						</Button>
					</SheetClose>
				</SheetHeader>

				{session ? (
					<div className='flex flex-col gap-4 px-4 py-2'>
						<UserProfileDropDown session={session} />
					</div>
				) : (
					<div className='flex flex-col gap-3 pt-4 px-6'>
						<Button className='w-full'>
							<a href='/login' className='w-full'>
								Iniciar Sesión
							</a>
						</Button>
						<Button variant='outline' className='w-full'>
							<a href='/register' className='w-full'>
								Registrarse
							</a>
						</Button>
					</div>
				)}

				{/* {session && (
					<div className='flex flex-col gap-4 px-4 py-2'>
						<UserProfileDropDown session={session} />
					</div>
				)} */}
				{/* <nav className='flex flex-col gap-4 px-4 py-2'>
					{filteredLinks.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className='text-lg font-semibold hover:text-secondary transition-colors'
						>
							{link.label}
						</a>
					))}
				</nav> */}
				<SheetFooter className='flex justify-end p-4'>
					{/* <UserProfileDropDown session={session}/> */}
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
