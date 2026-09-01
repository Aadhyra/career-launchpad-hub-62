import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Building2, CheckCircle2 } from "lucide-react";

const students = ["Career Guidance", "Resume Building", "Interview Preparation", "Job Opportunities"];
const companies = ["Recruitment", "Campus Hiring", "Executive Search", "HR Consulting"];

const PlacementServicesSection = () => (
  <section className="py-20 lg:py-28">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">Placements</span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3">Placement Services</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <div className="relative rounded-3xl border bg-card/70 backdrop-blur-md p-8 shadow-card hover:shadow-card-hover transition-all overflow-hidden">
          <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative">
            <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mb-5">
              <GraduationCap className="h-7 w-7 text-primary-foreground" />
            </div>
            <h3 className="font-heading text-xl font-bold text-foreground mb-5">For Students</h3>
            <ul className="space-y-3 mb-7">
              {students.map((s) => (
                <li key={s} className="flex items-center gap-3 text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" /> {s}
                </li>
              ))}
            </ul>
            <Link to="/placement"><Button variant="hero" className="rounded-full">Start Your Career</Button></Link>
          </div>
        </div>

        <div className="relative rounded-3xl border bg-card/70 backdrop-blur-md p-8 shadow-card hover:shadow-card-hover transition-all overflow-hidden">
          <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative">
            <div className="h-14 w-14 rounded-2xl gradient-accent flex items-center justify-center mb-5">
              <Building2 className="h-7 w-7 text-accent-foreground" />
            </div>
            <h3 className="font-heading text-xl font-bold text-foreground mb-5">For Companies</h3>
            <ul className="space-y-3 mb-7">
              {companies.map((s) => (
                <li key={s} className="flex items-center gap-3 text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" /> {s}
                </li>
              ))}
            </ul>
            <Link to="/employer/register"><Button variant="accent" className="rounded-full">Hire Talent</Button></Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PlacementServicesSection;
