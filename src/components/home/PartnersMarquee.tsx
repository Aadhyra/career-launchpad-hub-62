const partners = [
  "TCS", "Infosys", "Wipro", "Cognizant", "HCLTech", "Zoho", "Accenture", "Capgemini",
  "Apollo Hospitals", "Fortis Healthcare", "Anna University", "SRM Institute", "VIT", "Amrita University",
];

const PartnersMarquee = () => (
  <section className="py-16 border-y bg-card/50">
    <div className="container">
      <p className="text-center text-sm uppercase tracking-wider text-muted-foreground font-semibold mb-8">
        Trusted by leading companies &amp; colleges
      </p>
    </div>
    <div className="relative overflow-hidden">
      <div className="flex w-max gap-4 animate-scroll-x hover:[animation-play-state:paused]">
        {[...partners, ...partners].map((p, i) => (
          <div
            key={`${p}-${i}`}
            className="flex items-center justify-center h-16 px-8 rounded-xl border bg-card shadow-sm text-muted-foreground font-heading font-semibold whitespace-nowrap hover:text-primary hover:border-primary/40 transition-colors"
          >
            {p}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PartnersMarquee;
