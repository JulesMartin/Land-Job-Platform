'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';

export default function Navbar() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  return (
    <nav className="border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 gap-6">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-semibold">
              LJ
            </div>
            <div className="flex flex-col leading-tight">
              <Link href="/" className="text-xl font-semibold text-foreground">
                LandJobPlatform
              </Link>
              <span className="text-sm text-muted-foreground">Des talents RH à portée de clic</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm sm:text-base">
            <Link
              href="/rh"
              className="text-foreground/80 transition-colors hover:text-foreground"
            >
              Trouver un RH
            </Link>

            {isLoading ? (
              <div className="text-muted-foreground">Chargement...</div>
            ) : session ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/rh/create"
                  className="text-foreground/80 transition-colors hover:text-foreground"
                >
                  Devenir RH
                </Link>

                <Link
                  href="/dashboard"
                  className="text-foreground/80 transition-colors hover:text-foreground"
                >
                  Dashboard
                </Link>

                <Link
                  href="/admin"
                  className="text-foreground/80 transition-colors hover:text-foreground"
                >
                  Admin
                </Link>

                <div className="flex items-center gap-3 pl-3 border-l border-border/70">
                  <span className="text-sm text-muted-foreground">
                    {session.user?.name || session.user?.email}
                  </span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => signOut({ callbackUrl: '/' })}
                  >
                    Déconnexion
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/login"
                  className="text-foreground/80 transition-colors hover:text-foreground"
                >
                  Connexion
                </Link>

                <Button asChild size="sm">
                  <Link href="/auth/join">Inscription</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
