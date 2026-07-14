import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Clock, ArrowRight, Users, Zap, Heart, Search, Filter, IndianRupee, Loader2, Monitor, TrendingUp, Palette, Stethoscope, CheckCircle2, Code2, Bot, FileCheck, Mail, Target, Camera, Upload, GraduationCap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

const departments = [
  { id: "all", name: "All Jobs", icon: Briefcase, color: "bg-primary" },
  { id: "IT", name: "IT Jobs", icon: Monitor, color: "bg-tech" },
  { id: "HR", name: "HR Jobs", icon: Users, color: "bg-hr" },
  { id: "Digital Marketing", name: "Marketing Jobs", icon: TrendingUp, color: "bg-marketing" },
  { id: "Graphic Design", name: "Design Jobs", icon: Palette, color: "bg-design" },
  { id: "Nursing", name: "Nursing Jobs", icon: Stethoscope, color: "bg-healthcare" },
];

interface JobPosting {
  id: string;
  title: string;
  department: string;
  company_name: string | null;
  location: string | null;
  job_type: string;
  salary_min: number | null;
  salary_max: number | null;
  experience_min: number | null;
  experience_max: number | null;
  description: string | null;
  skills: string[] | null;
}

const formatSalary = (amount: number | null) => {
  if (!amount) return null;
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} LPA`;
  }
  return `₹${amount.toLocaleString()}`;
};

const CareersPage = () => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      let query = supabase
        .from('job_postings')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (selectedDept !== "all") {
        query = query.eq('department', selectedDept);
      }

      const { data, error } = await query;
      if (!error && data) {
        setJobs(data as JobPosting[]);
      }
      setLoading(false);
    };

    fetchJobs();
  }, [selectedDept]);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="gradient-hero text-primary-foreground py-16 lg:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Find Your Dream Job
              </h1>
              <p className="text-lg text-white/80 mb-8">
                Explore opportunities across IT, HR, Digital Marketing, Graphic Design & Nursing. Salary range: ₹4 LPA to ₹35 LPA.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search jobs, companies, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              
              <div className="flex justify-center gap-8 mt-8">
                <div className="text-center">
                  <div className="text-4xl font-heading font-bold">{jobs.length}+</div>
                  <div className="text-sm text-white/70">Active Jobs</div>
                </div>
                <div className="w-px bg-white/20" />
                <div className="text-center">
                  <div className="text-4xl font-heading font-bold">500+</div>
                  <div className="text-sm text-white/70">Partner Companies</div>
                </div>
                <div className="w-px bg-white/20" />
                <div className="text-center">
                  <div className="text-4xl font-heading font-bold">35 LPA</div>
                  <div className="text-sm text-white/70">Top Salary</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Department Filters */}
        <section className="py-8 border-b">
          <div className="container">
            <div className="flex flex-wrap gap-3 justify-center">
              {departments.map((dept) => {
                const Icon = dept.icon;
                return (
                  <button
                    key={dept.id}
                    onClick={() => setSelectedDept(dept.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
                      selectedDept === dept.id
                        ? `${dept.color} text-white shadow-lg`
                        : "bg-muted hover:bg-muted/80 text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {dept.name}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Job Openings */}
        <section className="py-12 lg:py-16">
          <div className="container">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-16">
                <Briefcase className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid gap-4 max-w-4xl mx-auto">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="bg-card rounded-xl border shadow-card p-6 hover:shadow-card-hover transition-all group">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                            {job.title}
                          </h3>
                          <Badge variant="secondary" className="capitalize">
                            {job.department}
                          </Badge>
                        </div>
                        
                        {job.company_name && (
                          <p className="text-primary font-medium mb-2">{job.company_name}</p>
                        )}
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                          {job.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" /> {job.location}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" /> {job.job_type}
                          </span>
                          {(job.experience_min !== null || job.experience_max !== null) && (
                            <span>
                              Exp: {job.experience_min || 0} - {job.experience_max || '5+'} years
                            </span>
                          )}
                        </div>
                        
                        {/* Salary */}
                        {(job.salary_min || job.salary_max) && (
                          <div className="flex items-center gap-2 text-healthcare font-semibold mb-3">
                            <IndianRupee className="h-4 w-4" />
                            {formatSalary(job.salary_min)} - {formatSalary(job.salary_max)}
                          </div>
                        )}
                        
                        {/* Skills */}
                        {job.skills && job.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {(job.skills as string[]).slice(0, 4).map((skill, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {(job.skills as string[]).length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{(job.skills as string[]).length - 4} more
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <Link to="/auth">
                          <Button variant="hero" className="group whitespace-nowrap">
                            Apply Now
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Apply CTA */}
            <div className="text-center mt-12 bg-muted/30 rounded-2xl p-8">
              <h3 className="font-heading text-2xl font-bold mb-3">Ready to Start Your Career?</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Freshers ₹300 · Experienced ₹700 — complete Technical MCQ, Coding & Project Task, and AI HR Interview to get placed in top companies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth">
                  <Button variant="hero" size="lg">Apply Now</Button>
                </Link>
                <Link to="/placement">
                  <Button variant="outline" size="lg">Learn About Process</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Candidate Evaluation & Hiring Process */}
        <section className="py-16 lg:py-20 bg-muted/20 border-t">
          <div className="container max-w-6xl">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/10 border-primary/20">
                AADHYRA INNOVATIONS PVT. LTD.
              </Badge>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Candidate Evaluation & Hiring Process
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                To ensure a fair and skill-based hiring process, all applicants will
                undergo our structured evaluation system.
              </p>
            </div>

            {/* Evaluation Fee */}
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              <div className="bg-card rounded-2xl border-2 border-primary/20 p-8 text-center shadow-card">
                <GraduationCap className="h-10 w-10 text-primary mx-auto mb-3" />
                <p className="text-sm font-medium text-muted-foreground mb-1">Freshers</p>
                <div className="flex items-center justify-center text-4xl font-heading font-bold text-foreground">
                  <IndianRupee className="h-7 w-7" />300
                </div>
                <p className="text-xs text-muted-foreground mt-3">0 – 1 year experience</p>
              </div>
              <div className="bg-card rounded-2xl border-2 border-primary/20 p-8 text-center shadow-card">
                <Briefcase className="h-10 w-10 text-primary mx-auto mb-3" />
                <p className="text-sm font-medium text-muted-foreground mb-1">Experienced Candidates</p>
                <div className="flex items-center justify-center text-4xl font-heading font-bold text-foreground">
                  <IndianRupee className="h-7 w-7" />700
                </div>
                <p className="text-xs text-muted-foreground mt-3">1+ years experience</p>
              </div>
              <p className="md:col-span-2 text-center text-sm text-muted-foreground">
                The evaluation fee covers the complete assessment process and
                candidate performance report.
              </p>
            </div>

            {/* Rounds */}
            <h3 className="font-heading text-2xl font-bold text-center mb-8">Hiring Process</h3>
            <div className="space-y-6">
              {/* Round 1 */}
              <div className="bg-card rounded-2xl border p-6 md:p-8 shadow-card">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-tech/10 text-tech flex items-center justify-center flex-shrink-0">
                    <Monitor className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge className="bg-tech/10 text-tech border-tech/20 hover:bg-tech/10">Round 1</Badge>
                      <h4 className="font-heading font-semibold text-lg">Technical Assessment (Online)</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-tech mt-0.5 flex-shrink-0" /> Online MCQ test based on the candidate's selected domain.</li>
                      <li className="flex gap-2"><Camera className="h-4 w-4 text-tech mt-0.5 flex-shrink-0" /> Webcam monitoring during the assessment.</li>
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-tech mt-0.5 flex-shrink-0" /> Basic aptitude and technical knowledge evaluation.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Round 2 */}
              <div className="bg-card rounded-2xl border p-6 md:p-8 shadow-card">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-marketing/10 text-marketing flex items-center justify-center flex-shrink-0">
                    <Code2 className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge className="bg-marketing/10 text-marketing border-marketing/20 hover:bg-marketing/10">Round 2</Badge>
                      <h4 className="font-heading font-semibold text-lg">Technical Coding & Practical Task</h4>
                    </div>
                    <div className="space-y-4 text-sm">
                      <div>
                        <p className="font-medium text-foreground mb-1">2 Coding Questions</p>
                        <p className="text-muted-foreground">Candidates must solve two programming problems related to their technology stack.</p>
                      </div>
                      <div>
                        <p className="font-medium text-foreground mb-1">Project-Based Assignment</p>
                        <p className="text-muted-foreground mb-2">
                          Real-world task based on the selected skill (e.g., React, Java Full Stack, Python, UI/UX, Testing, etc.).
                        </p>
                        <div className="flex items-center gap-2 text-marketing font-medium mb-3">
                          <Clock className="h-4 w-4" /> Time to complete: 2 Days
                        </div>
                        <p className="font-medium text-foreground mb-1">Candidates must upload:</p>
                        <ul className="grid sm:grid-cols-2 gap-2 text-muted-foreground">
                          <li className="flex gap-2"><Upload className="h-4 w-4 text-marketing mt-0.5 flex-shrink-0" /> Source Code</li>
                          <li className="flex gap-2"><Upload className="h-4 w-4 text-marketing mt-0.5 flex-shrink-0" /> Working Project</li>
                          <li className="flex gap-2"><FileCheck className="h-4 w-4 text-marketing mt-0.5 flex-shrink-0" /> Project Documentation (PDF)</li>
                          <li className="flex gap-2"><FileCheck className="h-4 w-4 text-marketing mt-0.5 flex-shrink-0" /> Explanation of the solution & approach</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Round 3 */}
              <div className="bg-card rounded-2xl border p-6 md:p-8 shadow-card">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-hr/10 text-hr flex items-center justify-center flex-shrink-0">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge className="bg-hr/10 text-hr border-hr/20 hover:bg-hr/10">Round 3</Badge>
                      <h4 className="font-heading font-semibold text-lg">AI HR Interview</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Candidates who successfully complete the technical rounds will attend an AI-powered HR interview covering:
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                      {[
                        "Self Introduction",
                        "Communication Skills",
                        "Project Discussion",
                        "Career Goals",
                        "Salary Expectations",
                        "Notice Period (experienced)",
                        "Availability to Join",
                      ].map((item) => (
                        <li key={item} className="flex gap-2">
                          <CheckCircle2 className="h-4 w-4 text-hr mt-0.5 flex-shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Result & Feedback */}
            <div className="mt-10 bg-card rounded-2xl border p-6 md:p-8 shadow-card">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-lg mb-3">Result & Feedback</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" /> Candidate performance will be reviewed after all evaluation rounds.</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" /> A detailed evaluation report will be generated.</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" /> Interview result and feedback will be sent to the candidate's registered email address.</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" /> Shortlisted candidates will receive further interview or offer letter communication from the AADHYRA HR Team.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Our Goal */}
            <div className="mt-10 rounded-2xl p-8 md:p-10 gradient-hero text-primary-foreground text-center">
              <Target className="h-10 w-10 mx-auto mb-4 opacity-90" />
              <h4 className="font-heading text-2xl font-bold mb-3">Our Goal</h4>
              <p className="max-w-2xl mx-auto text-white/85">
                We believe in selecting candidates based on real skills, practical
                knowledge, and problem-solving ability — ensuring every applicant
                gets a transparent and professional evaluation experience.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CareersPage;
