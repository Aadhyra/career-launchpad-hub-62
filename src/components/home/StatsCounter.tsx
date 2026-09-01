import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 1000, suffix: "+", label: "Students Trained" },
  { value: 500, suffix: "+", label: "Successful Placements" },
  { value: 100, suffix: "+", label: "Hiring Companies" },
  { value: 50, suffix: "+", label: "Technology Courses" },
  { value: 95, suffix: "%", label: "Client Satisfaction" },
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
  return <span>{n}{suffix}</span>;
};

const StatsCounter = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setActive(true),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 lg:py-24 gradient-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="container relative">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-14">
          Why Companies Trust AADHYRA
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-6">
              <div className="font-heading text-3xl md:text-4xl font-bold">
                <Counter value={s.value} suffix={s.suffix} active={active} />
              </div>
              <div className="text-xs md:text-sm text-white/75 mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
