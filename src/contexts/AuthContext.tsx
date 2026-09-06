import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type UserRoleType = "admin" | "employer" | "student";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  userRole: string | null; // Keeps frontend check flexible
  profile: UserProfile | null;
  signUp: (email: string, password: string, fullName: string, mobile?: string, role?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updatePassword: (password: string) => Promise<{ error: Error | null }>;
}

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  mobile: string | null;
  qualification: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null); // State for current role
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const { toast } = useToast();

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const checkUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);

      if (data && data.length && !error) {
        const roles = data.map((r) => r.role as string);
        const primary = roles.includes('admin')
          ? 'admin'
          : roles.includes('employer')
            ? 'employer'
            : roles[0];
        setUserRole(primary);
        setIsAdmin(roles.includes('admin'));
      } else {
        setUserRole(null);
        setIsAdmin(false);
      }
    } catch {
      setUserRole(null);
      setIsAdmin(false);
    }
  };


  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id);
            checkUserRole(session.user.id);
          }, 0);
        } else {
          setProfile(null);
          setIsAdmin(false);
          setUserRole(null);
        }
      }
    );

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        // Resolve the role BEFORE releasing loading, otherwise role-protected
        // routes redirect away while the role lookup is still in flight.
        await Promise.all([
          fetchProfile(session.user.id),
          checkUserRole(session.user.id),
        ]);
      }

      setLoading(false);
    });


    return () => subscription.unsubscribe();
  }, []);

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  const signUp = async (email: string, password: string, fullName: string, mobile?: string, role: string = 'student') => {
  try {
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        }
      }
    });

    if (error) {
      return { error };
    }

    if (data.user) {
      if (mobile) {
        await supabase
          .from('profiles')
          .update({ mobile })
          .eq('user_id', data.user.id);
      }

      // Safe matching for Supabase's literal type constraints
      // If the passed role string isn't employer or admin, default it to 'student'
      const sanitizedRole: UserRoleType = (role === 'employer' || role === 'admin') 
        ? role 
        : 'student';

      // We wrap the object as a single record explicitly to satisfy the compiler overload check
      const databaseRolePayload = { 
        user_id: data.user.id, 
        role: sanitizedRole 
      };

      await supabase
        .from('user_roles')
        .insert(databaseRolePayload);
    }

    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
};

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error };
      }

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setIsAdmin(false);
    setUserRole(null);
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const updatePassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      isAdmin,
      userRole,
      profile,
      signUp,
      signIn,
      signOut,
      refreshProfile,
      resetPassword,
      updatePassword,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}