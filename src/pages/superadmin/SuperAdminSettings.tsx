import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Building2, GitBranch, Users, Mail, MessageSquare, Smartphone, CreditCard,
  KeyRound, DatabaseBackup, ShieldCheck, ScrollText, Palette,
} from "lucide-react";

const settings = [
  { icon: Building2, title: "Company Profile", desc: "AADHYRA INNOVATIONS PVT LTD — legal name, GSTIN, logo, address", status: "Configured" },
  { icon: GitBranch, title: "Branches & Departments", desc: "Manage regional offices and internal departments", status: "Planned" },
  { icon: Users, title: "User Roles & Permissions", desc: "Role table with admin / employer / student scopes", status: "Live", to: "/superadmin/m/roles" },
  { icon: Mail, title: "Email Templates", desc: "Offer letters, certificates, reminders", status: "Planned" },
  { icon: MessageSquare, title: "SMS Templates", desc: "OTP, interview reminders, fee alerts", status: "Planned" },
  { icon: Smartphone, title: "WhatsApp Templates", desc: "Campaign and reminder templates", status: "Planned" },
  { icon: CreditCard, title: "Payment Gateway", desc: "Razorpay keys with automatic demo fallback", status: "Live", to: "/superadmin/m/gateway-logs" },
  { icon: KeyRound, title: "API Keys & Secrets", desc: "Backend secrets stored securely in the cloud backend", status: "Configured" },
  { icon: DatabaseBackup, title: "Backup & Restore", desc: "Automated database snapshots", status: "Managed" },
  { icon: ShieldCheck, title: "Security Settings", desc: "Row-level security, admin-only access, audit trail", status: "Live" },
  { icon: ScrollText, title: "Audit & Activity Logs", desc: "Track privileged actions across the platform", status: "Planned", to: "/superadmin/m/audit-logs" },
  { icon: Palette, title: "Theme Settings", desc: "Brand palette, typography and dashboard layout", status: "Configured" },
];

const tone = (s: string) =>
  s === "Live" ? "default" : s === "Planned" ? "outline" : "secondary";

const SuperAdminSettings = () => (
  <div className="space-y-6">
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground">Settings</h1>
      <p className="text-muted-foreground text-sm mt-1">Platform-wide configuration for AADHYRA INNOVATIONS PVT LTD.</p>
    </div>

    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {settings.map(({ icon: Icon, title, desc, status, to }) => {
        const body = (
          <Card className="p-6 h-full hover:shadow-card-hover hover:-translate-y-1 transition-all">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="h-11 w-11 rounded-xl gradient-primary flex items-center justify-center">
                <Icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <Badge variant={tone(status)}>{status}</Badge>
            </div>
            <h3 className="font-heading font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{desc}</p>
          </Card>
        );
        return to ? <Link key={title} to={to}>{body}</Link> : <div key={title}>{body}</div>;
      })}
    </div>
  </div>
);

export default SuperAdminSettings;
