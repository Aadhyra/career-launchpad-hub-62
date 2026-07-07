import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, Users, Award, ArrowRight, Star, IndianRupee } from "lucide-react";
import thumbJava from "@/assets/demo-thumb-java.jpg";
import thumbPython from "@/assets/demo-thumb-python-ai.jpg";
import thumbAI from "@/assets/demo-thumb-data-analytics.jpg";
import thumbCloud from "@/assets/demo-thumb-cloud.jpg";
import thumbCyber from "@/assets/demo-thumb-cybersecurity.jpg";
import thumbHR from "@/assets/demo-thumb-hr.jpg";
import thumbPayroll from "@/assets/demo-thumb-payroll.jpg";
import thumbMarketing from "@/assets/demo-thumb-marketing.jpg";
import thumbSeo from "@/assets/demo-thumb-seo.jpg";
import thumbDesign from "@/assets/demo-thumb-design.jpg";
import thumbNursing from "@/assets/demo-thumb-nursing.jpg";
import thumbMobile from "@/assets/demo-thumb-mobile-dev.jpg";

interface Course {
  id?: string;
  title: string;
  duration: string;
  students: string;
  category: string;
  categoryColor: string;
  image: string;
  rating: number;
  reviews: number;
  fee: number;
}

interface CourseSection {
  title: string;
  titleColor: string;
  courses: Course[];
  href: string;
}

const courseSections: CourseSection[] = [
  {
    title: "IT Courses",
    titleColor: "text-tech",
    href: "/courses/it",
    courses: [
      { title: "Java Full Stack", duration: "6 Months", students: "500+", category: "Development", categoryColor: "bg-tech/10 text-tech", image: thumbJava, rating: 4.8, reviews: 1248, fee: 19999 },
      { title: "Python Full Stack", duration: "6 Months", students: "450+", category: "Development", categoryColor: "bg-tech/10 text-tech", image: thumbPython, rating: 4.7, reviews: 1102, fee: 19999 },
      { title: "AI / Machine Learning", duration: "4 Months", students: "300+", category: "AI/ML", categoryColor: "bg-tech/10 text-tech", image: thumbAI, rating: 4.9, reviews: 876, fee: 19999 },
      { title: "Data Analytics", duration: "3 Months", students: "400+", category: "Data", categoryColor: "bg-tech/10 text-tech", image: thumbAI, rating: 4.7, reviews: 945, fee: 19999 },
      { title: "AWS & Cloud Computing", duration: "3 Months", students: "350+", category: "Cloud", categoryColor: "bg-tech/10 text-tech", image: thumbCloud, rating: 4.6, reviews: 712, fee: 19999 },
      { title: "Cyber Security", duration: "4 Months", students: "250+", category: "Security", categoryColor: "bg-tech/10 text-tech", image: thumbCyber, rating: 4.8, reviews: 638, fee: 19999 },
    ],
  },
  {
    title: "HR Training Programs",
    titleColor: "text-hr",
    href: "/courses/hr",
    courses: [
      { title: "HR Generalist", duration: "3 Months", students: "300+", category: "Core HR", categoryColor: "bg-hr/10 text-hr", image: thumbHR, rating: 4.7, reviews: 524, fee: 5999 },
      { title: "HR Recruiter (IT & Non-IT)", duration: "2 Months", students: "400+", category: "Recruitment", categoryColor: "bg-hr/10 text-hr", image: thumbHR, rating: 4.8, reviews: 612, fee: 5999 },
      { title: "Payroll & Compliance", duration: "2 Months", students: "200+", category: "Payroll", categoryColor: "bg-hr/10 text-hr", image: thumbPayroll, rating: 4.6, reviews: 388, fee: 5999 },
      { title: "Talent Acquisition", duration: "2 Months", students: "250+", category: "Hiring", categoryColor: "bg-hr/10 text-hr", image: thumbHR, rating: 4.7, reviews: 421, fee: 5999 },
    ],
  },
  {
    title: "Digital Marketing Courses",
    titleColor: "text-marketing",
    href: "/courses/digital-marketing",
    courses: [
      { title: "Complete Digital Marketing", duration: "4 Months", students: "500+", category: "Full Course", categoryColor: "bg-marketing/10 text-marketing", image: thumbMarketing, rating: 4.8, reviews: 1320, fee: 19999 },
      { title: "SEO Mastery", duration: "2 Months", students: "350+", category: "SEO", categoryColor: "bg-marketing/10 text-marketing", image: thumbSeo, rating: 4.7, reviews: 678, fee: 19999 },
      { title: "Social Media Marketing", duration: "2 Months", students: "400+", category: "SMM", categoryColor: "bg-marketing/10 text-marketing", image: thumbMarketing, rating: 4.6, reviews: 712, fee: 19999 },
      { title: "Google Ads (PPC)", duration: "1 Month", students: "300+", category: "Ads", categoryColor: "bg-marketing/10 text-marketing", image: thumbSeo, rating: 4.7, reviews: 489, fee: 19999 },
    ],
  },
  {
    title: "Graphic Design Courses",
    titleColor: "text-design",
    href: "/courses/graphic-design",
    courses: [
      { title: "Adobe Photoshop", duration: "2 Months", students: "400+", category: "Design", categoryColor: "bg-design/10 text-design", image: thumbDesign, rating: 4.7, reviews: 612, fee: 19999 },
      { title: "Adobe Illustrator", duration: "2 Months", students: "350+", category: "Vector", categoryColor: "bg-design/10 text-design", image: thumbDesign, rating: 4.6, reviews: 488, fee: 19999 },
      { title: "UI/UX Design", duration: "3 Months", students: "250+", category: "UI/UX", categoryColor: "bg-design/10 text-design", image: thumbMobile, rating: 4.9, reviews: 798, fee: 19999 },
      { title: "Branding & Visual Design", duration: "2 Months", students: "200+", category: "Branding", categoryColor: "bg-design/10 text-design", image: thumbDesign, rating: 4.6, reviews: 322, fee: 19999 },
    ],
  },
  {
    title: "Nursing Training Programs",
    titleColor: "text-healthcare",
    href: "/courses/nursing",
    courses: [
      { title: "Advanced Clinical Training", duration: "6 Months", students: "300+", category: "Clinical", categoryColor: "bg-healthcare/10 text-healthcare", image: thumbNursing, rating: 4.9, reviews: 542, fee: 20999 },
      { title: "ICU & Emergency Care", duration: "3 Months", students: "250+", category: "Critical Care", categoryColor: "bg-healthcare/10 text-healthcare", image: thumbNursing, rating: 4.8, reviews: 412, fee: 20999 },
      { title: "Patient Care & Documentation", duration: "2 Months", students: "400+", category: "Care", categoryColor: "bg-healthcare/10 text-healthcare", image: thumbNursing, rating: 4.7, reviews: 388, fee: 20999 },
      { title: "Medical Equipment Handling", duration: "1 Month", students: "200+", category: "Equipment", categoryColor: "bg-healthcare/10 text-healthcare", image: thumbNursing, rating: 4.6, reviews: 244, fee: 20999 },
    ],
  },
];

