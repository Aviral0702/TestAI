'use client';

import { useSession } from 'next-auth/react';
import { signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import AuthButtons from './AuthButtons';

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false); 
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 bg-black/95 border-border/40 border-b bg-opacity-50 backdrop-blur supports-[backdrop-filter]:bg-black/60 text-white shadow-lg rounded-lg px-6 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-2xl font-bold tracking-wide">
            TestifAI
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-gray-300 transition ${
                pathname === link.href ? 'border-b-2 border-white' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}

          {session ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="hover:text-gray-300 transition"
              >
                {session.user?.name || 'Profile'}
              </button>
              {dropdownOpen && (
                <div
                  onMouseLeave={() => setDropdownOpen(false)}
                  className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg"
                >
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      signOut();
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <AuthButtons />
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-2 text-white hover:bg-gray-700 transition ${
                pathname === link.href ? 'bg-gray-800' : ''
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {session ? (
            <>
              <Link
                href="/profile"
                className="block px-4 py-2 text-white hover:bg-gray-700 transition"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  signOut();
                }}
                className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setMenuOpen(false);
                signIn('google');
              }}
              className="block px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md transition mx-4"
            >
              Sign In
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
