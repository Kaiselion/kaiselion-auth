import type { NavLink } from '@/types/navigation'

export const LINKS: NavLink[] = [
	{ href: '/', label: 'Inicio', showAlways: true },
	{
		href: '/login',
		label: 'Iniciar sesión',
		showOnlyWhenLoggedOut: true
	},
	{
		href: '/dashboard',
		label: 'Panel de control',
		showOnlyWhenLoggedIn: true
	},
	{
		href: '/profile',
		label: 'Perfil',
		showOnlyWhenLoggedIn: true
	},
	{
		href: '/register',
		label: 'Registrarse',
		showOnlyWhenLoggedOut: true
	},
	{
		href: '/forgotpassword',
		label: 'Recuperar contraseña',
		showOnlyWhenLoggedOut: true
	}
] as const
