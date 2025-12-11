"use client";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";

export default function Footer() {
	const companyLinks = [
		{ to: "/about", label: "À propos" },
		{ to: "/contact", label: "Contact" },
	] as const;

	const seekersLinks = [
		{ to: "/rh", label: "Trouver un RH" },
		{ to: "/auth/join", label: "Créer un compte" },
	] as const;

	const rhLinks = [
		{ to: "/rh/create", label: "Devenir RH partenaire" },
		{ to: "/dashboard", label: "Tableau de bord" },
	] as const;

	return (
		<footer className="bg-[#c4d4c0] py-16 px-6">
			<div className="mx-auto max-w-7xl">
				{/* Header with Logo and Contact Info */}
				<div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
					{/* Logo */}
					<div className="text-[#0d4d4d]">
						<div className="text-3xl font-bold leading-tight mb-1">
							<span className="font-semibold">LandJobPlatform</span>
						</div>
						<div className="text-sm tracking-wide">Des talents RH à portée de clic</div>
					</div>

					{/* Contact Info */}
					<div className="flex flex-col md:flex-row gap-6 text-[#0d4d4d]">
						<a
							href="mailto:contact@landjobplatform.com"
							className="flex items-center gap-2 hover:opacity-70 transition-opacity"
						>
							<Mail className="w-5 h-5" />
							<span className="font-medium">contact@landjobplatform.com</span>
						</a>
					</div>
				</div>

				{/* Links Section */}
				<div className="bg-[#f5f1e8] rounded-3xl px-8 py-12">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
						{/* Company Column */}
						<div>
							<h3 className="text-[#0d4d4d] font-bold text-lg mb-6">Entreprise</h3>
							<ul className="space-y-3">
								{companyLinks.map(({ to, label }) => (
									<li key={to}>
										<Link
											href={to}
											className="text-[#0d4d4d] hover:opacity-70 transition-opacity"
										>
											{label}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* For Job Seekers Column */}
						<div>
							<h3 className="text-[#0d4d4d] font-bold text-lg mb-6">Chercheurs d'emploi</h3>
							<ul className="space-y-3">
								{seekersLinks.map(({ to, label }) => (
									<li key={to}>
										<Link
											href={to}
											className="text-[#0d4d4d] hover:opacity-70 transition-opacity"
										>
											{label}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* For RH Column */}
						<div>
							<h3 className="text-[#0d4d4d] font-bold text-lg mb-6">Recruteurs RH</h3>
							<ul className="space-y-3">
								{rhLinks.map(({ to, label }) => (
									<li key={to}>
										<Link
											href={to}
											className="text-[#0d4d4d] hover:opacity-70 transition-opacity"
										>
											{label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
