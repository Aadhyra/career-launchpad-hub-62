import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Target, Eye, Heart, Award, Users, Building2, GraduationCap, Briefcase,
  Quote, Sparkles, ArrowRight, CheckCircle2, Star, Trophy, HandHeart, Rocket,
} from "lucide-react";
import shikshaLogo from "@/assets/aadhyra-logo.png";
import teamImage from "@/assets/about-team.jpg";
import nurseImage from "@/assets/about-nurse.jpg";
import successImage from "@/assets/about-success.jpg";
import graduationImage from "@/assets/about-graduation.jpg";

const stats = [
  { icon: GraduationCap, value: "5,000+", label: "Students Trained" },
  { icon: Building2, value: "500+", label: "Partner Companies" },
  { icon: Award, value: "95%", label: "Placement Rate" },
  { icon: Briefcase, value: "50+", label: "Hospital Partners" },
];

const values = [
  { icon: Target, title: "Our Mission", description: "To empower businesses with innovative technology solutions while enabling students, professionals and organizations through quality education, industry-focused training, internships, recruitment, placement services and digital transformation." },
  { icon: Eye, title: "Our Vision", description: "To become one of India's most trusted technology and talent ecosystem companies by connecting innovation, education, healthcare and employment through world-class digital solutions, strategic partnerships and continuous innovation." },
  { icon: Heart, title: "Our Values", description: "Innovation & creativity, integrity & transparency, excellence in quality, customer success, continuous learning, collaboration, accountability and social responsibility." },
];

const coreValues = [
  "Innovation & Creativity",
  "Integrity & Transparency",
  "Excellence in Quality",
  "Customer Success",
  "Continuous Learning",
  "Collaboration & Teamwork",
  "Accountability",
  "Social Responsibility",
];

const whyChoose = [
  "Comprehensive IT & Software Development Services",
  "AI-Powered Business Solutions",
  "Industry-Oriented Training Programs",
  "Real-Time Internship Opportunities",
  "End-to-End Recruitment & Placement Services",
  "Healthcare Technology & Workforce Solutions",
  "Experienced Industry Professionals",
  "Strong Academic & Corporate Partnerships",
  "Customer-Centric Approach",
  "Commitment to Innovation and Excellence",
];

const platforms = [
  { icon: Users, name: "AADHYRA Talent Connect", desc: "Recruitment, Placement & Career Platform.", to: "/placement/talent-connect" },
  { icon: Rocket, name: "AADHYRA Tech Partner", desc: "Software Development & IT Services Platform.", to: "/placement/tech-partner" },
  { icon: Sparkles, name: "AADHYRA AI Lab", desc: "Artificial Intelligence, Automation & Innovation Platform.", to: "/placement/ai-lab" },
  { icon: HandHeart, name: "AADHYRA Health Connect", desc: "Healthcare Recruitment, Medical Training & Healthcare Solutions Platform.", to: "/placement/health-connect" },
];


const milestones = [
  { year: "2019", title: "The Beginning", desc: "Founded with a single classroom and a big dream — to make every learner employable." },
  { year: "2021", title: "Healthcare Vertical", desc: "Launched nursing & paramedical training, partnering with 20+ hospitals." },
  { year: "2023", title: "Going Digital", desc: "Built our LMS, AI Interview System and online placement portal." },
  { year: "2025", title: "5,000+ Lives Changed", desc: "Crossed 5,000 trained students and 500+ corporate partners across India." },
];

