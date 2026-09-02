import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Rocket, Users, Award, IndianRupee, FileText, MessageSquare, Briefcase, ArrowRight } from "lucide-react";

const highlights = [
  { icon: Rocket, title: "Live Projects", desc: "Work on real client deliverables" },
  { icon: Users, title: "Industry Mentors", desc: "Guided by working professionals" },
  { icon: Award, title: "Certificate", desc: "QR-verified internship certificate" },
  { icon: IndianRupee, title: "Stipend Opportunities", desc: "Performance-based earnings" },
  { icon: FileText, title: "Resume Support", desc: "ATS-ready professional resume" },
  { icon: MessageSquare, title: "Mock Interviews", desc: "AI + human interview practice" },
  { icon: Briefcase, title: "Placement Assistance", desc: "Direct referrals to hiring partners" },
];

const InternshipHighlights = () => (
  <section className="py-20 lg:py-28 bg-muted/40">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">Internships</span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3">Internship Programs</h2>
        <p className="text-muted-foreground mt-4">Structured, mentor-led internships that turn learning into work experience.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {highlights.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-2xl border bg-card/70 backdrop-blur-sm p-6 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1">
            <Icon className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-heading font-semibold text-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/internships">
          <Button variant="accent" size="xl" className="rounded-full group">
            Apply Now
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  </section>
);

export default InternshipHighlights;
