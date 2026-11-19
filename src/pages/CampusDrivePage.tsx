import { useState } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  ArrowLeft, GraduationCap, Building2, Users, Calendar, Sparkles,
  CheckCircle2, Loader2, Briefcase, MapPin, Award,
} from 'lucide-react';
import logo from '@/assets/aadhyra-innovations-logo.png.asset.json';
import { cn } from '@/lib/utils';

const departments = [
  'Computer Science / IT', 'Electronics & Communication', 'Mechanical', 'Civil',
  'MBA / Management', 'Commerce / BBA', 'Nursing / Paramedical',
  'Design / Fine Arts', 'Pharmacy', 'Other',
];

const driveSchema = z.object({
  college_name: z.string().trim().min(2, 'College name is required').max(200),
  contact_person: z.string().trim().min(2, 'Contact person is required').max(100),
  designation: z.string().trim().max(100).optional().or(z.literal('')),
  email: z.string().trim().email('Invalid email').max(255),
  phone: z.string().trim().min(10, 'Valid phone required').max(20),
  address: z.string().trim().max(500).optional().or(z.literal('')),
  city: z.string().trim().min(2, 'City is required').max(100),
  state: z.string().trim().min(2, 'State is required').max(100),
  expected_students: z.number().int().positive().max(100000).optional(),
  preferred_date: z.string().optional().or(z.literal('')),
  drive_mode: z.enum(['on-campus', 'virtual', 'hybrid']),
  notes: z.string().trim().max(2000).optional().or(z.literal('')),
});

const benefits = [
  { icon: Users, title: '50,000+ Verified Candidates', desc: 'Tap into our pre-screened, AI-interviewed talent pool.' },
  { icon: Building2, title: '500+ Hiring Partners', desc: 'Bring top recruiters to your campus in a single drive.' },
  { icon: Award, title: 'Free for Colleges', desc: 'Zero cost for institutions — we handle logistics end-to-end.' },
  { icon: Sparkles, title: 'Virtual or On-Campus', desc: 'Choose the format that fits your students and calendar.' },
];

