import { useEffect, useRef, useState } from "react";
import { GraduationCap, Rocket, FolderCheck, Handshake } from "lucide-react";

/** Placeholder figures — edit these values to update the homepage counters. */
export const HOME_STATS = [
  { value: 1000, suffix: "+", label: "Students Trained", icon: GraduationCap },
  { value: 350, suffix: "+", label: "Interns Supported", icon: Rocket },
  { value: 120, suffix: "+", label: "Projects Delivered", icon: FolderCheck },
  { value: 100, suffix: "+", label: "Business Partners", icon: Handshake },
];

const Counter = ({ value, suffix, active }: { value: number; suffix: string; active: boolean }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1600, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value]);
  return <span>{n.toLocaleString("en-IN")}{suffix}</span>;
};

const StatsCounter = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setActive(true), { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden gradient-hero py-16 text-primary-foreground lg:py-20">
      <div className="absolute inset-0 grid-pattern opacity-10" aria-hidden />
      <div className="container relative">
        <h2 className="mb-12 text-center font-heading text-3xl font-bold md:text-4xl">Our Impact in Numbers</h2>
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {HOME_STATS.map(({ value, suffix, label, icon: Icon }) => (
            <div key={label} className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-5 text-center backdrop-blur-sm md:p-7">
              <Icon className="mx-auto mb-3 h-6 w-6 text-accent" />
              <div className="font-heading text-3xl font-bold md:text-4xl">
                <Counter value={value} suffix={suffix} active={active} />
              </div>
              <div className="mt-2 text-xs text-primary-foreground/75 md:text-sm">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
