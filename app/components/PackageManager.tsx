'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface Package {
  id: string;
  name: string;
  title: string;
  price: string;
  description: string;
  deliveryTime: string;
  features: string[];
  order: number;
  isActive: boolean;
}

interface PackageManagerProps {
  rhProfileId: string;
}

const PACKAGE_TEMPLATES = [
  {
    name: 'basique',
    title: 'Entretien ciblé',
    price: '199.00',
    description: 'Consultation individuelle pour une question RH précise.',
    deliveryTime: '48h',
    features: [
      '30 minutes de consultation en direct',
      'Réponse à une problématique spécifique',
      'Support par email pendant 7 jours',
    ],
  },
  {
    name: 'standard',
    title: 'Accompagnement standard',
    price: '449.00',
    description: 'Consultation approfondie avec suivi et révision de votre projet RH.',
    deliveryTime: '5 jours',
    features: [
      '60 minutes de consultation en direct',
      'Révision de projet',
      'Recommandations personnalisées',
      'Support par email pendant 14 jours',
    ],
  },
  {
    name: 'premium',
    title: 'Grande échelle',
    price: '715.80',
    description: 'Accompagnement complet avec stratégie RH sur mesure et suivi prolongé.',
    deliveryTime: '10 jours',
    features: [
      '90 minutes de consultation en direct',
      'Révision de projet',
      'Choix de la technologie',
      'Support par email pendant 30 jours',
    ],
  },
];

export default function PackageManager({ rhProfileId }: PackageManagerProps) {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPackages();
  }, [rhProfileId]);

  const fetchPackages = async () => {
    try {
      const response = await fetch(`/api/packages?rhProfileId=${rhProfileId}`);
      const data = await response.json();

      if (response.ok) {
        setPackages(data.data || []);
      } else {
        toast.error(data.error || 'Erreur lors du chargement des packages');
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors du chargement des packages');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPackage = (template: typeof PACKAGE_TEMPLATES[0]) => {
    const newPackage: Partial<Package> = {
      ...template,
      order: packages.length + 1,
    };
    setEditingPackage(newPackage as Package);
    setIsModalOpen(true);
  };

  const handleEditPackage = (pkg: Package) => {
    setEditingPackage(pkg);
    setIsModalOpen(true);
  };

  const handleDeletePackage = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce package ?')) {
      return;
    }

    try {
      const response = await fetch(`/api/packages/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Package supprimé avec succès');
        fetchPackages();
      } else {
        const data = await response.json();
        toast.error(data.error || 'Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleSavePackage = async (pkg: Partial<Package>) => {
    try {
      let response;

      if (pkg.id) {
        // Mise à jour
        response = await fetch(`/api/packages/${pkg.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pkg),
        });
      } else {
        // Création
        response = await fetch('/api/packages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...pkg,
            rhProfileId,
          }),
        });
      }

      const data = await response.json();

      if (response.ok) {
        toast.success(pkg.id ? 'Package mis à jour' : 'Package créé');
        setIsModalOpen(false);
        setEditingPackage(null);
        fetchPackages();
      } else {
        toast.error(data.error || 'Erreur lors de la sauvegarde');
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[#0d4d4d]">Mes Packages</h3>
        {packages.length < 4 && (
          <div className="text-sm text-gray-600">
            {packages.length}/4 packages actifs
          </div>
        )}
      </div>

      {/* Liste des packages existants */}
      {packages.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-bold text-[#0d4d4d]">{pkg.title}</h4>
                  <p className="text-sm text-gray-600 capitalize">{pkg.name}</p>
                </div>
                <span className="text-lg font-bold text-[#0d4d4d]">{pkg.price} €</span>
              </div>
              <p className="text-sm text-gray-700 mb-3 line-clamp-2">{pkg.description}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEditPackage(pkg)}
                  className="px-4 py-2 bg-[#0d4d4d] text-white text-sm rounded-lg hover:bg-[#0a3d3d] transition-colors"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDeletePackage(pkg.id)}
                  className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Ajouter des packages depuis les templates */}
      {packages.length < 4 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">
            Ajouter un package :
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PACKAGE_TEMPLATES.map((template) => (
              <button
                key={template.name}
                onClick={() => handleAddPackage(template)}
                className="bg-gradient-to-br from-white to-[#c9d5c0]/20 border-2 border-[#c9d5c0] rounded-xl p-4 text-left hover:shadow-lg transition-all"
              >
                <h5 className="font-bold text-[#0d4d4d] mb-1">{template.title}</h5>
                <p className="text-sm text-gray-600 capitalize mb-2">{template.name}</p>
                <p className="text-lg font-bold text-[#0d4d4d]">{template.price} €</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Modal d'édition */}
      {isModalOpen && editingPackage && (
        <PackageEditModal
          package={editingPackage}
          onSave={handleSavePackage}
          onClose={() => {
            setIsModalOpen(false);
            setEditingPackage(null);
          }}
        />
      )}
    </div>
  );
}

// Modal d'édition
function PackageEditModal({
  package: pkg,
  onSave,
  onClose,
}: {
  package: Partial<Package>;
  onSave: (pkg: Partial<Package>) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState(pkg);
  const [newFeature, setNewFeature] = useState('');

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...(formData.features || []), newFeature.trim()],
      });
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = [...(formData.features || [])];
    updatedFeatures.splice(index, 1);
    setFormData({ ...formData, features: updatedFeatures });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
        <h3 className="text-2xl font-bold text-[#0d4d4d] mb-6">
          {pkg.id ? 'Modifier le package' : 'Créer un package'}
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom du package
            </label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#0d4d4d] focus:outline-none"
              placeholder="basique, standard, premium..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titre affiché
            </label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#0d4d4d] focus:outline-none"
              placeholder="Entretien ciblé, Accompagnement standard..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prix (€)
            </label>
            <input
              type="text"
              value={formData.price || ''}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#0d4d4d] focus:outline-none"
              placeholder="199.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#0d4d4d] focus:outline-none"
              placeholder="Description du package..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Temps de livraison
            </label>
            <input
              type="text"
              value={formData.deliveryTime || ''}
              onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#0d4d4d] focus:outline-none"
              placeholder="48h, 5 jours, 10 jours..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prestations incluses
            </label>
            <div className="space-y-2 mb-3">
              {formData.features?.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="flex-1 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                    {feature}
                  </span>
                  <button
                    onClick={() => handleRemoveFeature(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#0d4d4d] focus:outline-none"
                placeholder="Ajouter une prestation..."
              />
              <button
                onClick={handleAddFeature}
                className="px-4 py-2 bg-[#c9d5c0] text-[#0d4d4d] rounded-lg hover:bg-[#b8c4b0] transition-colors"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t-2 border-gray-100">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-700 hover:text-gray-900 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={() => onSave(formData)}
            className="px-6 py-3 bg-[#ffd700] hover:bg-[#ffed4e] text-black rounded-lg font-semibold transition-colors"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
