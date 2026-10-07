import { BookOpen, FolderKanban, Briefcase, Building2, Award, LifeBuoy } from "lucide-react";
import Reveal from "./Reveal";

const items = [
  { icon: BookOpen, title: "Industry-focused learning", desc: "Curriculum designed with hiring partners and updated for today's market." },
  { icon: FolderKanban, title: "Real-world projects", desc: "Work on live client projects that build a portfolio employers trust." },
  { icon: Briefcase, title: "Career opportunities", desc: "Internships, placements and campus drives with our hiring network." },
  { icon: Building2, title: "Business-focused technology", desc: "Software and AI built to solve real business problems and drive ROI." },
  { icon: Award, title: "Experienced professionals", desc: "Learn from and work with engineers, recruiters and domain experts." },
  { icon: LifeBuoy, title: "End-to-end support", desc: "From first enquiry to job offer or product launch, we stay with you." },
];

const WhyChooseSection = () => (
  <section className="py-16 lg:py-24">
    <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <Reveal>
        <span className="text-sm font-semibold uppercase tracking-wider text-accent">Why Choose Us</span>
        <h2 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-4xl">
          One partner for technology, careers and business growth
        </h2>
        <p className="mt-4 text-muted-foreground">
          Students trust us to grow, professionals trust us to advance, and businesses trust us to build. Everything
          runs on a single integrated platform.
        </p>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map(({ icon: Icon, title, desc }, i) => (
          <Reveal key={title} delay={(i % 2) * 100}>
            <div className="flex h-full gap-4 rounded-2xl border bg-card p-5 shadow-card transition-shadow duration-300 hover:shadow-card-hover">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg gradient-primary">
                <Icon className="h-5 w-5 text-primary-foreground" />
              </span>
              <div>
                <h3 className="font-heading font-semibold text-foreground">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseSection;
