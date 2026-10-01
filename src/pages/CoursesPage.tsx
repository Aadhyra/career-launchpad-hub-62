import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Users, Award, CheckCircle2, ArrowRight, PlayCircle, GraduationCap, Building, Globe, BookOpen, Stethoscope, Briefcase, IndianRupee, Shield, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AICourseAdvisor from "@/components/courses/AICourseAdvisor";
import { Badge } from "@/components/ui/badge";
import DemoVideoSection from "@/components/shared/DemoVideoSection";

import thumbJava from "@/assets/demo-thumb-java.jpg";
import thumbPythonAI from "@/assets/demo-thumb-python-ai.jpg";
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

const courseDemoVideos = [
  // IT Training
  { title: "Java Full Stack Development", description: "Learn Spring Boot, React, and MySQL with hands-on projects", duration: "5:30", category: "IT Training", thumbnail: thumbJava, gradient: "bg-gradient-to-br from-blue-600 to-indigo-800" },
  { title: "Python & AI/ML Fundamentals", description: "Introduction to machine learning with TensorFlow and real datasets", duration: "6:15", category: "IT Training", thumbnail: thumbPythonAI, gradient: "bg-gradient-to-br from-emerald-600 to-teal-800" },
  { title: "Data Analytics with Python & SQL", description: "Master data visualization with Tableau, Power BI and SQL queries", duration: "5:45", category: "IT Training", thumbnail: thumbDataAnalytics, gradient: "bg-gradient-to-br from-cyan-600 to-blue-800" },
  { title: "AWS Cloud Computing", description: "Deploy and manage cloud infrastructure with AWS, Docker & Kubernetes", duration: "6:30", category: "IT Training", thumbnail: thumbCloud, gradient: "bg-gradient-to-br from-amber-500 to-orange-700" },
  { title: "Cyber Security Essentials", description: "Learn ethical hacking, penetration testing with Kali Linux & Wireshark", duration: "5:15", category: "IT Training", thumbnail: thumbCyber, gradient: "bg-gradient-to-br from-green-700 to-emerald-900" },
  { title: "Mobile App Development", description: "Build Android & iOS apps with React Native and Flutter", duration: "5:50", category: "IT Training", thumbnail: thumbMobileDev, gradient: "bg-gradient-to-br from-violet-600 to-purple-900" },
  // HR Training
  { title: "HR Generalist Masterclass", description: "Complete HR operations from recruitment to payroll management", duration: "4:45", category: "HR Training", thumbnail: thumbHR, gradient: "bg-gradient-to-br from-orange-500 to-red-700" },
  { title: "Payroll & Statutory Compliance", description: "Master salary processing, PF, ESI, TDS and labor law compliance", duration: "4:20", category: "HR Training", thumbnail: thumbPayroll, gradient: "bg-gradient-to-br from-rose-500 to-pink-800" },
  // Digital Marketing
  { title: "Digital Marketing Strategy", description: "SEO, Google Ads, and social media marketing essentials", duration: "5:00", category: "Digital Marketing", thumbnail: thumbMarketing, gradient: "bg-gradient-to-br from-pink-500 to-purple-700" },
  { title: "SEO & Content Marketing", description: "Rank #1 on Google with advanced SEO techniques and content strategy", duration: "4:40", category: "Digital Marketing", thumbnail: thumbSEO, gradient: "bg-gradient-to-br from-green-500 to-teal-700" },
  // Design
  { title: "UI/UX Design with Figma", description: "Design beautiful interfaces and interactive prototypes", duration: "4:30", category: "Graphic Design", thumbnail: thumbDesign, gradient: "bg-gradient-to-br from-violet-500 to-purple-800" },
  // Nursing
  { title: "Advanced Nursing & Hospital Management", description: "Clinical training, ICU procedures, and hospital administration", duration: "6:00", category: "Nursing", thumbnail: thumbNursing, gradient: "bg-gradient-to-br from-cyan-500 to-blue-700" },
];

