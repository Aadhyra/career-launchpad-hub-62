import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, GraduationCap, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-aadhyra.jpg";

const pillars = [
  { icon: Code2, label: "Technology" },
  { icon: GraduationCap, label: "Careers" },
  { icon: TrendingUp, label: "Business Growth" },
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden gradient-hero text-primary-foreground">
      <div className="absolute inset-0 grid-pattern opacity-[0.12]" aria-hidden />
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-tech/30 blur-3xl" aria-hidden />
      <div className="absolute -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl" aria-hidden />

      <div className="container relative z-10 grid grid-cols-1 items-center gap-12 py-16 md:py-20 lg:grid-cols-2 lg:gap-14 lg:py-24">
        {/* Text */}
        <div className="min-w-0 text-center lg:text-left animate-fade-in-up">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
            <span className="truncate text-[11px] font-medium tracking-wide sm:text-xs">
              AADHYRA INNOVATIONS PVT LTD • Empowering Careers, Businesses &amp; Technology
            </span>
          </div>

          <h1 className="mt-6 font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl xl:text-[3.4rem]">
            Your Trusted{" "}
            <span className="relative whitespace-nowrap">
              Technology
              <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-accent" aria-hidden />
            </span>{" "}
            &amp; Career Growth Partner
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/85 md:text-lg lg:mx-0">
            We provide Software Development, AI Solutions, Corporate Training, Professional Internships,
            Recruitment Services, Campus Hiring, and Career Development through one integrated platform.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a href="#what-we-do" className="w-full sm:w-auto">
              <Button variant="accent" size="lg" className="group w-full rounded-full sm:w-auto">
                Explore Services
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <Link to="/internships" className="w-full sm:w-auto">
              <Button variant="heroOutline" size="lg" className="w-full rounded-full sm:w-auto">
                Apply for Internship
              </Button>
            </Link>
            <Link to="/employer/register" className="w-full sm:w-auto">
              <Button variant="heroOutline" size="lg" className="w-full rounded-full sm:w-auto">
                Hire Talent
              </Button>
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start">
            {pillars.map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground/80">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-foreground/10">
                  <Icon className="h-4 w-4 text-accent" />
                </span>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Visual */}
        <div className="relative mx-auto w-full min-w-0 max-w-xl animate-fade-in lg:max-w-none">
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-accent/40 via-tech/30 to-transparent blur-2xl" aria-hidden />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-primary-foreground/15 shadow-2xl">
            <img
              src={heroImage}
              alt="Young Indian professionals collaborating on technology projects with AI, global network and career growth visuals"
              width={1280}
              height={1024}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 left-4 hidden items-center gap-3 rounded-2xl border bg-card px-4 py-3 text-card-foreground shadow-card sm:flex">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl gradient-accent">
              <TrendingUp className="h-5 w-5 text-accent-foreground" />
            </span>
            <div>
              <p className="text-sm font-semibold">Learn · Build · Hire · Grow</p>
              <p className="text-xs text-muted-foreground">One integrated platform</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0" aria-hidden>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-auto w-full">
          <path d="M0 80L80 70C160 60 320 40 480 32C640 24 800 28 960 36C1120 44 1280 56 1360 62L1440 68V80H0Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
