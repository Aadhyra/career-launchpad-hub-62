import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Lock, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const UpdatePassword = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [linkStatus, setLinkStatus] = useState<'checking' | 'ready' | 'invalid'>('checking');
  const [resetEmail, setResetEmail] = useState('');
  const [sending, setSending] = useState(false);
  const { updatePassword, resetPassword } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.replace(/^#/, '') + '&' + window.location.search.replace(/^\?/, ''));
    if (params.get('error') || params.get('error_code')) {
      setLinkStatus('invalid');
      return;
    }
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || session) setLinkStatus('ready');
    });
    const timer = setTimeout(async () => {
      const { data } = await supabase.auth.getSession();
      setLinkStatus(data.session ? 'ready' : 'invalid');
    }, 1500);
    return () => { subscription.unsubscribe(); clearTimeout(timer); };
  }, []);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    setSending(true);
    const { error } = await resetPassword(resetEmail);
    setSending(false);
    toast({
      title: error ? 'Could not send link' : 'New link sent',
      description: error ? error.message : `Check ${resetEmail} and open the newest email only once.`,
      variant: error ? 'destructive' : 'default',
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ title: 'Error', description: 'Passwords do not match.', variant: 'destructive' });
      return;
    }
    if (password.length < 8) {
      toast({ title: 'Error', description: 'Password must be at least 8 characters.', variant: 'destructive' });
      return;
    }

    setLoading(true);
    const { error } = await updatePassword(password);
    setLoading(false);

    if (error) {
      const msg = error.message.toLowerCase();
      toast({
        title: 'Failed to update password',
        description: msg.includes('session')
          ? 'This reset link has expired or was already used. Request a new link below.'
          : msg.includes('weak') || msg.includes('guess')
            ? 'This password is too common. Use a longer mix of letters, numbers and symbols.'
            : error.message,
        variant: 'destructive',
      });
      if (msg.includes('session')) setLinkStatus('invalid');
    } else {
      toast({
        title: 'Password Updated',
        description: 'Your password has been successfully updated. You can now log in.',
      });
      // Sign out to ensure they log in with the new password cleanly
      await supabase.auth.signOut();
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-heading">Update Password</CardTitle>
            <CardDescription>
              Enter a new strong password for your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {linkStatus === 'checking' ? (
              <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
            ) : linkStatus === 'invalid' ? (
              <form onSubmit={handleResend} className="space-y-4">
                <p className="text-sm text-destructive text-center">
                  This reset link has expired or was already used. Each link works only once — request a new one below.
                </p>
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Your email</Label>
                  <Input id="reset-email" type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full" disabled={sending}>
                  {sending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Send new reset link
                </Button>
                <Button type="button" variant="outline" className="w-full" onClick={() => navigate('/admin/login')}>
                  Back to admin login
                </Button>
              </form>
            ) : (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UpdatePassword;