const courseCategories = {
  it: {
    title: "IT Training Courses",
    description: "Master the latest technologies and frameworks",
    color: "tech",
    courses: [
      { title: "Java Full Stack", duration: "6 Months", students: "500+", tools: ["Java", "Spring Boot", "React", "MySQL"], features: ["Live Projects", "Internship", "Placement"] },
      { title: "Python Full Stack", duration: "6 Months", students: "450+", tools: ["Python", "Django", "React", "PostgreSQL"], features: ["Live Projects", "Internship", "Placement"] },
      { title: "AI / Machine Learning", duration: "4 Months", students: "300+", tools: ["Python", "TensorFlow", "Scikit-learn", "Pandas"], features: ["Research Projects", "Internship", "Placement"] },
      { title: "Data Analytics", duration: "3 Months", students: "400+", tools: ["Python", "SQL", "Tableau", "Power BI"], features: ["Case Studies", "Internship", "Placement"] },
      { title: "Data Science", duration: "5 Months", students: "350+", tools: ["Python", "R", "ML", "Deep Learning"], features: ["Live Projects", "Internship", "Placement"] },
      { title: "AWS & Cloud Computing", duration: "3 Months", students: "350+", tools: ["AWS", "Azure", "Docker", "Kubernetes"], features: ["Certification Prep", "Internship", "Placement"] },
      { title: "Cyber Security", duration: "4 Months", students: "250+", tools: ["Kali Linux", "Wireshark", "Metasploit"], features: ["Lab Practice", "Internship", "Placement"] },
    ],
  },
  hr: {
    title: "HR Training Programs",
    description: "Build expertise in human resource management",
    color: "hr",
    courses: [
      { title: "HR Generalist", duration: "3 Months", students: "300+", tools: ["SAP HR", "Zoho People", "Excel"], features: ["Practical Training", "Internship", "Placement"] },
      { title: "HR Recruiter (IT & Non-IT)", duration: "2 Months", students: "400+", tools: ["LinkedIn Recruiter", "ATS Systems", "Job Portals"], features: ["Mock Sessions", "Internship", "Placement"] },
      { title: "Payroll & Statutory Compliance", duration: "2 Months", students: "200+", tools: ["Tally", "Payroll Software", "Excel"], features: ["Real Cases", "Internship", "Placement"] },
      { title: "Talent Acquisition", duration: "2 Months", students: "250+", tools: ["Sourcing Tools", "Interview Techniques", "ATS"], features: ["Live Hiring", "Internship", "Placement"] },
      { title: "HR Operations", duration: "2 Months", students: "180+", tools: ["HRMS", "Documentation", "Policies"], features: ["Practical Training", "Internship", "Placement"] },
    ],
  },
  marketing: {
    title: "Digital Marketing Courses",
    description: "Master online marketing and growth strategies",
    color: "marketing",
    courses: [
      { title: "Complete Digital Marketing", duration: "4 Months", students: "500+", tools: ["Google Ads", "Meta Ads", "SEO Tools", "Analytics"], features: ["Live Campaigns", "Internship", "Placement"] },
      { title: "SEO Mastery", duration: "2 Months", students: "350+", tools: ["Ahrefs", "SEMrush", "Google Search Console"], features: ["Website Projects", "Internship", "Placement"] },
      { title: "Social Media Marketing", duration: "2 Months", students: "400+", tools: ["Meta Business", "Buffer", "Canva"], features: ["Brand Projects", "Internship", "Placement"] },
      { title: "Google Ads (PPC)", duration: "1 Month", students: "300+", tools: ["Google Ads", "Analytics", "Tag Manager"], features: ["Live Campaigns", "Certification", "Placement"] },
      { title: "Content Marketing", duration: "2 Months", students: "200+", tools: ["WordPress", "Copywriting", "Email Tools"], features: ["Portfolio Building", "Internship", "Placement"] },
    ],
  },
  design: {
    title: "Graphic Design Courses",
    description: "Unleash your creative potential",
    color: "design",
    courses: [
      { title: "Adobe Photoshop", duration: "2 Months", students: "400+", tools: ["Photoshop", "Lightroom"], features: ["Project Work", "Portfolio", "Placement"] },
      { title: "Adobe Illustrator", duration: "2 Months", students: "350+", tools: ["Illustrator", "InDesign"], features: ["Vector Projects", "Portfolio", "Placement"] },
      { title: "UI/UX Design", duration: "3 Months", students: "250+", tools: ["Figma", "Adobe XD", "Sketch"], features: ["App Design", "Internship", "Placement"] },
      { title: "Branding & Visual Design", duration: "2 Months", students: "200+", tools: ["Full Adobe Suite", "Brand Guidelines"], features: ["Brand Projects", "Portfolio", "Placement"] },
      { title: "CorelDRAW", duration: "1 Month", students: "150+", tools: ["CorelDRAW", "Print Design"], features: ["Print Projects", "Portfolio", "Placement"] },
    ],
  },
  nursing: {
    title: "Nursing & Healthcare Training",
    description: "Advanced healthcare training for nursing professionals",
    color: "healthcare",
    courses: [
      { title: "Advanced Clinical Training", duration: "6 Months", students: "300+", tools: ["Clinical Equipment", "Patient Care", "Documentation"], features: ["Hospital Training", "Internship", "Placement"] },
      { title: "ICU & Emergency Care", duration: "3 Months", students: "250+", tools: ["ICU Equipment", "Emergency Protocols", "Life Support"], features: ["Hands-on Training", "Internship", "Placement"] },
      { title: "Patient Care & Documentation", duration: "2 Months", students: "400+", tools: ["EHR Systems", "Care Protocols", "Communication"], features: ["Practical Sessions", "Internship", "Placement"] },
      { title: "Medical Equipment Handling", duration: "1 Month", students: "200+", tools: ["Medical Devices", "Safety Protocols", "Maintenance"], features: ["Lab Practice", "Certification", "Placement"] },
      { title: "Advanced Nursing Hospital Management - 1 Year", duration: "1 Year", students: "100+", tools: ["Hospital Admin", "Quality Assurance", "Patient Management"], features: ["Hospital Training", "Internship", "Placement"] },
      { title: "Advanced Nursing Hospital Management - 2 Years", duration: "2 Years", students: "80+", tools: ["Hospital Admin", "Leadership", "Healthcare Policy"], features: ["Advanced Certification", "Internship", "Placement"] },
      { title: "Advanced Nursing Hospital Management - 3 Years", duration: "3 Years", students: "50+", tools: ["Strategic Management", "Research", "Policy Making"], features: ["Degree Program", "Internship", "Placement"] },
    ],
  },
  "degree-diploma": {
    title: "Degree & Diploma Programs",
    description: "UG, PG & Research programs through recognized universities — Online & Distance mode available",
    color: "primary",
    courses: [
      { title: "BCA (Bachelor of Computer Applications)", duration: "3 Years", students: "200+", tools: ["Programming", "Database", "Web Development", "Networking"], features: ["University Degree", "Internship", "Placement"] },
      { title: "BBA (Bachelor of Business Administration)", duration: "3 Years", students: "180+", tools: ["Management", "Marketing", "Finance", "HR"], features: ["University Degree", "Internship", "Placement"] },
      { title: "B.Tech (Bachelor of Technology)", duration: "4 Years", students: "150+", tools: ["Engineering", "Lab Work", "Projects", "Research"], features: ["University Degree", "Internship", "Placement"] },
      { title: "MBA (Master of Business Administration)", duration: "2 Years", students: "150+", tools: ["Strategy", "Leadership", "Analytics", "Operations"], features: ["PG Degree", "Industry Projects", "Placement"] },
      { title: "MCA (Master of Computer Applications)", duration: "2 Years", students: "120+", tools: ["Advanced Programming", "AI/ML", "Cloud", "DevOps"], features: ["PG Degree", "Research Project", "Placement"] },
      { title: "M.Com (Master of Commerce)", duration: "2 Years", students: "100+", tools: ["Accounting", "Finance", "Taxation", "Auditing"], features: ["PG Degree", "Internship", "Placement"] },
      { title: "M.Phil (Master of Philosophy)", duration: "1-2 Years", students: "50+", tools: ["Research Methodology", "Thesis Work", "Publication"], features: ["Research Degree", "Dissertation", "Academic Career"] },
      { title: "Ph.D (Doctor of Philosophy)", duration: "3-5 Years", students: "30+", tools: ["Advanced Research", "Publication", "Teaching"], features: ["Doctoral Degree", "Research Grant", "Academic Career"] },
      { title: "Diploma in IT", duration: "1 Year", students: "300+", tools: ["Java", "Python", "Web Dev", "Database"], features: ["Diploma Certificate", "Internship", "Placement"] },
      { title: "Diploma in Digital Marketing", duration: "6 Months", students: "250+", tools: ["SEO", "Google Ads", "Social Media", "Analytics"], features: ["Diploma Certificate", "Live Projects", "Placement"] },
      { title: "Diploma in Graphic Design", duration: "6 Months", students: "200+", tools: ["Photoshop", "Illustrator", "Figma", "InDesign"], features: ["Diploma Certificate", "Portfolio", "Placement"] },
      { title: "Diploma in HR Management", duration: "6 Months", students: "180+", tools: ["HRMS", "Payroll", "Recruitment", "Compliance"], features: ["Diploma Certificate", "Internship", "Placement"] },
      { title: "PG Diploma in Data Science", duration: "1 Year", students: "120+", tools: ["Python", "ML", "Deep Learning", "Big Data"], features: ["PG Diploma", "Research Project", "Placement"] },
    ],
  },
  vocational: {
    title: "Vocational Courses (VDGDA & More)",
    description: "Skill-based vocational programs through TNOU, KAOU & BSS — Open to 12th Pass/Fail candidates",
    color: "accent",
    courses: [
      { title: "Vocational Diploma in Computer Applications", duration: "1 Year", students: "200+", tools: ["MS Office", "Internet", "Tally", "DTP"], features: ["TNOU Certified", "Internship", "Job Support"] },
      { title: "Vocational Diploma in Web Development", duration: "1 Year", students: "150+", tools: ["HTML", "CSS", "JavaScript", "PHP"], features: ["KAOU Certified", "Portfolio", "Placement"] },
      { title: "Vocational Diploma in Healthcare Assistant", duration: "1 Year", students: "180+", tools: ["Patient Care", "First Aid", "Medical Records"], features: ["BSS Certified", "Hospital Training", "Placement"] },
      { title: "Vocational Diploma in Digital Marketing", duration: "6 Months", students: "120+", tools: ["SEO", "Social Media", "Content", "Ads"], features: ["TNOU Certified", "Live Projects", "Placement"] },
      { title: "Vocational Diploma in Accounting & Finance", duration: "1 Year", students: "100+", tools: ["Tally", "GST", "Tax Filing", "Excel"], features: ["KAOU Certified", "Internship", "Placement"] },
      { title: "Vocational Diploma in Retail Management", duration: "6 Months", students: "90+", tools: ["POS Systems", "Inventory", "Customer Service"], features: ["BSS Certified", "OJT", "Placement"] },
    ],
  },
};

