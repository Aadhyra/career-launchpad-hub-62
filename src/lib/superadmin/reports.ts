export type ReportColumn = {
  key: string;
  label: string;
  type?: "text" | "date" | "currency" | "badge" | "boolean" | "number";
};

export type ReportConfig = {
  id: string;
  label: string;
  group: string;
  description?: string;
  table: string;
  dateField: string;
  columns: ReportColumn[];
  searchFields: string[];
  statusField?: string;
  statusOptions?: string[];
};

const C = (key: string, label: string, type: ReportColumn["type"] = "text"): ReportColumn => ({ key, label, type });

export const REPORTS: ReportConfig[] = [
  /* ---------------- Users ---------------- */
  {
    id: "students",
    label: "Student Registration Report",
    group: "Users",
    table: "profiles",
    dateField: "created_at",
    columns: [C("full_name", "Name"), C("mobile", "Mobile"), C("qualification", "Qualification"), C("created_at", "Registered", "date")],
    searchFields: ["full_name", "mobile", "qualification"],
  },
  {
    id: "user_roles",
    label: "User Roles & Permissions",
    group: "Users",
    table: "user_roles",
    dateField: "created_at",
    columns: [C("user_id", "User ID"), C("role", "Role", "badge"), C("created_at", "Assigned", "date")],
    searchFields: ["role"],
    statusField: "role",
    statusOptions: ["admin", "student", "employer", "moderator", "user"],
  },
  {
    id: "applicant_details",
    label: "Applicant Onboarding Report",
    group: "Users",
    table: "applicant_details",
    dateField: "created_at",
    columns: [
      C("full_name", "Name"), C("email", "Email"), C("phone", "Phone"),
      C("application_type", "Type", "badge"), C("domain", "Domain"),
      C("pres_city", "City"), C("pres_state", "State"), C("created_at", "Created", "date"),
    ],
    searchFields: ["full_name", "email", "phone", "domain", "pres_city", "pres_state"],
    statusField: "application_type",
    statusOptions: ["internship", "course", "job"],
  },

  /* ---------------- Courses ---------------- */
  {
    id: "courses",
    label: "Course Master Report",
    group: "Courses",
    table: "courses",
    dateField: "created_at",
    columns: [
      C("title", "Course"), C("duration", "Duration"), C("price", "Fee", "currency"),
      C("has_internship", "Internship", "boolean"), C("has_placement", "Placement", "boolean"),
      C("is_active", "Active", "boolean"), C("created_at", "Created", "date"),
    ],
    searchFields: ["title", "slug", "duration"],
  },
  {
    id: "enrollments",
    label: "Course Joining Report",
    group: "Courses",
    table: "enrollments",
    dateField: "enrolled_at",
    columns: [
      C("user_id", "Student"), C("course_id", "Course"), C("status", "Status", "badge"),
      C("progress", "Progress %", "number"), C("enrolled_at", "Enrolled", "date"), C("completed_at", "Completed", "date"),
    ],
    searchFields: ["status"],
    statusField: "status",
    statusOptions: ["active", "completed", "pending", "cancelled"],
  },
  {
    id: "exam_attempts",
    label: "Exam & Assessment Report",
    group: "Courses",
    table: "exam_attempts",
    dateField: "created_at",
    columns: [
      C("user_id", "Student"), C("score", "Score", "number"), C("max_score", "Max", "number"),
      C("passed", "Passed", "boolean"), C("completed_at", "Completed", "date"),
    ],
    searchFields: [],
  },
  {
    id: "course_payments",
    label: "Course Fee Collection Report",
    group: "Courses",
    table: "course_payments",
    dateField: "created_at",
    columns: [
      C("user_id", "Student"), C("amount", "Amount", "currency"), C("status", "Status", "badge"),
      C("razorpay_payment_id", "Payment ID"), C("created_at", "Date", "date"),
    ],
    searchFields: ["razorpay_payment_id", "razorpay_order_id", "status"],
    statusField: "status",
    statusOptions: ["created", "paid", "failed", "refunded"],
  },

  /* ---------------- Internships ---------------- */
  {
    id: "internships",
    label: "Internship Joining Report",
    group: "Internships",
    table: "internships",
    dateField: "created_at",
    columns: [
      C("user_id", "Candidate"), C("mentor_name", "Mentor"), C("status", "Status", "badge"),
      C("start_date", "Start", "date"), C("end_date", "End", "date"), C("created_at", "Created", "date"),
    ],
    searchFields: ["mentor_name", "status"],
    statusField: "status",
    statusOptions: ["active", "completed", "dropped"],
  },
  {
    id: "internship_submissions",
    label: "Internship Task Submission Report",
    group: "Internships",
    table: "internship_submissions",
    dateField: "submitted_at",
    columns: [
      C("user_id", "Candidate"), C("grade", "Grade"), C("mentor_feedback", "Feedback"),
      C("submitted_at", "Submitted", "date"), C("reviewed_at", "Reviewed", "date"),
    ],
    searchFields: ["grade", "mentor_feedback"],
  },
  {
    id: "hr_task_progress",
    label: "HR Live Task & Stipend Report",
    group: "Internships",
    table: "hr_task_progress",
    dateField: "started_at",
    columns: [
      C("user_id", "Candidate"), C("task_id", "Task"), C("status", "Status", "badge"),
      C("completed_count", "Completed", "number"), C("earnings", "Earnings", "currency"),
      C("started_at", "Started", "date"), C("completed_at", "Completed", "date"),
    ],
    searchFields: ["status", "task_id"],
    statusField: "status",
    statusOptions: ["in_progress", "completed", "expired"],
  },

  /* ---------------- Placement ---------------- */
  {
    id: "job_postings",
    label: "Job Postings Report",
    group: "Placement",
    table: "job_postings",
    dateField: "created_at",
    columns: [
      C("title", "Job Title"), C("company_name", "Company"), C("location", "Location"),
      C("job_type", "Type", "badge"), C("salary_min", "Min CTC", "currency"), C("salary_max", "Max CTC", "currency"),
      C("is_active", "Active", "boolean"), C("created_at", "Posted", "date"),
    ],
    searchFields: ["title", "company_name", "location", "department"],
  },
  {
    id: "job_applications",
    label: "Applied Candidates Report",
    group: "Placement",
    table: "job_applications",
    dateField: "applied_at",
    columns: [
      C("user_id", "Candidate"), C("job_id", "Job"), C("status", "Stage", "badge"),
      C("interview_date", "Interview", "date"), C("applied_at", "Applied", "date"),
    ],
    searchFields: ["status"],
    statusField: "status",
    statusOptions: ["applied", "shortlisted", "interview_scheduled", "interview_attended", "selected", "rejected", "offer_released", "joined"],
  },
  {
    id: "jobs",
    label: "Employer Job Requisition Report",
    group: "Placement",
    table: "jobs",
    dateField: "created_at",
    columns: [
      C("title", "Job Title"), C("location", "Location"), C("job_type", "Type", "badge"),
      C("is_approved", "Approved", "boolean"), C("is_active", "Active", "boolean"), C("posted_at", "Posted", "date"),
    ],
    searchFields: ["title", "location", "job_type"],
  },

  /* ---------------- Interviews ---------------- */
  {
    id: "interview_attempts",
    label: "Interview Result Report",
    group: "Interviews",
    table: "interview_attempts",
    dateField: "created_at",
    columns: [
      C("user_id", "Candidate"), C("round", "Round", "badge"), C("status", "Status", "badge"),
      C("score", "Score", "number"), C("max_score", "Max", "number"),
      C("passed", "Cleared", "boolean"), C("proctoring_violations", "Violations", "number"),
      C("completed_at", "Completed", "date"),
    ],
    searchFields: ["round", "status"],
    statusField: "status",
    statusOptions: ["in_progress", "completed", "terminated"],
  },
  {
    id: "interview_fee_payments",
    label: "Interview Fee Report",
    group: "Interviews",
    table: "interview_fee_payments",
    dateField: "created_at",
    columns: [C("user_id", "Candidate"), C("amount", "Amount", "currency"), C("status", "Status", "badge"), C("created_at", "Date", "date")],
    searchFields: ["status"],
  },

  /* ---------------- Companies & Colleges ---------------- */
  {
    id: "employers",
    label: "Company / Employer Report",
    group: "Companies",
    table: "employers",
    dateField: "created_at",
    columns: [
      C("company_name", "Company"), C("industry", "Industry"), C("company_email", "Email"),
      C("company_phone", "Phone"), C("city", "City"), C("state", "State"),
      C("is_verified", "Verified", "boolean"), C("created_at", "Registered", "date"),
    ],
    searchFields: ["company_name", "industry", "company_email", "city", "state"],
  },
  {
    id: "college_registrations",
    label: "College Performance Report",
    group: "Colleges",
    table: "college_registrations",
    dateField: "created_at",
    columns: [
      C("college_name", "College"), C("first_name", "TPO First Name"), C("last_name", "TPO Last Name"),
      C("official_email", "Email"), C("mobile", "Mobile"), C("city", "City"),
      C("status", "Status", "badge"), C("created_at", "Registered", "date"),
    ],
    searchFields: ["college_name", "official_email", "city", "department"],
    statusField: "status",
    statusOptions: ["pending", "approved", "rejected"],
  },
  {
    id: "campus_drive_requests",
    label: "Campus Drive Report",
    group: "Colleges",
    table: "campus_drive_requests",
    dateField: "created_at",
    columns: [
      C("college_name", "College"), C("contact_person", "Contact"), C("city", "City"), C("state", "State"),
      C("expected_students", "Students", "number"), C("drive_mode", "Mode", "badge"),
      C("preferred_date", "Preferred Date", "date"), C("status", "Status", "badge"),
    ],
    searchFields: ["college_name", "contact_person", "city", "state"],
    statusField: "status",
    statusOptions: ["pending", "scheduled", "completed", "cancelled"],
  },

  /* ---------------- Finance ---------------- */
  {
    id: "project_purchases",
    label: "Project Sales Revenue Report",
    group: "Finance",
    table: "project_purchases",
    dateField: "created_at",
    columns: [C("user_id", "Buyer"), C("project_id", "Project"), C("amount", "Amount", "currency"), C("status", "Status", "badge"), C("created_at", "Date", "date")],
    searchFields: ["status"],
  },
  {
    id: "wallet_transactions",
    label: "Wallet Transaction Report",
    group: "Finance",
    table: "wallet_transactions",
    dateField: "created_at",
    columns: [
      C("user_id", "User"), C("type", "Type", "badge"), C("amount", "Amount", "currency"),
      C("status", "Status", "badge"), C("description", "Description"), C("created_at", "Date", "date"),
    ],
    searchFields: ["type", "status", "description"],
  },
  {
    id: "withdrawal_requests",
    label: "Payout / Withdrawal Report",
    group: "Finance",
    table: "withdrawal_requests",
    dateField: "created_at",
    columns: [
      C("user_id", "User"), C("amount", "Amount", "currency"), C("status", "Status", "badge"),
      C("transaction_reference", "Reference"), C("created_at", "Requested", "date"), C("processed_at", "Processed", "date"),
    ],
    searchFields: ["status", "transaction_reference"],
    statusField: "status",
    statusOptions: ["pending", "approved", "rejected", "paid"],
  },

  /* ---------------- Certificates & CRM ---------------- */
  {
    id: "certificates",
    label: "Certificate Issued Report",
    group: "Certificates",
    table: "certificates",
    dateField: "created_at",
    columns: [
      C("certificate_id", "Certificate ID"), C("certificate_type", "Type", "badge"), C("user_id", "Student"),
      C("issue_date", "Issued", "date"), C("verified", "Verified", "boolean"),
    ],
    searchFields: ["certificate_id", "certificate_type"],
    statusField: "certificate_type",
    statusOptions: ["course", "internship", "completion", "experience", "offer_letter"],
  },
  {
    id: "applications",
    label: "Lead & Enquiry Conversion Report",
    group: "CRM",
    table: "applications",
    dateField: "created_at",
    columns: [
      C("full_name", "Name"), C("email", "Email"), C("phone", "Phone"),
      C("course", "Interest"), C("vertical", "Vertical", "badge"), C("status", "Status", "badge"), C("created_at", "Date", "date"),
    ],
    searchFields: ["full_name", "email", "phone", "course", "vertical"],
    statusField: "status",
    statusOptions: ["new", "contacted", "converted", "closed"],
  },
  {
    id: "contact_messages",
    label: "Contact Enquiry Report",
    group: "CRM",
    table: "contact_messages",
    dateField: "created_at",
    columns: [C("name", "Name"), C("email", "Email"), C("phone", "Phone"), C("subject", "Subject"), C("status", "Status", "badge"), C("created_at", "Date", "date")],
    searchFields: ["name", "email", "phone", "subject"],
  },
  {
    id: "razorpay_debug_logs",
    label: "Payment Gateway Audit Log",
    group: "System",
    table: "razorpay_debug_logs",
    dateField: "created_at",
    columns: [C("created_at", "Time", "date")],
    searchFields: [],
  },
];

export const getReport = (id?: string) => REPORTS.find((r) => r.id === id);

export const REPORT_GROUPS = Array.from(new Set(REPORTS.map((r) => r.group)));
