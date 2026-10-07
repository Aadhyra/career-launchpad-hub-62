import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => (
  <section className="py-16 lg:py-20">
    <div className="container">
      <div className="relative overflow-hidden rounded-3xl gradient-hero px-6 py-14 text-center text-primary-foreground md:px-12 md:py-16">
        <div className="absolute inset-0 grid-pattern opacity-10" aria-hidden />
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">Build Your Future With Aadhyra Innovations</h2>
          <p className="mt-4 text-lg text-primary-foreground/85">
            Whether you're looking to learn, build, hire, or grow — we're here to help.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/apply">
              <Button variant="accent" size="lg" className="group w-full rounded-full sm:w-auto">
                Start Your Journey
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="heroOutline" size="lg" className="w-full rounded-full sm:w-auto">
                Partner With Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CTASection;
