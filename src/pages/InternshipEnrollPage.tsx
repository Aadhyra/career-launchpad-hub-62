import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, CheckCircle, CreditCard, GraduationCap, Loader2, BookOpen, Award, FileText } from "lucide-react";
import ApplicantDetailsForm, { emptyApplicantDetails, ApplicantDetailsData } from "@/components/registration/ApplicantDetailsForm";
import DocumentUploader, { DOC_LABELS } from "@/components/registration/DocumentUploader";

const STEPS = [
  { id: 1, label: "Course Selection", icon: BookOpen },
  { id: 2, label: "Registration", icon: GraduationCap },
  { id: 3, label: "Details & Documents", icon: FileText },
  { id: 4, label: "Payment", icon: CreditCard },
  { id: 5, label: "Confirmation", icon: CheckCircle },
];

const InternshipEnrollPage = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [params] = useSearchParams();

  const [step, setStep] = useState(1);
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState(params.get("course") || "");
  const [form, setForm] = useState({
    full_name: profile?.full_name || "",
    mobile: profile?.mobile || "",
    qualification: profile?.qualification || "",
    college: "",
    city: "",
    motivation: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [details, setDetails] = useState<ApplicantDetailsData>(emptyApplicantDetails());
  const [applicantDetailId, setApplicantDetailId] = useState<string | null>(null);
  const [uploadedDocs, setUploadedDocs] = useState<{ document_type: string }[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/auth?redirect=/internships/enroll");
      return;
    }
    (async () => {
      const { data } = await supabase
        .from("courses")
        .select("id, title, slug, price, duration, description, category_id")
        .eq("is_active", true)
        .order("title");
      setCourses(data || []);
    })();
  }, [user, navigate]);

  const selectedCourse = courses.find(c => c.id === selectedCourseId);

  const handleNext = () => {
    if (step === 1 && !selectedCourseId) {
      toast({ title: "Pick a course", description: "Please select an internship track.", variant: "destructive" });
      return;
    }
    if (step === 2) {
      if (!form.full_name || !form.mobile || !form.qualification || !form.college) {
        toast({ title: "Complete the form", description: "All required fields must be filled.", variant: "destructive" });
        return;
      }
      // seed the extended details from the basic form
      setDetails(d => ({ ...d, full_name: d.full_name || form.full_name, phone: d.phone || form.mobile }));
    }
    setStep(s => s + 1);
  };

  const saveDetailsAndContinue = async () => {
    if (!user) return;
    if (!details.full_name || !details.phone || !details.email || !details.domain) {
      toast({ title: "Missing details", description: "Name, phone, email and domain are required.", variant: "destructive" });
      return;
    }
    const requiredDocs = (Object.keys(DOC_LABELS) as (keyof typeof DOC_LABELS)[])
      .filter(k => DOC_LABELS[k].required);
    const uploadedSet = new Set(uploadedDocs.map(d => d.document_type));
    const missing = requiredDocs.filter(k => !uploadedSet.has(k));
    if (missing.length) {
      toast({
        title: "Documents required",
        description: `Please upload: ${missing.map(m => DOC_LABELS[m].label).join(", ")}`,
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        user_id: user.id,
        application_type: "internship" as const,
        reference_id: selectedCourseId || null,
        ...details,
        date_of_joining: details.date_of_joining || null,
      };
      if (applicantDetailId) {
        await supabase.from("applicant_details").update(payload).eq("id", applicantDetailId);
      } else {
        const { data, error } = await supabase
          .from("applicant_details")
          .insert(payload)
          .select("id")
          .single();
        if (error) throw error;
        setApplicantDetailId(data.id);
      }
      setStep(4);
    } catch (e: any) {
      toast({ title: "Save failed", description: e.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handlePayment = async () => {
    if (!user || !selectedCourse) return;
    setSubmitting(true);
    try {
      // Update profile
      await supabase.from("profiles").update({
        full_name: form.full_name,
        mobile: form.mobile,
        qualification: form.qualification,
      }).eq("user_id", user.id);

      // Create enrollment
      const { data: enrollment, error: eErr } = await supabase
        .from("enrollments")
        .insert({ user_id: user.id, course_id: selectedCourse.id, status: "active" })
        .select()
        .single();
      if (eErr) throw eErr;

      // Mock payment (completed)
      await supabase.from("course_payments").insert({
        user_id: user.id,
        enrollment_id: enrollment.id,
        amount: selectedCourse.price,
        status: "completed",
        razorpay_payment_id: `MOCK_${Date.now()}`,
      });

      // Create internship record
      const { error: internshipError } = await supabase.from("internships").insert({
        user_id: user.id,
        course_id: selectedCourse.id,
        status: "active",
        start_date: new Date().toISOString().slice(0, 10),
      });
      if (internshipError) throw internshipError;

      setStep(5);
      toast({ title: "Enrollment successful!", description: "Your internship is now active." });
    } catch (err: any) {
      toast({ title: "Enrollment failed", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-10 max-w-3xl">
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-3">
            <Briefcase className="h-3 w-3 mr-1" /> Internship Enrollment
          </Badge>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">Start Your Career Journey</h1>
          <p className="text-muted-foreground">Course → Registration → Payment → Classes → Assessments → Certificate</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-8 px-2">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
                  step >= s.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <span className={`text-[10px] mt-1 text-center ${step >= s.id ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-0.5 flex-1 mx-2 ${step > s.id ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Choose your internship track</CardTitle>
              <CardDescription>Select a course — internship is included</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
                <SelectTrigger><SelectValue placeholder="Select a course" /></SelectTrigger>
                <SelectContent>
                  {courses.map(c => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.title} — ₹{c.price.toLocaleString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedCourse && (
                <Card className="bg-muted/40">
                  <CardContent className="pt-4 space-y-2">
                    <h3 className="font-semibold">{selectedCourse.title}</h3>
                    <p className="text-sm text-muted-foreground">{selectedCourse.description}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Badge variant="outline">{selectedCourse.duration || "3-6 months"}</Badge>
                      <Badge>₹{selectedCourse.price.toLocaleString()}</Badge>
                      <Badge variant="secondary">Internship Included</Badge>
                      <Badge variant="secondary">Certificate</Badge>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Button onClick={handleNext} className="w-full" disabled={!selectedCourseId}>Continue</Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Registration details</CardTitle>
              <CardDescription>Tell us about you so we can personalize your training</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-3">
                <Field label="Full Name *" value={form.full_name} onChange={v => setForm({ ...form, full_name: v })} />
                <Field label="Mobile *" value={form.mobile} onChange={v => setForm({ ...form, mobile: v })} />
                <Field label="Qualification *" value={form.qualification} onChange={v => setForm({ ...form, qualification: v })} placeholder="e.g. B.Tech CSE" />
                <Field label="College / Institution *" value={form.college} onChange={v => setForm({ ...form, college: v })} />
                <Field label="City" value={form.city} onChange={v => setForm({ ...form, city: v })} />
              </div>
              <div>
                <Label>Why do you want to join this program?</Label>
                <Textarea value={form.motivation} onChange={e => setForm({ ...form, motivation: e.target.value })} rows={3} className="mt-1" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
                <Button onClick={handleNext} className="flex-1">Continue</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Complete your details & upload documents</CardTitle>
              <CardDescription>Required for internship, certification and stipend processing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ApplicantDetailsForm value={details} onChange={setDetails} />
              <DocumentUploader applicantDetailId={applicantDetailId} onChange={setUploadedDocs} />
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">Back</Button>
                <Button onClick={saveDetailsAndContinue} className="flex-1" disabled={submitting}>
                  {submitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  Save & Continue to Payment
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 4 && selectedCourse && (
          <Card>
            <CardHeader>
              <CardTitle>Payment</CardTitle>
              <CardDescription>Complete payment to activate your internship</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Card className="bg-muted/40">
                <CardContent className="pt-4 space-y-2 text-sm">
                  <Row label="Course" value={selectedCourse.title} />
                  <Row label="Duration" value={selectedCourse.duration || "3-6 months"} />
                  <Row label="Includes" value="Live classes · Internship · Assessments · Certificate" />
                  <div className="border-t pt-2 mt-2 flex justify-between font-bold text-base">
                    <span>Total</span>
                    <span className="text-primary">₹{selectedCourse.price.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
              <div className="text-xs text-muted-foreground bg-accent/10 border border-accent/20 rounded-md p-3">
                ⚡ <strong>Demo mode:</strong> Click "Pay Now" to simulate a successful payment. Razorpay will be wired up in production.
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(3)} className="flex-1">Back</Button>
                <Button onClick={handlePayment} className="flex-1" disabled={submitting}>
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CreditCard className="h-4 w-4 mr-2" />}
                  Pay ₹{selectedCourse.price.toLocaleString()}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 5 && (
          <Card className="border-healthcare/30 bg-gradient-to-br from-healthcare/5 to-primary/5">
            <CardContent className="py-12 text-center space-y-4">
              <div className="inline-flex h-16 w-16 rounded-full bg-healthcare/20 items-center justify-center">
                <CheckCircle className="h-8 w-8 text-healthcare" />
              </div>
              <h2 className="text-2xl font-bold">You're enrolled! 🎉</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Your internship is active. Head to your dashboard to start classes, complete assessments, and earn your certificate.
              </p>
              <div className="flex gap-2 justify-center pt-2">
                <Button onClick={() => navigate("/dashboard/courses")}>
                  <BookOpen className="h-4 w-4 mr-2" /> Start Classes
                </Button>
                <Button variant="outline" onClick={() => navigate("/dashboard/internship")}>
                  <Briefcase className="h-4 w-4 mr-2" /> View Internship
                </Button>
              </div>
              <div className="pt-4 border-t mt-4">
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                  <Award className="h-3 w-3" /> Complete all assessments to unlock your verified certificate
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

const Field = ({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) => (
  <div>
    <Label>{label}</Label>
    <Input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="mt-1" />
  </div>
);

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between gap-4">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium text-right">{value}</span>
  </div>
);

export default InternshipEnrollPage;
