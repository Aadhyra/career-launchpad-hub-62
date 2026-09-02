import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast({ title: "Message sent", description: "Our team will get back to you within 24 hours." });
    }, 700);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-muted/40 scroll-mt-20">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Contact</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3">Let's talk about your goals</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Form */}
          <form onSubmit={handleSubmit} className="rounded-3xl border bg-card/80 backdrop-blur-md p-7 md:p-8 shadow-card space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="c-name">Full Name</Label>
                <Input id="c-name" name="name" required placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="c-phone">Phone</Label>
                <Input id="c-phone" name="phone" type="tel" required placeholder="+91 ..." />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="c-email">Email</Label>
              <Input id="c-email" name="email" type="email" required placeholder="you@company.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="c-msg">How can we help?</Label>
              <Textarea id="c-msg" name="message" required rows={5} placeholder="Tell us about your project, training or hiring requirement" />
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full rounded-full" disabled={submitting}>
              {submitting ? "Sending..." : "Send Message"}
            </Button>
          </form>

          {/* Details */}
          <div className="space-y-5">
            <div className="rounded-3xl border bg-card p-7 shadow-card space-y-5">
              <a href="mailto:info@aadhyrainnovations.com" className="flex items-start gap-4 group">
                <span className="h-11 w-11 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary-foreground" />
                </span>
                <span>
                  <span className="block font-heading font-semibold text-foreground group-hover:text-primary transition-colors">Email</span>
                  <span className="block text-sm text-muted-foreground">info@aadhyrainnovations.com</span>
                </span>
              </a>
              <a href="tel:+919876543210" className="flex items-start gap-4 group">
                <span className="h-11 w-11 rounded-xl gradient-accent flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-accent-foreground" />
                </span>
                <span>
                  <span className="block font-heading font-semibold text-foreground group-hover:text-primary transition-colors">Phone</span>
                  <span className="block text-sm text-muted-foreground">+91 98765 43210</span>
                </span>
              </a>
              <div className="flex items-start gap-4">
                <span className="h-11 w-11 rounded-xl gradient-healthcare flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-healthcare-foreground" />
                </span>
                <span>
                  <span className="block font-heading font-semibold text-foreground">Office Address</span>
                  <span className="block text-sm text-muted-foreground">
                    AADHYRA INNOVATIONS PVT LTD, Chennai, Tamil Nadu, India
                  </span>
                </span>
              </div>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full h-11 rounded-full bg-healthcare text-healthcare-foreground font-medium hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
              </a>
            </div>

            <div className="rounded-3xl overflow-hidden border shadow-card h-[280px]">
              <iframe
                title="AADHYRA INNOVATIONS office location"
                src="https://www.google.com/maps?q=Chennai,Tamil%20Nadu,India&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
