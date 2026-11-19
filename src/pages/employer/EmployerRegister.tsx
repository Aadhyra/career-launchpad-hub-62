import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import {
  Loader2, Building2, ArrowLeft, ArrowRight, CheckCircle2, Users, Briefcase,
  Sparkles, ShieldCheck, Rocket, Target, TrendingUp, Award, MapPin, Globe,
} from 'lucide-react';
import logo from '@/assets/aadhyra-innovations-logo.png.asset.json';
import { cn } from '@/lib/utils';

const industries = [
  'Information Technology', 'Healthcare', 'Finance & Banking', 'Manufacturing',
  'Education', 'E-commerce', 'Consulting', 'Telecommunications', 'Real Estate', 'Other',
];

const companySizes = [
  '1-10 employees', '11-50 employees', '51-200 employees',
  '201-500 employees', '501-1000 employees', '1000+ employees',
];

const hiringNeeds = [
  'IT / Software Engineers', 'HR Professionals', 'Digital Marketing',
  'Graphic / UI Designers', 'Nursing / Healthcare', 'Sales & Operations',
];

const benefits = [
  { icon: Users, title: 'Pan-India Talent Pool', desc: 'Access 50,000+ pre-screened candidates across IT, HR, Marketing, Design & Nursing.' },
  { icon: ShieldCheck, title: 'Verified Profiles', desc: 'Every candidate is skill-tested, AI-interviewed and certified by Aadhyra Innovations.' },
  { icon: Rocket, title: 'Campus & Placement Drives', desc: 'Host virtual or on-campus drives across our partner network in 50+ cities.' },
  { icon: Target, title: 'Smart Skill Matching', desc: 'AI-powered matching shortlists top candidates based on your job requirements.' },
  { icon: TrendingUp, title: 'Hiring Analytics', desc: 'Track applications, interview funnels and time-to-hire from your dashboard.' },
  { icon: Award, title: 'Verified Employer Badge', desc: 'Stand out with a Aadhyra-verified company badge on every job posting.' },
];

const steps = [
  { id: 1, title: 'Company Basics', icon: Building2 },
  { id: 2, title: 'Business Details', icon: Briefcase },
  { id: 3, title: 'Location & Hiring', icon: MapPin },
  { id: 4, title: 'Review & Submit', icon: CheckCircle2 },
];

