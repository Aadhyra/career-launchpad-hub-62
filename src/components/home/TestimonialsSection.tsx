import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Student → Software Engineer · Chennai",
    text: "The Java Full Stack program plus the live internship made all the difference. I went from unemployed to a ₹5.4 LPA offer in seven months.",
    rating: 5,
    color: "bg-primary",
  },
  {
    name: "Rahul Verma",
    role: "HR Intern → HR Executive · Bengaluru",
    text: "AADHYRA's HR internship gave me real recruitment tasks and a stipend. The placement team prepared me for every interview round.",
    rating: 5,
    color: "bg-accent",
  },
  {
    name: "Dr. Meera Nair",
    role: "Professional · Hospital Administrator · Kochi",
    text: "We hired trained nursing staff through Health Connect. Verified profiles, fast turnaround and genuinely professional support.",
    rating: 5,
    color: "bg-healthcare",
  },
  {
    name: "Karthik Reddy",
    role: "Business Client · Founder, RetailOne · Hyderabad",
    text: "Their tech team delivered our web platform ahead of schedule. Clean code, great communication, and dependable support after launch.",
    rating: 5,
    color: "bg-design",
  },
];

const TestimonialsSection = () => (
  <section className="py-20 lg:py-28 bg-muted/40">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">Testimonials</span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3">Success stories from students, interns, professionals & businesses</h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((t) => (
          <div key={t.name} className="relative rounded-2xl border bg-card p-7 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1.5">
            <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/10" />
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-marketing text-marketing" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className={`h-11 w-11 rounded-full ${t.color} flex items-center justify-center text-primary-foreground font-heading font-bold`}>
                {t.name.charAt(0)}
              </div>
              <div>
                <div className="font-heading font-semibold text-foreground text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
