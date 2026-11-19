import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Briefcase, IndianRupee, Users, ArrowRight, Filter, Star, TrendingUp, Building2, GraduationCap, Target, Award, CheckCircle2, DollarSign } from "lucide-react";
import { useState } from "react";
import DemoVideoSection from "@/components/shared/DemoVideoSection";

import thumbInternship from "@/assets/demo-thumb-internship.jpg";
import thumbJava from "@/assets/demo-thumb-java.jpg";
import thumbHR from "@/assets/demo-thumb-hr.jpg";
import thumbMarketing from "@/assets/demo-thumb-marketing.jpg";
import thumbDesign from "@/assets/demo-thumb-design.jpg";
import thumbNursing from "@/assets/demo-thumb-nursing.jpg";
import thumbDataAnalytics from "@/assets/demo-thumb-data-analytics.jpg";
import thumbCloud from "@/assets/demo-thumb-cloud.jpg";
import thumbCyber from "@/assets/demo-thumb-cybersecurity.jpg";
import thumbPayroll from "@/assets/demo-thumb-payroll.jpg";
import thumbSEO from "@/assets/demo-thumb-seo.jpg";
import thumbMobileDev from "@/assets/demo-thumb-mobile-dev.jpg";

const internshipDemoVideos = [
  { title: "How Internships Work at Aadhyra Innovations", description: "Complete walkthrough of the internship program, tasks, and mentorship", duration: "4:00", category: "Overview", thumbnail: thumbInternship, gradient: "bg-gradient-to-br from-blue-500 to-indigo-700" },
  { title: "IT Internship - Real Project Demo", description: "See how interns build real applications with Java, Python, and React", duration: "5:20", category: "IT Internship", thumbnail: thumbJava, gradient: "bg-gradient-to-br from-emerald-500 to-green-700" },
  { title: "Data Analytics Internship", description: "Work on real datasets, build dashboards and generate business insights", duration: "4:45", category: "IT Internship", thumbnail: thumbDataAnalytics, gradient: "bg-gradient-to-br from-cyan-500 to-blue-700" },
  { title: "Cloud & DevOps Internship", description: "Deploy applications on AWS, manage CI/CD pipelines and containers", duration: "5:10", category: "IT Internship", thumbnail: thumbCloud, gradient: "bg-gradient-to-br from-amber-500 to-orange-700" },
  { title: "Cyber Security Internship", description: "Perform vulnerability assessments and penetration testing on live systems", duration: "4:55", category: "IT Internship", thumbnail: thumbCyber, gradient: "bg-gradient-to-br from-green-700 to-emerald-900" },
  { title: "Mobile App Dev Internship", description: "Build and publish real mobile apps for Android and iOS platforms", duration: "5:15", category: "IT Internship", thumbnail: thumbMobileDev, gradient: "bg-gradient-to-br from-violet-600 to-purple-800" },
  { title: "HR Internship Experience", description: "Learn recruitment, ATS systems, and talent sourcing hands-on", duration: "3:45", category: "HR Internship", thumbnail: thumbHR, gradient: "bg-gradient-to-br from-orange-500 to-amber-700" },
  { title: "Payroll & Compliance Internship", description: "Process real payroll, handle PF/ESI and statutory compliance", duration: "4:10", category: "HR Internship", thumbnail: thumbPayroll, gradient: "bg-gradient-to-br from-rose-500 to-pink-700" },
  { title: "Digital Marketing Internship", description: "Run live campaigns on Google Ads and social media platforms", duration: "4:30", category: "Marketing Internship", thumbnail: thumbMarketing, gradient: "bg-gradient-to-br from-pink-500 to-rose-700" },
  { title: "SEO & Content Internship", description: "Optimize real websites for search engines and create content strategies", duration: "4:00", category: "Marketing Internship", thumbnail: thumbSEO, gradient: "bg-gradient-to-br from-green-500 to-teal-700" },
  { title: "Design Internship Portfolio", description: "Create professional design portfolios during your internship", duration: "3:50", category: "Design Internship", thumbnail: thumbDesign, gradient: "bg-gradient-to-br from-violet-500 to-purple-700" },
  { title: "Nursing Clinical Internship", description: "Hospital-based clinical training and patient care experience", duration: "5:00", category: "Healthcare", thumbnail: thumbNursing, gradient: "bg-gradient-to-br from-cyan-500 to-teal-700" },
];

const categories = ["All", "IT", "HR", "Digital Marketing", "Graphic Design", "Nursing", "Data Science", "Content Writing"];
const durations = ["All Durations", "1 Month", "2 Months", "3 Months", "6 Months"];

