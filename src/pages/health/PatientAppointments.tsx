import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Video, Loader2, Plus, UserCircle } from 'lucide-react';

interface Appointment {
  id: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  symptoms: string;
  doctor_id: string;
  doctor_name?: string;
}

interface Doctor {
  user_id: string;
  full_name: string;
}

const PatientAppointments = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);
  
  // Form State
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      // 1. Fetch patient's appointments
      const { data: appts, error: apptError } = await supabase
        .from('appointments')
        .select('*')
        .eq('patient_id', user!.id)
        .order('appointment_date', { ascending: true });

      if (apptError) throw apptError;

      // 2. Fetch doctors for the dropdown
      // Using a join on user_roles and profiles to find doctors
      const { data: doctorRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'doctor' as any);
        
      if (!rolesError && doctorRoles) {
        const doctorIds = doctorRoles.map(r => r.user_id);
        if (doctorIds.length > 0) {
          const { data: profiles } = await supabase
            .from('profiles')
            .select('user_id, full_name')
            .in('user_id', doctorIds);
            
          if (profiles) {
            setDoctors(profiles);
            
            // Map doctor names to appointments
            const mappedAppts = appts.map(a => {
              const doc = profiles.find(p => p.user_id === a.doctor_id);
              return { ...a, doctor_name: doc?.full_name || 'Assigned Specialist' };
            });
            setAppointments(mappedAppts);
            setLoading(false);
            return;
          }
        }
      }
      
      // Fallback if no doctors found (for demo purposes)
      setAppointments(appts || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('appointments')
        .insert({
          patient_id: user.id,
          doctor_id: selectedDoctor,
          appointment_date: date,
          appointment_time: time,
          symptoms: symptoms,
          status: 'scheduled'
        });

      if (error) throw error;

      toast({
        title: 'Appointment Booked!',
        description: 'Your tele-consultation has been scheduled successfully.',
      });
      
      setBookingOpen(false);
      
      // Reset form
      setSelectedDoctor('');
      setDate('');
      setTime('');
      setSymptoms('');
      
      fetchData(); // Refresh list
    } catch (error: any) {
      toast({
        title: 'Booking Failed',
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

  const upcoming = appointments.filter(a => a.status === 'scheduled');
  const past = appointments.filter(a => a.status !== 'scheduled');

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-heading font-bold mb-1 flex items-center gap-2">
            <Calendar className="h-8 w-8 text-healthcare" />
            My Appointments
          </h2>
          <p className="text-muted-foreground">Manage your tele-consultations and health schedule.</p>
        </div>
        
        <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
          <DialogTrigger asChild>
            <Button className="bg-healthcare hover:bg-healthcare/90">
              <Plus className="h-4 w-4 mr-2" />
              Book Consultation
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule Appointment</DialogTitle>
              <DialogDescription>
                Select a doctor and time for your online consultation.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleBooking} className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Doctor</label>
                <Select required value={selectedDoctor} onValueChange={setSelectedDoctor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a specialist" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.length > 0 ? (
                      doctors.map(doc => (
                        <SelectItem key={doc.user_id} value={doc.user_id}>
                          Dr. {doc.full_name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>No doctors available</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Input 
                    type="date" 
                    required 
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Input 
                    type="time" 
                    required 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Symptoms / Reason</label>
                <Textarea 
                  required 
                  placeholder="Briefly describe why you are scheduling this visit..."
                  rows={3}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                />
              </div>
              
              <DialogFooter>
                <Button type="button" variant="ghost" onClick={() => setBookingOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting || doctors.length === 0} className="bg-healthcare hover:bg-healthcare/90">
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Confirm Booking
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold flex items-center gap-2 border-b pb-2">
          <Clock className="h-5 w-5 text-healthcare" />
          Upcoming Consultations
        </h3>
        
        {upcoming.length === 0 ? (
          <Card className="flex flex-col items-center justify-center h-48 border-dashed">
            <Video className="h-10 w-10 text-muted-foreground opacity-30 mb-3" />
            <p className="text-muted-foreground font-medium">No upcoming appointments</p>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {upcoming.map((appt) => (
              <Card key={appt.id} className="border-l-4 border-l-healthcare">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <UserCircle className="h-5 w-5 text-muted-foreground" />
                      Dr. {appt.doctor_name}
                    </CardTitle>
                    <Badge variant="secondary" className="bg-healthcare/10 text-healthcare">
                      Scheduled
                    </Badge>
                  </div>
                  <CardDescription className="text-sm font-medium text-foreground mt-1">
                    {new Date(appt.appointment_date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })} at {appt.appointment_time}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    <span className="font-medium">Reason:</span> {appt.symptoms}
                  </p>
                  <Button className="w-full mt-4 bg-primary/10 text-primary hover:bg-primary/20" variant="secondary">
                    <Video className="h-4 w-4 mr-2" />
                    Join Video Call
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {past.length > 0 && (
        <div className="space-y-4 pt-6">
          <h3 className="text-xl font-bold border-b pb-2 text-muted-foreground">Past Records</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {past.map((appt) => (
              <Card key={appt.id} className="opacity-75">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-sm">Dr. {appt.doctor_name}</span>
                    <Badge variant="outline">{appt.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(appt.appointment_date).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientAppointments;
