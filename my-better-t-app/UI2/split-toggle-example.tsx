"use client";

import { SplitToggleSection } from "@/components/ui/split-toggle-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SplitToggleExample() {
	return (
		<div className="container mx-auto py-12">
			<h1 className="mb-8 text-center text-3xl font-bold">
				Exemple de Split Toggle Section
			</h1>

			<SplitToggleSection
				// Contenu visible dans la colonne gauche (fermé)
				leftContent={
					<div>
						<h2 className="text-2xl font-bold">Option A</h2>
						<p className="mt-2 text-muted-foreground">
							Cliquez pour en savoir plus
						</p>
					</div>
				}
				// Contenu visible dans la colonne droite (fermé)
				rightContent={
					<div>
						<h2 className="text-2xl font-bold">Option B</h2>
						<p className="mt-2 text-muted-foreground">
							Cliquez pour en savoir plus
						</p>
					</div>
				}
				// Contenu affiché dans le panneau gauche (ouvert)
				expandedLeftContent={
					<div className="space-y-6">
						<div>
							<Button
								variant="ghost"
								size="sm"
								className="mb-4"
								onClick={(e) => {
									e.stopPropagation();
									// Le panneau se fermera via le clic sur la zone
								}}
							>
								← Fermer
							</Button>
						</div>

						<Card>
							<CardHeader>
								<CardTitle>Détails de l'Option A</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<p>
									Voici le contenu détaillé de l'option A. Ce panneau occupe
									80% de la largeur et s'anime depuis la gauche.
								</p>

								<div className="space-y-2">
									<h3 className="font-semibold">Caractéristiques :</h3>
									<ul className="list-inside list-disc space-y-1 text-muted-foreground">
										<li>Animation fluide avec framer-motion</li>
										<li>Auto-scroll vers la section</li>
										<li>Responsive design</li>
										<li>Fermeture au clic sur la zone active</li>
									</ul>
								</div>

								<div className="flex gap-2">
									<Button>Action Principale</Button>
									<Button variant="outline">Action Secondaire</Button>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Plus d'informations</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									Vous pouvez ajouter autant de contenu que nécessaire. Le
									panneau est scrollable si le contenu dépasse la hauteur
									disponible.
								</p>
							</CardContent>
						</Card>
					</div>
				}
				// Contenu affiché dans le panneau droit (ouvert)
				expandedRightContent={
					<div className="space-y-6">
						<div>
							<Button
								variant="ghost"
								size="sm"
								className="mb-4"
								onClick={(e) => {
									e.stopPropagation();
								}}
							>
								Fermer →
							</Button>
						</div>

						<Card>
							<CardHeader>
								<CardTitle>Détails de l'Option B</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<p>
									Voici le contenu détaillé de l'option B. Ce panneau s'anime
									depuis la droite avec une animation spring naturelle.
								</p>

								<div className="space-y-2">
									<h3 className="font-semibold">Avantages :</h3>
									<ul className="list-inside list-disc space-y-1 text-muted-foreground">
										<li>Transitions fluides et performantes</li>
										<li>Support du mode sombre</li>
										<li>Entièrement personnalisable</li>
										<li>TypeScript pour la sécurité des types</li>
									</ul>
								</div>

								<div className="flex gap-2">
									<Button>Commencer</Button>
									<Button variant="secondary">En savoir plus</Button>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Configuration</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									Le composant est hautement configurable et s'intègre
									parfaitement avec votre système de design existant.
								</p>
							</CardContent>
						</Card>
					</div>
				}
				className="min-h-[400px]"
			/>

			<div className="mt-12 text-center text-sm text-muted-foreground">
				<p>
					Cliquez sur l'une des colonnes pour ouvrir le panneau correspondant
				</p>
				<p className="mt-2">Recliquez pour fermer</p>
			</div>
		</div>
	);
}
