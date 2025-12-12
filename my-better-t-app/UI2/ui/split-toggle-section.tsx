"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type SplitToggleSectionProps = {
	leftContent: React.ReactNode;
	rightContent: React.ReactNode;
	expandedLeftContent: React.ReactNode;
	expandedRightContent: React.ReactNode;
	className?: string;
};

type PanelState = "left" | "right";

export function SplitToggleSection({
	leftContent,
	rightContent,
	expandedLeftContent,
	expandedRightContent,
	className,
}: SplitToggleSectionProps) {
	const [panelState, setPanelState] = React.useState<PanelState>("left");
	const sectionRef = React.useRef<HTMLDivElement>(null);

	// Gestion du clic sur la colonne gauche
	const handleLeftClick = () => {
		setPanelState("left");
	};

	// Gestion du clic sur la colonne droite
	const handleRightClick = () => {
		setPanelState("right");
	};

	// Auto-scroll vers la section lors de l'ouverture d'un panneau
	React.useEffect(() => {
		if (sectionRef.current) {
			sectionRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	}, [panelState]);

	return (
		<div ref={sectionRef} className={cn("relative w-full", className)}>
			<div className="relative flex flex-col w-full">
				{/* Contenu principal avec deux colonnes */}
				<div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 mb-4">
					{/* Colonne gauche */}
					<motion.div
						onClick={handleLeftClick}
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className={cn(
							"flex cursor-pointer items-center justify-center rounded-lg border-2 p-8",
							"transition-all duration-300",
							"hover:border-primary hover:shadow-lg",
							panelState === "left" && "border-primary ring-2 ring-primary/20",
						)}
					>
						<div className="text-center">{leftContent}</div>
					</motion.div>

					{/* Colonne droite */}
					<motion.div
						onClick={handleRightClick}
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className={cn(
							"flex cursor-pointer items-center justify-center rounded-lg border-2 p-8",
							"transition-all duration-300",
							"hover:border-primary hover:shadow-lg",
							panelState === "right" &&
								"border-primary ring-2 ring-primary/20",
						)}
					>
						<div className="text-center">{rightContent}</div>
					</motion.div>
				</div>

				{/* Panneau gauche animé (formulaire vertical) */}
				<AnimatePresence>
					{panelState === "left" && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ type: "spring", damping: 25, stiffness: 200 }}
							className="w-full bg-background shadow-2xl rounded-lg overflow-hidden"
						>
							<div className="p-8 lg:p-12">
								{expandedLeftContent}
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Panneau droit animé */}
				<AnimatePresence>
					{panelState === "right" && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ type: "spring", damping: 25, stiffness: 200 }}
							className="w-full bg-background shadow-2xl rounded-lg overflow-hidden"
						>
							<div className="p-8 lg:p-12">
								{expandedRightContent}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