const testimonials = [
  { name: "Priya Sharma", role: "Software Engineer @ TCS", text: "AADHYRA changed my life. From a small town to a TCS offer letter — the trainers and mentors believed in me when no one else did." },
  { name: "Rahul Verma", role: "Staff Nurse @ Apollo", text: "Their nursing program gave me real hospital exposure. Today I serve patients with confidence — and earn a respectable income for my family." },
  { name: "Anjali Reddy", role: "HR Executive @ Infosys", text: "The HR live tasks and AI interview practice made all the difference. I cleared 4 interviews in my first month after completing the program." },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero with image */}
        <section className="relative gradient-hero text-primary-foreground py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img src={teamImage} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-violet-700/80" />
          </div>
          <div className="container relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur">About Us</Badge>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Where Dreams Meet <span className="text-yellow-300">Opportunity</span>
                </h1>
                <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed">
                  AADHYRA INNOVATIONS PVT LTD is more than a training institute — we are a movement that turns
                  raw talent from every corner of India into skilled, confident professionals ready for the world.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/apply">
                    <Button size="lg" variant="accent" className="gap-2">
                      Start Your Journey <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button size="lg" variant="outline" className="gap-2 border-white/40 text-white hover:bg-white/10">
                      Talk to Counsellor
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <img
                  src={teamImage}
                  alt="AADHYRA team collaborating"
                  className="rounded-3xl shadow-2xl w-full"
                  width={1280}
                  height={768}
                />
                <div className="absolute -bottom-6 -left-6 bg-card text-foreground rounded-2xl p-4 shadow-xl border">
                  <div className="flex items-center gap-3">
                    <Trophy className="h-8 w-8 text-yellow-500" />
                    <div>
                      <div className="font-bold text-sm">95% Placement Rate</div>
                      <div className="text-xs text-muted-foreground">Industry-leading outcomes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 -mt-12 relative z-10">
          <div className="container">
            <div className="bg-card rounded-2xl border shadow-xl p-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="text-center">
                      <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <div className="font-heading text-3xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Emotional story with image */}
        <section className="py-16 lg:py-20">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img
                  src={successImage}
                  alt="A young graduate sharing his offer letter with his mother"
                  className="rounded-3xl shadow-card-hover w-full"
                  loading="lazy"
                  width={1024}
                  height={1024}
                />
                <div className="absolute -bottom-6 -right-6 bg-card text-foreground rounded-2xl p-5 shadow-xl border max-w-xs">
                  <Quote className="h-6 w-6 text-primary mb-2" />
                  <p className="text-sm italic">"For the first time, my mother smiled without worry."</p>
                  <p className="text-xs text-muted-foreground mt-2">— Student, Batch 2024</p>
                </div>
              </div>
              <div>
                <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">Our Why</Badge>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                  Every offer letter is a <span className="text-gradient">family lifted</span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Across our country — especially in rural towns and middle-class homes — talented young people carry
                    massive dreams but lack guidance, exposure and a fair shot. We exist to change that, one career at a time.
                  </p>
                  <p>
                    Behind every placement is a parent who can finally rest, a sibling who can now study, and a young
                    person who walks taller. That is the real product we deliver — <span className="text-foreground font-semibold">dignity</span>.
                  </p>
                  <p>
                    We don't just train. We mentor, place, follow-up, and stay in touch. Because at AADHYRA, your
                    success is not a number on a brochure — it is the reason we exist.
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-3 gap-4">
                  {[
                    { icon: HandHeart, label: "Mentorship" },
                    { icon: Rocket, label: "Real Skills" },
                    { icon: Trophy, label: "Real Jobs" },
                  ].map((b) => {
                    const I = b.icon;
                    return (
                      <div key={b.label} className="text-center bg-muted/40 rounded-xl p-4">
                        <I className="h-6 w-6 text-primary mx-auto mb-2" />
                        <div className="text-sm font-semibold text-foreground">{b.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company message */}
        <section className="py-16 lg:py-20 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <img src={shikshaLogo} alt="AADHYRA logo" className="h-16 w-auto mx-auto mb-4" />
                <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">Our Purpose</Badge>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                  AADHYRA INNOVATIONS PVT LTD
                </h2>
              </div>

              <div className="bg-card rounded-3xl border shadow-xl p-8 md:p-12 relative">
                <Quote className="absolute top-6 left-6 h-12 w-12 text-primary/20" />
                <div className="space-y-6 text-muted-foreground leading-relaxed relative z-10">
                  <p className="text-lg font-medium text-foreground">
                    AADHYRA INNOVATIONS PVT LTD was founded with one clear purpose — to transform education into real
                    employment, and dignity into every individual's life.
                  </p>
                  <p>
                    We believe unemployment is not caused by a lack of talent, but by a lack of the right guidance,
                    practical training and opportunity. AADHYRA is built as a complete ecosystem — combining education,
                    skill development, internships, interview preparation and job placement under one roof.
                  </p>

                  <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                    <p className="text-foreground font-semibold mb-3">To us:</p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /><span><strong>Nursing</strong> is not a job — it is a service.</span></li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /><span><strong>Technology</strong> is not learning — it is empowerment.</span></li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /><span><strong>Training</strong> is not theory — it is career readiness.</span></li>
                    </ul>
                  </div>

                  <div className="bg-accent/10 rounded-xl p-6 border border-accent/20 text-center">
                    <Sparkles className="h-6 w-6 text-accent mx-auto mb-2" />
                    <p className="text-lg font-semibold text-accent">
                      If you are committed to learning, we are committed to your success.
                    </p>
                  </div>
                  <p className="text-lg font-bold text-primary text-center">
                    Together, we don't just create jobs — we create lives with purpose.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Healthcare vertical with nurse image */}
        <section className="py-16 lg:py-20">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Badge className="mb-3 bg-healthcare/10 text-healthcare border-healthcare/20">Healthcare Vertical</Badge>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Healing hands. <span className="text-healthcare">Lifelong careers.</span>
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Our nursing and paramedical training programs are built with frontline hospital partners.
                  Students get real ward exposure, certified mentorship and direct placement with leading
                  hospitals across India and abroad.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Live hospital training with 50+ partners",
                    "Internationally recognised certifications",
                    "International placement support (Gulf, UK, EU)",
                    "Stipend during internship period",
                  ].map((p) => (
                    <li key={p} className="flex items-center gap-3 text-foreground">
                      <CheckCircle2 className="h-5 w-5 text-healthcare flex-shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/courses">
                  <Button variant="healthcare" size="lg" className="gap-2">
                    Explore Healthcare Courses <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="order-1 lg:order-2">
                <img
                  src={nurseImage}
                  alt="Smiling nurse in scrubs at her hospital posting"
                  className="rounded-3xl shadow-card-hover w-full"
                  loading="lazy"
                  width={1024}
                  height={1024}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Journey timeline */}
        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">Our Journey</Badge>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                From a single classroom to a national movement
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {milestones.map((m) => (
                <div key={m.year} className="bg-card border rounded-2xl p-6 hover:shadow-card-hover transition relative">
                  <div className="font-heading text-3xl font-bold text-gradient mb-2">{m.year}</div>
                  <div className="font-bold text-foreground mb-2">{m.title}</div>
                  <div className="text-sm text-muted-foreground">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-16 lg:py-20">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">What Drives Us</Badge>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
                Mission. Vision. Values.
              </h2>
              <p className="text-muted-foreground">
                The principles that guide every decision we make.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="bg-card rounded-2xl border shadow-card p-8 text-center hover:shadow-card-hover transition">
                    <div className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-6">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-4">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 to-transparent">
          <div className="container">
            <div className="text-center mb-12">
              <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">Student Voices</Badge>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                Stories that keep us going
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-card border rounded-2xl p-6 hover:shadow-card-hover transition">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-foreground italic mb-4">"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center text-white font-bold text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA with graduation image */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <img src={graduationImage} alt="" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-violet-700/90" />
          </div>
          <div className="container relative text-center text-primary-foreground max-w-3xl">
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              Your career-defining moment starts here
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Join 5,000+ learners who chose to build their future with AADHYRA.
              Free counselling. Industry mentorship. Guaranteed placement support.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/apply">
                <Button size="lg" variant="accent" className="gap-2">
                  Apply Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="gap-2 border-white/40 text-white hover:bg-white/10">
                  Talk to Counsellor
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
