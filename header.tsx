"use client";
import Link from "next/link";

export default function Header() {
	const links = [
		{ to: "/individuals", label: "For Individuals" },
		{ to: "/businesses", label: "For Businesses" },
		{ to: "/lmia", label: "LMIA" },
		{ to: "/about", label: "About" },
		{ to: "/careers", label: "Careers" },
		{ to: "/blog", label: "Blog" },
		{ to: "/contact", label: "Contact" },
	] as const;

	return (
		<header className="fixed top-0 left-0 right-0 bg-[#0d4d4d] px-6 py-4 z-50">
			<div className="mx-auto max-w-7xl">
				<div className="bg-[#f5f1e8] rounded-[50px] px-8 py-4 flex items-center justify-between shadow-lg">
					{/* Logo */}
					<Link href="/" className="flex items-center">
						<div className="text-[#0d4d4d]">
							<div className="text-2xl font-bold leading-tight">
								<span className="italic">Evoke</span>
								<span className="ml-1 font-normal">HR</span>
							</div>
							<div className="text-xs uppercase tracking-wider">& IMMIGRATION</div>
						</div>
					</Link>

					{/* Navigation */}
					<nav className="hidden lg:flex items-center gap-8">
						{links.map(({ to, label }) => (
							<Link
								key={to}
								href={to}
								className="text-[#0d4d4d] text-sm font-medium hover:text-gray-600 transition-colors"
							>
								{label}
							</Link>
						))}
					</nav>

					{/* CTA Button */}
					<button className="bg-[#ffd700] hover:bg-[#ffed4e] text-black px-6 py-2 rounded-md font-semibold transition-colors">
						Book a Call
					</button>
				</div>
			</div>
		</header>
	);
}
