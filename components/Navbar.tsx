'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton, SignInButton, useUser } from '@clerk/nextjs'
import { Menu, X, Wine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { navRoutes } from '@/lib/constants'

const Navbar = () => {
  const { isSignedIn } = useUser()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav className="bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Wine className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-semibold text-primary">Sip & Slice</span>
            </Link>
          </div>
          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navRoutes.map(({ path, name }) => (
              <Link
                key={path}
                href={path}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                  pathname === path
                    ? 'border-primary text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
              >
                {name}
              </Link>
            ))}
          </div>
          {/* Authentication and mobile menu button */}
          <div className="flex items-center">
            <div className="hidden md:flex md:items-center md:ml-6 md:space-x-4">
              {isSignedIn ? (
                <UserButton />
              ) : (
                <SignInButton mode="modal">
                  <Button size="sm" variant="default">
                    Sign In
                  </Button>
                </SignInButton>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden ml-4">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground"
                aria-expanded="false"
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1 px-4 sm:px-6 lg:px-8">
            {navRoutes.map(({ path, name }) => (
              <Link
                key={path}
                href={path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === path
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {name}
              </Link>
            ))}
            <div className="pt-4">
              {isSignedIn ? (
                <div className="flex items-center px-3">
                  <UserButton />
                  <span className="ml-3 text-sm text-muted-foreground">Account</span>
                </div>
              ) : (
                <SignInButton mode="modal">
                  <Button variant="default" className="w-full mt-2">
                    Sign In
                  </Button>
                </SignInButton>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
