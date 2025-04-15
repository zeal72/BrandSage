import React from 'react';
import { Link } from 'react-router-dom';
import {
	FaRocket,
	FaFeatherAlt,
	FaLightbulb,
	FaFileExport,
	FaUsers,
	FaPalette,
	FaCheckCircle,
	FaQuestionCircle,
	FaRegSmile,
	FaChartLine,
	FaMobileAlt,
	FaRegClock
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../App.css';

const LandingPage = () => {
	const [menuOpen, setMenuOpen] = React.useState(false);
	const MotionLink = motion(Link);

	return (
		<div className="min-h-screen bg-white text-gray-800 font-sans scroll-smooth">
			{/* Sticky Navigation - Updated with proper links */}
			<nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm flex justify-between items-center px-2 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 shadow-lg">
				<div className="flex items-center space-x-2">
					<FaFeatherAlt className="text-indigo-600 text-3xl sm:text-4xl transition duration-300 hover:rotate-12" />
					<span className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
						BrandSage
					</span>
				</div>

				{/* Desktop Navigation - All original links preserved */}
				<div className="hidden sm:flex overflow-x-auto scrollbar-none space-x-2 md:space-x-4 lg:space-x-8 text-sm sm:text-base md:text-sm lg:text-base items-center max-w-[70vw] md:max-w-none flex-nowrap"
					style={{ WebkitOverflowScrolling: 'touch' }}>
					<NavLink href="#features">Features</NavLink>
					<NavLink href="#how-it-works">How It Works</NavLink>
					<NavLink href="#benefits">Benefits</NavLink>
					<NavLink href="#testimonials">Testimonials</NavLink>
					<NavLink href="#faq">FAQ</NavLink>
					<MotionLink
						to="/bot"
						whileHover={{ scale: 1.05 }}
						className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 sm:py-2 sm:px-4 md:py-2 md:px-4 lg:py-3 lg:px-6 rounded-full text-sm sm:text-base md:text-sm lg:text-base transition-all shadow-lg hover:shadow-indigo-200 whitespace-nowrap"
					>
						Get Started
					</MotionLink>
				</div>

				{/* Mobile Menu - Preserved original structure */}
				<button className="sm:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
					onClick={() => setMenuOpen(!menuOpen)}
					aria-label="Open menu">
					<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				</button>

				{menuOpen && (
					<div className="absolute top-full left-0 w-full bg-white shadow-lg flex flex-col items-center py-4 sm:hidden space-y-4 z-50">
						<a href="#features" className="hover:text-indigo-500 transition" onClick={() => setMenuOpen(false)}>Features</a>
						<a href="#how-it-works" className="hover:text-indigo-500 transition" onClick={() => setMenuOpen(false)}>How It Works</a>
						<a href="#benefits" className="hover:text-indigo-500 transition" onClick={() => setMenuOpen(false)}>Benefits</a>
						<a href="#testimonials" className="hover:text-indigo-500 transition" onClick={() => setMenuOpen(false)}>Testimonials</a>
						<a href="#faq" className="hover:text-indigo-500 transition" onClick={() => setMenuOpen(false)}>FAQ</a>
						<MotionLink
							to="/bot"
							whileHover={{ scale: 1.05 }}
							className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-full text-sm transition-all"
							onClick={() => setMenuOpen(false)}
						>
							Get Started
						</MotionLink>
					</div>
				)}
			</nav>

			{/* Hero Section - Preserved original design */}
			<SectionWrapper className="bg-gradient-to-br from-indigo-50 to-blue-50">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
					<div className="order-2 lg:order-1">
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6"
						>
							Transform Your Brand Vision into <span className="text-indigo-600">AI-Powered Reality</span>
						</motion.h1>
						<p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">
							From concept to comprehensive brand strategy—our intelligent platform crafts your unique brand identity in minutes, not weeks.
						</p>
						<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
							<AnimatedButton to="/bot" className="bg-indigo-600 text-white text-center px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-lg">
								Start Free Trial
							</AnimatedButton>
							<AnimatedButton
								to="/bot"
								variant="outline"
								className="border-indigo-600 text-indigo-600 text-center px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-lg"
							>
								Live Demo
							</AnimatedButton>
						</div>
						<div className="mt-6 sm:mt-8 flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-500">
							<FaRegSmile className="text-indigo-600 text-lg sm:text-xl" />
							<span>Trusted by 5,000+ innovative brands worldwide</span>
						</div>
					</div>
					<div className="order-1 lg:order-2">
						<div className="w-full h-auto max-w-xl mx-auto flex items-center justify-center animate-float">
							<FaPalette className="text-indigo-600 text-6xl sm:text-7xl md:text-8xl lg:text-9xl" />
						</div>
					</div>
				</div>
			</SectionWrapper>

			{/* Stats Section - Preserved original content */}
			<SectionWrapper className="bg-white">
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 text-center">
					<StatCard icon={<FaRocket className="text-3xl sm:text-4xl" />} number="15,000+" label="Brands Created" />
					<StatCard icon={<FaChartLine className="text-3xl sm:text-4xl" />} number="92%" label="Success Rate" />
					<StatCard icon={<FaRegClock className="text-3xl sm:text-4xl" />} number="2.5x" label="Faster Launch" />
				</div>
			</SectionWrapper>

			{/* How It Works Section - Original structure maintained */}
			<SectionWrapper id="how-it-works" className="bg-gray-50">
				<SectionTitle>Your Brand Creation Journey</SectionTitle>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
					<ProcessStep
						icon={<FaMobileAlt className="text-4xl" />}
						title="1. Input Your Vision"
						description="Share your brand concept through our intuitive interface or guided questionnaire."
						placeholderIcon={<FaMobileAlt className="text-indigo-600 text-6xl sm:text-7xl md:text-8xl" />}
					/>
					<ProcessStep
						icon={<FaLightbulb className="text-4xl" />}
						title="2. AI Magic Processing"
						description="Our advanced AI analyzes market data and creates your unique brand strategy."
						placeholderIcon={<FaLightbulb className="text-indigo-600 text-6xl sm:text-7xl md:text-8xl" />}
					/>
					<ProcessStep
						icon={<FaFileExport className="text-4xl" />}
						title="3. Launch & Grow"
						description="Export professional brand assets and go to market with confidence."
						placeholderIcon={<FaFileExport className="text-indigo-600 text-6xl sm:text-7xl md:text-8xl" />}
					/>
				</div>
			</SectionWrapper>

			{/* Benefits Section - Original content intact */}
			<SectionWrapper id="benefits" className="bg-white">
				<SectionTitle>Why Choose BrandSage?</SectionTitle>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
					<BenefitCard
						icon={<FaCheckCircle className="text-green-500 text-3xl sm:text-4xl" />}
						title="Save Time"
						description="Instantly generate detailed brand strategies that would take weeks to create manually."
					/>
					<BenefitCard
						icon={<FaCheckCircle className="text-green-500 text-3xl sm:text-4xl" />}
						title="Boost Creativity"
						description="Inspire your team with fresh ideas, compelling narratives, and a clear brand voice."
					/>
					<BenefitCard
						icon={<FaCheckCircle className="text-green-500 text-3xl sm:text-4xl" />}
						title="Cost Effective"
						description="Eliminate expensive consulting fees by leveraging the power of AI for your brand."
					/>
				</div>
			</SectionWrapper>

			{/* FAQ Section - Original implementation preserved */}
			<SectionWrapper id="faq" className="bg-gray-50">
				<SectionTitle>Frequently Asked Questions</SectionTitle>
				<div className="max-w-xl mx-auto space-y-4 sm:space-y-8">
					<FAQItem
						question="What is BrandSage?"
						answer="BrandSage is an AI-powered tool that generates a complete brand strategy from your business description—covering everything from your mission and vision to audience personas and brand tone."
					/>
					<FAQItem
						question="How does the AI generate my brand strategy?"
						answer="Our system uses advanced natural language processing and prompt chaining to analyze your inputs and generate creative, tailor-made brand elements."
					/>
					<FAQItem
						question="Can I edit the generated content?"
						answer="Absolutely! You can fine-tune every section of your brand strategy before exporting it as a professional PDF brand book."
					/>
					<FAQItem
						question="Is my data secure?"
						answer="Yes, we prioritize your privacy and data security, using industry-standard practices to ensure your information is safe."
					/>
				</div>
			</SectionWrapper>

			{/* Final CTA Section - Updated with routing */}
			<SectionWrapper className="bg-indigo-600 text-white">
				<div className="text-center">
					<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
						Ready to Transform Your Brand?
					</h2>
					<p className="mb-6 sm:mb-8 text-base sm:text-lg">
						Join a growing community of innovators who are taking their brand strategy to the next level.
					</p>
					<AnimatedButton to="/bot" className="px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 text-base sm:text-lg md:text-xl">
						Create Your Strategy Now
					</AnimatedButton>
				</div>
			</SectionWrapper>

			{/* Footer - Preserved original design with updated link */}
			<footer className="bg-gray-800 text-gray-300 py-4 sm:py-8 px-2 sm:px-4 md:px-6 lg:px-8">
				<div className="flex flex-col sm:flex-row justify-between items-center">
					<div className="mb-2 sm:mb-0">
						<h3 className="text-lg sm:text-2xl font-bold">BrandSage</h3>
						<p className="text-xs sm:text-sm">Empowering your brand with the intelligence of AI.</p>
					</div>
					<div className="flex flex-wrap gap-2 sm:gap-4">
						<a href="#features" className="hover:text-white transition text-xs sm:text-sm">Features</a>
						<a href="#how-it-works" className="hover:text-white transition text-xs sm:text-sm">How It Works</a>
						<a href="#faq" className="hover:text-white transition text-xs sm:text-sm">FAQ</a>
						<Link to="/bot" className="hover:text-white transition text-xs sm:text-sm">Get Started</Link>
					</div>
				</div>
				<div className="text-center text-2xs mt-2 sm:mt-4">
					© {new Date().getFullYear()} BrandSage. All rights reserved.
				</div>
			</footer>
		</div>
	);
};

// Reusable Components - All original implementations preserved with necessary updates
const SectionWrapper = ({ children, className, ...props }) => (
	<section {...props} className={`py-8 sm:py-12 md:py-16 lg:py-24 px-2 sm:px-4 md:px-6 lg:px-8 ${className}`}>
		{children}
	</section>
);

const SectionTitle = ({ children }) => (
	<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
		<span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
			{children}
		</span>
	</h2>
);

const AnimatedButton = ({ to, children, className, variant = 'primary' }) => {
	const MotionBtn = motion(Link);
	return (
		<MotionBtn
			to={to}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			className={`inline-block rounded-full transition-all ${variant === 'primary'
				? 'bg-indigo-600 text-white shadow-lg hover:shadow-indigo-200 hover:bg-transparent hover:text-indigo-600'
				: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600'
				} ${className}`}
		>
			{children}
		</MotionBtn>
	);
};

const ProcessStep = ({ icon, title, description, placeholderIcon }) => {
	const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 20 }}
			animate={inView ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.5 }}
			className="bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
		>
			<div className="text-indigo-600 text-3xl sm:text-4xl mb-3 sm:mb-4">{icon}</div>
			<h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{title}</h3>
			<p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">{description}</p>
			<div className="w-full h-32 sm:h-48 flex items-center justify-center mt-3 sm:mt-4">
				{placeholderIcon}
			</div>
		</motion.div>
	);
};

