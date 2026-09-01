import { Code2, Brain, GraduationCap, Rocket, Briefcase, Building2 } from "lucide-react";

const items = [
  { icon: Code2, title: "Software Development", desc: "Custom platforms, web & mobile products engineered for scale.", tint: "from-tech/20 to-primary/20" },
  { icon: Brain, title: "AI Solutions", desc: "Chatbots, automation and ML models that cut cost and effort.", tint: "from-design/20 to-primary/20" },
  { icon: GraduationCap, title: "Professional Training", desc: "Industry-designed programs delivered by working engineers.", tint: "from-accent/20 to-marketing/20" },
  { icon: Rocket, title: "Internship Programs", desc: "Live industry projects with mentors, certificates and stipends.", tint: "from-healthcare/20 to-hr/20" },
  { icon: Briefcase, title: "Placement Services", desc: "Campus hiring, fresher & lateral recruitment, RPO and HR consulting.", tint: "from-primary/20 to-tech/20" },
  { icon: Building2, title: "Business Technology", desc: "Cloud, data, security and digital transformation for enterprises.", tint: "from-hr/20 to-healthcare/20" },
];

const WhyChooseSection = () => (
  <section className="py-20 lg:py-28">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">Why AADHYRA</span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3">
          One partner for technology and talent
        </h2>
        <p className="text-muted-foreground mt-4">
          Businesses trust us to build, students trust us to grow. Everything runs on a single integrated platform.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(({ icon: Icon, title, desc, tint }) => (
          <div
            key={title}
            className="group relative rounded-2xl border bg-card/70 backdrop-blur-sm p-7 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${tint} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="relative">
              <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseSection;
