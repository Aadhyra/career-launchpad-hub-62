import { Link } from "react-router-dom";
import { BookOpen, BriefcaseBusiness, Building2, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "./Reveal";

const paths = [
  { icon: BookOpen, title: "Students & learners", description: "Build skills through professional courses and practical internships.", benefits: ["Training in IT, HR, marketing, design and nursing", "Project work and practical tasks", "Certificates subject to program completion"], href: "/courses", cta: "Explore courses" },
  { icon: BriefcaseBusiness, title: "Job seekers & professionals", description: "Prepare for your next opportunity and explore available roles.", benefits: ["Resume and portfolio building tools", "Interview preparation and assessments", "Job listings and placement assistance"], href: "/career", cta: "Find opportunities" },
  { icon: Building2, title: "Businesses & colleges", description: "Build technology, develop teams and connect with talent.", benefits: ["Software, AI and business automation solutions", "Recruitment and corporate training", "Campus hiring and college partnerships"], href: "/services", cta: "Explore business services" },
];

export default function VisitorPaths() {
  return (
    <section aria-labelledby="visitor-paths-title" className="border-b bg-background py-14 lg:py-20">
      <div className="container">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold text-accent">Who we are</p>
          <h2 id="visitor-paths-title" className="mt-3 font-heading text-3xl font-bold text-foreground md:text-4xl">A technology and career-growth company</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">AADHYRA INNOVATIONS PVT LTD brings together software and AI services, professional training, internships and recruitment. We help people develop practical skills and help businesses build solutions and teams.</p>
        </Reveal>
        <h3 className="mt-10 font-heading text-xl font-semibold text-foreground">What you can get with Aadhyra</h3>
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
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">Program fees, eligibility and benefits vary. Check the selected program before applying. Placement assistance is not a job guarantee; internship stipends depend on the applicable eligibility and task requirements.</p>
        <Button asChild variant="link" className="mt-2 h-auto px-0"><Link to="/contact">Not sure where to start? Talk to us<ArrowRight className="h-4 w-4" /></Link></Button>
      </div>
    </section>
  );
}