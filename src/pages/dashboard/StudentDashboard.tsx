import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  Award,
  CreditCard,
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
  ChevronRight,
} from 'lucide-react';

interface DashboardStats {
  enrolledCourses: number;
  completedCourses: number;
  certificates: number;
  pendingPayments: number;
  overallProgress: number;
  totalPaid: number;
  internshipsCount: number;
  hasResume: boolean;
}

const DashboardHome = () => {
  const { profile, user } = useAuth();
  const location = useLocation();
  const [stats, setStats] = useState<DashboardStats>({
    enrolledCourses: 0,
    completedCourses: 0,
    certificates: 0,
    pendingPayments: 0,
    overallProgress: 0,
    totalPaid: 0,
    internshipsCount: 0,
    hasResume: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      try {
        // Fetch enrollments
        const { data: enrollments ,error} = await supabase
          .from('enrollments')
          .select('status, progress')
          .eq('user_id', user.id);

          console.log("DEBUG: User ID is", user.id);
          console.log("DEBUG: Fetched enrollments are", enrollments);
          console.log("DEBUG: Any errors?", error);

        // Fetch certificates
        const { data: certificates } = await supabase
          .from('certificates')
          .select('id')
          .eq('user_id', user.id);

        // Fetch pending payments
        const { data: payments, error: payError } = await supabase
          .from('course_payments')
          // .select('id')
          .select('amount, status', { count: 'exact' })
          .eq('user_id', user.id)
          // .eq('status', 'pending'); // Added filter here
        
        console.log("DEBUG: All payments:", payments);
        console.log("DEBUG: Pending payments count:", payments?.length);

        const pending = payments?.filter(p => p.status === 'pending') || [];
        const successful = payments?.filter(p => p.status === 'success') || [];

        const totalPaidAmount = successful.reduce((sum, p) => sum + (p.amount || 0), 0);

        // Fetch internships
        const { data: internships } = await supabase
          .from('internships')
          .select('id')
          .eq('user_id', user.id);

        // Fetch resume
        const { data: resume } = await supabase
          .from('resume_data')
          .select('id')
          .eq('user_id', user.id)
          .maybeSingle();

        const enrolled = enrollments?.filter(e => e.status === 'active').length || 0;
        const completed = enrollments?.filter(e => e.status === 'completed').length || 0;
        const avgProgress = enrollments?.length 
          ? enrollments.reduce((acc, e) => acc + (e.progress || 0), 0) / enrollments.length 
          : 0;

        setStats({
          enrolledCourses: enrolled,
          completedCourses: completed,
          certificates: certificates?.length || 0,
          pendingPayments: pending.length || 0,
          overallProgress: Math.round(avgProgress),
          totalPaid: totalPaidAmount,
          internshipsCount: internships?.length || 0,
          hasResume: !!resume,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user,location.pathname]);

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
              Welcome back, {profile?.full_name?.split(' ')[0] || 'Student'}! 👋
            </h2>
            <p className="text-white/85 max-w-xl">
              Your career engine is running. Keep learning, building & shipping — placements love consistency.
            </p>
            <Link to="/dashboard/certificates" className="mt-4 inline-flex items-center gap-2 rounded-md bg-background px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-background/90">
              <Award className="h-4 w-4" /> View Certificates <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl p-3 border border-white/20">
            <Flame className="h-8 w-8 text-orange-300" />
            <div>
              <div className="text-2xl font-bold">{Math.max(stats.overallProgress, 1)}🔥</div>
              <div className="text-[10px] uppercase tracking-wider text-white/80">Day Streak</div>
            </div>
          </div>
        </div>
      </div>

      {/* Colorful Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Enrolled" value={stats.enrolledCourses} note="Active courses" Icon={BookOpen} gradient="from-tech to-blue-600" />
        <StatCard label="Completed" value={stats.completedCourses} note="Courses finished" Icon={Trophy} gradient="from-healthcare to-emerald-600" />
        <StatCard label="Certificates" value={stats.certificates} note="Verified by QR" Icon={Award} gradient="from-marketing to-orange-600" />
        <StatCard label="Progress" value={`${stats.overallProgress}%`} note={<Progress value={stats.overallProgress} className="mt-1 h-1.5" />} Icon={TrendingUp} gradient="from-design to-pink-600" />
        {/* <StatCard 
          label="Pending Payments" 
          value={stats.pendingPayments} 
          note={stats.pendingPayments > 0 ? "Action Required!" : "No pending payments"} 
          Icon={CreditCard} 
          gradient="from-red-500 to-orange-600" 
        /> */}
        {/* <StatCard label="Total Paid" value={`₹${stats.totalPaid}`} note="Successfully cleared" Icon={CreditCard} gradient="from-marketing to-orange-600" /> */}
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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <Milestone Icon={GraduationCap} label="Course" done={stats.enrolledCourses > 0} color="text-tech bg-tech/10" />
            <Milestone Icon={Target} label="Learning" done={stats.overallProgress > 30} color="text-marketing bg-marketing/10" />
            <Milestone Icon={Briefcase} label="Internship" done={stats.internshipsCount > 0} color="text-design bg-design/10" />
            <Milestone Icon={FileText} label="Resume" done={stats.hasResume} color="text-hr bg-hr/10" />
            <Milestone Icon={Trophy} label="Placement" done={stats.completedCourses > 0} color="text-healthcare bg-healthcare/10" />
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
            <ActionTile to="/dashboard/interview" Icon={ClipboardCheck} label="Mock Interview" gradient="from-tech/15 to-tech/5" color="text-tech" />
            <ActionTile to="/dashboard/courses" Icon={BookOpen} label="My Courses" gradient="from-marketing/15 to-marketing/5" color="text-marketing" />
            <ActionTile to="/dashboard/resume" Icon={FileText} label="Build Resume" gradient="from-design/15 to-design/5" color="text-design" />
            <ActionTile to="/dashboard/portfolio" Icon={Sparkles} label="Portfolio" gradient="from-healthcare/15 to-healthcare/5" color="text-healthcare" />
            <ActionTile to="/dashboard/internship" Icon={Briefcase} label="Internship" gradient="from-hr/15 to-hr/5" color="text-hr" />
            <ActionTile to="/dashboard/placement" Icon={Trophy} label="Placement" gradient="from-primary/15 to-primary/5" color="text-primary" />
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
                  <h4 className="font-medium">Select Your Course</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Choose from IT, HR, Digital Marketing, Design, or Nursing
                  </p>
                  {stats.enrolledCourses === 0 && (
                    <Link to="/apply" className="inline-flex items-center text-xs font-semibold text-primary hover:underline">
                      Explore Courses & Apply <ChevronRight className="h-3 w-3 ml-1" />
                    </Link>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-marketing to-orange-600 text-white flex items-center justify-center font-bold text-sm shadow">
                  2
                </div>
                <div>
                  <h4 className="font-medium">Pay Evaluation Fee (₹499)</h4>
                  <p className="text-sm text-muted-foreground">
                    Complete the entrance test to unlock course enrollment
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-healthcare to-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow">
                  3
                </div>
                <div>
                  <h4 className="font-medium">Start Learning</h4>
                  <p className="text-sm text-muted-foreground">
                    Access video lessons, complete assignments & earn certificates
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