const internships = [
  { title: "Java Full Stack Developer Intern", company: "AADHYRA INNOVATIONS", location: "Work From Home", duration: "3 Months", stipend: "₹5,000 - ₹10,000/month", category: "IT", skills: ["Java", "Spring Boot", "React", "MySQL"], applicants: 245, isHot: true, type: "Part-time" },
  { title: "Python & AI/ML Intern", company: "AADHYRA INNOVATIONS", location: "Bangalore", duration: "3 Months", stipend: "₹8,000 - ₹15,000/month", category: "IT", skills: ["Python", "TensorFlow", "Machine Learning"], applicants: 189, isHot: true, type: "Full-time" },
  { title: "HR Recruiter Intern", company: "AADHYRA INNOVATIONS", location: "Work From Home", duration: "2 Months", stipend: "₹5,000/month", category: "HR", skills: ["LinkedIn Recruiting", "ATS", "Sourcing"], applicants: 320, isHot: false, type: "Part-time" },
  { title: "Digital Marketing Intern", company: "AADHYRA INNOVATIONS", location: "Hybrid", duration: "3 Months", stipend: "₹6,000 - ₹10,000/month", category: "Digital Marketing", skills: ["SEO", "Google Ads", "Social Media"], applicants: 410, isHot: true, type: "Part-time" },
  { title: "UI/UX Design Intern", company: "AADHYRA INNOVATIONS", location: "Work From Home", duration: "2 Months", stipend: "₹5,000 - ₹8,000/month", category: "Graphic Design", skills: ["Figma", "Adobe XD", "Prototyping"], applicants: 156, isHot: false, type: "Part-time" },
  { title: "Nursing Clinical Intern", company: "AADHYRA HEALTH CONNECT", location: "Bangalore", duration: "6 Months", stipend: "₹8,000 - ₹12,000/month", category: "Nursing", skills: ["Patient Care", "ICU", "Emergency Care"], applicants: 98, isHot: false, type: "Full-time" },
  { title: "Data Analytics Intern", company: "AADHYRA INNOVATIONS", location: "Work From Home", duration: "3 Months", stipend: "₹7,000 - ₹12,000/month", category: "Data Science", skills: ["SQL", "Python", "Tableau", "Power BI"], applicants: 275, isHot: true, type: "Part-time" },
  { title: "Content Writing Intern", company: "AADHYRA INNOVATIONS", location: "Work From Home", duration: "1 Month", stipend: "₹3,000 - ₹5,000/month", category: "Content Writing", skills: ["Blog Writing", "SEO Content", "Copywriting"], applicants: 530, isHot: false, type: "Part-time" },
  { title: "AWS Cloud Computing Intern", company: "AADHYRA INNOVATIONS", location: "Bangalore", duration: "3 Months", stipend: "₹10,000 - ₹15,000/month", category: "IT", skills: ["AWS", "Docker", "Kubernetes", "DevOps"], applicants: 142, isHot: true, type: "Full-time" },
  { title: "Payroll & Compliance Intern", company: "AADHYRA INNOVATIONS", location: "Hybrid", duration: "2 Months", stipend: "₹4,000 - ₹6,000/month", category: "HR", skills: ["Tally", "Payroll", "Statutory Compliance"], applicants: 87, isHot: false, type: "Part-time" },
  { title: "Social Media Marketing Intern", company: "AADHYRA INNOVATIONS", location: "Work From Home", duration: "2 Months", stipend: "₹5,000 - ₹8,000/month", category: "Digital Marketing", skills: ["Instagram", "Meta Ads", "Content Calendar"], applicants: 390, isHot: false, type: "Part-time" },
  { title: "Adobe Photoshop & Illustrator Intern", company: "AADHYRA INNOVATIONS", location: "Work From Home", duration: "2 Months", stipend: "₹4,000 - ₹7,000/month", category: "Graphic Design", skills: ["Photoshop", "Illustrator", "Branding"], applicants: 210, isHot: false, type: "Part-time" },
];

const InternshipPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All Durations");

  const filtered = internships.filter((i) => {
    const catMatch = selectedCategory === "All" || i.category === selectedCategory;
    const durMatch = selectedDuration === "All Durations" || i.duration === selectedDuration;
    return catMatch && durMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="gradient-hero text-primary-foreground py-12 lg:py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="bg-accent/20 text-accent-foreground border-accent/30 mb-4">🔥 {internships.length}+ internships available</Badge>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Internships That Build Your Career
              </h1>
              <p className="text-lg text-primary-foreground/80">
                Get real work experience with stipend. Learn from industry experts and build your portfolio.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="border-b bg-card">
          <div className="container py-4">
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" /><span className="font-semibold text-foreground">10,000+</span><span className="text-muted-foreground">applications</span></div>
              <div className="flex items-center gap-2"><Building2 className="h-4 w-4 text-primary" /><span className="font-semibold text-foreground">500+</span><span className="text-muted-foreground">companies hiring</span></div>
              <div className="flex items-center gap-2"><Star className="h-4 w-4 text-accent" /><span className="font-semibold text-foreground">95%</span><span className="text-muted-foreground">offer rate</span></div>
            </div>
          </div>
        </section>

        {/* 30 Days HR Internship Spotlight Section */}
        <section className="py-12 bg-muted/20 border-b">
          <div className="container">
            <div className="bg-card border rounded-2xl p-6 md:p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Briefcase className="w-64 h-64" />
              </div>
              <div className="relative z-10">
                <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">⭐ Featured Program</Badge>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">30 Days HR Internship Program</h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-3xl">
                  Learn practical HR work, earn incentives, gain real-time experience, and receive full-time opportunities based on your performance.
                </p>

                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="space-y-4">
                    <h3 className="font-bold flex items-center gap-2"><Target className="h-5 w-5 text-primary" /> The 3 Core Tasks</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /> Mandatory Course Hiring (Min 2 admissions)</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /> Specialization (HR, Employer, Freelance, or Health)</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /> Team Contribution & Daily Reporting</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold flex items-center gap-2"><DollarSign className="h-5 w-5 text-green-600" /> Earnings Structure</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between border-b pb-1"><span>Beginner</span><span className="font-medium">₹1k – ₹3k</span></div>
                      <div className="flex justify-between border-b pb-1"><span>Average</span><span className="font-medium">₹4k – ₹8k</span></div>
                      <div className="flex justify-between"><span>Best Performer</span><span className="font-bold text-green-600">₹10k – ₹20k+</span></div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold flex items-center gap-2"><Award className="h-5 w-5 text-accent" /> Completion Benefits</h3>
                    <div className="flex flex-wrap gap-2 text-xs font-medium">
                      <Badge variant="secondary">Certificate</Badge>
                      <Badge variant="secondary">Experience Letter</Badge>
                      <Badge variant="secondary">Incentives</Badge>
                      <Badge variant="secondary">Team Leader Role</Badge>
                      <Badge className="bg-primary/10 text-primary border-primary/20">Full-Time Job</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Link to="/internships/enroll?course=hr-internship">
                    <Button size="lg" className="gap-2">Apply for HR Internship <ArrowRight className="h-4 w-4" /></Button>
                  </Link>
                  <p className="text-sm text-muted-foreground hidden sm:block">Learn • Earn • Build Career</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Videos */}
        <DemoVideoSection
          title="Internship Program Previews"
          subtitle="See what our interns learn and build during their programs"
          videos={internshipDemoVideos}
        />

        {/* Filters + Listings */}
        <section className="py-8 lg:py-12">
          <div className="container">
            <div className="grid lg:grid-cols-[280px_1fr] gap-8">
              {/* Sidebar Filters */}
              <aside className="space-y-6">
                <div className="bg-card rounded-xl border p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Filter className="h-4 w-4 text-primary" />
                    <h3 className="font-heading font-semibold text-foreground">Filters</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                          <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${selectedCategory === cat ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary"}`}>
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Duration</label>
                      <div className="flex flex-wrap gap-2">
                        {durations.map((dur) => (
                          <button key={dur} onClick={() => setSelectedDuration(dur)} className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${selectedDuration === dur ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary"}`}>
                            {dur}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Internship Cards */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-muted-foreground">{filtered.length} internships found</p>
                </div>

                <div className="space-y-4">
                  {filtered.map((intern, idx) => (
                    <div key={idx} className="bg-card rounded-xl border shadow-card hover:shadow-card-hover transition-all p-5 group">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">{intern.title}</h3>
                            {intern.isHot && <Badge className="bg-destructive/10 text-destructive text-xs">🔥 Actively hiring</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{intern.company}</p>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{intern.location}</span>
                            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{intern.duration}</span>
                            <span className="flex items-center gap-1"><IndianRupee className="h-3.5 w-3.5" />{intern.stipend}</span>
                            <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{intern.type}</span>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {intern.skills.map((s) => (
                              <span key={s} className="px-2 py-0.5 text-xs rounded-md bg-primary/10 text-primary">{s}</span>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <span className="text-xs text-muted-foreground flex items-center gap-1"><Users className="h-3 w-3" />{intern.applicants} applicants</span>
                          <Link to="/apply">
                            <Button size="sm" className="group/btn">
                              Apply Now <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default InternshipPage;
