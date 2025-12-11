'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface ConsultationData {
  id: string;
  timestamp: string;
  rhProfile: {
    id: string;
    bio: string | null;
    expertise: string[];
    priceRange: string | null;
    calendlyLink: string | null;
    isActive: boolean;
    user: {
      id: string;
      name: string | null;
      email: string;
      image: string | null;
    };
  };
}

interface FavoriteData {
  id: string;
  createdAt: string;
  rhProfile: {
    id: string;
    bio: string | null;
    expertise: string[];
    priceRange: string | null;
    calendlyLink: string | null;
    isActive: boolean;
    user: {
      id: string;
      name: string | null;
      email: string;
      image: string | null;
    };
    _count: {
      consultations: number;
      favorites: number;
    };
  };
}

interface DashboardData {
  consultations: ConsultationData[];
  favorites: FavoriteData[];
  stats: {
    totalConsultations: number;
    totalFavorites: number;
  };
}

const EXPERTISE_LABELS: Record<string, string> = {
  RECRUITMENT: 'Recrutement',
  TALENT_ACQUISITION: 'Acquisition de talents',
  HR_CONSULTING: 'Conseil RH',
  COACHING: 'Coaching',
  TRAINING: 'Formation',
};

export default function UserDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      toast.error('Vous devez être connecté');
      router.push('/auth/login');
    }

    if (status === 'authenticated') {
      fetchDashboardData();
    }
  }, [status, router]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/dashboard/user/consultations');

      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
        return;
      }

      const errorText = await response.text();
      console.error(
        '[Dashboard] API error /api/dashboard/user/consultations',
        response.status,
        errorText
      );

      if (response.status === 404) {
        console.warn(
          '[Dashboard] Fallback: aggregating data from /api/consultations and /api/favorites'
        );

        const [consultationsRes, favoritesRes] = await Promise.all([
          fetch('/api/consultations'),
          fetch('/api/favorites'),
        ]);

        if (!consultationsRes.ok || !favoritesRes.ok) {
          const consultationsError = await consultationsRes.text();
          const favoritesError = await favoritesRes.text();
          throw new Error(
            `Erreur lors du fallback: consultations(${consultationsRes.status}) ${consultationsError}; favorites(${favoritesRes.status}) ${favoritesError}`
          );
        }

        const [consultationsData, favoritesData] = await Promise.all([
          consultationsRes.json(),
          favoritesRes.json(),
        ]);

        const consultations = consultationsData.data || [];
        const favorites = favoritesData.data || [];

        setDashboardData({
          consultations,
          favorites,
          stats: {
            totalConsultations: consultations.length,
            totalFavorites: favorites.length,
          },
        });
        return;
      }

      throw new Error(
        `Erreur lors de la récupération des données (${response.status}): ${errorText}`
      );
    } catch (err: any) {
      console.error('Erreur:', err);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFavorite = async (rhProfileId: string) => {
    try {
      const response = await fetch(`/api/favorites/${rhProfileId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erreur lors de la suppression');
      }

      toast.success('Retiré des favoris');
      await fetchDashboardData(); // Rafraîchir les données
    } catch (err: any) {
      console.error('Erreur:', err);
      toast.error(err.message);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  if (!dashboardData) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Mon Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Consultez votre historique et gérez vos favoris
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-12 w-12 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div className="ml-5">
                <div className="text-3xl font-bold text-gray-900">
                  {dashboardData.stats.totalConsultations}
                </div>
                <div className="text-sm text-gray-600">
                  Consultation{dashboardData.stats.totalConsultations > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-12 w-12 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <div className="ml-5">
                <div className="text-3xl font-bold text-gray-900">
                  {dashboardData.stats.totalFavorites}
                </div>
                <div className="text-sm text-gray-600">
                  Favori{dashboardData.stats.totalFavorites > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white shadow rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => {
                  const consultationsSection = document.getElementById('consultations');
                  consultationsSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-b-2 border-blue-500 text-blue-600 py-4 px-6 text-sm font-medium"
              >
                Historique des consultations
              </button>
              <button
                onClick={() => {
                  const favoritesSection = document.getElementById('favorites');
                  favoritesSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-6 text-sm font-medium"
              >
                Mes favoris
              </button>
            </nav>
          </div>

          {/* Consultations Section */}
          <div id="consultations" className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Historique des consultations
            </h2>
            {dashboardData.consultations.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  Aucune consultation
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Vous n'avez pas encore consulté de profil RH.
                </p>
                <div className="mt-6">
                  <Link
                    href="/rh"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Parcourir les profils RH
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {dashboardData.consultations.map((consultation) => (
                  <div
                    key={consultation.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="flex-shrink-0">
                          {consultation.rhProfile.user.image ? (
                            <img
                              src={consultation.rhProfile.user.image}
                              alt={consultation.rhProfile.user.name || 'RH'}
                              className="h-12 w-12 rounded-full"
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                              {consultation.rhProfile.user.name?.charAt(0) ||
                                consultation.rhProfile.user.email.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-900">
                            {consultation.rhProfile.user.name ||
                              consultation.rhProfile.user.email}
                          </h3>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {consultation.rhProfile.expertise.map((exp) => (
                              <span
                                key={exp}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {EXPERTISE_LABELS[exp] || exp}
                              </span>
                            ))}
                          </div>
                          {consultation.rhProfile.priceRange && (
                            <p className="mt-1 text-sm text-gray-600">
                              {consultation.rhProfile.priceRange}€ / heure
                            </p>
                          )}
                          <p className="mt-2 text-xs text-gray-500">
                            Consulté le{' '}
                            {new Date(consultation.timestamp).toLocaleDateString('fr-FR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                      <Link
                        href={`/rh/${consultation.rhProfile.id}`}
                        className="ml-4 inline-flex items-center px-3 py-1.5 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
                      >
                        Voir le profil
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Favorites Section */}
          <div id="favorites" className="p-6 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Mes favoris</h2>
            {dashboardData.favorites.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  Aucun favori
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Vous n'avez pas encore ajouté de profil RH en favoris.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dashboardData.favorites.map((favorite) => (
                  <div
                    key={favorite.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="flex-shrink-0">
                          {favorite.rhProfile.user.image ? (
                            <img
                              src={favorite.rhProfile.user.image}
                              alt={favorite.rhProfile.user.name || 'RH'}
                              className="h-10 w-10 rounded-full"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                              {favorite.rhProfile.user.name?.charAt(0) ||
                                favorite.rhProfile.user.email.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-medium text-gray-900 truncate">
                            {favorite.rhProfile.user.name || favorite.rhProfile.user.email}
                          </h3>
                          {favorite.rhProfile.priceRange && (
                            <p className="text-sm text-gray-600">
                              {favorite.rhProfile.priceRange}€ / heure
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => removeFavorite(favorite.rhProfile.id)}
                        className="ml-2 text-red-600 hover:text-red-800"
                        title="Retirer des favoris"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {favorite.rhProfile.expertise.slice(0, 2).map((exp) => (
                        <span
                          key={exp}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {EXPERTISE_LABELS[exp] || exp}
                        </span>
                      ))}
                      {favorite.rhProfile.expertise.length > 2 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                          +{favorite.rhProfile.expertise.length - 2}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span>
                        {favorite.rhProfile._count.consultations} consultation
                        {favorite.rhProfile._count.consultations > 1 ? 's' : ''}
                      </span>
                      <span>
                        {favorite.rhProfile._count.favorites} favori
                        {favorite.rhProfile._count.favorites > 1 ? 's' : ''}
                      </span>
                    </div>
                    <Link
                      href={`/rh/${favorite.rhProfile.id}`}
                      className="block w-full text-center px-3 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
                    >
                      Voir le profil
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
