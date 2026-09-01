import { Link } from "react-router-dom";
import { Code2, Brain, GraduationCap, Rocket, Briefcase, HeartPulse, ArrowRight } from "lucide-react";

const groups = [
  {
    icon: Code2,
    title: "IT Services",
    href: "/services",
    items: ["Custom Software Development", "Website Development", "Mobile App Development", "Cloud Solutions", "UI/UX Design", "Maintenance & Support"],
  },
  {
    icon: Brain,
    title: "AI Solutions",
    href: "/services/ai",
    items: ["AI Chatbots", "AI Automation", "AI Business Solutions", "AI Research", "Machine Learning", "Data Analytics"],
  },
  {
    icon: GraduationCap,
    title: "Corporate Training",
    href: "/courses",
    items: ["Java Full Stack", "Python", "MERN Stack", "Data Science", "Artificial Intelligence", "Cloud Computing", "Digital Marketing", "HR Training", "Soft Skills"],
  },
  {
    icon: Rocket,
    title: "Internship Programs",
    href: "/internship",
    items: ["Live Industry Projects", "Mentor Guidance", "Internship Certificate", "Placement Assistance", "Resume Building", "Interview Preparation"],
  },
  {
    icon: Briefcase,
    title: "Placement Services",
    href: "/placement",
    items: ["Campus Recruitment", "Freshers Hiring", "Experienced Hiring", "Recruitment Process Outsourcing", "HR Consulting"],
  },
  {
    icon: HeartPulse,
    title: "Healthcare Solutions",
    href: "/placement/health-connect",
    items: ["Healthcare Recruitment", "Medical Training", "Hospital Partnerships"],
  },
];

const ServicesSection = () => (
  <section id="services" className="py-20 lg:py-28 bg-muted/40 scroll-mt-20">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Services</span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3">
          Everything your business and career needs
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map(({ icon: Icon, title, items, href }) => (
          <Link
            key={title}
            to={href}
            className="group relative rounded-3xl border border-border/70 bg-card/70 backdrop-blur-md p-7 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                <Icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">{title}</h3>
            </div>
            <ul className="space-y-2 flex-1">
              {items.map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                  {i}
                </li>
              ))}
            </ul>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Learn more
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
