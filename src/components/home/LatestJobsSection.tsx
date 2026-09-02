import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, IndianRupee, Clock, ArrowRight } from "lucide-react";

const jobs = [
  { title: "Java Full Stack Developer", type: "Full Time", location: "Chennai", exp: "0-2 Years", ctc: "₹3.5 - 6 LPA", tag: "IT" },
  { title: "Python / AI Engineer", type: "Full Time", location: "Bengaluru", exp: "1-3 Years", ctc: "₹4 - 8 LPA", tag: "AI" },
  { title: "HR Recruiter", type: "Full Time", location: "Hyderabad", exp: "0-1 Years", ctc: "₹2.4 - 3.6 LPA", tag: "HR" },
  { title: "Digital Marketing Executive", type: "Full Time", location: "Remote", exp: "0-2 Years", ctc: "₹2.5 - 4 LPA", tag: "Marketing" },
  { title: "Staff Nurse", type: "Full Time", location: "Kochi", exp: "0-3 Years", ctc: "₹2.4 - 4.2 LPA", tag: "Healthcare" },
  { title: "UI/UX Designer", type: "Full Time", location: "Chennai", exp: "1-3 Years", ctc: "₹3 - 6 LPA", tag: "Design" },
];

const LatestJobsSection = () => (
  <section className="py-20 lg:py-28">
    <div className="container">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div>
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Careers</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3">Latest Job Openings</h2>
        </div>
        <Link to="/careers">
          <Button variant="outline" className="rounded-full">
            View All Jobs <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {jobs.map((j) => (
          <div key={j.title} className="rounded-2xl border bg-card p-6 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1">
            <div className="flex items-start justify-between gap-3 mb-4">
              <h3 className="font-heading text-lg font-semibold text-foreground">{j.title}</h3>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary whitespace-nowrap">{j.tag}</span>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {j.location}</li>
              <li className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-primary" /> {j.type} · {j.exp}</li>
              <li className="flex items-center gap-2"><IndianRupee className="h-4 w-4 text-healthcare" /> {j.ctc}</li>
              <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-accent" /> Immediate joining</li>
            </ul>
            <Link to="/careers">
              <Button variant="hero" size="sm" className="w-full rounded-full">Apply</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default LatestJobsSection;
