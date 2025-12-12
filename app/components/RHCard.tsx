import Link from "next/link";

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

type RHCardProps = {
  profile: RHProfile;
};

const EXPERTISE_LABELS: Record<string, string> = {
  RECRUITMENT: "Recrutement",
  TALENT_ACQUISITION: "Acquisition de talents",
  HR_CONSULTING: "Conseil RH",
  COACHING: "Coaching",
  TRAINING: "Formation",
};

const PRICE_LABELS: Record<string, string> = {
  "0-50": "0-50€/h",
  "50-100": "50-100€/h",
  "100-150": "100-150€/h",
  "150-200": "150-200€/h",
  "200+": "200€+/h",
};

export default function RHCard({ profile }: RHCardProps) {
  const { id, bio, expertise, priceRange, user, _count } = profile;

  // Extraire les premiers 150 caractères de la bio
  const bioPreview = bio
    ? bio.length > 150
      ? bio.substring(0, 150) + "..."
      : bio
    : "Aucune description disponible";

  return (
    <Link
      href={`/rh/${id}`}
      className="block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#c9d5c0] hover:scale-105 group"
    >
      <div className="p-6">
        {/* Header avec nom et photo */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-shrink-0">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "Profile"}
                className="w-16 h-16 rounded-full object-cover border-3 border-[#c9d5c0] group-hover:border-[#0b4343] transition-colors"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0d4d4d] to-[#0a3d3d] flex items-center justify-center text-white font-bold text-xl border-3 border-[#c9d5c0] group-hover:border-[#0b4343] transition-colors">
                {user.name?.charAt(0).toUpperCase() ||
                  user.email.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-[#0d4d4d] truncate group-hover:text-[#0a3d3d] transition-colors">
              {user.name || "Professionnel RH"}
            </h3>
            {priceRange && (
              <p className="text-sm font-semibold text-[#0b4343]">
                {PRICE_LABELS[priceRange] || priceRange}
              </p>
            )}
          </div>
        </div>

        {/* Expertises */}
        {expertise && expertise.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {expertise.map((exp) => (
                <span
                  key={exp}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#c9d5c0]/50 text-[#0d4d4d] border border-[#c9d5c0] group-hover:bg-[#c9d5c0] transition-colors"
                >
                  {EXPERTISE_LABELS[exp] || exp}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bio preview */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{bioPreview}</p>

        {/* Stats */}
        {_count && (
          <div className="flex items-center space-x-4 text-sm text-gray-500 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-1">
              <svg
                className="w-4 h-4"
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
                {_count.consultations} consultation
                {_count.consultations !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <svg
                className="w-4 h-4"
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
                {_count.favorites} favori{_count.favorites !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Footer avec CTA */}
      <div className="bg-gradient-to-r from-gray-50 to-[#c9d5c0]/10 px-6 py-4 border-t border-gray-200 group-hover:from-[#ffd700]/20 group-hover:to-[#ffd700]/10 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-[#0d4d4d] group-hover:text-[#0a3d3d]">
            Voir le profil complet
          </span>
          <svg
            className="w-5 h-5 text-[#0d4d4d] group-hover:translate-x-1 transition-transform"
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
        </div>
      </div>
    </Link>
  );
}
