import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import {
  BookOpen,
  GraduationCap,
  CreditCard,
  Award,
  Briefcase,
  FileText,
  FolderOpen,
  BarChart3,
  User,
  LogOut,
  Home,
  ClipboardCheck,
  Code,
  Settings,
  Users,
  Layers,
  Building2,
  Bug,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const adminMenuItems = [
  { icon: Home, label: 'Dashboard', href: '/admin' },
  { icon: ClipboardCheck, label: 'Analytics', href: '/admin/analytics' },
  { icon: Users, label: 'Students', href: '/admin/students' },
  { icon: Layers, label: 'Courses', href: '/admin/courses' },
  { icon: Code, label: 'Projects', href: '/admin/projects' },
  { icon: ClipboardCheck, label: 'Interviews', href: '/admin/interviews' },
  { icon: Briefcase, label: 'Employers', href: '/admin/employers' },
  { icon: Award, label: 'Certificates', href: '/admin/certificates' },
  { icon: CreditCard, label: 'Payments', href: '/admin/payments' },
  { icon: Bug, label: 'Razorpay Debug', href: '/admin/razorpay-debug' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

interface DashboardSidebarProps {
  isAdmin?: boolean;
  role?: "student" | "freelancer" | "patient" | "doctor" | "employer"; // 1. Added patient to the TypeScript allowed roles
}

const DashboardSidebar = ({ isAdmin = false, role = "student" }: DashboardSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut, profile } = useAuth();

  const studentLinks = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: BookOpen, label: 'My Courses', href: '/dashboard/courses' },
    { icon: ClipboardCheck, label: 'Interview / Exam', href: '/dashboard/interview' },
    { icon: Building2, label: 'Placement Portal', href: '/dashboard/placement' },
    { icon: CreditCard, label: 'Payments', href: '/dashboard/payments' },
    { icon: Award, label: 'Certificates', href: '/dashboard/certificates' },
    { icon: Briefcase, label: 'Internship', href: '/dashboard/internship' },
    { icon: ClipboardCheck, label: 'HR Live Tasks', href: '/dashboard/hr-tasks' },
    { icon: FileText, label: 'Resume Builder', href: '/dashboard/resume' },
    { icon: FolderOpen, label: 'Portfolio', href: '/dashboard/portfolio' },
    { icon: Code, label: 'Live Projects', href: '/dashboard/projects' },
    { icon: BarChart3, label: 'Progress Report', href: '/dashboard/progress' },
    { icon: User, label: 'Profile', href: '/dashboard/profile' },
  ];

  const freelancerLinks = [
    { icon: Home, label: "Overview", href: "/freelancer-dashboard" },
    { icon: Briefcase, label: "Contracts", href: "/freelancer-dashboard/contracts" },
  ];

  const patientLinks = [
    { icon: Home, label: 'Overview', href: '/patient-dashboard' },
    { icon: ClipboardCheck, label: 'Appointments', href: '/patient-dashboard/appointments' },
    { icon: FileText, label: 'Medical Records', href: '/patient-dashboard/records' },
    { icon: CreditCard, label: 'Billing & Insurance', href: '/patient-dashboard/billing' },
    { icon: User, label: 'My Health Profile', href: '/patient-dashboard/profile' },
  ];

  const doctorLinks = [
  { icon: Home, label: 'Overview Hub', href: '/doctor-dashboard' },
  { icon: ClipboardCheck, label: 'Patient Queue', href: '/doctor-dashboard/appointments' },
  { icon: FileText, label: 'E-Prescriptions', href: '/doctor-dashboard/prescriptions' },
  { icon: Users, label: 'Medical Records Vault', href: '/doctor-dashboard/records' },
  { icon: User, label: 'Practitioner Profile', href: '/doctor-dashboard/profile' },
];

  const activeLinks = 
    role === "freelancer" ? freelancerLinks : 
    role === "patient" ? patientLinks :
    role === "doctor" ? doctorLinks : 
    studentLinks;
    
  const menuItems = isAdmin ? adminMenuItems : activeLinks;

  // 👇 UPDATED: Added patient conditions for UI labels
 const getPortalLabel = () => {
  if (isAdmin) return 'Admin Panel';
  
  switch (role) {
    case 'freelancer': return 'Freelancer Portal';
    case 'patient':    return 'Patient Portal';
    case 'doctor':     return 'Medical Portal';
    case 'employer':   return 'Employer Portal';
    default:           return 'Student Portal';
  }
};

const getRoleBadgeLabel = () => {
  if (isAdmin) return 'Administrator';
  
  switch (role) {
    case 'freelancer': return 'Freelancer';
    case 'patient':    return 'Patient';
    case 'doctor':     return 'Doctor / Nurse';
    case 'employer':   return 'Employer';
    default:           return 'Student';
  }
};
  const handleLogout = async () => {
    try {
      await signOut();
      
      if (isAdmin) {
        navigate('/admin/login');
      } else if (role === 'freelancer') {
        navigate('/auth?role=freelancer');
      } else if (role === 'patient') {
        navigate('/auth?role=patient');
      } else {
        navigate('/auth?role=student');
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen flex flex-col">
      {/* Logo Container */}
      <div className="p-4 border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <span className="text-lg font-heading font-bold text-foreground">Aadhyra Innovations</span>
            <span className="block text-xs text-muted-foreground capitalize">
              {getPortalLabel()}
            </span>
          </div>
        </Link>
      </div>

      {/* Dynamic Profile Metadata Blocks */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">
              {profile?.full_name || getRoleBadgeLabel()}
            </p>
            <p className="text-xs text-muted-foreground capitalize">
              {getRoleBadgeLabel()}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Loop Links */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href;
          const IconComponent = item.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              <IconComponent className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Sign Out Action Button */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;