import { Link } from "react-router-dom";
import { Code2, Brain, GraduationCap, Rocket, Briefcase, School, Cloud, BarChart3, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const services = [
  { icon: Code2, title: "Software Development", desc: "Custom web, mobile and enterprise software built to scale.", href: "/services" },
  { icon: Brain, title: "AI Solutions", desc: "Chatbots, automation and machine learning for smarter business.", href: "/services/ai" },
  { icon: Cloud, title: "Cloud & Enterprise Solutions", desc: "Connected platforms and cloud services that support your operations.", href: "/services/cloud" },
  { icon: BarChart3, title: "Data & Business Intelligence", desc: "Turn business data into clear insights and better decisions.", href: "/services/data-analytics" },
  { icon: Briefcase, title: "Recruitment Services", desc: "Fresher and experienced hiring, RPO and HR consulting.", href: "/placement" },
  { icon: School, title: "Campus Hiring", desc: "End-to-end campus drives with colleges across India.", href: "/campus-drive" },
  { icon: GraduationCap, title: "Corporate Training", desc: "Practical training that helps your team build industry-ready skills.", href: "/courses" },
  { icon: Rocket, title: "Internships & Career Development", desc: "Project experience, mentoring and support for your next career step.", href: "/internships" },
];

const ServicesSection = () => (
  <section id="what-we-do" className="scroll-mt-20 bg-muted/40 py-16 lg:py-24">
    <div className="container">
      <Reveal className="mx-auto mb-12 max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-accent">What We Do</span>
        <h2 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-4xl">
          Technology &amp; services built around your goals
        </h2>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map(({ icon: Icon, title, desc, href }, i) => (
          <Reveal key={title} delay={(i % 4) * 90}>
            <Link
              to={href}
              className="group flex h-full flex-col rounded-lg border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary">
                <Icon className="h-6 w-6 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
              </div>
              <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
