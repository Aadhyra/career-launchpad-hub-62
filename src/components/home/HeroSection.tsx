import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Cpu, GraduationCap, Briefcase, ShieldCheck, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden gradient-hero text-primary-foreground">
      {/* Animated tech background */}
      <div className="absolute inset-0 grid-pattern opacity-[0.12]" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-16 left-8 w-72 h-72 bg-white/25 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-8 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/3 left-1/2 w-80 h-80 bg-tech/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }} />
      </div>
      {/* Floating tech particles */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        {[
          { Icon: Code2, cls: "top-24 left-[8%]", d: "0s" },
          { Icon: Cpu, cls: "top-40 right-[10%]", d: "1s" },
          { Icon: GraduationCap, cls: "bottom-28 left-[14%]", d: "2s" },
          { Icon: Briefcase, cls: "bottom-40 right-[16%]", d: "1.5s" },
        ].map(({ Icon, cls, d }, i) => (
          <div key={i} className={`absolute ${cls} h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center animate-float`} style={{ animationDelay: d }}>
            <Icon className="h-6 w-6 text-white/80" />
          </div>
        ))}
      </div>

      <div className="container relative z-10 pt-20 pb-32 lg:pt-28 lg:pb-44">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 mb-6 animate-fade-in">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-xs sm:text-sm font-medium tracking-wide">AADHYRA INNOVATIONS PVT LTD · Empowering Careers, Businesses &amp; Technology</span>
          </div>

          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Your Trusted Technology &amp; Career Growth Partner
          </h1>

          <p className="text-base md:text-lg text-white/85 mb-9 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            We provide Software Development, AI Solutions, Corporate Training, Professional Internships,
            Recruitment Services, Campus Hiring, and Career Development through one integrated platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <a href="#services">
              <Button variant="accent" size="xl" className="group w-full sm:w-auto rounded-full">
                Explore Services
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <Link to="/internships">
              <Button variant="heroOutline" size="xl" className="w-full sm:w-auto rounded-full">
                Apply for Internship
              </Button>
            </Link>
            <Link to="/employer/register">
              <Button variant="heroOutline" size="xl" className="w-full sm:w-auto rounded-full">
                Hire Talent
              </Button>
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm text-white/70 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-healthcare" /> ISO-grade delivery process</span>
            <span className="inline-flex items-center gap-2"><GraduationCap className="h-4 w-4 text-accent" /> 1000+ professionals trained</span>
            <span className="inline-flex items-center gap-2"><Briefcase className="h-4 w-4 text-white/80" /> 100+ hiring companies</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
