import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Award, Download, QrCode, Loader2, CheckCircle, Clock, 
  ExternalLink, GraduationCap, Briefcase, Eye, Shield, Star
} from 'lucide-react';
import companyLogo from '@/assets/aadhyra-logo.png';

interface Certificate {
  id: string;
  certificate_id: string;
  certificate_type: string;
  issue_date: string;
  verified: boolean;
  certificate_url: string | null;
  qr_code_url: string | null;
  course_id: string;
}

const DashboardCertificates = () => {
  const { user, profile } = useAuth();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewCert, setPreviewCert] = useState<Certificate | null>(null);

  useEffect(() => { if (user) fetchCertificates(); }, [user]);

  const fetchCertificates = async () => {
    try {
      const { data, error } = await supabase.from('certificates').select('*').eq('user_id', user?.id).order('issue_date', { ascending: false });
      if (error) throw error;
      setCertificates(data || []);
    } catch (error) { console.error('Error fetching certificates:', error); }
    finally { setLoading(false); }
  };

  const getCertificateIcon = (type: string) => {
    switch (type) {
      case 'completion': return <GraduationCap className="h-6 w-6" />;
      case 'internship': return <Briefcase className="h-6 w-6" />;
      default: return <Award className="h-6 w-6" />;
    }
  };

  const getCertificateTypeName = (type: string) => {
    switch (type) {
      case 'completion': return 'Course Completion';
      case 'internship': return 'Internship Completion';
      default: return 'Certificate of Excellence';
    }
  };

  const getGradient = (type: string) => {
    switch (type) {
      case 'completion': return 'from-primary via-primary/80 to-tech';
      case 'internship': return 'from-healthcare via-healthcare/80 to-primary';
      default: return 'from-accent via-marketing to-design';
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold">My Certificates</h2>
        <p className="text-muted-foreground">View, download, and verify your earned certificates</p>
      </div>

      <Card id="sample-certificate" className="overflow-hidden border-primary/20">
        <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border bg-background p-1.5">
              <img src={companyLogo} alt="AADHYRA INNOVATIONS PVT LTD logo" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="min-w-0">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h3 className="font-semibold">Sample Certificate</h3>
                <Badge variant="outline">Sample only</Badge>
              </div>
              <p className="max-w-2xl text-sm text-muted-foreground">
                Preview the AADHYRA certificate design and download a sample PDF. This example is not an issued or verifiable credential.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outline" asChild>
              <a href="/downloads/aadhyra-sample-certificate.pdf" target="_blank" rel="noopener noreferrer">
                <Eye className="mr-2 h-4 w-4" /> Preview
              </a>
            </Button>
            <Button asChild>
              <a href="/downloads/aadhyra-sample-certificate.pdf" download="aadhyra-sample-certificate.pdf">
                <Download className="mr-2 h-4 w-4" /> Download Sample
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-card bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/20"><Award className="h-6 w-6 text-primary" /></div>
              <div><p className="text-sm text-muted-foreground">Total Certificates</p><p className="text-3xl font-bold">{certificates.length}</p></div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card bg-gradient-to-br from-healthcare/10 to-healthcare/5 border-healthcare/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-healthcare/20"><CheckCircle className="h-6 w-6 text-healthcare" /></div>
              <div><p className="text-sm text-muted-foreground">Verified</p><p className="text-3xl font-bold">{certificates.filter(c => c.verified).length}</p></div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent/20"><Clock className="h-6 w-6 text-accent" /></div>
              <div><p className="text-sm text-muted-foreground">Pending</p><p className="text-3xl font-bold">{certificates.filter(c => !c.verified).length}</p></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Certificates */}
      {certificates.length === 0 ? (
        <Card className="shadow-card">
          <CardContent className="py-16 text-center">
            <div className="relative mx-auto w-24 h-24 mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full animate-pulse" />
              <div className="absolute inset-2 bg-card rounded-full flex items-center justify-center">
                <Award className="h-10 w-10 text-muted-foreground/50" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">No Certificates Yet</h3>
            <p className="text-muted-foreground mb-4 max-w-md mx-auto">Complete your courses and internships to earn professionally verified certificates</p>
            <Button asChild><a href="/dashboard/courses">View My Courses</a></Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {certificates.map(cert => (
            <Card key={cert.id} className="shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group">
              {/* Certificate Visual Card */}
              <div className={`relative h-48 bg-gradient-to-br ${getGradient(cert.certificate_type)} p-6 text-white overflow-hidden`}>
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="absolute top-3 right-3 opacity-20"><Star className="h-8 w-8" /></div>
                
                {/* Certificate content */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="h-4 w-4" />
                      <span className="text-xs font-medium uppercase tracking-wider opacity-90">Aadhyra Innovations Certified</span>
                    </div>
                    <h3 className="text-xl font-bold">{getCertificateTypeName(cert.certificate_type)}</h3>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-sm opacity-80">Awarded to</p>
                      <p className="text-lg font-semibold">{profile?.full_name || 'Student'}</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                      <QrCode className="h-8 w-8" />
                    </div>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="secondary" size="sm" onClick={() => setPreviewCert(cert)}>
                    <Eye className="h-4 w-4 mr-2" /> View Certificate
                  </Button>
                </div>
              </div>

              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      {cert.certificate_id}
                    </span>
                    {cert.verified ? (
                      <Badge className="bg-healthcare/10 text-healthcare border-healthcare/20 text-xs"><CheckCircle className="h-3 w-3 mr-1" /> Verified</Badge>
                    ) : (
                      <Badge variant="outline" className="text-accent border-accent/30 text-xs"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(cert.issue_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>

                <div className="flex gap-2">
                  {cert.certificate_url && (
                    <Button className="flex-1" size="sm" asChild>
                      <a href={cert.certificate_url} target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4 mr-2" /> Download
                      </a>
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={() => setPreviewCert(cert)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  {cert.qr_code_url && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={cert.qr_code_url} target="_blank" rel="noopener noreferrer"><QrCode className="h-4 w-4" /></a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Verification Info */}
      <Card className="border-dashed border-primary/30 bg-gradient-to-r from-primary/5 to-transparent">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10"><Shield className="h-6 w-6 text-primary" /></div>
            <div>
              <h4 className="font-semibold mb-1">Certificate Verification</h4>
              <p className="text-sm text-muted-foreground">
                All certificates include a unique QR code and Certificate ID for employer verification. 
                Scan the QR code or visit <span className="text-primary font-medium">Aadhyra Innovations.com/verify</span> to authenticate.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certificate Preview Dialog */}
      <Dialog open={!!previewCert} onOpenChange={(o) => !o && setPreviewCert(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Certificate Preview</DialogTitle></DialogHeader>
          {previewCert && (
            <div className="border-4 border-double border-primary/30 rounded-lg p-8 bg-gradient-to-br from-card via-card to-primary/5 relative">
              {/* Corner decorations */}
              <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-primary/40 rounded-tl-lg" />
              <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-primary/40 rounded-tr-lg" />
              <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-primary/40 rounded-bl-lg" />
              <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-primary/40 rounded-br-lg" />

              <div className="text-center space-y-4">
                <div className="flex justify-center gap-1">
                  {[...Array(3)].map((_, i) => <Star key={i} className="h-5 w-5 text-accent fill-accent" />)}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">Aadhyra Innovations Academy</p>
                  <h2 className="text-2xl font-heading font-bold text-foreground mt-1">Certificate of {previewCert.certificate_type === 'completion' ? 'Completion' : 'Achievement'}</h2>
                </div>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">This is to certify that</p>
                  <p className="text-2xl font-bold text-primary mt-1">{profile?.full_name || 'Student Name'}</p>
                </div>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  has successfully completed the {getCertificateTypeName(previewCert.certificate_type)} program
                  at Aadhyra Innovations Academy and has demonstrated proficiency in the required skills.
                </p>
                <div className="flex items-center justify-center gap-8 pt-4">
                  <div className="text-center">
                    <div className="h-px w-32 bg-border mb-1" />
                    <p className="text-xs text-muted-foreground">Date: {new Date(previewCert.issue_date).toLocaleDateString('en-IN')}</p>
                  </div>
                  <div className="bg-muted p-2 rounded"><QrCode className="h-10 w-10 text-muted-foreground" /></div>
                  <div className="text-center">
                    <div className="h-px w-32 bg-border mb-1" />
                    <p className="text-xs text-muted-foreground">Director, Aadhyra Innovations</p>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground pt-2">Certificate ID: {previewCert.certificate_id}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardCertificates;
