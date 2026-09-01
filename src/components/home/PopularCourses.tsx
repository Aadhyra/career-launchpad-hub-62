import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, BarChart3, Award, Briefcase, ArrowRight } from "lucide-react";

const courses = [
  { title: "Java Full Stack", duration: "6 Months", level: "Beginner to Advanced", color: "bg-tech" },
  { title: "Python Full Stack", duration: "6 Months", level: "Beginner to Advanced", color: "bg-primary" },
  { title: "Data Science", duration: "6 Months", level: "Intermediate", color: "bg-design" },
  { title: "Artificial Intelligence", duration: "6 Months", level: "Intermediate", color: "bg-hr" },
  { title: "Machine Learning", duration: "3 Months", level: "Intermediate", color: "bg-healthcare" },
  { title: "Cloud Computing", duration: "3 Months", level: "Beginner", color: "bg-tech" },
  { title: "Power BI", duration: "3 Months", level: "Beginner", color: "bg-marketing" },
  { title: "Digital Marketing", duration: "3 Months", level: "Beginner", color: "bg-accent" },
  { title: "UI/UX Design", duration: "3 Months", level: "Beginner", color: "bg-design" },
  { title: "HR Training", duration: "3 Months", level: "Beginner", color: "bg-hr" },
];

const PopularCourses = () => (
  <section className="py-20 lg:py-28">
    <div className="container">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div>
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Training</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3">Popular Courses</h2>
        </div>
        <Link to="/courses">
          <Button variant="outline" className="rounded-full">
            View All Courses <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory -mx-4 px-4 scrollbar-thin">
        {courses.map((c) => (
          <div
            key={c.title}
            className="snap-start flex-shrink-0 w-[280px] rounded-2xl border bg-card shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
          >
            <div className={`h-2 ${c.color}`} />
            <div className="p-6">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4 min-h-[3.5rem]">{c.title}</h3>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> {c.duration}</li>
                <li className="flex items-center gap-2"><BarChart3 className="h-4 w-4 text-primary" /> {c.level}</li>
                <li className="flex items-center gap-2"><Award className="h-4 w-4 text-healthcare" /> Certification Included</li>
                <li className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-accent" /> Placement Support</li>
              </ul>
              <Link to="/courses">
                <Button variant="hero" size="sm" className="w-full mt-6 rounded-full">Enroll Now</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PopularCourses;
