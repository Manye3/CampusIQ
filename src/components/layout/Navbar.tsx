'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, GraduationCap, LogOut, User } from 'lucide-react';
import { useState, useCallback } from 'react';

const NAV_LINKS = [
  { label: 'Colleges', href: '/colleges' },
  { label: 'Compare', href: '/compare' },
  { label: 'Saved', href: '/saved' },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors"
            onClick={closeMenu}
          >
            <GraduationCap className="h-7 w-7" />
            <span className="text-xl font-heading font-bold tracking-tight">
              CampusIQ
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive(link.href)
                    ? 'text-indigo-600 font-semibold text-sm transition-colors'
                    : 'text-gray-600 hover:text-gray-900 text-sm transition-colors'
                }
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            {session?.user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name ?? 'User avatar'}
                      className="h-8 w-8 rounded-full object-cover ring-2 ring-indigo-100"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-indigo-600" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {session.user.name}
                  </span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={toggleMenu}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`block px-3 py-2 rounded-md text-sm ${
                  isActive(link.href)
                    ? 'text-indigo-600 font-semibold bg-indigo-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                } transition-colors`}
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-gray-100 pt-3 mt-2">
              {session?.user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-3 py-2">
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name ?? 'User avatar'}
                        className="h-8 w-8 rounded-full object-cover ring-2 ring-indigo-100"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <User className="h-4 w-4 text-indigo-600" />
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-700">
                      {session.user.name}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      signOut();
                      closeMenu();
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={closeMenu}
                  className="block px-3 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
