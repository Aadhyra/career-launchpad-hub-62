import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Briefcase, CheckCircle2, TrendingUp, Users, Target, ArrowRight,
  GraduationCap, Award, Calendar, DollarSign
} from "lucide-react";

const HRInternshipLanding = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative gradient-hero text-primary-foreground py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur hover:bg-white/30">
              AADHYRA INNOVATIONS
            </Badge>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 leading-tight">
              30 Days HR Internship Program
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed max-w-2xl mx-auto">
              Learn practical HR work, earn incentives, gain real-time experience, and receive full-time opportunities based on your performance.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/auth?role=student">
                <Button size="lg" variant="accent" className="gap-2 text-lg px-8 h-14">
                  Apply Now <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Program Breakdown */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-3 text-primary border-primary/30 bg-primary/5">Timeline</Badge>
              <h2 className="font-heading text-3xl md:text-4xl font-bold">Program Duration Breakdown</h2>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6 relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2 z-0" />
              
              {[
                { phase: 1, days: "Day 1–5", title: "Training & Orientation", icon: GraduationCap },
                { phase: 2, days: "Day 6–15", title: "Task Execution & Lead Gen", icon: Target },
                { phase: 3, days: "Day 16–25", title: "Hiring / Conversion", icon: Users },
                { phase: 4, days: "Day 26–30", title: "Final Target & Evaluation", icon: Award },
              ].map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="relative z-10 bg-card border rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 mx-auto rounded-full gradient-primary text-white flex items-center justify-center mb-4 border-4 border-background">
                      <Icon className="h-7 w-7" />
                    </div>
                    <Badge variant="secondary" className="mb-3">Phase {step.phase} • {step.days}</Badge>
                    <h3 className="font-bold text-lg">{step.title}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* The 3 Tasks */}
        <section className="py-20">
          <div className="container max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Your Mission: The 3 Core Tasks</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Complete these three milestones to successfully graduate the program and claim your rewards.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-card border rounded-2xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center">
                <div className="w-20 h-20 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-heading font-bold text-3xl">
                  01
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Mandatory Course Hiring</h3>
                  <p className="text-muted-foreground mb-4">
                    Promote internship programs, training courses, and placement programs via posters, WhatsApp, and calls.
                  </p>
                  <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">Target: Minimum 2 admissions</Badge>
                </div>
              </div>

              <div className="bg-card border rounded-2xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center">
                <div className="w-20 h-20 shrink-0 rounded-2xl bg-accent/10 flex items-center justify-center text-accent font-heading font-bold text-3xl">
                  02
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Choose Your Specialization</h3>
                  <p className="text-muted-foreground mb-4">
                    Execute one of the following connect domains:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 bg-muted p-2 rounded"><CheckCircle2 className="h-4 w-4 text-accent" /> HR Internship Hiring</div>
                    <div className="flex items-center gap-2 bg-muted p-2 rounded"><CheckCircle2 className="h-4 w-4 text-accent" /> Employer Connect</div>
                    <div className="flex items-center gap-2 bg-muted p-2 rounded"><CheckCircle2 className="h-4 w-4 text-accent" /> Freelancing Project Connect</div>
                    <div className="flex items-center gap-2 bg-muted p-2 rounded"><CheckCircle2 className="h-4 w-4 text-accent" /> Health Connect</div>
                  </div>
                </div>
              </div>

              <div className="bg-card border rounded-2xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center">
                <div className="w-20 h-20 shrink-0 rounded-2xl bg-healthcare/10 flex items-center justify-center text-healthcare font-heading font-bold text-3xl">
                  03
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Team Contribution</h3>
                  <p className="text-muted-foreground">
                    Demonstrate your leadership and organizational skills through daily reporting, team coordination, active meeting participation, and supporting new interns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Earnings & Benefits Grid */}
        <section className="py-20 bg-primary/5">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Earnings */}
              <div>
                <h2 className="font-heading text-3xl font-bold mb-8 flex items-center gap-3">
                  <DollarSign className="h-8 w-8 text-primary" /> Earnings Structure
                </h2>
                <div className="space-y-4">
                  {[
                    { tier: "Beginner", range: "₹1,000 – ₹3,000", bg: "bg-white" },
                    { tier: "Average Performer", range: "₹4,000 – ₹8,000", bg: "bg-white" },
                    { tier: "Best Performer", range: "₹10,000 – ₹20,000+", bg: "bg-primary text-primary-foreground border-primary" },
                  ].map((e, i) => (
                    <div key={i} className={`flex justify-between items-center p-6 rounded-xl border shadow-sm ${e.bg}`}>
                      <span className="font-semibold text-lg">{e.tier}</span>
                      <span className="font-bold text-xl">{e.range}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h2 className="font-heading text-3xl font-bold mb-8 flex items-center gap-3">
                  <Briefcase className="h-8 w-8 text-primary" /> Completion Benefits
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Internship Certificate", "Experience Letter", "Performance Report",
                    "Incentive Earnings", "Team Leader Opportunity", "Full-Time Job Opportunity"
                  ].map((benefit, i) => (
                    <div key={i} className="bg-white border p-4 rounded-xl flex items-center gap-3 shadow-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                      <span className="font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center bg-accent text-accent-foreground p-6 rounded-xl font-heading font-bold text-xl">
                  Learn • Earn • Get Experience • Build Career
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

export default HRInternshipLanding;
