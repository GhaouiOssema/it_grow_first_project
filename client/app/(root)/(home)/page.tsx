import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioGrid from "@/components/PortfolioGrid";
import PricingSection from "@/components/PricingSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import { ScrollUpButton } from "@/components/ScrollToTopButton";
import Testimonial from "@/components/Testimonial";

export default function LandingPage() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <HeroSection />

            {/* About Section */}
            <AboutSection />

            {/* Services Section */}
            <ServicesSection />

            {/* Testimonial */}
            <Testimonial />

            {/* Portfolio Grid */}
            <PortfolioGrid />

            {/* Pricing Section */}
            <PricingSection />

            {/* Blog Section */}
            <BlogSection />

            {/* Contact Section */}
            <ContactSection />

            <ScrollUpButton />
        </div>
    );
}
