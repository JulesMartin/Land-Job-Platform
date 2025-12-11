'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      toast.error('Vous devez être connecté');
      router.push('/auth/login');
      return;
    }

    if (status === 'authenticated') {
      checkUserProfile();
    }
  }, [status, router]);

  const checkUserProfile = async () => {
    try {
      setIsChecking(true);

      // Vérifier si l'utilisateur a un profil RH
      const response = await fetch('/api/dashboard/rh/stats');

      if (response.ok) {
        // L'utilisateur a un profil RH
        router.replace('/dashboard/rh');
      } else {
        // L'utilisateur n'a pas de profil RH
        router.replace('/dashboard/user');
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du profil:', error);
      // En cas d'erreur, rediriger vers le dashboard utilisateur par défaut
      router.replace('/dashboard/user');
    } finally {
      setIsChecking(false);
    }
  };

  // Afficher un loader pendant la redirection
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Chargement de votre dashboard...</p>
      </div>
    </div>
  );
}