const EmployerRegister = () => {
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    company_name: '', company_email: '', company_phone: '', company_website: '',
    industry: '', company_size: '', description: '',
    address: '', city: '', state: '',
  });
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (showForm && !user) navigate('/employer/auth');
  }, [showForm, user, navigate]);

  const updateField = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const toggleNeed = (n: string) =>
    setSelectedNeeds((prev) => prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]);

  const validateStep = () => {
    if (step === 1) return formData.company_name && formData.company_email;
    if (step === 2) return formData.industry && formData.company_size;
    if (step === 3) return formData.city && formData.state;
    return true;
  };

  const next = () => {
    if (!validateStep()) {
      toast({ title: 'Please fill required fields', variant: 'destructive' });
      return;
    }
    setStep((s) => Math.min(4, s + 1));
  };
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = async () => {
    if (!user) return;
    if (!agreed) {
      toast({ title: 'Please accept Terms & Conditions', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      const { data: existing } = await supabase
        .from('employers').select('id').eq('user_id', user.id).maybeSingle();
      if (existing) { navigate('/employer'); return; }

      const { error } = await supabase.from('employers').insert({
        user_id: user.id,
        ...formData,
        description: `${formData.description}\n\nHiring Needs: ${selectedNeeds.join(', ')}`,
      });
      if (error) throw error;

      await supabase.from('user_roles').upsert(
        { user_id: user.id, role: 'employer' },
        { onConflict: 'user_id,role' },
      );

      toast({
        title: 'Welcome aboard! 🎉',
        description: 'Your company profile is under review. Verification typically completes within 24-48 hours.',
      });
      navigate('/employer');
    } catch (error: any) {
      toast({ title: 'Registration failed', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  // ─────────────────── LANDING ───────────────────
  if (!showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <header className="p-4 flex items-center justify-between max-w-7xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <Link to="/"><img src={logo.url} alt="AADHYRA INNOVATIONS logo" className="h-10 w-auto" /></Link>
          <Link to="/employer/auth">
            <Button variant="outline" size="sm">Already registered? Login</Button>
          </Link>
        </header>

        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
          </div>
          <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" /> Now onboarding employers across India
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Hire Smarter with{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AADHYRA TALENT CONNECT
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Register your company in 4 easy steps and unlock access to India's fastest-growing
              pool of certified, job-ready talent — across IT, HR, Marketing, Design & Nursing.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="text-base px-8" onClick={() => {
                if (!user) navigate('/employer/auth');
                else setShowForm(true);
              }}>
                Register Now <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Link to="/placement/talent-connect">
                <Button size="lg" variant="outline" className="text-base px-8">Learn More</Button>
              </Link>
            </div>

            {/* Stats ribbon */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
              {[
                { v: '50,000+', l: 'Verified Candidates' },
                { v: '500+', l: 'Hiring Partners' },
                { v: '50+', l: 'Cities Covered' },
                { v: '24-48h', l: 'Verification Time' },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">{s.v}</div>
                  <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why employers choose us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to source, evaluate and hire the right talent — in one platform.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <Card key={b.title} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <b.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="bg-muted/30 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get started in minutes</h2>
              <p className="text-muted-foreground">A simple 4-step onboarding to start hiring today.</p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {steps.map((s, i) => (
                <div key={s.id} className="relative">
                  <Card className="h-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                        {s.id}
                      </div>
                      <s.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                      <h3 className="font-semibold">{s.title}</h3>
                    </CardContent>
                  </Card>
                  {i < steps.length - 1 && (
                    <ArrowRight className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button size="lg" onClick={() => user ? setShowForm(true) : navigate('/employer/auth')}>
                Start Registration <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ─────────────────── WIZARD ───────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="p-4 flex items-center justify-between max-w-4xl mx-auto">
        <button onClick={() => setShowForm(false)} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <Link to="/"><img src={logo.url} alt="AADHYRA INNOVATIONS logo" className="h-10 w-auto" /></Link>
      </header>

      <div className="max-w-3xl mx-auto p-4 pb-12">
        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center flex-1">
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors',
                  step >= s.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
                )}>
                  {step > s.id ? <CheckCircle2 className="h-5 w-5" /> : s.id}
                </div>
                {i < steps.length - 1 && (
                  <div className={cn('flex-1 h-1 mx-2 rounded-full transition-colors',
                    step > s.id ? 'bg-primary' : 'bg-muted')} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            {steps.map((s) => <span key={s.id} className="flex-1 text-center">{s.title}</span>)}
          </div>
        </div>

        <Card>
          <CardContent className="p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold">{steps[step - 1].title}</h2>
              <p className="text-sm text-muted-foreground mt-1">Step {step} of {steps.length}</p>
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company_name">Company Name *</Label>
                  <Input id="company_name" placeholder="ABC Technologies Pvt. Ltd."
                    value={formData.company_name} onChange={(e) => updateField('company_name', e.target.value)} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company_email">Company Email *</Label>
                    <Input id="company_email" type="email" placeholder="hr@company.com"
                      value={formData.company_email} onChange={(e) => updateField('company_email', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company_phone">Phone</Label>
                    <Input id="company_phone" placeholder="+91 98765 43210"
                      value={formData.company_phone} onChange={(e) => updateField('company_phone', e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company_website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="company_website" className="pl-9" placeholder="https://www.company.com"
                      value={formData.company_website} onChange={(e) => updateField('company_website', e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Industry *</Label>
                    <Select value={formData.industry} onValueChange={(v) => updateField('industry', v)}>
                      <SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger>
                      <SelectContent>
                        {industries.map((ind) => <SelectItem key={ind} value={ind}>{ind}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Company Size *</Label>
                    <Select value={formData.company_size} onValueChange={(v) => updateField('company_size', v)}>
                      <SelectTrigger><SelectValue placeholder="Select size" /></SelectTrigger>
                      <SelectContent>
                        {companySizes.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">About your company</Label>
                  <Textarea id="description" rows={4}
                    placeholder="Tell us about your company, culture, and what makes it a great place to work..."
                    value={formData.description} onChange={(e) => updateField('description', e.target.value)} />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" placeholder="123 Business Park, Tech Hub"
                    value={formData.address} onChange={(e) => updateField('address', e.target.value)} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" placeholder="Chennai"
                      value={formData.city} onChange={(e) => updateField('city', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input id="state" placeholder="Tamil Nadu"
                      value={formData.state} onChange={(e) => updateField('state', e.target.value)} />
                  </div>
                </div>
                <div className="space-y-3 pt-4">
                  <Label>What roles are you hiring for?</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {hiringNeeds.map((n) => (
                      <button type="button" key={n} onClick={() => toggleNeed(n)}
                        className={cn(
                          'p-3 rounded-lg border text-sm text-left transition-all',
                          selectedNeeds.includes(n)
                            ? 'border-primary bg-primary/5 text-primary font-medium'
                            : 'border-border hover:border-primary/50',
                        )}>
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Company</span>
                    <span className="font-medium">{formData.company_name || '—'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">{formData.company_email || '—'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Industry</span>
                    <span className="font-medium">{formData.industry || '—'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Size</span>
                    <span className="font-medium">{formData.company_size || '—'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium">{[formData.city, formData.state].filter(Boolean).join(', ') || '—'}</span>
                  </div>
                  {selectedNeeds.length > 0 && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Hiring: </span>
                      <span className="font-medium">{selectedNeeds.join(', ')}</span>
                    </div>
                  )}
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-4 text-sm">
                  <p className="font-medium text-amber-800 dark:text-amber-400">Verification Required</p>
                  <p className="text-amber-700 dark:text-amber-500/90 mt-1">
                    Your profile will be reviewed within 24-48 hours. Once verified, your jobs go live across our network.
                  </p>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <Checkbox checked={agreed} onCheckedChange={(c) => setAgreed(!!c)} className="mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    I agree to the{' '}
                    <Link to="/terms" target="_blank" className="text-primary hover:underline">Terms & Conditions</Link>
                    {' '}and{' '}
                    <Link to="/privacy" target="_blank" className="text-primary hover:underline">Privacy Policy</Link>.
                  </span>
                </label>
              </div>
            )}

            {/* Nav */}
            <div className="flex justify-between gap-3 pt-4 border-t">
              <Button variant="outline" onClick={prev} disabled={step === 1 || loading}>
                <ArrowLeft className="h-4 w-4 mr-2" /> Back
              </Button>
              {step < 4 ? (
                <Button onClick={next}>
                  Continue <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={loading || !agreed}>
                  {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  Complete Registration
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployerRegister;