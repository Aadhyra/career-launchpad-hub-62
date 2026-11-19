import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, CheckCircle, QrCode, Shield, Star, Sparkles } from "lucide-react";

interface RecentCert {
  certificate_id: string;
  certificate_type: string;
  issue_date: string;
  full_name?: string;
  course_title?: string;
}

const CertificateShowcase = () => {
  const [recent, setRecent] = useState<RecentCert[]>([]);

  useEffect(() => {
    (async () => {
      const { data: certs } = await supabase
        .from("certificates")
        .select("certificate_id, certificate_type, issue_date, user_id, course_id")
        .eq("verified", true)
        .order("issue_date", { ascending: false })
        .limit(8);

      if (!certs?.length) return;

      const userIds = certs.map(c => c.user_id);
      const courseIds = certs.map(c => c.course_id);
      const [{ data: profiles }, { data: courses }] = await Promise.all([
        supabase.from("profiles").select("user_id, full_name").in("user_id", userIds),
        supabase.from("courses").select("id, title").in("id", courseIds),
      ]);

      setRecent(
        certs.map(c => ({
          certificate_id: c.certificate_id,
          certificate_type: c.certificate_type,
          issue_date: c.issue_date,
          full_name: profiles?.find(p => p.user_id === c.user_id)?.full_name,
          course_title: courses?.find(co => co.id === c.course_id)?.title,
        }))
      );
    })();
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4">
            <Award className="h-3 w-3 mr-1" /> Industry-Recognized Certificates
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            Earn Verified Certificates That <span className="text-primary">Open Doors</span>
          </h2>
          <p className="text-muted-foreground">
            Every course, internship and assessment ends with a QR-verified, employer-trusted certificate.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Sample Certificate Hero */}
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-semibold">Sample Certificate</p>
            <Card className="overflow-hidden border-4 border-double border-primary/30 shadow-elegant">
              <div className="relative bg-gradient-to-br from-card via-card to-primary/5 p-8">
                <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-primary/40 rounded-tl-lg" />
                <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-primary/40 rounded-tr-lg" />
                <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-primary/40 rounded-bl-lg" />
                <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-primary/40 rounded-br-lg" />

                <div className="text-center space-y-3">
                  <div className="flex justify-center gap-1">
                    {[...Array(3)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-medium">
                    AADHYRA INNOVATIONS
                  </p>
                  <h3 className="text-2xl font-heading font-bold">Certificate of Completion</h3>
                  <p className="text-xs text-muted-foreground">This is to certify that</p>
                  <p className="text-2xl font-bold text-primary">Your Name Here</p>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    has successfully completed the program and demonstrated proficiency in the required industry skills.
                  </p>
                  <div className="flex items-center justify-center gap-6 pt-3">
                    <div className="text-center">
                      <div className="h-px w-24 bg-border mb-1" />
                      <p className="text-[10px] text-muted-foreground">Issue Date</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <QrCode className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <div className="text-center">
                      <div className="h-px w-24 bg-border mb-1" />
                      <p className="text-[10px] text-muted-foreground">Director</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground pt-1">Certificate ID: SNT-XXXXXX-2026</p>
                </div>
              </div>
            </Card>

            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <FeatureBadge icon={<Shield className="h-4 w-4" />} label="QR Verified" />
              <FeatureBadge icon={<CheckCircle className="h-4 w-4" />} label="Employer Trusted" />
              <FeatureBadge icon={<Sparkles className="h-4 w-4" />} label="Lifetime Access" />
            </div>

            <div className="mt-6 flex gap-3">
              <Link to="/verify"><Button variant="outline">Verify a Certificate</Button></Link>
              <Link to="/courses"><Button>Start Earning</Button></Link>
            </div>
          </div>

          {/* Live Recent Issued */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Recently Issued
              </p>
              <span className="flex items-center gap-1 text-xs text-healthcare">
                <span className="h-2 w-2 rounded-full bg-healthcare animate-pulse" /> Live
              </span>
            </div>

            {recent.length === 0 ? (
              <Card className="p-8 text-center border-dashed">
                <Award className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">
                  Be among the first to earn a verified certificate. Recent issues will appear here.
                </p>
              </Card>
            ) : (
              <div className="space-y-2 max-h-[480px] overflow-y-auto pr-2">
                {recent.map((c, i) => (
                  <Card key={i} className="hover:shadow-card-hover transition-shadow">
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Award className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{c.full_name || "Student"}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {c.course_title || "Program"} · {c.certificate_type.replace("_", " ")}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-[10px]">
                          <CheckCircle className="h-2 w-2 mr-1" /> Verified
                        </Badge>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          {new Date(c.issue_date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureBadge = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center justify-center gap-1.5 p-2 rounded-md bg-muted/50 text-xs font-medium">
    <span className="text-primary">{icon}</span>
    {label}
  </div>
);

export default CertificateShowcase;
