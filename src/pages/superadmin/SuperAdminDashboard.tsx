import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Users, GraduationCap, Building2, School, Briefcase, Rocket, Video, Award, IndianRupee,
  BellRing, TrendingUp, Loader2, ArrowRight, FileStack, BookOpen, UserCheck, Clock,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import { rangeStart, type DateRangeKey } from "@/components/superadmin/ReportTable";

type Counts = Record<string, number>;

const COUNT_QUERIES: { key: string; table: string; dateField?: string; filter?: [string, string | boolean] }[] = [
  { key: "users", table: "profiles", dateField: "created_at" },
  { key: "roles", table: "user_roles", dateField: "created_at" },
  { key: "companies", table: "employers", dateField: "created_at" },
  { key: "colleges", table: "college_registrations", dateField: "created_at" },
  { key: "courses", table: "courses", dateField: "created_at" },
  { key: "enrollments", table: "enrollments", dateField: "enrolled_at" },
  { key: "activeEnrollments", table: "enrollments", dateField: "enrolled_at", filter: ["status", "active"] },
  { key: "completedEnrollments", table: "enrollments", dateField: "enrolled_at", filter: ["status", "completed"] },
  { key: "publishedJobs", table: "job_postings", dateField: "created_at", filter: ["is_active", true] },
  { key: "employerJobs", table: "jobs", dateField: "created_at", filter: ["is_active", true] },
  { key: "jobApplications", table: "job_applications", dateField: "applied_at" },
  { key: "selected", table: "job_applications", dateField: "applied_at", filter: ["status", "selected"] },
  { key: "shortlisted", table: "job_applications", dateField: "applied_at", filter: ["status", "shortlisted"] },
  { key: "internships", table: "internships", dateField: "created_at" },
  { key: "internshipsCompleted", table: "internships", dateField: "created_at", filter: ["status", "completed"] },
  { key: "interviews", table: "interview_attempts", dateField: "created_at" },
  { key: "interviewsCleared", table: "interview_attempts", dateField: "created_at", filter: ["status", "completed"] },
  { key: "certificates", table: "certificates", dateField: "created_at" },
  { key: "studentApplications", table: "applications", dateField: "created_at" },
  { key: "leads", table: "applications", dateField: "created_at" },
  { key: "pendingLeads", table: "applications", dateField: "created_at", filter: ["status", "new"] },
  { key: "campusDrives", table: "campus_drive_requests", dateField: "created_at" },
  { key: "contactMessages", table: "contact_messages", dateField: "created_at" },
  { key: "purchases", table: "project_purchases", dateField: "created_at" },
  { key: "withdrawals", table: "withdrawal_requests", dateField: "created_at", filter: ["status", "pending"] },
];

const monthKey = (d: string) => new Date(d).toLocaleDateString("en-IN", { month: "short", year: "2-digit" });

const buildTrend = (rows: { date: string }[], months = 6) => {
  const buckets: { name: string; value: number }[] = [];
  const now = new Date();
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    buckets.push({ name: d.toLocaleDateString("en-IN", { month: "short", year: "2-digit" }), value: 0 });
  }
  rows.forEach((r) => {
    if (!r.date) return;
    const k = monthKey(r.date);
    const b = buckets.find((x) => x.name === k);
    if (b) b.value += 1;
  });
  return buckets;
};

