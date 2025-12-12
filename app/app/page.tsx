import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
              Plateforme RH
            </p>
            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
              Trouvez le professionnel RH qui accompagnera votre réussite
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              LandJobPlatform connecte entreprises et talents RH. Réservez une consultation,
              créez votre profil ou pilotez vos missions en toute simplicité grâce à une
              interface claire et cohérente.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/rh"
                className="bg-blue-600 text-white px-5 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors shadow-sm"
              >
                Découvrir les profils RH
              </Link>
              <Link
                href="/rh/create"
                className="text-blue-700 bg-blue-50 px-5 py-3 rounded-md font-semibold hover:bg-blue-100 transition-colors border border-blue-100"
              >
                Devenir RH sur la plateforme
              </Link>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Consultations planifiées</p>
                <p className="text-3xl font-bold text-gray-900">+120</p>
              </div>
              <div className="px-3 py-1 text-sm font-semibold bg-blue-50 text-blue-700 rounded-full">
                En croissance
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="bg-white border border-gray-100 rounded-lg p-3 shadow-sm">
                <p className="font-semibold text-gray-900">Experts vérifiés</p>
                <p className="text-gray-600 mt-1">Des profils qualifiés prêts à intervenir.</p>
              </div>
              <div className="bg-white border border-gray-100 rounded-lg p-3 shadow-sm">
                <p className="font-semibold text-gray-900">Processus simplifié</p>
                <p className="text-gray-600 mt-1">Réservation et suivi centralisés.</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Support réactif</span>
              <span className="text-blue-700 font-semibold">+100 entreprises accompagnées</span>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Une expérience pensée pour tous</h2>
            <p className="text-gray-600 mt-2">
              Naviguez avec les mêmes repères sur chaque page : couleurs, typographie et cartes
              claires pour une lecture immédiate.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="hidden sm:inline-flex bg-gray-900 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors"
          >
            Accéder au dashboard
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[{
            title: "Parcours fluide",
            description: "Filtres, formulaires et actions utilisent les mêmes repères visuels pour simplifier chaque étape.",
          }, {
            title: "Cartes lisibles",
            description: "Informations principales mises en avant dans des encarts blancs bordés et ombrés.",
          }, {
            title: "Palette harmonisée",
            description: "Fond gris clair, texte gris foncé et accents bleu profond pour rester cohérent partout.",
          }].map((feature) => (
            <div
              key={feature.title}
              className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm space-y-3"
            >
              <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-lg border border-gray-100 shadow-sm p-8">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Commencez en quelques clics</h2>
            <p className="text-gray-600">
              Inscrivez-vous, renseignez vos besoins ou votre expertise puis planifiez vos échanges.
              Le tout avec la même interface sobre et structurée que vous retrouvez sur les autres pages.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 text-sm text-gray-700">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 shadow-sm">
                <p className="font-semibold text-blue-800">1. Créez votre compte</p>
                <p className="text-gray-700 mt-1">Sécurisé et rapide pour accéder au dashboard.</p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 shadow-sm">
                <p className="font-semibold text-blue-800">2. Complétez votre profil</p>
                <p className="text-gray-700 mt-1">Présentez vos besoins ou votre expertise RH.</p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 shadow-sm">
                <p className="font-semibold text-blue-800">3. Réservez & suivez</p>
                <p className="text-gray-700 mt-1">Planifiez vos échanges et suivez vos missions.</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-inner space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Prêt à démarrer ?</h3>
            <p className="text-gray-600">
              Retrouvez vos actions favorites dans la navigation : inscription, consultation des
              profils RH ou accès direct à votre espace personnel.
            </p>
            <div className="space-y-3">
              <Link
                href="/auth/join"
                className="block text-center bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
              >
                Créer un compte
              </Link>
              <Link
                href="/auth/login"
                className="block text-center text-blue-700 bg-white border border-blue-100 px-4 py-2 rounded-md font-semibold hover:bg-blue-50 transition-colors"
              >
                Se connecter
              </Link>
              <Link
                href="/rh"
                className="block text-center text-gray-800 bg-white border border-gray-200 px-4 py-2 rounded-md font-semibold hover:bg-gray-50 transition-colors"
              >
                Explorer les profils RH
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
