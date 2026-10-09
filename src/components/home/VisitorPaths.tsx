import { Link } from "react-router-dom";
import { Code2, BriefcaseBusiness, Building2, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "./Reveal";

const paths = [
  { icon: Code2, title: "Technology for your business", description: "Turn your ideas into digital solutions that support everyday work and business growth.", benefits: ["Custom websites, mobile apps and enterprise software", "AI assistants and workflow automation", "Cloud, data analytics and CRM solutions"], href: "/services", cta: "Explore technology services" },
  { icon: Building2, title: "Teams & business growth", description: "Find the right people and strengthen your team with services built around your goals.", benefits: ["Recruitment and talent connections", "Corporate training and team development", "Campus hiring and college partnerships"], href: "/placement", cta: "Explore talent services" },
  { icon: BriefcaseBusiness, title: "Skills & career opportunities", description: "Build practical experience and prepare for your next career step.", benefits: ["Professional courses and project-based internships", "Certificates earned through program completion", "Resume, portfolio and interview support"], href: "/courses", cta: "Explore learning opportunities" },
];

export default function VisitorPaths() {
  return (
    <section aria-labelledby="visitor-paths-title" className="border-b bg-background py-14 lg:py-20">
      <div className="container">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold text-accent">Who we are</p>
          <h2 id="visitor-paths-title" className="mt-3 font-heading text-3xl font-bold text-foreground md:text-4xl">Technology that powers your business. Services that help you grow.</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">AADHYRA INNOVATIONS PVT LTD is your partner for software development, AI solutions and business services. We help companies build digital products, automate work and connect with talent — alongside practical learning and career opportunities for individuals.</p>
        </Reveal>
        <h3 className="mt-10 font-heading text-xl font-semibold text-foreground">Solutions for your business, team and future</h3>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {paths.map(({ icon: Icon, title, description, benefits, href, cta }) => (
            <article key={title} className="flex min-w-0 flex-col rounded-lg border bg-card p-6 shadow-card">
              <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
              <h4 className="mt-4 font-heading text-xl font-semibold text-card-foreground">{title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              <ul className="my-5 flex-1 space-y-3">
                {benefits.map(benefit => <li key={benefit} className="flex gap-2 text-sm leading-relaxed text-card-foreground"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />{benefit}</li>)}
              </ul>
              <Button asChild variant="outline" className="w-full whitespace-normal"><Link to={href}>{cta}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link></Button>
            </article>
          ))}
        </div>
        <Button asChild variant="link" className="mt-6 h-auto px-0 whitespace-normal text-left"><Link to="/contact">Let’s find the right solution for you<ArrowRight className="h-4 w-4 shrink-0" /></Link></Button>
      </div>
    </section>
  );
}