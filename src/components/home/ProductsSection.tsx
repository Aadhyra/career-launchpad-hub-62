import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Code, Brain, HeartPulse, ArrowRight } from "lucide-react";
import bgTalent from "@/assets/card-bg-talent.jpg";
import bgTech from "@/assets/card-bg-tech.jpg";
import bgHealth from "@/assets/card-bg-health.jpg";
import bgAiLab from "@/assets/card-bg-ailab.jpg";

const products = [
  {
    title: "AADHYRA Tech Partner",
    desc: "Complete IT Services, Software Development, Digital Transformation, and Technology Consulting.",
    icon: Code,
    image: bgTech,
    tint: "from-emerald-400/40 to-teal-600/50",
    to: "/placement/tech-partner",
  },
  {
    title: "AADHYRA LAB",
    desc: "Advanced Artificial Intelligence Solutions, Automation, AI Tools, and Research.",
    icon: Brain,
    image: bgAiLab,
    tint: "from-violet-400/40 to-purple-700/50",
    to: "/placement/ai-lab",
  },
  {
    title: "AADHYRA Talent Connect",
    desc: "AI-powered recruitment connecting businesses with professionals, job seekers and colleges.",
    icon: Search,
    image: bgTalent,
    tint: "from-primary/40 to-tech/50",
    to: "/placement/talent-connect",
  },
  {
    title: "AADHYRA Health Connect",
    desc: "Healthcare Recruitment, Medical Technology Solutions, and Hospital Collaboration Platform.",
    icon: HeartPulse,
    image: bgHealth,
    tint: "from-cyan-400/40 to-blue-600/50",
    to: "/placement/health-connect",
  },
];

const ProductsSection = () => (
  <section className="py-20 lg:py-28 gradient-hero text-primary-foreground relative overflow-hidden">
    <div className="absolute inset-0 grid-pattern opacity-10" />
    <div className="container relative">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-accent font-semibold text-sm uppercase tracking-wider">Our Ecosystem</span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold mt-3">Our Technology Products</h2>
        <p className="text-primary-foreground/75 mt-4">Discover our platforms for technology, AI, recruitment and healthcare services.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {products.map(({ title, desc, icon: Icon, image, tint, to }) => (
          <div
            key={title}
            className="group relative rounded-3xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-md hover:-translate-y-1.5 transition-all duration-500"
          >
            <img src={image} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover scale-110 group-hover:scale-125 transition-transform duration-[5000ms] ease-out" />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-slate-900/70 to-slate-900/85" />
            <div className={`absolute inset-0 bg-gradient-to-br ${tint} opacity-50 group-hover:opacity-70 transition-opacity duration-500 mix-blend-overlay`} />
            <div className="relative p-7 md:p-8">
              <div className="h-14 w-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center mb-5">
                <Icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-3">{title}</h3>
              <p className="text-sm text-white/80 leading-relaxed mb-6">{desc}</p>
              <Link to={to}>
                <Button variant="accent" size="sm" className="rounded-full group/btn">
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProductsSection;
