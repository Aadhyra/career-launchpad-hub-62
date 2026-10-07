import { Lightbulb, Users, TrendingUp } from "lucide-react";
import Reveal from "./Reveal";

const cards = [
  { icon: Lightbulb, title: "INNOVATE", text: "Building modern technology solutions that create real-world impact." },
  { icon: Users, title: "EMPOWER", text: "Providing practical training, internships, and career opportunities." },
  { icon: TrendingUp, title: "GROW", text: "Helping businesses and professionals achieve sustainable growth." },
];

const VisionSection = () => (
  <section className="py-16 lg:py-24">
    <div className="container">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-accent">Our Vision</span>
        <h2 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-4xl">Our Vision</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          To empower individuals and businesses through innovative technology, practical learning, and meaningful
          career opportunities.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {cards.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 120}>
            <div className="group relative h-full overflow-hidden rounded-2xl border bg-card p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
              <div className="absolute inset-x-0 top-0 h-1 gradient-primary" aria-hidden />
              <span className="font-heading text-5xl font-bold text-primary/10">0{i + 1}</span>
              <div className="mt-2 flex h-12 w-12 items-center justify-center rounded-xl gradient-primary transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mt-5 font-heading text-xl font-bold tracking-wide text-foreground">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default VisionSection;
