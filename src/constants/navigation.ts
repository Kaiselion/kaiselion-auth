import type { NavLink } from '@/types/navigation'

export const LINKS: NavLink[] = [
  { href: '/', label: 'Inicio', showAlways: true },
  {
    href: '/login',
    label: 'Iniciar sesión',
    showOnlyWhenLoggedOut: true
  },
  {
    href: '/register',
    label: 'Registrarse',
    showOnlyWhenLoggedOut: true
  },
  {
    href: '/dashboard',
    label: 'Panel de control',
    showOnlyWhenLoggedIn: true
  },
  {
    href: '/forgotpassword',
    label: 'Recuperar contraseña',
    showOnlyWhenLoggedOut: true
  },
  {
    href: '/logout',
    label: 'Cerrar sesión',
    showOnlyWhenLoggedIn: true
  }
] as const
