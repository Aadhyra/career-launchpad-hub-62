import { Link, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { findNavItem } from "@/lib/superadmin/nav";
import { getReport } from "@/lib/superadmin/reports";
import ReportTable from "@/components/superadmin/ReportTable";
import { ArrowRight, Construction } from "lucide-react";

const ModulePage = () => {
  const { slug = "" } = useParams();
  const found = findNavItem(slug);

  if (!found) {
    return (
      <Card className="p-10 text-center">
        <h1 className="font-heading text-xl font-bold text-foreground">Module not found</h1>
        <p className="text-muted-foreground text-sm mt-2">The requested admin module does not exist.</p>
        <Link to="/superadmin"><Button className="mt-5">Back to Dashboard</Button></Link>
      </Card>
    );
  }

  const { group, item } = found;
  const report = getReport(item.report);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[220px]">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{group}</p>
          <h1 className="font-heading text-2xl font-bold text-foreground">{item.label}</h1>
        </div>
        {report && <Badge variant="outline" className="font-mono text-[11px]">{report.table}</Badge>}
        <Link to="/superadmin/reports"><Button variant="outline" size="sm">Reports Center <ArrowRight className="h-4 w-4" /></Button></Link>
      </div>

      {report ? (
        <ReportTable report={report} />
      ) : (
        <Card className="p-10 text-center">
          <Construction className="h-10 w-10 text-accent mx-auto mb-4" />
          <h2 className="font-heading text-lg font-semibold text-foreground">No data source connected yet</h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto">
            The <strong>{item.label}</strong> module is registered in the admin structure but has no backing table yet.
            Once its data model is created, this screen will render the same searchable, filterable and exportable grid
            used by every other module.
          </p>
          <Link to="/superadmin/reports"><Button className="mt-6">Browse available reports</Button></Link>
        </Card>
      )}
    </div>
  );
};

export default ModulePage;
