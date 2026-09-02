import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import ServicesSection from "@/components/home/ServicesSection";
import ProductsSection from "@/components/home/ProductsSection";
import PopularCourses from "@/components/home/PopularCourses";
import InternshipHighlights from "@/components/home/InternshipHighlights";
import PlacementServicesSection from "@/components/home/PlacementServicesSection";
import StatsCounter from "@/components/home/StatsCounter";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import SuccessStorySection from "@/components/home/SuccessStorySection";
import LatestJobsSection from "@/components/home/LatestJobsSection";
import PartnersMarquee from "@/components/home/PartnersMarquee";
import CollegeTPOSection from "@/components/home/CollegeTPOSection";
import ContactSection from "@/components/home/ContactSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <WhyChooseSection />
        <ServicesSection />
        <ProductsSection />
        <PopularCourses />
        <InternshipHighlights />
        <PlacementServicesSection />
        <StatsCounter />
        <TestimonialsSection />
        <SuccessStorySection />
        <LatestJobsSection />
        <PartnersMarquee />
        <CollegeTPOSection />
        <ContactSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