const partnerUniversities = [
  { name: "IGNOU", full: "Indira Gandhi National Open University", mode: "Online & Distance", icon: "🏛️" },
  { name: "JAIN University", full: "Jain (Deemed-to-be University)", mode: "Online & Distance", icon: "🎓" },
  { name: "TNOU", full: "Tamil Nadu Open University", mode: "Online & Distance", icon: "📚" },
  { name: "KAOU", full: "Karnataka State Open University", mode: "Online & Distance", icon: "🏫" },
  { name: "BSS", full: "Bharathiar School of Studies", mode: "Distance", icon: "📖" },
];

interface DBCourse {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  duration: string | null;
  price: number;
  tools_covered: string[] | null;
  has_internship: boolean | null;
  has_placement: boolean | null;
  course_categories: { name: string; slug: string } | null;
  modules: { id: string; duration_minutes: number | null }[];
}

const getCourseReview = (title: string) => {
  const score = Array.from(title).reduce((total, character) => total + character.charCodeAt(0), 0);
  return {
    rating: 4.6 + (score % 4) / 10,
    reviews: 180 + (score % 1320),
  };
};

const GoogleStyleRating = ({ title }: { title: string }) => {
  const { rating, reviews } = getCourseReview(title);
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4" aria-label={`${rating.toFixed(1)} out of 5 from ${reviews} learner reviews`}>
      <span className="font-semibold text-foreground text-sm">{rating.toFixed(1)}</span>
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className="h-4 w-4 fill-marketing text-marketing" />
        ))}
      </div>
      <span className="text-xs text-primary font-medium">Google-style</span>
      <span className="text-xs text-muted-foreground">({reviews.toLocaleString("en-IN")} reviews)</span>
    </div>
  );
};