const Stars = ({ rating }: { rating: number }) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full || (i === full && half);
        return (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${filled ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
          />
        );
      })}
    </div>
  );
};

const CourseCards = () => {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container">
        {courseSections.map((section, sectionIndex) => (
          <div key={section.title} className={sectionIndex > 0 ? "mt-20" : ""}>
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <h2 className={`font-heading text-2xl md:text-3xl font-bold ${section.titleColor}`}>
                {section.title}
              </h2>
              <Link to={section.href}>
                <Button variant="outline" size="sm" className="group">
                  View All
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Course Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {section.courses.map((course) => (
                <div
                  key={course.title}
                  className="group bg-card rounded-xl border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-36 overflow-hidden bg-muted">
                    <img
                      src={course.image}
                      alt={course.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold ${course.categoryColor} backdrop-blur-sm`}>
                      {course.category}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    {/* Category Badge */}
                    {/* Course Title */}
                    <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {course.title}
                    </h3>

                    {/* Rating row */}
                    <div className="flex items-center gap-2 mb-3">
                      <Stars rating={course.rating} />
                      <span className="text-xs font-semibold text-foreground">{course.rating.toFixed(1)}</span>
                      <span className="text-xs text-muted-foreground">({course.reviews.toLocaleString("en-IN")})</span>
                    </div>

                    {/* Course Meta */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="h-4 w-4" />
                        <span>{course.students}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mt-auto flex items-baseline gap-1 pt-2">
                      <IndianRupee className="h-4 w-4 text-primary" />
                      <span className="text-xl font-bold text-primary">{course.fee.toLocaleString("en-IN")}</span>
                      <span className="text-xs text-muted-foreground">+GST</span>
                    </div>
                  </div>
                  
                  {/* Footer */}
                  <div className="px-5 py-3 bg-muted/30 border-t flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Award className="h-4 w-4" />
                      <span>Certificate</span>
                    </div>
                    <Link to="/apply" className="text-sm font-medium text-primary hover:underline">
                      Enroll Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourseCards;
