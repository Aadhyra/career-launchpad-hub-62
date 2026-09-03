import {
  LayoutDashboard, Users, GraduationCap, Rocket, Briefcase, Video, Building2, School,
  IndianRupee, Award, Bell, FileStack, BarChart3, Settings, ShieldCheck,
} from "lucide-react";

export type NavItem = { label: string; slug: string; report?: string };
export type NavGroup = { label: string; icon: typeof Users; items: NavItem[] };

/** Every leaf renders at /superadmin/m/:slug — `report` binds it to a live data source. */
export const NAV_GROUPS: NavGroup[] = [
  {
    label: "User Management",
    icon: Users,
    items: [
      { label: "Students", slug: "students", report: "students" },
      { label: "Applicants", slug: "applicants", report: "applicant_details" },
      { label: "Employees", slug: "employees" },
      { label: "Trainers", slug: "trainers" },
      { label: "HR Users", slug: "hr-users" },
      { label: "Sales Team", slug: "sales" },
      { label: "College Coordinators", slug: "college-coordinators", report: "college_registrations" },
      { label: "Company HR", slug: "company-hr", report: "employers" },
      { label: "Admin Users", slug: "admin-users", report: "user_roles" },
      { label: "User Roles & Permissions", slug: "roles", report: "user_roles" },
    ],
  },
  {
    label: "Course Management",
    icon: GraduationCap,
    items: [
      { label: "Courses", slug: "courses", report: "courses" },
      { label: "Categories", slug: "course-categories" },
      { label: "Batches", slug: "batches" },
      { label: "Enrollments", slug: "enrollments", report: "enrollments" },
      { label: "Attendance", slug: "attendance" },
      { label: "Assignments", slug: "assignments" },
      { label: "Exams", slug: "exams", report: "exam_attempts" },
      { label: "Course Fees", slug: "course-fees", report: "course_payments" },
      { label: "Certificates", slug: "course-certificates", report: "certificates" },
    ],
  },
  {
    label: "Internship Management",
    icon: Rocket,
    items: [
      { label: "Internships", slug: "internships", report: "internships" },
      { label: "Task Submissions", slug: "internship-submissions", report: "internship_submissions" },
      { label: "HR Live Tasks & Stipend", slug: "hr-tasks", report: "hr_task_progress" },
      { label: "Shortlisting", slug: "internship-shortlisting" },
      { label: "Offer Letters", slug: "internship-offers" },
      { label: "Completion & PPO", slug: "internship-ppo" },
    ],
  },
  {
    label: "Placement Management",
    icon: Briefcase,
    items: [
      { label: "Job Postings", slug: "job-postings", report: "job_postings" },
      { label: "Employer Requisitions", slug: "employer-jobs", report: "jobs" },
      { label: "Candidate Applications", slug: "job-applications", report: "job_applications" },
      { label: "Resume Screening", slug: "resume-screening" },
      { label: "Offer Letters", slug: "placement-offers" },
      { label: "Joining Status", slug: "joining-status" },
    ],
  },
  {
    label: "Interview Management",
    icon: Video,
    items: [
      { label: "Interview Attempts", slug: "interviews", report: "interview_attempts" },
      { label: "Interview Fees", slug: "interview-fees", report: "interview_fee_payments" },
      { label: "Interview Pipeline", slug: "interview-pipeline" },
    ],
  },
  {
    label: "Company Management",
    icon: Building2,
    items: [
      { label: "Companies", slug: "companies", report: "employers" },
      { label: "Open Positions", slug: "open-positions", report: "job_postings" },
      { label: "Agreements & Invoices", slug: "company-invoices" },
    ],
  },
  {
    label: "College Management",
    icon: School,
    items: [
      { label: "Colleges", slug: "colleges", report: "college_registrations" },
      { label: "Campus Drives", slug: "campus-drives", report: "campus_drive_requests" },
      { label: "Student Upload", slug: "student-upload" },
    ],
  },
  {
    label: "Finance",
    icon: IndianRupee,
    items: [
      { label: "Course Payments", slug: "payments", report: "course_payments" },
      { label: "Project Sales", slug: "project-sales", report: "project_purchases" },
      { label: "Wallet Transactions", slug: "wallet", report: "wallet_transactions" },
      { label: "Withdrawals & Payouts", slug: "withdrawals", report: "withdrawal_requests" },
      { label: "GST & Invoices", slug: "gst" },
      { label: "Expenses", slug: "expenses" },
    ],
  },
  {
    label: "Certificates",
    icon: Award,
    items: [
      { label: "All Certificates", slug: "certificates", report: "certificates" },
      { label: "Offer / Experience Letters", slug: "letters" },
    ],
  },
  {
    label: "CRM & Leads",
    icon: FileStack,
    items: [
      { label: "Leads & Enquiries", slug: "leads", report: "applications" },
      { label: "Contact Messages", slug: "contact-messages", report: "contact_messages" },
    ],
  },
  {
    label: "Notifications",
    icon: Bell,
    items: [
      { label: "Email", slug: "notify-email" },
      { label: "SMS", slug: "notify-sms" },
      { label: "WhatsApp", slug: "notify-whatsapp" },
      { label: "Reminders", slug: "notify-reminders" },
    ],
  },
  {
    label: "CMS Management",
    icon: LayoutDashboard,
    items: [
      { label: "Home Page", slug: "cms-home" },
      { label: "Services & Products", slug: "cms-services" },
      { label: "Courses & Internships", slug: "cms-courses" },
      { label: "Blogs & FAQs", slug: "cms-blogs" },
      { label: "SEO Settings", slug: "cms-seo" },
    ],
  },
  {
    label: "System",
    icon: ShieldCheck,
    items: [
      { label: "Payment Gateway Logs", slug: "gateway-logs", report: "razorpay_debug_logs" },
      { label: "Audit & Activity Logs", slug: "audit-logs" },
      { label: "Backup & Restore", slug: "backup" },
    ],
  },
];

export const TOP_LINKS = [
  { label: "Dashboard", to: "/superadmin", icon: LayoutDashboard },
  { label: "Reports Center", to: "/superadmin/reports", icon: BarChart3 },
  { label: "Settings", to: "/superadmin/settings", icon: Settings },
];

export const findNavItem = (slug: string) => {
  for (const g of NAV_GROUPS) {
    const item = g.items.find((i) => i.slug === slug);
    if (item) return { group: g.label, item };
  }
  return null;
};