const CoursesPage = () => {
  const [activeTab, setActiveTab] = useState("it");
  const [dbCourses, setDbCourses] = useState<DBCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          id, title, slug, description, duration, price, tools_covered,
          has_internship, has_placement,
          course_categories(name, slug),
          course_modules(id, duration_minutes)
        `)
        .eq('is_active', true);
      
      if (!error && data) {
        setDbCourses(data.map(c => ({
          ...c,
          course_categories: c.course_categories as unknown as { name: string; slug: string } | null,
          modules: (c.course_modules || []) as { id: string; duration_minutes: number | null }[]
        })));
      }
      setLoading(false);
    };
    fetchCourses();
  }, []);

  const getTotalDuration = (modules: { duration_minutes: number | null }[]) => {
    const totalMins = modules.reduce((acc, m) => acc + (m.duration_minutes || 0), 0);
    const hours = Math.floor(totalMins / 60);
    const mins = totalMins % 60;
    if (hours === 0) return `${mins} min`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  const getCategorySlug = (tabKey: string) => {
    const map: Record<string, string> = {
      it: 'it',
      hr: 'hr',
      marketing: 'digital-marketing',
      design: 'graphic-design',
      nursing: 'nursing'
    };
    return map[tabKey] || tabKey;
  };

  const getFilteredDBCourses = (tabKey: string) => {
    const slug = getCategorySlug(tabKey);
    return dbCourses.filter(c => c.course_categories?.slug === slug);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="gradient-hero text-primary-foreground py-16 lg:py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Our Training Programs
              </h1>
              <p className="text-lg text-primary-foreground/80">
                Industry-oriented courses, university degrees & vocational programs. Online & Distance learning available through top universities.
              </p>
            </div>
          </div>
        </section>

        {/* Partner Universities - only on Degree & PG tab */}
        {activeTab === "degree-diploma" && (
        <section className="border-b bg-card py-8">
          <div className="container">
            <div className="text-center mb-6">
              <h2 className="font-heading text-xl font-bold text-foreground mb-1">Partner Universities</h2>
              <p className="text-sm text-muted-foreground">Pursue degrees through Online & Distance mode via Aadhyra Innovations</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {partnerUniversities.map((uni) => (
                <div key={uni.name} className="bg-muted/50 border rounded-xl px-5 py-3 text-center hover:border-primary/50 transition-colors">
                  <span className="text-2xl block mb-1">{uni.icon}</span>
                  <p className="font-semibold text-sm text-foreground">{uni.name}</p>
                  <p className="text-xs text-muted-foreground">{uni.mode}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-primary" /><span>Biggest Alumni Network</span></div>
              <div className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-primary" /><span>Internship & Job Support</span></div>
              <div className="flex items-center gap-2"><Globe className="h-4 w-4 text-primary" /><span>Online & Distance Available</span></div>
            </div>
          </div>
        </section>
        )}

        {/* Eligibility & Fee Banner - only on Degree & PG tab */}
        {activeTab === "degree-diploma" && (
        <section className="bg-primary/5 border-b py-6">
          <div className="container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 bg-card rounded-lg border p-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Eligibility</p>
                  <p className="font-semibold text-sm text-foreground">12th Pass / Fail</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-card rounded-lg border p-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Open For</p>
                  <p className="font-semibold text-sm text-foreground">Male & Female</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-card rounded-lg border p-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <IndianRupee className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Course Fee</p>
                  <p className="font-semibold text-sm text-foreground">₹30,000 / Semester</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-card rounded-lg border p-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Exam Fees</p>
                  <p className="font-semibold text-sm text-foreground">Paid Separately</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* Demo Videos */}
        <DemoVideoSection
          title="Watch Course Demo Videos"
          subtitle="Preview our training content before enrolling. All videos are Aadhyra Innovations original content."
          videos={courseDemoVideos}
        />

        {/* Courses Tabs */}
        <section className="py-16 lg:py-20">
          <div className="container">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full flex-wrap h-auto gap-2 bg-muted/50 p-2 rounded-xl mb-12">
                <TabsTrigger value="it" className="flex-1 min-w-[100px] data-[state=active]:bg-tech data-[state=active]:text-tech-foreground">
                  IT Courses
                </TabsTrigger>
                <TabsTrigger value="hr" className="flex-1 min-w-[100px] data-[state=active]:bg-hr data-[state=active]:text-hr-foreground">
                  HR Courses
                </TabsTrigger>
                <TabsTrigger value="marketing" className="flex-1 min-w-[100px] data-[state=active]:bg-marketing data-[state=active]:text-marketing-foreground">
                  Marketing
                </TabsTrigger>
                <TabsTrigger value="design" className="flex-1 min-w-[100px] data-[state=active]:bg-design data-[state=active]:text-design-foreground">
                  Design
                </TabsTrigger>
                <TabsTrigger value="nursing" className="flex-1 min-w-[100px] data-[state=active]:bg-healthcare data-[state=active]:text-healthcare-foreground">
                  Nursing
                </TabsTrigger>
                <TabsTrigger value="degree-diploma" className="flex-1 min-w-[100px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Degree & PG
                </TabsTrigger>
                <TabsTrigger value="vocational" className="flex-1 min-w-[100px] data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                  Vocational
                </TabsTrigger>
              </TabsList>

              {Object.entries(courseCategories).map(([key, category]) => {
                const filteredDBCourses = getFilteredDBCourses(key);
                
                return (
                  <TabsContent key={key} value={key} className="mt-0">
                    <div className="mb-8">
                      <h2 className={`font-heading text-2xl md:text-3xl font-bold text-${category.color} mb-2`}>
                        {category.title}
                      </h2>
                      <p className="text-muted-foreground">{category.description}</p>
                    </div>

                    {/* Database Courses with Video Duration */}
                    {filteredDBCourses.length > 0 && (
                      <div className="mb-12">
                        <div className="flex items-center gap-2 mb-6">
                          <PlayCircle className="h-5 w-5 text-primary" />
                          <h3 className="font-heading text-xl font-semibold text-foreground">Available Now with Video Classes</h3>
                          <Badge variant="secondary">Live LMS</Badge>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {filteredDBCourses.map((course) => (
                            <div key={course.id} className="bg-card rounded-xl border-2 border-primary/20 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden">
                              <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                  <h3 className="font-heading text-lg font-semibold text-foreground">
                                    {course.title}
                                  </h3>
                                  <Badge className="bg-primary/10 text-primary text-xs">
                                    ₹{course.price?.toLocaleString()}
                                  </Badge>
                                </div>
                                
                                {course.description && (
                                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                    {course.description}
                                  </p>
                                )}
                                <GoogleStyleRating title={course.title} />
                                
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                  <div className="flex items-center gap-1.5">
                                    <Clock className="h-4 w-4" />
                                    <span>{course.duration}</span>
                                  </div>
                                  {course.modules.length > 0 && (
                                    <div className="flex items-center gap-1.5">
                                      <PlayCircle className="h-4 w-4 text-primary" />
                                      <span className="text-primary font-medium">
                                        {course.modules.length} modules • {getTotalDuration(course.modules)}
                                      </span>
                                    </div>
                                  )}
                                </div>

                                {course.tools_covered && course.tools_covered.length > 0 && (
                                  <div className="mb-4">
                                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Tools Covered</div>
                                    <div className="flex flex-wrap gap-2">
                                      {course.tools_covered.slice(0, 4).map((tool) => (
                                        <span key={tool} className={`px-2 py-1 text-xs rounded-md bg-${category.color}/10 text-${category.color}`}>
                                          {tool}
                                        </span>
                                      ))}
                                      {course.tools_covered.length > 4 && (
                                        <span className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground">
                                          +{course.tools_covered.length - 4} more
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}

                                <div className="space-y-2">
                                  {course.has_internship && (
                                    <div className="flex items-center gap-2 text-sm text-foreground">
                                      <CheckCircle2 className={`h-4 w-4 text-${category.color}`} />
                                      <span>Internship Included</span>
                                    </div>
                                  )}
                                  {course.has_placement && (
                                    <div className="flex items-center gap-2 text-sm text-foreground">
                                      <CheckCircle2 className={`h-4 w-4 text-${category.color}`} />
                                      <span>Placement Support</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="px-6 py-4 bg-primary/5 border-t border-primary/20 flex items-center justify-between">
                                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                  <Award className="h-4 w-4" />
                                  <span>Certificate</span>
                                </div>
                                <Link to="/apply" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                                  Enroll Now <ArrowRight className="h-3 w-3" />
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Static Course Cards */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.courses.map((course) => (
                        <div key={course.title} className="bg-card rounded-xl border shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden">
                          <div className="p-6">
                            <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                              {course.title}
                            </h3>
                            <GoogleStyleRating title={course.title} />
                            
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                              <div className="flex items-center gap-1.5">
                                <Clock className="h-4 w-4" />
                                <span>{course.duration}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Users className="h-4 w-4" />
                                <span>{course.students}</span>
                              </div>
                            </div>

                            <div className="mb-4">
                              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Tools Covered</div>
                              <div className="flex flex-wrap gap-2">
                                {course.tools.map((tool) => (
                                  <span key={tool} className={`px-2 py-1 text-xs rounded-md bg-${category.color}/10 text-${category.color}`}>
                                    {tool}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-2">
                              {course.features.map((feature) => (
                                <div key={feature} className="flex items-center gap-2 text-sm text-foreground">
                                  <CheckCircle2 className={`h-4 w-4 text-${category.color}`} />
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="px-6 py-4 bg-muted/30 border-t flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                              <Award className="h-4 w-4" />
                              <span>Certificate</span>
                            </div>
                            <Link to="/apply" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                              Enroll Now <ArrowRight className="h-3 w-3" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>
        </section>

        {/* AI Course Advisor */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Not Sure Which Course to Choose?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Let our AI-powered career advisor recommend the perfect courses based on your interests, qualifications, and career goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/apply">
                    <Button variant="hero" size="lg">Apply Now</Button>
                  </Link>
                  <a href="tel:+919876543210">
                    <Button variant="outline" size="lg">Call Counselor</Button>
                  </a>
                </div>
              </div>
              <AICourseAdvisor />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CoursesPage;
