'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';

export default function Navbar() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#0d4d4d] px-6 py-4 z-50">
      <div className="mx-auto max-w-7xl">
        <div className="bg-[#f5f1e8] rounded-[50px] px-8 py-4 flex items-center justify-between shadow-lg">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-[#0d4d4d]">
              <div className="text-2xl font-bold leading-tight">
                <span className="font-semibold">LandJobPlatform</span>
              </div>
              <div className="text-xs tracking-wide">Des talents RH à portée de clic</div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/rh"
              className="text-[#0d4d4d] text-sm font-medium hover:text-gray-600 transition-colors"
            >
              Trouver un RH
            </Link>

            {isLoading ? (
              <span className="text-[#0d4d4d]/60 text-sm">Chargement...</span>
            ) : session ? (
              <>
                <Link
                  href="/rh/create"
                  className="text-[#0d4d4d] text-sm font-medium hover:text-gray-600 transition-colors"
                >
                  Devenir RH
                </Link>

                <Link
                  href="/dashboard"
                  className="text-[#0d4d4d] text-sm font-medium hover:text-gray-600 transition-colors"
                >
                  Dashboard
                </Link>

                <Link
                  href="/admin"
                  className="text-[#0d4d4d] text-sm font-medium hover:text-gray-600 transition-colors"
                >
                  Admin
                </Link>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="text-[#0d4d4d] text-sm font-medium hover:text-gray-600 transition-colors"
              >
                Connexion
              </Link>
            )}
          </nav>

          {/* CTA Button */}
          {isLoading ? null : session ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#0d4d4d]/70 hidden md:block">
                {session.user?.name || session.user?.email}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-destructive hover:bg-destructive/90 text-white px-6 py-2 rounded-md font-semibold transition-colors"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <Button asChild className="bg-[#ffd700] hover:bg-[#ffed4e] text-black px-6 py-2 rounded-md font-semibold transition-colors">
              <Link href="/auth/join">Inscription</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
