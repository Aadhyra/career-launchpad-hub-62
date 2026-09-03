import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { REPORTS, REPORT_GROUPS } from "@/lib/superadmin/reports";
import ReportTable from "@/components/superadmin/ReportTable";
import { BarChart3, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const ReportsCenter = () => {
  const [activeId, setActiveId] = useState(REPORTS[0].id);
  const [q, setQ] = useState("");
  const active = REPORTS.find((r) => r.id === activeId)!;
  const filtered = REPORTS.filter((r) => r.label.toLowerCase().includes(q.toLowerCase()) || r.group.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" /> Reports Center
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {REPORTS.length} live reports with advanced filters, sorting, pagination and export to CSV, Excel, PDF or print.
        </p>
      </div>

      <div className="grid lg:grid-cols-[300px_1fr] gap-5 items-start">
        <Card className="p-4 lg:sticky lg:top-20">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Find a report..." value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div className="max-h-[70vh] overflow-y-auto space-y-4 pr-1">
            {REPORT_GROUPS.map((g) => {
              const items = filtered.filter((r) => r.group === g);
              if (!items.length) return null;
              return (
                <div key={g}>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">{g}</p>
                  <div className="space-y-1">
                    {items.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setActiveId(r.id)}
                        className={cn(
                          "w-full text-left rounded-lg px-3 py-2 text-sm transition-colors",
                          r.id === activeId ? "bg-primary text-primary-foreground font-medium" : "hover:bg-primary/10 hover:text-primary text-foreground/85"
                        )}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="space-y-4 min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-heading text-xl font-bold text-foreground">{active.label}</h2>
            <Badge variant="secondary">{active.group}</Badge>
            <Badge variant="outline" className="font-mono text-[11px]">{active.table}</Badge>
          </div>
          <ReportTable report={active} />
        </div>
      </div>
    </div>
  );
};

export default ReportsCenter;
