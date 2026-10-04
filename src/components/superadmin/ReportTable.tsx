import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, FileSpreadsheet, FileText, Printer, ArrowUpDown, Loader2, RefreshCw, Mail, CalendarClock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { ReportConfig } from "@/lib/superadmin/reports";
import { exportCSV, exportExcel, exportPDF, printReport, formatCell } from "@/lib/superadmin/export";

export type DateRangeKey = "today" | "week" | "month" | "year" | "all" | "custom";

export const rangeStart = (key: DateRangeKey): Date | null => {
  const d = new Date();
  switch (key) {
    case "today": d.setHours(0, 0, 0, 0); return d;
    case "week": d.setDate(d.getDate() - 7); return d;
    case "month": d.setMonth(d.getMonth() - 1); return d;
    case "year": d.setFullYear(d.getFullYear() - 1); return d;
    default: return null;
  }
};

const PAGE_SIZE = 20;

const ReportTable = ({ report }: { report: ReportConfig }) => {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [range, setRange] = useState<DateRangeKey>("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sortKey, setSortKey] = useState(report.dateField);
  const [asc, setAsc] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPage(0);
    setSortKey(report.dateField);
    setStatus("all");
    setSearch("");
  }, [report.id, report.dateField]);

  const load = useMemo(
    () => async () => {
      setLoading(true);
      setError(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let q: any = (supabase as any).from(report.table).select("*", { count: "exact" });

      if (range === "custom") {
        if (from) q = q.gte(report.dateField, new Date(from).toISOString());
        if (to) q = q.lte(report.dateField, new Date(`${to}T23:59:59`).toISOString());
      } else {
        const start = rangeStart(range);
        if (start) q = q.gte(report.dateField, start.toISOString());
      }

      if (status !== "all" && report.statusField) q = q.eq(report.statusField, status);
      if (search.trim() && report.searchFields.length) {
        q = q.or(report.searchFields.map((f) => `${f}.ilike.%${search.trim()}%`).join(","));
      }

      q = q.order(sortKey, { ascending: asc, nullsFirst: false }).range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);

      const { data, error: err, count: total } = await q;
      if (err) {
        setError(err.message);
        setRows([]);
        setCount(0);
      } else {
        setRows((data ?? []) as Record<string, unknown>[]);
        setCount(total ?? 0);
      }
      setLoading(false);
    },
    [report, range, from, to, status, search, sortKey, asc, page]
  );

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const channel = supabase
      .channel(`superadmin-report-${report.table}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: report.table },
        () => {
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => void load(), 250);
        },
      )
      .subscribe();

    return () => {
      if (timer) clearTimeout(timer);
      void supabase.removeChannel(channel);
    };
  }, [load, report.table]);

  const fetchAll = async (): Promise<Record<string, unknown>[]> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let q: any = (supabase as any).from(report.table).select("*").order(sortKey, { ascending: asc, nullsFirst: false }).limit(5000);
    if (range === "custom") {
      if (from) q = q.gte(report.dateField, new Date(from).toISOString());
      if (to) q = q.lte(report.dateField, new Date(`${to}T23:59:59`).toISOString());
    } else {
      const start = rangeStart(range);
      if (start) q = q.gte(report.dateField, start.toISOString());
    }
    if (status !== "all" && report.statusField) q = q.eq(report.statusField, status);
    if (search.trim() && report.searchFields.length) {
      q = q.or(report.searchFields.map((f) => `${f}.ilike.%${search.trim()}%`).join(","));
    }
    const { data } = await q;
    return (data ?? []) as Record<string, unknown>[];
  };

  const withAll = async (fn: (rows: Record<string, unknown>[]) => void) => {
    const all = await fetchAll();
    if (!all.length) return toast({ title: "Nothing to export", description: "No records match the current filters." });
    fn(all);
  };

  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card className="p-4">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder={report.searchFields.length ? "Search records..." : "Search unavailable"}
              value={search}
              disabled={!report.searchFields.length}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            />
          </div>

          <Select value={range} onValueChange={(v) => { setRange(v as DateRangeKey); setPage(0); }}>
            <SelectTrigger><SelectValue placeholder="Date range" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          {report.statusField ? (
            <Select value={status} onValueChange={(v) => { setStatus(v); setPage(0); }}>
              <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All {report.statusField.replace(/_/g, " ")}</SelectItem>
                {(report.statusOptions ?? []).map((o) => (
                  <SelectItem key={o} value={o}>{o.replace(/_/g, " ")}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : <div className="hidden xl:block" />}

          <Button variant="outline" onClick={() => load()} className="justify-center">
            <RefreshCw className="h-4 w-4" /> Refresh
          </Button>

          {range === "custom" && (
            <>
              <Input type="date" value={from} onChange={(e) => { setFrom(e.target.value); setPage(0); }} />
              <Input type="date" value={to} onChange={(e) => { setTo(e.target.value); setPage(0); }} />
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t">
          <span className="text-sm text-muted-foreground mr-auto">
            <strong className="text-foreground">{count}</strong> records · page {page + 1} of {totalPages}
          </span>
          <Button size="sm" variant="outline" onClick={() => withAll((r) => exportCSV(report.label, report.columns, r))}>
            <Download className="h-4 w-4" /> CSV
          </Button>
          <Button size="sm" variant="outline" onClick={() => withAll((r) => exportExcel(report.label, report.columns, r))}>
            <FileSpreadsheet className="h-4 w-4" /> Excel
          </Button>
          <Button size="sm" variant="outline" onClick={() => withAll((r) => exportPDF(report.label, report.columns, r))}>
            <FileText className="h-4 w-4" /> PDF
          </Button>
          <Button size="sm" variant="outline" onClick={() => withAll((r) => printReport(report.label, report.columns, r))}>
            <Printer className="h-4 w-4" /> Print
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => withAll((r) => {
              exportCSV(report.label, report.columns, r);
              window.location.href = `mailto:?subject=${encodeURIComponent(`${report.label} — AADHYRA INNOVATIONS`)}&body=${encodeURIComponent(`Please find the ${report.label} (${r.length} records) exported on ${new Date().toLocaleString("en-IN")}. The CSV has been downloaded to your device — attach it to this email.`)}`;
            })}
          >
            <Mail className="h-4 w-4" /> Email
          </Button>
          <Button size="sm" variant="outline" onClick={() => toast({ title: "Scheduled reports", description: "Daily/weekly auto-delivery can be enabled once an email provider is connected." })}>
            <CalendarClock className="h-4 w-4" /> Schedule
          </Button>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                {report.columns.map((c) => (
                  <TableHead
                    key={c.key}
                    className="whitespace-nowrap cursor-pointer select-none"
                    onClick={() => { setSortKey(c.key); setAsc(sortKey === c.key ? !asc : false); }}
                  >
                    <span className="inline-flex items-center gap-1">
                      {c.label}
                      <ArrowUpDown className={`h-3 w-3 ${sortKey === c.key ? "text-primary" : "text-muted-foreground/50"}`} />
                    </span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={report.columns.length} className="h-40 text-center">
                    <Loader2 className="h-6 w-6 animate-spin text-primary mx-auto" />
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={report.columns.length} className="h-32 text-center text-sm text-destructive">
                    {error}
                  </TableCell>
                </TableRow>
              ) : rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={report.columns.length} className="h-32 text-center text-sm text-muted-foreground">
                    No records found for the selected filters.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((r, i) => (
                  <TableRow key={String(r.id ?? i)} className="hover:bg-muted/40">
                    {report.columns.map((c) => (
                      <TableCell key={c.key} className="whitespace-nowrap text-sm max-w-[280px] truncate">
                        {c.type === "badge" && r[c.key] ? (
                          <Badge variant="secondary" className="capitalize">{String(r[c.key]).replace(/_/g, " ")}</Badge>
                        ) : c.type === "boolean" ? (
                          <Badge variant={r[c.key] ? "default" : "outline"}>{r[c.key] ? "Yes" : "No"}</Badge>
                        ) : (
                          formatCell(r, c)
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>Previous</Button>
        <span className="text-sm text-muted-foreground">Page {page + 1} / {totalPages}</span>
        <Button variant="outline" size="sm" disabled={page + 1 >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</Button>
      </div>
    </div>
  );
};

export default ReportTable;
