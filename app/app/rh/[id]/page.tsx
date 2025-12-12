'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Script from 'next/script';

type RHProfile = {
  id: string;
  bio: string | null;
  expertise: string[];
  priceRange: string | null;
  calendlyLink: string | null;
  isActive: boolean;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    createdAt: Date;
  };
  _count?: {
    consultations: number;
    favorites: number;
  };
};

const EXPERTISE_LABELS: Record<string, string> = {
  RECRUITMENT: 'Recrutement',
  TALENT_ACQUISITION: 'Acquisition de talents',
  HR_CONSULTING: 'Conseil RH',
  COACHING: 'Coaching',
  TRAINING: 'Formation',
};

const PRICE_LABELS: Record<string, string> = {
  '0-50': '0-50€/h',
  '50-100': '50-100€/h',
  '100-150': '100-150€/h',
  '150-200': '150-200€/h',
  '200+': '200€+/h',
};


export default function RHProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [profile, setProfile] = useState<RHProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);
  const [packages, setPackages] = useState<any[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const rhId = params?.id as string;

  // Charger le profil RH
  useEffect(() => {
    if (!rhId) return;

    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/rh/${rhId}`);
        const data = await response.json();

        if (!response.ok) {
          toast.error(data.error || 'Profil non trouvé');
          router.push('/rh');
          return;
        }

        setProfile(data.data);
      } catch (error) {
        console.error('Erreur:', error);
        toast.error('Erreur lors du chargement du profil');
        router.push('/rh');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [rhId, router]);

  // Vérifier si le profil est en favoris
  useEffect(() => {
    if (!session || !rhId) return;

    const checkFavorite = async () => {
      try {
        const response = await fetch(`/api/favorites/check/${rhId}`);
        const data = await response.json();
        if (response.ok) {
          setIsFavorite(data.isFavorite);
        }
      } catch (error) {
        console.error('Erreur vérification favoris:', error);
      }
    };

    checkFavorite();
  }, [session, rhId]);

  // Charger les packages du profil RH
  useEffect(() => {
    if (!rhId) return;

    const fetchPackages = async () => {
      try {
        const response = await fetch(`/api/packages?rhProfileId=${rhId}`);
        const data = await response.json();
        if (response.ok && data.data) {
          setPackages(data.data);
          // Par défaut, sélectionner le dernier package (le plus cher généralement)
          if (data.data.length > 0) {
            setActiveTabIndex(data.data.length - 1);
          }
        }
      } catch (error) {
        console.error('Erreur chargement packages:', error);
      }
    };

    fetchPackages();
  }, [rhId]);

  // Initialiser Calendly quand le script est chargé
  useEffect(() => {
    if (calendlyLoaded && profile?.calendlyLink && typeof window !== 'undefined') {
      const Calendly = (window as any).Calendly;
      if (Calendly) {
        Calendly.initInlineWidget({
          url: profile.calendlyLink,
          parentElement: document.getElementById('calendly-embed'),
          prefill: {},
          utm: {},
        });

        // Écouter les événements Calendly
        const handleCalendlyEvent = (e: MessageEvent) => {
          if (e.data.event && e.data.event.indexOf('calendly') === 0) {
            // Un événement a été déclenché (ex: calendly.event_scheduled)
            if (e.data.event === 'calendly.event_scheduled') {
              // Logger la consultation
              logConsultation();
            }
          }
        };

        window.addEventListener('message', handleCalendlyEvent);

        // Cleanup
        return () => {
          window.removeEventListener('message', handleCalendlyEvent);
        };
      }
    }
  }, [calendlyLoaded, profile]);

  // Fonction pour logger une consultation
  const logConsultation = async () => {
    if (!session || !rhId) {
      console.log('Non connecté ou pas de rhId');
      return;
    }

    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rhProfileId: rhId }),
      });

      if (response.ok) {
        console.log('Consultation enregistrée avec succès');
        toast.success('Consultation enregistrée !');
      }
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la consultation:', error);
    }
  };

  // Toggle favoris
  const handleToggleFavorite = async () => {
    if (!session) {
      toast.error('Vous devez être connecté pour ajouter aux favoris');
      router.push('/auth/login');
      return;
    }

    setFavoriteLoading(true);

    try {
      if (isFavorite) {
        // Retirer des favoris
        const response = await fetch(`/api/favorites/${rhId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setIsFavorite(false);
          toast.success('Retiré des favoris');
        } else {
          toast.error('Erreur lors du retrait des favoris');
        }
      } else {
        // Ajouter aux favoris
        const response = await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rhProfileId: rhId }),
        });

        if (response.ok) {
          setIsFavorite(true);
          toast.success('Ajouté aux favoris');
        } else {
          toast.error('Erreur lors de l\'ajout aux favoris');
        }
      }
    } catch (error) {
      console.error('Erreur toggle favoris:', error);
      toast.error('Une erreur est survenue');
    } finally {
      setFavoriteLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0d4d4d]"></div>
          <p className="mt-4 text-gray-600">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <>
      {/* Script Calendly */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={() => setCalendlyLoaded(true)}
      />
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0d4d4d] to-[#0a3d3d] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/rh"
            className="inline-flex items-center text-sm text-white/90 hover:text-white mb-4 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Retour à la liste
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne gauche - Info profil */}
          <div className="lg:col-span-2 space-y-6">
            {/* Carte profil */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              {/* Header avec photo et nom */}
              <div className="flex items-start space-x-6 mb-6">
                <div className="flex-shrink-0">
                  {profile.user.image ? (
                    <img
                      src={profile.user.image}
                      alt={profile.user.name || 'Profile'}
                      className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-[#0d4d4d] flex items-center justify-center text-white font-bold text-3xl border-4 border-gray-200">
                      {profile.user.name?.charAt(0).toUpperCase() ||
                        profile.user.email.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-[#0d4d4d]">
                        {profile.user.name || 'Professionnel RH'}
                      </h1>
                      {profile.priceRange && (
                        <p className="mt-1 text-lg font-semibold text-[#ffd700]">
                          {PRICE_LABELS[profile.priceRange] || profile.priceRange}
                        </p>
                      )}
                    </div>

                    {/* Bouton favoris */}
                    <button
                      onClick={handleToggleFavorite}
                      disabled={favoriteLoading}
                      className={`p-2 rounded-full transition-colors ${
                        isFavorite
                          ? 'bg-red-100 text-red-600 hover:bg-red-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      } disabled:opacity-50`}
                      title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                    >
                      <svg
                        className="w-6 h-6"
                        fill={isFavorite ? 'currentColor' : 'none'}
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
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center space-x-6 mt-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>
                        {profile._count?.consultations || 0} consultation
                        {(profile._count?.consultations || 0) !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-5 h-5"
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
                      <span>
                        {profile._count?.favorites || 0} favori
                        {(profile._count?.favorites || 0) !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expertises */}
              {profile.expertise && profile.expertise.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-sm font-semibold text-[#0d4d4d] uppercase tracking-wide mb-3">
                    Domaines d'expertise
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {profile.expertise.map((exp) => (
                      <span
                        key={exp}
                        className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-[#c9d5c0] text-[#0d4d4d]"
                      >
                        {EXPERTISE_LABELS[exp] || exp}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Bio */}
              <div>
                <h2 className="text-sm font-semibold text-[#0d4d4d] uppercase tracking-wide mb-3">
                  À propos
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {profile.bio || 'Aucune description disponible'}
                </p>
              </div>
            </div>

            {/* Section Packages */}
            {packages.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Tabs Header */}
                <div className="flex border-b border-gray-200">
                  {packages.map((pkg, index) => (
                    <button
                      key={pkg.id}
                      onClick={() => setActiveTabIndex(index)}
                      className={`flex-1 px-6 py-4 text-center font-medium transition-colors capitalize ${
                        activeTabIndex === index
                          ? 'text-[#0d4d4d] border-b-2 border-[#0d4d4d] bg-gray-50'
                          : 'text-gray-600 hover:text-[#0d4d4d] hover:bg-gray-50'
                      }`}
                    >
                      {pkg.name}
                    </button>
                  ))}
                </div>

                {/* Package Content */}
                {packages[activeTabIndex] && (
                  <div className="p-8">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-[#0d4d4d] mb-2">
                        {packages[activeTabIndex].title}
                      </h3>
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-4xl font-bold text-[#0d4d4d]">
                          {packages[activeTabIndex].price} €
                        </span>
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </button>
                      </div>
                      <p className="text-gray-700 mb-4">
                        {packages[activeTabIndex].description}
                      </p>
                    </div>

                    {/* Delivery Time */}
                    <div className="flex items-center gap-2 mb-6 text-sm text-gray-700">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Livraison en {packages[activeTabIndex].deliveryTime}</span>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                      {packages[activeTabIndex].features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <svg
                            className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button className="w-full bg-[#0d4d4d] hover:bg-[#0a3d3d] text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                        Continuer
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                      <button className="w-full border-2 border-gray-300 hover:border-[#0d4d4d] text-[#0d4d4d] font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                        Contactez-moi
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Colonne droite - Calendly */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-4 border border-gray-100">
              <h2 className="text-xl font-bold text-[#0d4d4d] mb-4">
                Réserver une consultation
              </h2>

              {profile.calendlyLink ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Choisissez un créneau qui vous convient pour planifier votre consultation.
                  </p>

                  {/* Embed Calendly */}
                  <div
                    id="calendly-embed"
                    className="rounded-xl overflow-hidden"
                    style={{ minHeight: '630px' }}
                  >
                    {!calendlyLoaded && (
                      <div className="flex items-center justify-center h-full p-8">
                        <div className="text-center">
                          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#0d4d4d]"></div>
                          <p className="mt-2 text-sm text-gray-600">Chargement...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <p className="mt-4 text-sm text-gray-600">
                    Aucun lien de réservation disponible
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