const StatCard = ({ icon, number, label }) => (
	<div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
		<div className="text-indigo-600 text-2xl sm:text-3xl mb-3 sm:mb-4">{icon}</div>
		<div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">{number}</div>
		<div className="text-gray-600 text-sm sm:text-base">{label}</div>
	</div>
);

const BenefitCard = ({ icon, title, description }) => (
	<div className="bg-white shadow-xl rounded-xl p-4 sm:p-6 hover:shadow-2xl transition-shadow">
		<div className="mb-4 sm:mb-6">{icon}</div>
		<h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">{title}</h3>
		<p className="text-gray-600 text-sm sm:text-base">{description}</p>
	</div>
);

const FAQItem = ({ question, answer }) => (
	<div className="bg-white shadow-lg rounded-xl p-4 sm:p-6">
		<div className="flex items-center mb-3 sm:mb-4">
			<FaQuestionCircle className="text-indigo-600 text-xl sm:text-2xl mr-2 sm:mr-3" />
			<h4 className="text-lg sm:text-xl font-semibold">{question}</h4>
		</div>
		<p className="text-gray-700 text-sm sm:text-base">{answer}</p>
	</div>
);

const NavLink = ({ href, children, onClick }) => {
	const handleClick = (e) => {
		e.preventDefault();
		const target = document.querySelector(href);
		target?.scrollIntoView({ behavior: 'smooth' });
		onClick?.();
	};

	return (
		<motion.a
			href={href}
			onClick={handleClick}
			className="relative inline-block"
			initial="rest"
			whileHover="hover"
			animate="rest"
		>
			{children}
			<motion.span
				variants={{
					rest: { width: 0 },
					hover: { width: '100%' },
				}}
				transition={{ duration: 0.3, ease: 'easeOut' }}
				className="absolute left-0 -bottom-1 h-1 bg-blue-500"
			/>
		</motion.a>
	);
};

export default LandingPage;