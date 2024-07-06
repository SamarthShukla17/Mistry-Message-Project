'use client'

import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from 'react'


function Navbar() {

  const { data: session } = useSession()
  const user: User = session?.user as User
  const { setTheme } = useTheme()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <nav className='p-4 md:p-6 shadow-md'>
      <div className='conatiner mx-auto flex flex-col md:flex-row justify-between'>
        <a className="text-3xl font-bold mb-4 md:mb-0 dark:text-white light:text-black" href="#">Mistry Message</a>
        <div className='mr-4'>
          {
            session ? (
              <>
                <span className='mr-4 text-white'>Welcome, {user?.username} || {user?.email}</span>
                <Button className='w-full md:w-auto' onClick={() => signOut()}>Logout</Button>
              </>
            ) : (
              <Link href='/sign-in'>
                <Button className='w-10px md:w-auto mr-6 mt-1'>Login</Button>
              </Link>
            )
          }
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}

export default Navbar