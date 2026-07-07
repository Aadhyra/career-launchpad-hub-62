import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Clock, IndianRupee, Briefcase, Code, Loader2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  skills_required: string[];
  status: string;
}

const FreelancerProjects = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [biddingProject, setBiddingProject] = useState<Project | null>(null);
  
  // Bid form state
  const [bidAmount, setBidAmount] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [estimatedDays, setEstimatedDays] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, [user]);

  const fetchProjects = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('live_projects')
        .select('*')
        .eq('status', 'open')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Ensure skills are correctly typed from JSON
      const formatted = ((data as any[]) || []).map((p: any) => ({
        ...p,
        skills_required: Array.isArray(p.skills_required) ? p.skills_required : []
      }));
      
      setProjects(formatted as any);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitBid = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !biddingProject) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('project_bids')
        .insert({
          project_id: biddingProject.id,
          freelancer_id: user.id,
          bid_amount: parseInt(bidAmount),
          cover_letter: coverLetter,
          estimated_days: parseInt(estimatedDays),
          status: 'pending'
        });

      if (error) {
        if (error.code === '23505') {
          throw new Error('You have already submitted a bid for this project.');
        }
        throw error;
      }

      toast({
        title: 'Bid Submitted!',
        description: 'Your proposal has been sent to the employer.',
      });
      
      setBiddingProject(null);
      
      // Reset form
      setBidAmount('');
      setCoverLetter('');
      setEstimatedDays('');
      
    } catch (error: any) {
      toast({
        title: 'Could not submit bid',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-3xl font-heading font-bold mb-2 flex items-center gap-2">
          <Briefcase className="h-8 w-8 text-primary" />
          Project Board
        </h2>
        <p className="text-muted-foreground">Find and bid on high-quality freelance projects.</p>
      </div>

      {projects.length === 0 ? (
        <Card className="flex flex-col items-center justify-center h-64 border-dashed">
          <Code className="h-12 w-12 text-muted-foreground opacity-50 mb-4" />
          <p className="text-lg font-medium text-muted-foreground">No active projects right now</p>
          <p className="text-sm text-muted-foreground">Check back later for new opportunities.</p>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="bg-primary/5 text-primary">
                    New
                  </Badge>
                  <span className="flex items-center text-sm font-semibold text-green-600">
                    <IndianRupee className="h-3 w-3 mr-1" />
                    {project.budget}
                  </span>
                </div>
                <CardTitle className="line-clamp-2">{project.title}</CardTitle>
                <CardDescription className="flex items-center gap-1 mt-2">
                  <Clock className="h-3 w-3" />
                  Due {new Date(project.deadline).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.skills_required.map((skill, i) => (
                    <Badge key={i} variant="secondary" className="text-xs font-normal">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Dialog open={biddingProject?.id === project.id} onOpenChange={(isOpen) => !isOpen && setBiddingProject(null)}>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full" 
                      onClick={() => setBiddingProject(project)}
                    >
                      Place Bid
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Submit Proposal</DialogTitle>
                      <DialogDescription>
                        Propose your terms for "{project.title}"
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitBid} className="space-y-4 pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Bid Amount (₹)</label>
                          <Input 
                            type="number" 
                            required 
                            placeholder={`Budget is ${project.budget}`}
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Estimated Days</label>
                          <Input 
                            type="number" 
                            required 
                            placeholder="e.g. 14"
                            value={estimatedDays}
                            onChange={(e) => setEstimatedDays(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Cover Letter</label>
                        <Textarea 
                          required 
                          placeholder="Why are you the best fit for this project?"
                          rows={5}
                          value={coverLetter}
                          onChange={(e) => setCoverLetter(e.target.value)}
                        />
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => setBiddingProject(null)}>
                          Cancel
                        </Button>
                        <Button type="submit" disabled={submitting}>
                          {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                          Submit Bid
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FreelancerProjects;
