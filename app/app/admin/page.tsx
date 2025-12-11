'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface AdminRHProfile {
  id: string;
  bio: string | null;
  expertise: string[];
  priceRange: string | null;
  calendlyLink: string | null;
  isActive: boolean;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
}

type StatusFilter = 'pending' | 'active' | 'all';

const STATUS_OPTIONS: Array<{ value: StatusFilter; label: string }> = [
  { value: 'pending', label: 'En attente' },
  { value: 'active', label: 'Actifs' },
  { value: 'all', label: 'Tous' },
];

export default function AdminPanelPage() {
  const router = useRouter();
  const { status } = useSession();

  const [profiles, setProfiles] = useState<AdminRHProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('pending');
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [stats, setStats] = useState({ pending: 0, active: 0, total: 0 });

  useEffect(() => {
    if (status === 'unauthenticated') {
      toast.error('Vous devez être connecté');
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchProfiles();
    }
  }, [status, statusFilter, searchTerm]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchStats();
    }
  }, [status]);

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();

    if (statusFilter === 'pending') {
      params.append('isActive', 'false');
    } else if (statusFilter === 'active') {
      params.append('isActive', 'true');
    } else {
      params.append('isActive', 'all');
    }

    if (searchTerm.trim()) {
      params.append('search', searchTerm.trim());
    }

    return params;
  }, [statusFilter, searchTerm]);

  const fetchProfiles = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/rh?${queryParams.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors du chargement des profils');
      }

      setProfiles(data.data || []);
    } catch (error: any) {
      console.error('Erreur lors du chargement des profils:', error);
      toast.error(error.message || 'Impossible de charger les profils');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const [pendingRes, activeRes] = await Promise.all([
        fetch('/api/rh?isActive=false'),
        fetch('/api/rh?isActive=true'),
      ]);

      const pendingData = await pendingRes.json();
      const activeData = await activeRes.json();

      if (!pendingRes.ok || !activeRes.ok) {
        throw new Error('Erreur lors du chargement des statistiques');
      }

      const pendingCount = pendingData.count || pendingData.data?.length || 0;
      const activeCount = activeData.count || activeData.data?.length || 0;

      setStats({
        pending: pendingCount,
        active: activeCount,
        total: pendingCount + activeCount,
      });
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
      toast.error('Impossible de charger les statistiques');
    }
  };

  const toggleProfileStatus = async (profileId: string, isActive: boolean) => {
    try {
      setUpdatingId(profileId);
      const response = await fetch(`/api/rh/${profileId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la mise à jour');
      }

      toast.success(
        !isActive ? 'Profil activé avec succès' : 'Profil désactivé avec succès'
      );

      setProfiles((prev) =>
        prev.map((profile) =>
          profile.id === profileId
            ? { ...profile, isActive: !isActive }
            : profile
        )
      );

      fetchStats();
    } catch (error: any) {
      console.error('Erreur lors du changement de statut:', error);
      toast.error(error.message || 'Impossible de mettre à jour le profil');
    } finally {
      setUpdatingId(null);
    }
  };

  const renderStatusBadge = (isActive: boolean) => (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
        isActive
          ? 'bg-green-100 text-green-800'
          : 'bg-amber-100 text-amber-800'
      }`}
    >
      {isActive ? 'Actif' : 'En attente'}
    </span>
  );

  const renderExpertise = (expertise: string[]) => {
    if (!expertise.length) return <span className="text-gray-500">Non renseigné</span>;

    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {expertise.map((item) => (
          <span
            key={item}
            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700"
          >
            {item.replace('_', ' ')}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase font-semibold text-blue-600">Administration</p>
              <h1 className="text-3xl font-extrabold text-gray-900 mt-1">Panel Admin</h1>
              <p className="text-sm text-gray-600 mt-2">
                Validez les nouveaux profils RH et gérez le statut d'activation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="text-xs text-blue-700 font-medium">Profils en attente</p>
                <p className="text-2xl font-bold text-blue-900">{stats.pending}</p>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="text-xs text-green-700 font-medium">Profils actifs</p>
                <p className="text-2xl font-bold text-green-900">{stats.active}</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-xs text-gray-700 font-medium">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="w-full lg:max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recherche par nom
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ex: Julie, Paul, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Statut
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                  className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={fetchProfiles}
                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 transition-colors font-medium"
              >
                Rafraîchir
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Résultats</p>
              <p className="text-sm text-gray-500">{profiles.length} profil(s) trouvé(s)</p>
            </div>
            <div className="text-sm text-gray-500">Filtre : {STATUS_OPTIONS.find((o) => o.value === statusFilter)?.label}</div>
          </div>

          {isLoading ? (
            <div className="p-6">
              <div className="grid gap-4 md:grid-cols-2">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="border rounded-lg p-4 animate-pulse bg-gray-50"></div>
                ))}
              </div>
            </div>
          ) : profiles.length === 0 ? (
            <div className="p-8 text-center text-gray-600">
              <p className="font-medium">Aucun profil trouvé</p>
              <p className="text-sm text-gray-500 mt-1">
                Ajustez vos filtres ou vérifiez si de nouveaux profils sont en attente.
              </p>
            </div>
          ) : (
            <div className="p-6 grid gap-4 md:grid-cols-2">
              {profiles.map((profile) => (
                <div
                  key={profile.id}
                  className="border rounded-lg p-5 bg-white shadow-sm flex flex-col gap-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-700 truncate">
                        {profile.user.name || 'Nom non renseigné'}
                      </p>
                      <p className="text-sm text-gray-500 truncate">{profile.user.email}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Créé le {new Date(profile.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    {renderStatusBadge(profile.isActive)}
                  </div>

                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Tarif :</span>
                      <span className="text-gray-600">{profile.priceRange || 'Non renseigné'}</span>
                    </div>
                    <div>
                      <p className="font-medium">Expertises</p>
                      {renderExpertise(profile.expertise)}
                    </div>
                    {profile.calendlyLink && (
                      <div className="break-words">
                        <p className="font-medium">Lien Calendly</p>
                        <a
                          href={profile.calendlyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 text-sm"
                        >
                          {profile.calendlyLink}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => toggleProfileStatus(profile.id, profile.isActive)}
                      disabled={updatingId === profile.id}
                      className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors flex-1 ${
                        profile.isActive
                          ? 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
                          : 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                      } disabled:opacity-60 disabled:cursor-not-allowed`}
                    >
                      {updatingId === profile.id
                        ? 'Mise à jour...'
                        : profile.isActive
                        ? 'Désactiver'
                        : 'Activer'}
                    </button>
                    <button
                      onClick={() => router.push(`/rh/${profile.id}`)}
                      className="px-4 py-2 rounded-md text-sm font-semibold bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200"
                    >
                      Voir le profil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
