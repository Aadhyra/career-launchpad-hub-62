import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  Award,
  ClipboardCheck,
  TrendingUp,
  ArrowRight,
  Loader2,
  Sparkles,
  Briefcase,
  Rocket,
  FileText,
  GraduationCap,
  Target,
  Trophy,
  Flame,
} from 'lucide-react';

interface DashboardStats {
  totalBids: number;
  activeProjects: number;
  completedProjects: number;
  earnings: number;
  milestonesCompleted: number;
  overallProgress: number;
}

const DashboardHome = () => {
  const { profile, user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalBids: 0,
    activeProjects: 0,
    completedProjects: 0,
    earnings: 0,
    milestonesCompleted: 0,
    overallProgress: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      try {
        // Fetch bids
        const { data: bids } = await supabase
          .from('project_bids')
          .select('id, status')
          .eq('freelancer_id', user.id);

        // Fetch earnings
        const { data: earnings } = await supabase
          .from('freelancer_earnings')
          .select('amount, status')
          .eq('freelancer_id', user.id);

        // Fetch milestones
        const { data: milestones } = await supabase
          .from('project_milestones')
          .select('id, status')
          .eq('freelancer_id', user.id);

        const totalBids = bids?.length || 0;
        const activeProjects = bids?.filter(b => b.status === 'accepted').length || 0;
        const completedMilestones = milestones?.filter(m => m.status === 'completed' || m.status === 'approved').length || 0;
        const totalEarnings = earnings?.reduce((acc, curr) => acc + (curr.amount || 0), 0) || 0;
        
        // Mocking completed projects for now as it would normally derive from all milestones being completed
        const completedProjects = Math.floor(completedMilestones / 3);

        setStats({
          totalBids,
          activeProjects,
          completedProjects,
          earnings: totalEarnings,
          milestonesCompleted: completedMilestones,
          overallProgress: totalBids > 0 ? Math.min(100, Math.round((completedProjects / Math.max(totalBids, 1)) * 100)) : 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Hero */}
      <div className="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br from-primary via-tech to-accent text-primary-foreground shadow-card-hover">
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full bg-accent/30 blur-3xl" />
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-semibold mb-3">
              <Sparkles className="h-3.5 w-3.5" /> {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}
            </span>
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-2">
              Welcome back, {profile?.full_name?.split(' ')[0] || 'Freelancer'}! 👋
            </h2>
            <p className="text-white/85 max-w-xl">
              Your freelance dashboard is live. Find projects, submit bids, and track your earnings all in one place.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl p-3 border border-white/20">
            <Flame className="h-8 w-8 text-orange-300" />
            <div>
              <div className="text-2xl font-bold">₹{stats.earnings}</div>
              <div className="text-[10px] uppercase tracking-wider text-white/80">Total Earned</div>
            </div>
          </div>
        </div>
      </div>

      {/* Colorful Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Bids" value={stats.totalBids} note="Applications sent" Icon={FileText} gradient="from-tech to-blue-600" />
        <StatCard label="Active Projects" value={stats.activeProjects} note="Currently working on" Icon={Briefcase} gradient="from-healthcare to-emerald-600" />
        <StatCard label="Milestones" value={stats.milestonesCompleted} note="Successfully delivered" Icon={Target} gradient="from-marketing to-orange-600" />
        <StatCard label="Total Earnings" value={`₹${stats.earnings}`} note="Lifetime cleared" Icon={TrendingUp} gradient="from-design to-pink-600" />
      </div>

      {/* Career Progress Tracker */}
      <Card className="shadow-card overflow-hidden border-0 bg-gradient-to-br from-card to-muted/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-heading flex items-center gap-2">
                <Rocket className="h-5 w-5 text-primary" /> Your Career Roadmap
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">Complete each milestone to unlock placement</p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
              {stats.overallProgress}% Complete
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Milestone Icon={FileText} label="First Bid" done={stats.totalBids > 0} color="text-tech bg-tech/10" />
            <Milestone Icon={Briefcase} label="First Project" done={stats.activeProjects > 0} color="text-marketing bg-marketing/10" />
            <Milestone Icon={Target} label="First Milestone" done={stats.milestonesCompleted > 0} color="text-design bg-design/10" />
            <Milestone Icon={Trophy} label="First Earnings" done={stats.earnings > 0} color="text-healthcare bg-healthcare/10" />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-heading">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <ActionTile to="/freelancer-dashboard/projects" Icon={Briefcase} label="Find Projects" gradient="from-tech/15 to-tech/5" color="text-tech" />
            <ActionTile to="/freelancer-dashboard/bids" Icon={FileText} label="My Bids" gradient="from-marketing/15 to-marketing/5" color="text-marketing" />
            <ActionTile to="/freelancer-dashboard/earnings" Icon={TrendingUp} label="Earnings" gradient="from-design/15 to-design/5" color="text-design" />
            <ActionTile to="/freelancer-dashboard/portfolio" Icon={Sparkles} label="Portfolio" gradient="from-healthcare/15 to-healthcare/5" color="text-healthcare" />
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-heading">Getting Started</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-tech to-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow">
                  1
                </div>
                <div>
                  <h4 className="font-medium">Complete Your Portfolio</h4>
                  <p className="text-sm text-muted-foreground">
                    Showcase your best work to increase your chances of winning bids.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-marketing to-orange-600 text-white flex items-center justify-center font-bold text-sm shadow">
                  2
                </div>
                <div>
                  <h4 className="font-medium">Browse Live Projects</h4>
                  <p className="text-sm text-muted-foreground">
                    Find projects that match your skills and submit competitive bids.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-healthcare to-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow">
                  3
                </div>
                <div>
                  <h4 className="font-medium">Deliver & Earn</h4>
                  <p className="text-sm text-muted-foreground">
                    Complete project milestones and get paid securely.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, note, Icon, gradient }: any) => (
  <Card className="overflow-hidden border-0 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-0.5">
    <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />
    <CardContent className="p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
        <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${gradient} text-white flex items-center justify-center`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="text-2xl md:text-3xl font-bold">{value}</div>
      {typeof note === "string" ? <p className="text-xs text-muted-foreground mt-1">{note}</p> : note}
    </CardContent>
  </Card>
);

const Milestone = ({ Icon, label, done, color }: any) => (
  <div className={`relative rounded-xl p-3 text-center border ${done ? color : "bg-muted/30 text-muted-foreground"} transition-all`}>
    <Icon className="h-6 w-6 mx-auto mb-1" />
    <div className="text-xs font-semibold">{label}</div>
    {done && <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-healthcare text-white text-[10px] flex items-center justify-center">✓</span>}
  </div>
);

const ActionTile = ({ to, Icon, label, gradient, color }: any) => (
  <Link to={to} className={`group rounded-xl bg-gradient-to-br ${gradient} border p-4 hover:shadow-card transition-all hover:-translate-y-0.5`}>
    <Icon className={`h-6 w-6 mb-2 ${color}`} />
    <div className="text-sm font-semibold text-foreground flex items-center justify-between">
      {label}
      <ArrowRight className={`h-3.5 w-3.5 ${color} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all`} />
    </div>
  </Link>
);

export default DashboardHome;