const CampusDrivePage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedDepts, setSelectedDepts] = useState<string[]>([]);
  const [form, setForm] = useState({
    college_name: '', contact_person: '', designation: '', email: '', phone: '',
    address: '', city: '', state: '',
    expected_students: '', preferred_date: '', drive_mode: 'on-campus' as const,
    notes: '',
  });

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const toggleDept = (d: string) =>
    setSelectedDepts((p) => p.includes(d) ? p.filter((x) => x !== d) : [...p, d]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const parsed = driveSchema.parse({
        ...form,
        expected_students: form.expected_students ? parseInt(form.expected_students, 10) : undefined,
      });
      const { error } = await supabase.from('campus_drive_requests').insert({
        college_name: parsed.college_name,
        contact_person: parsed.contact_person,
        designation: parsed.designation || null,
        email: parsed.email,
        phone: parsed.phone,
        address: parsed.address || null,
        city: parsed.city,
        state: parsed.state,
        expected_students: parsed.expected_students ?? null,
        preferred_date: parsed.preferred_date || null,
        drive_mode: parsed.drive_mode,
        departments: selectedDepts.length > 0 ? selectedDepts : null,
        notes: parsed.notes || null,
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (err: any) {
      const msg = err?.errors?.[0]?.message || err?.message || 'Submission failed';
      toast({ title: 'Could not submit', description: msg, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Request Received! 🎓</h2>
            <p className="text-muted-foreground">
              Thank you for inviting <strong>AADHYRA TALENT CONNECT</strong> to your campus.
              Our placement team will reach out within <strong>24-48 hours</strong> to coordinate the drive.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Link to="/" className="flex-1"><Button variant="outline" className="w-full">Back to Home</Button></Link>
              <Link to="/placement/talent-connect" className="flex-1"><Button className="w-full">Learn More</Button></Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="p-4 flex items-center justify-between max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
        <Link to="/"><img src={logo.url} alt="AADHYRA INNOVATIONS logo" className="h-10 w-auto" /></Link>
        <div className="w-20" />
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <GraduationCap className="h-4 w-4" /> For Colleges & Universities
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Invite{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AADHYRA TALENT CONNECT
            </span>{' '}
            to your Campus
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Host a placement drive on your campus or virtually. We bring 500+ hiring partners,
            AI-driven candidate matching, and end-to-end coordination — completely free for your institution.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-5xl mx-auto px-4 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((b) => (
            <Card key={b.title} className="hover:shadow-md transition-all duration-300">
              <CardContent className="p-5">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <b.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{b.title}</h3>
                <p className="text-xs text-muted-foreground">{b.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <Card>
          <CardContent className="p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Request a Campus Drive</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Fill in your college details — our team will get back within 24-48 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* College */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm flex items-center gap-2 text-muted-foreground">
                  <Building2 className="h-4 w-4" /> COLLEGE INFORMATION
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="college_name">College / University Name *</Label>
                  <Input id="college_name" required maxLength={200}
                    placeholder="ABC Institute of Technology"
                    value={form.college_name} onChange={(e) => update('college_name', e.target.value)} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact_person">Contact Person *</Label>
                    <Input id="contact_person" required maxLength={100}
                      placeholder="Dr. Rajesh Kumar"
                      value={form.contact_person} onChange={(e) => update('contact_person', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input id="designation" maxLength={100}
                      placeholder="TPO / Placement Head"
                      value={form.designation} onChange={(e) => update('designation', e.target.value)} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" required maxLength={255}
                      placeholder="placement@college.edu.in"
                      value={form.email} onChange={(e) => update('email', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input id="phone" required maxLength={20}
                      placeholder="+91 98765 43210"
                      value={form.phone} onChange={(e) => update('phone', e.target.value)} />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4 pt-2">
                <h3 className="font-semibold text-sm flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" /> CAMPUS LOCATION
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="address">Campus Address</Label>
                  <Input id="address" maxLength={500}
                    placeholder="Street, Area"
                    value={form.address} onChange={(e) => update('address', e.target.value)} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" required maxLength={100}
                      placeholder="Chennai"
                      value={form.city} onChange={(e) => update('city', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input id="state" required maxLength={100}
                      placeholder="Tamil Nadu"
                      value={form.state} onChange={(e) => update('state', e.target.value)} />
                  </div>
                </div>
              </div>

              {/* Drive */}
              <div className="space-y-4 pt-2">
                <h3 className="font-semibold text-sm flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" /> DRIVE DETAILS
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expected_students">Expected Students</Label>
                    <Input id="expected_students" type="number" min={1} max={100000}
                      placeholder="200"
                      value={form.expected_students} onChange={(e) => update('expected_students', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferred_date">Preferred Date</Label>
                    <Input id="preferred_date" type="date"
                      value={form.preferred_date} onChange={(e) => update('preferred_date', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Drive Mode *</Label>
                    <Select value={form.drive_mode}
                      onValueChange={(v) => update('drive_mode', v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="on-campus">On-Campus</SelectItem>
                        <SelectItem value="virtual">Virtual</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" /> Departments Participating
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {departments.map((d) => (
                      <button type="button" key={d} onClick={() => toggleDept(d)}
                        className={cn(
                          'p-2.5 rounded-lg border text-xs text-left transition-all',
                          selectedDepts.includes(d)
                            ? 'border-primary bg-primary/5 text-primary font-medium'
                            : 'border-border hover:border-primary/50',
                        )}>
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea id="notes" rows={4} maxLength={2000}
                    placeholder="Tell us about your students, special requirements, infrastructure available, etc."
                    value={form.notes} onChange={(e) => update('notes', e.target.value)} />
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Submit Campus Drive Request
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                By submitting, you agree to our{' '}
                <Link to="/terms" className="text-primary hover:underline">Terms</Link> and{' '}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default CampusDrivePage;