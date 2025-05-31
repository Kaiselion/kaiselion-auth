import * as React from 'react'
import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Switch } from '@/components/ui/switch'

export default function ModeToggle() {
	const [theme, setThemeState] = React.useState<
		'theme-light' | 'dark' | 'system'
	>(() => {
		if (typeof document !== 'undefined') {
			return document.documentElement.classList.contains('dark')
				? 'dark'
				: 'theme-light'
		}
		return 'theme-light'
	})

	React.useEffect(() => {
		const isDarkMode = document.documentElement.classList.contains('dark')
		setThemeState(isDarkMode ? 'dark' : 'theme-light')
	}, [])

	React.useEffect(() => {
		const isDark =
			theme === 'dark' ||
			(theme === 'system' &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		document.documentElement.classList[isDark ? 'add' : 'remove']('dark')
	}, [theme])

	return (
		<Button
			className='rounded-full'
			variant='outline'
			size='icon'
			onClick={() => setThemeState(theme === 'dark' ? 'theme-light' : 'dark')}
		>
			<Sun className='h-8 w-8 rotate-0 scale-100 dark:-rotate-90 dark:scale-0 transition-all' />
			<Moon className='absolute h-8 w-8 rotate-90 scale-0 dark:rotate-0 dark:scale-100 dark:text-primary transition-all' />
			<span className='sr-only'>Toggle theme</span>
		</Button>

		// <div className='flex items-center space-x-2'>
		// 	<div className='flex items-center gap-2'>
		// 		<Switch
		// 			id='theme-toggle'
		// 			checked={theme === 'dark'}
		// 			onCheckedChange={(checked) =>
		// 				setThemeState(checked ? 'dark' : 'theme-light')
		// 			}
		// 			aria-label='Toggle theme'
		// 		>
		// 			<Sun className={`h-4 w-4 ${theme === 'dark' ? 'hidden' : 'block'}`} />
		// 			<Moon
		// 				className={`h-4 w-4 ${theme === 'dark' ? 'block' : 'hidden'}`}
		// 			/>
		// 		</Switch>
		// 	</div>
		// </div>
	)
}
