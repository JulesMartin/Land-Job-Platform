'use client';

import { useState, useEffect } from 'react';
import RHCard from '@/components/RHCard';
import toast from 'react-hot-toast';

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
  };
  _count?: {
    consultations: number;
    favorites: number;
  };
};

const EXPERTISE_OPTIONS = [
  { value: 'RECRUITMENT', label: 'Recrutement' },
  { value: 'TALENT_ACQUISITION', label: 'Acquisition de talents' },
  { value: 'HR_CONSULTING', label: 'Conseil RH' },
  { value: 'COACHING', label: 'Coaching' },
  { value: 'TRAINING', label: 'Formation' },
];

const PRICE_RANGES = [
  { value: '0-50', label: '0-50€ / heure' },
  { value: '50-100', label: '50-100€ / heure' },
  { value: '100-150', label: '100-150€ / heure' },
  { value: '150-200', label: '150-200€ / heure' },
  { value: '200+', label: '200€+ / heure' },
];

export default function RHListingPage() {
  const [profiles, setProfiles] = useState<RHProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState('');

  // Fonction pour charger les profils RH
  const fetchProfiles = async () => {
    setIsLoading(true);

    try {
      // Construire les paramètres de requête
      const params = new URLSearchParams();

      if (selectedExpertise.length > 0) {
        params.append('expertise', selectedExpertise.join(','));
      }

      if (selectedPriceRange) {
        params.append('priceRange', selectedPriceRange);
      }

      if (searchTerm.trim()) {
        params.append('search', searchTerm.trim());
      }

      // Toujours récupérer uniquement les profils actifs
      params.append('isActive', 'true');

      const response = await fetch(`/api/rh?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Erreur lors du chargement des profils');
        return;
      }

      setProfiles(data.data || []);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Une erreur est survenue lors du chargement des profils');
    } finally {
      setIsLoading(false);
    }
  };

  // Charger les profils au montage et à chaque changement de filtre
  useEffect(() => {
    fetchProfiles();
  }, [selectedExpertise, selectedPriceRange, searchTerm]);

  // Gestion des filtres d'expertise
  const handleExpertiseToggle = (expertise: string) => {
    setSelectedExpertise((prev) =>
      prev.includes(expertise)
        ? prev.filter((e) => e !== expertise)
        : [...prev, expertise]
    );
  };

  // Réinitialiser tous les filtres
  const handleResetFilters = () => {
    setSelectedExpertise([]);
    setSelectedPriceRange('');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Trouver un professionnel RH
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Parcourez notre réseau de professionnels RH et réservez une consultation
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar avec filtres */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Filtres</h2>
                {(selectedExpertise.length > 0 ||
                  selectedPriceRange ||
                  searchTerm) && (
                  <button
                    onClick={handleResetFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Réinitialiser
                  </button>
                )}
              </div>

              {/* Recherche par nom */}
              <div className="mb-6">
                <label
                  htmlFor="search"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Rechercher par nom
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nom du professionnel..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Filtre par expertise */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Domaines d'expertise
                </h3>
                <div className="space-y-2">
                  {EXPERTISE_OPTIONS.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedExpertise.includes(option.value)}
                        onChange={() => handleExpertiseToggle(option.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filtre par prix */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Tarif horaire
                </h3>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Tous les tarifs</option>
                  {PRICE_RANGES.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </aside>

          {/* Listing des profils */}
          <main className="lg:col-span-3">
            {/* Compteur de résultats */}
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                {isLoading ? (
                  'Chargement...'
                ) : (
                  <>
                    <span className="font-semibold text-gray-900">
                      {profiles.length}
                    </span>{' '}
                    professionnel{profiles.length !== 1 ? 's' : ''} RH trouvé
                    {profiles.length !== 1 ? 's' : ''}
                  </>
                )}
              </p>
            </div>

            {/* Grid de profils */}
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                  <p className="mt-4 text-gray-600">
                    Chargement des profils...
                  </p>
                </div>
              </div>
            ) : profiles.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
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
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Aucun professionnel trouvé
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Essayez de modifier vos critères de recherche
                </p>
                {(selectedExpertise.length > 0 ||
                  selectedPriceRange ||
                  searchTerm) && (
                  <button
                    onClick={handleResetFilters}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
                  >
                    Réinitialiser les filtres
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profiles.map((profile) => (
                  <RHCard key={profile.id} profile={profile} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
