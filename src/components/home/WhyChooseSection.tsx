import { BookOpen, FolderKanban, Briefcase, Building2, Award, LifeBuoy } from "lucide-react";
import Reveal from "./Reveal";

const items = [
  { icon: Building2, title: "Business-focused technology", desc: "Software and AI built to solve real business problems and drive ROI." },
  { icon: FolderKanban, title: "Solutions for real-world needs", desc: "Digital products and workflows designed around your business goals." },
  { icon: Award, title: "Experienced professionals", desc: "Learn from and work with engineers, recruiters and domain experts." },
  { icon: LifeBuoy, title: "End-to-end support", desc: "Guidance from your first conversation through delivery and ongoing growth." },
  { icon: Briefcase, title: "Talent & team development", desc: "Recruitment, corporate training and campus connections for stronger teams." },
  { icon: BookOpen, title: "Practical learning", desc: "Courses and internships that connect skills with hands-on experience." },
];

const WhyChooseSection = () => (
  <section className="py-16 lg:py-24">
    <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <Reveal>
        <span className="text-sm font-semibold uppercase tracking-wider text-accent">Why Choose Us</span>
        <h2 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-4xl">
          Your partner from idea to business impact
        </h2>
        <p className="mt-4 text-muted-foreground">
          Bring your technology, business and talent goals together with one team.
          We combine digital expertise, practical solutions and people-focused services to help you move forward.
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