const SuperAdminDashboard = () => {
  const [range, setRange] = useState<DateRangeKey>("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [counts, setCounts] = useState<Counts>({});
  const [revenue, setRevenue] = useState({ total: 0, pending: 0, monthly: [] as { name: string; value: number }[] });
  const [trends, setTrends] = useState({
    students: [] as { name: string; value: number }[],
    enrollments: [] as { name: string; value: number }[],
    placements: [] as { name: string; value: number }[],
    certificates: [] as { name: string; value: number }[],
  });
  const [funnel, setFunnel] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataError, setDataError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const bounds = useMemo(() => {
    if (range === "custom") {
      return {
        gte: from ? new Date(from).toISOString() : null,
        lte: to ? new Date(`${to}T23:59:59`).toISOString() : null,
      };
    }
    const start = rangeStart(range);
    return { gte: start ? start.toISOString() : null, lte: null };
  }, [range, from, to]);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      setDataError("");

      const results = await Promise.all(
        COUNT_QUERIES.map(async (c) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let q: any = (supabase as any).from(c.table).select("id", { count: "exact", head: true });
          if (c.filter) q = q.eq(c.filter[0], c.filter[1]);
          if (c.dateField && bounds.gte) q = q.gte(c.dateField, bounds.gte);
          if (c.dateField && bounds.lte) q = q.lte(c.dateField, bounds.lte);
          const { count, error } = await q;
          return { key: c.key, count: count ?? 0, error: error?.message };
        })
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sb = supabase as any;
      const [pay, proj, prof, enr, apps, certs] = await Promise.all([
        sb.from("course_payments").select("amount,status,created_at").limit(2000),
        sb.from("project_purchases").select("amount,status,created_at").limit(2000),
        sb.from("profiles").select("created_at").limit(5000),
        sb.from("enrollments").select("enrolled_at").limit(5000),
        sb.from("job_applications").select("applied_at,status").limit(5000),
        sb.from("certificates").select("created_at").limit(5000),
      ]);

      if (cancelled) return;

      const payRows = [...(pay.data ?? []), ...(proj.data ?? [])] as { amount: number; status: string; created_at: string }[];
      const paid = payRows.filter((r) => ["paid", "success", "completed"].includes(String(r.status)));
      const monthlyRev: { name: string; value: number }[] = [];
      const now = new Date();
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        monthlyRev.push({ name: d.toLocaleDateString("en-IN", { month: "short", year: "2-digit" }), value: 0 });
      }
      paid.forEach((r) => {
        const b = monthlyRev.find((x) => x.name === monthKey(r.created_at));
        if (b) b.value += Number(r.amount ?? 0);
      });

      const appRows = (apps.data ?? []) as { applied_at: string; status: string }[];
      const stage = (s: string) => appRows.filter((a) => a.status === s).length;

      const errors = results.flatMap((result) => result.error ? [result.error] : []);
      const supportingErrors = [pay.error, proj.error, prof.error, enr.error, apps.error, certs.error]
        .flatMap((error) => error?.message ? [error.message] : []);
      const allErrors = Array.from(new Set([...errors, ...supportingErrors]));
      setDataError(allErrors.join(" · "));
      setCounts(Object.fromEntries(results.map(({ key, count }) => [key, count])));
      setRevenue({
        total: paid.reduce((s, r) => s + Number(r.amount ?? 0), 0),
        pending: payRows.filter((r) => ["created", "pending", "failed"].includes(String(r.status))).reduce((s, r) => s + Number(r.amount ?? 0), 0),
        monthly: monthlyRev,
      });
      setTrends({
        students: buildTrend(((prof.data ?? []) as { created_at: string }[]).map((r) => ({ date: r.created_at }))),
        enrollments: buildTrend(((enr.data ?? []) as { enrolled_at: string }[]).map((r) => ({ date: r.enrolled_at }))),
        placements: buildTrend(appRows.filter((a) => ["selected", "joined"].includes(a.status)).map((r) => ({ date: r.applied_at }))),
        certificates: buildTrend(((certs.data ?? []) as { created_at: string }[]).map((r) => ({ date: r.created_at }))),
      });
      setFunnel([
        { name: "Applied", value: appRows.length },
        { name: "Shortlisted", value: stage("shortlisted") },
        { name: "Interview", value: stage("interview_scheduled") + stage("interview_attended") },
        { name: "Selected", value: stage("selected") },
        { name: "Joined", value: stage("joined") },
      ]);
      setLoading(false);
    };
    run();
    return () => { cancelled = true; };
  }, [bounds, refreshKey]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const channel = supabase
      .channel("superadmin-live-kpis")
      .on(
        "postgres_changes",
        { event: "*", schema: "public" },
        (payload) => {
          if (!["applications", "enrollments", "job_postings", "jobs"].includes(payload.table)) return;
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => setRefreshKey((key) => key + 1), 250);
        },
      )
      .subscribe();

    return () => {
      if (timer) clearTimeout(timer);
      void supabase.removeChannel(channel);
    };
  }, []);

  const kpis = [
    { label: "Total Users", value: counts.users, icon: Users, to: "students", color: "text-tech" },
    { label: "Students", value: counts.users, icon: GraduationCap, to: "students", color: "text-primary" },
    { label: "Companies", value: counts.companies, icon: Building2, to: "companies", color: "text-hr" },
    { label: "Colleges", value: counts.colleges, icon: School, to: "colleges", color: "text-design" },
    { label: "Admin & Role Users", value: counts.roles, icon: UserCheck, to: "roles", color: "text-accent" },
    { label: "Total Courses", value: counts.courses, icon: BookOpen, to: "courses", color: "text-primary" },
    { label: "Student Applications", value: counts.studentApplications, icon: FileStack, to: "leads", color: "text-marketing" },
    { label: "Course Enrollments", value: counts.enrollments, icon: GraduationCap, to: "enrollments", color: "text-tech" },
    { label: "Active Enrollments", value: counts.activeEnrollments, icon: BookOpen, to: "enrollments", color: "text-healthcare" },
    { label: "Course Completions", value: counts.completedEnrollments, icon: Award, to: "enrollments", color: "text-marketing" },
    { label: "Active Job Postings", value: (counts.publishedJobs ?? 0) + (counts.employerJobs ?? 0), icon: Briefcase, to: "job-postings", color: "text-tech" },
    { label: "Job Applications", value: counts.jobApplications, icon: FileStack, to: "job-applications", color: "text-primary" },
    { label: "Shortlisted", value: counts.shortlisted, icon: UserCheck, to: "job-applications", color: "text-hr" },
    { label: "Total Placements", value: counts.selected, icon: TrendingUp, to: "job-applications", color: "text-healthcare" },
    { label: "Internships", value: counts.internships, icon: Rocket, to: "internships", color: "text-design" },
    { label: "Internships Completed", value: counts.internshipsCompleted, icon: Award, to: "internships", color: "text-marketing" },
    { label: "Interviews", value: counts.interviews, icon: Video, to: "interviews", color: "text-accent" },
    { label: "Interviews Cleared", value: counts.interviewsCleared, icon: Video, to: "interviews", color: "text-healthcare" },
    { label: "Certificates Issued", value: counts.certificates, icon: Award, to: "certificates", color: "text-primary" },
    { label: "Campus Drives", value: counts.campusDrives, icon: School, to: "campus-drives", color: "text-tech" },
    { label: "Total Leads", value: counts.leads, icon: FileStack, to: "leads", color: "text-marketing" },
    { label: "Pending Approvals", value: (counts.pendingLeads ?? 0) + (counts.withdrawals ?? 0), icon: Clock, to: "leads", color: "text-destructive" },
    { label: "Notifications", value: counts.contactMessages, icon: BellRing, to: "contact-messages", color: "text-accent" },
    { label: "Project Sales", value: counts.purchases, icon: IndianRupee, to: "project-sales", color: "text-healthcare" },
  ];

  const PIE_COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--healthcare))", "hsl(var(--design))", "hsl(var(--marketing))"];

  return (
    <div className="space-y-6">
      {/* Header + filters */}
      <div className="rounded-2xl gradient-hero text-primary-foreground p-6 md:p-8 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="relative flex flex-col lg:flex-row lg:items-end gap-4">
          <div className="flex-1">
            <h1 className="font-heading text-2xl md:text-3xl font-bold">Business Command Center</h1>
            <p className="text-white/80 mt-2 text-sm md:text-base">
              Real-time visibility across admissions, training, internships, placements, interviews and finance.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={range} onValueChange={(v) => setRange(v as DateRangeKey)}>
              <SelectTrigger className="w-[160px] bg-white/10 border-white/20 text-white"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            {range === "custom" && (
              <>
                <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="w-[150px] bg-white/10 border-white/20 text-white" />
                <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="w-[150px] bg-white/10 border-white/20 text-white" />
              </>
            )}
            <Link to="/superadmin/reports">
              <Button variant="accent" className="rounded-lg">Reports Center <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </div>

      {dataError && (
        <Card className="border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
          Some live records could not be loaded. Refresh the page or check administrator data access. {dataError}
        </Card>
      )}

      {/* Revenue strip */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Total Revenue Collected</p>
          <p className="font-heading text-2xl font-bold text-foreground mt-1">₹{revenue.total.toLocaleString("en-IN")}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Pending Payments</p>
          <p className="font-heading text-2xl font-bold text-destructive mt-1">₹{revenue.pending.toLocaleString("en-IN")}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Interview Success Rate</p>
          <p className="font-heading text-2xl font-bold text-healthcare mt-1">
            {counts.interviews ? Math.round(((counts.interviewsCleared ?? 0) / counts.interviews) * 100) : 0}%
          </p>
        </Card>
      </div>

      {/* KPI grid */}
      {loading ? (
        <Card className="p-16 flex justify-center"><Loader2 className="h-7 w-7 animate-spin text-primary" /></Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {kpis.map((k) => (
            <Link key={k.label} to={`/superadmin/m/${k.to}`}>
              <Card className="p-4 h-full hover:shadow-card-hover hover:-translate-y-1 transition-all">
                <k.icon className={`h-5 w-5 ${k.color} mb-2`} />
                <Counter value={k.value ?? 0} />
                <p className="text-xs text-muted-foreground mt-1 leading-tight">{k.label}</p>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-5">
        <ChartCard title="Student Registration Trend">
          <AreaChart data={trends.students}>
            <defs>
              <linearGradient id="gStudents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" fontSize={12} stroke="hsl(var(--muted-foreground))" />
            <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" allowDecimals={false} />
            <Tooltip />
            <Area type="monotone" dataKey="value" name="Registrations" stroke="hsl(var(--primary))" fill="url(#gStudents)" />
          </AreaChart>
        </ChartCard>

        <ChartCard title="Course Enrollment Trend">
          <BarChart data={trends.enrollments}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" fontSize={12} stroke="hsl(var(--muted-foreground))" />
            <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" name="Enrollments" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartCard>

        <ChartCard title="Placement Funnel">
          <BarChart data={funnel} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" fontSize={12} stroke="hsl(var(--muted-foreground))" allowDecimals={false} />
            <YAxis type="category" dataKey="name" width={90} fontSize={12} stroke="hsl(var(--muted-foreground))" />
            <Tooltip />
            <Bar dataKey="value" name="Candidates" fill="hsl(var(--healthcare))" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ChartCard>

        <ChartCard title="Revenue Analytics (6 months)">
          <LineChart data={revenue.monthly}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" fontSize={12} stroke="hsl(var(--muted-foreground))" />
            <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" />
            <Tooltip formatter={(v: number) => `₹${Number(v).toLocaleString("en-IN")}`} />
            <Line type="monotone" dataKey="value" name="Revenue" stroke="hsl(var(--marketing))" strokeWidth={3} dot={{ r: 3 }} />
          </LineChart>
        </ChartCard>

        <ChartCard title="Monthly Placements vs Certificates">
          <LineChart data={trends.placements.map((p, i) => ({ name: p.name, placements: p.value, certificates: trends.certificates[i]?.value ?? 0 }))}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" fontSize={12} stroke="hsl(var(--muted-foreground))" />
            <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="placements" stroke="hsl(var(--primary))" strokeWidth={2} />
            <Line type="monotone" dataKey="certificates" stroke="hsl(var(--design))" strokeWidth={2} />
          </LineChart>
        </ChartCard>

        <ChartCard title="Ecosystem Mix">
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie
              data={[
                { name: "Students", value: counts.users ?? 0 },
                { name: "Companies", value: counts.companies ?? 0 },
                { name: "Colleges", value: counts.colleges ?? 0 },
                { name: "Internships", value: counts.internships ?? 0 },
                { name: "Leads", value: counts.leads ?? 0 },
              ]}
              dataKey="value"
              nameKey="name"
              innerRadius={55}
              outerRadius={95}
              paddingAngle={3}
            >
              {PIE_COLORS.map((c) => <Cell key={c} fill={c} />)}
            </Pie>
          </PieChart>
        </ChartCard>
      </div>
    </div>
  );
};

const Counter = ({ value }: { value: number }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / 900, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <p className="font-heading text-2xl font-bold text-foreground">{n.toLocaleString("en-IN")}</p>;
};

const ChartCard = ({ title, children }: { title: string; children: React.ReactElement }) => (
  <Card className="p-5">
    <h3 className="font-heading font-semibold text-foreground mb-4">{title}</h3>
    <div className="h-[260px]">
      <ResponsiveContainer width="100%" height="100%">{children}</ResponsiveContainer>
    </div>
  </Card>
);

export default SuperAdminDashboard;
