
'use client'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { Switch } from '@/components/ui/switch'

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }


    return (
        <Button
            variant='outline'
            size='icon'
            className='cursor-pointer'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
            {theme === 'dark' ? <Moon className='h-4 w-4' /> : <Sun className='h-4 w-4' />}
            <span className='sr-only'>Toggle theme</span>
        </Button>

        // <Switch
        //     checked={theme === 'light'}
        //     className='h-10 w-10 p-1 data-[state=checked]:bg-primary-80'
        //     aria-label='Toggle dark mode'
        //     onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        // />
    )
}

export default ThemeSwitcher


