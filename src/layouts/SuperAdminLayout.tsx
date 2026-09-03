import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { NAV_GROUPS, TOP_LINKS } from "@/lib/superadmin/nav";
import { Button } from "@/components/ui/button";
import { Loader2, Menu, X, ChevronDown, LogOut, ShieldCheck, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/aadhyra-logo.png";

const SuperAdminLayout = () => {
  const { user, loading, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(NAV_GROUPS[0].label);

  useEffect(() => {
    if (!loading) {
      if (!user) navigate("/admin/login");
      else if (!isAdmin) navigate("/dashboard");
    }
  }, [user, loading, isAdmin, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "block rounded-lg px-3 py-2 text-sm transition-colors",
      isActive ? "bg-primary text-primary-foreground font-medium" : "text-sidebar-foreground/80 hover:bg-primary/10 hover:text-primary"
    );

  const sidebar = (
    <aside className="w-72 h-full flex flex-col bg-card border-r">
      <Link to="/" className="flex items-center gap-2 px-4 h-16 border-b flex-shrink-0">
        <img src={logo} alt="AADHYRA INNOVATIONS PVT LTD" className="h-9 w-auto" />
        <div className="leading-tight">
          <div className="font-heading text-sm font-bold text-foreground">AADHYRA</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Super Admin</div>
        </div>
      </Link>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {TOP_LINKS.map(({ label, to, icon: Icon }) => (
          <NavLink key={to} to={to} end={to === "/superadmin"} className={linkClass} onClick={() => setOpen(false)}>
            <span className="flex items-center gap-2"><Icon className="h-4 w-4" /> {label}</span>
          </NavLink>
        ))}

        <div className="pt-3 pb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Modules</div>

        {NAV_GROUPS.map(({ label, icon: Icon, items }) => (
          <div key={label}>
            <button
              type="button"
              onClick={() => setExpanded(expanded === label ? null : label)}
              className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground/85 hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <Icon className="h-4 w-4" />
              <span className="flex-1 text-left">{label}</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", expanded === label && "rotate-180")} />
            </button>
            {expanded === label && (
              <div className="ml-4 pl-3 border-l space-y-0.5 py-1">
                {items.map((i) => (
                  <NavLink key={i.slug} to={`/superadmin/m/${i.slug}`} className={linkClass} onClick={() => setOpen(false)}>
                    {i.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen flex bg-muted/30">
      <div className="hidden lg:block flex-shrink-0 h-screen sticky top-0">{sidebar}</div>

      {open && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />}
      <div className={cn("fixed inset-y-0 left-0 z-50 lg:hidden transition-transform duration-300", open ? "translate-x-0" : "-translate-x-full")}>
        {sidebar}
      </div>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-30 h-16 bg-card/95 backdrop-blur border-b flex items-center gap-3 px-4">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen((o) => !o)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span className="font-heading font-semibold text-foreground">Super Admin Control Center</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button>
            <span className="hidden sm:block text-sm text-muted-foreground max-w-[180px] truncate">{user.email}</span>
            <Button variant="outline" size="sm" onClick={() => signOut()}>
              <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">Sign out</span>
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
