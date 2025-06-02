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
import { authClient } from '@/lib/auth-client'

interface MobileNavProps {
  session: any
}

export default function MobileNav({ session }: MobileNavProps) {
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
          <Menu className='h-6 w-6' />
          <span className='sr-only'>Abrir menú</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='right' className='w-64 [&>button]:hidden'>
        <SheetHeader className='flex flex-row h-14 items-center content-center justify-between text-xl border-b'>
          <SheetTitle>Menu</SheetTitle>
          <SheetClose asChild>
            <Button variant='ghost' size='icon'>
              <X className='h-6 w-6' />
              <span className='sr-only'>Cerrar menú</span>
            </Button>
          </SheetClose>
        </SheetHeader>
        <nav className='flex flex-col gap-4 px-4 py-2'>
          {filteredLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className='text-lg font-semibold hover:text-secondary transition-colors'
              onClick={async (e) => {
                if (link.href.includes('/logout')) {
                  e.preventDefault()
                  await authClient.signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        window.location.href = '/login'
                      }
                    }
                  })
                }
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
