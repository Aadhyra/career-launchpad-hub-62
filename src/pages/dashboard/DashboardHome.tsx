import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

// Imports mapped exactly to your folder structure layout
import StudentDashboard from './StudentDashboard'; 
import EmployerDashboard from '../employer/EmployerDashboard';
import AdminDashboard from '../admin/AdminDashboard';
import FreelancerDashboard from '../freelancer/FreelancerDashboard'; // Added freelancer component

const DashboardHome = () => {
  const { user, userRole, loading: authLoading } = useAuth();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Role comes from the protected user_roles table via AuthContext (already
    // resolved before the auth context releases loading), so the very first
    // render after sign-in shows the right workspace without a second lookup.
    if (!authLoading) setChecked(true);
  }, [authLoading]);

  if (authLoading || !checked) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  // Choose the exact screen dashboard interface layout safely
  switch (userRole) {
    case 'admin':
      return <AdminDashboard />;
    case 'employer':
      return <EmployerDashboard />;
    case 'freelancer':
      return <FreelancerDashboard />;
    case 'student':
    default:
      return <StudentDashboard />;
  }
};

export default DashboardHome;
