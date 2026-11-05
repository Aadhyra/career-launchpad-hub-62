import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

// Imports mapped exactly to your folder structure layout
import StudentDashboard from './StudentDashboard'; 
import EmployerDashboard from '../employer/EmployerDashboard';
import AdminDashboard from '../admin/AdminDashboard';
import FreelancerDashboard from '../freelancer/FreelancerDashboard'; // Added freelancer component

const DashboardHome = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRoleMatrix = async () => {
      if (!user) return;
      try {
        const { data, error } = await (supabase
          .from('profiles')
          .select('user_type')
          .eq('id', user.id)
          .maybeSingle() as any);

        if (error) throw error;

        if (data?.user_type) {
          setUserRole(data.user_type);
        } else {
          setUserRole('student');
        }
      } catch (err) {
        console.error("Failed to parse user workspace role context:", err);
        setUserRole('student');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRoleMatrix();
  }, [user]);

  if (loading) {
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
      return <FreelancerDashboard />; // Serves up the newly structured workspace UI
    case 'student':
    default:
      return <StudentDashboard />;
  }

export default DashboardHome;