"use client";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";

export default function Footer() {
	const companyLinks = [
		{ to: "/about", label: "About" },
		{ to: "/my-process", label: "My Process" },
		{ to: "/careers", label: "Careers" },
		{ to: "/blog", label: "Blog" },
		{ to: "/contact", label: "Contact" },
	] as const;

	const individualLinks = [
		{ to: "/individuals/immigrate", label: "Immigrate to Canada" },
		{ to: "/individuals/work", label: "Work in Canada" },
		{ to: "/individuals/study", label: "Study in Canada" },
		{ to: "/individuals/visit", label: "Visit Canada" },
		{ to: "/individuals/family", label: "Family Sponsorship" },
		{ to: "/individuals/citizenship", label: "Citizenship" },
		{ to: "/individuals/eligibility", label: "Eligibility Review" },
	] as const;

	const businessLinks = [
		{ to: "/businesses/lmia", label: "LMIA" },
		{ to: "/businesses/hr-strategy", label: "HR Strategy" },
		{ to: "/businesses/hr-policies", label: "HR Policies, Procedures & Projects" },
		{ to: "/businesses/hr-advice", label: "HR Advice & Support" },
		{ to: "/businesses/fractional-hr", label: "Fractional HR Services" },
		{ to: "/businesses/recruitment", label: "Recruitment" },
		{ to: "/businesses/compensation", label: "Compensation Analysis" },
		{ to: "/businesses/workplace", label: "Workplace Investigations" },
	] as const;

	return (
		<footer className="bg-[#c4d4c0] py-16 px-6">
			<div className="mx-auto max-w-[100rem]">
				{/* Header with Logo and Contact Info */}
				<div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
					{/* Logo */}
					<div className="text-[#0d4d4d]">
						<div className="text-3xl font-bold leading-tight mb-1">
							<span className="italic">evoke</span>
							<span className="ml-1 font-normal">HR</span>
						</div>
						<div className="text-sm uppercase tracking-wider">& IMMIGRATION</div>
					</div>

					{/* Contact Info */}
					<div className="flex flex-col md:flex-row gap-6 text-[#0d4d4d]">
						<a
							href="tel:778-880-0441"
							className="flex items-center gap-2 hover:opacity-70 transition-opacity"
						>
							<Phone className="w-5 h-5" />
							<span className="font-medium">778-880-0441</span>
						</a>
						<a
							href="mailto:hello@evokehr.ca"
							className="flex items-center gap-2 hover:opacity-70 transition-opacity"
						>
							<Mail className="w-5 h-5" />
							<span className="font-medium">hello@evokehr.ca</span>
						</a>
					</div>
				</div>

				{/* Links Section */}
				<div className="bg-[#f5f1e8] rounded-3xl px-8 py-12">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
						{/* Company Column */}
						<div>
							<h3 className="text-[#0d4d4d] font-bold text-lg mb-6">Company</h3>
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

						{/* For Individuals Column */}
						<div>
							<h3 className="text-[#0d4d4d] font-bold text-lg mb-6">For Individuals</h3>
							<ul className="space-y-3">
								{individualLinks.map(({ to, label }) => (
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

						{/* For Businesses Column */}
						<div>
							<h3 className="text-[#0d4d4d] font-bold text-lg mb-6">For Businesses</h3>
							<ul className="space-y-3">
								{businessLinks.map(({ to, label }) => (
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
