import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RefreshCw, ShieldCheck, ShieldX, Bug, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LogRow {
  id: string;
  event_type: string;
  status: string;
  order_id: string | null;
  payment_id: string | null;
  amount: number | null;
  currency: string | null;
  receipt: string | null;
  signature_provided: string | null;
  signature_expected: string | null;
  error_message: string | null;
  raw_response: any;
  created_at: string;
}

const short = (s: string | null | undefined, n = 12) =>
  !s ? "—" : s.length <= n ? s : `${s.slice(0, n)}…`;

const AdminRazorpayDebug = () => {
  const { toast } = useToast();
  const [logs, setLogs] = useState<LogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("razorpay_debug_logs" as any)
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) toast({ title: "Failed to load logs", description: error.message, variant: "destructive" });
    setLogs((data as any) || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = logs.filter((l) => {
    if (!filter) return true;
    const q = filter.toLowerCase();
    return (
      l.order_id?.toLowerCase().includes(q) ||
      l.payment_id?.toLowerCase().includes(q) ||
      l.event_type.toLowerCase().includes(q) ||
      l.status.toLowerCase().includes(q) ||
      l.error_message?.toLowerCase().includes(q)
    );
  });

  const stats = {
    total: logs.length,
    orders: logs.filter((l) => l.event_type === "order_created").length,
    verifySuccess: logs.filter((l) => l.event_type === "verify" && l.status === "success").length,
    verifyFailed: logs.filter((l) => l.event_type === "verify" && l.status === "failed").length,
  };

  const copy = (v: string) => {
    navigator.clipboard.writeText(v);
    toast({ title: "Copied" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bug className="h-6 w-6 text-primary" /> Razorpay Debug Panel
          </h1>
          <p className="text-sm text-muted-foreground">
            Test orders and signature verification outcomes from the edge functions.
          </p>
        </div>
        <Button variant="outline" onClick={load} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} /> Refresh
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card><CardHeader className="pb-2"><CardTitle className="text-xs text-muted-foreground">Total events</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{stats.total}</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-xs text-muted-foreground">Orders created</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{stats.orders}</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-xs text-muted-foreground">Verify success</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-healthcare flex items-center gap-1"><ShieldCheck className="h-5 w-5" />{stats.verifySuccess}</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-xs text-muted-foreground">Verify failed</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-destructive flex items-center gap-1"><ShieldX className="h-5 w-5" />{stats.verifyFailed}</p></CardContent></Card>
      </div>

      <Input
        placeholder="Search by order id, payment id, event type, error…"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="max-w-md"
      />

      <Card>
        <CardHeader><CardTitle className="text-base">Recent events</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Payment ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={7} className="text-center text-sm text-muted-foreground py-6">No events yet. Trigger a checkout to populate this list.</TableCell></TableRow>
              )}
              {filtered.map((l) => (
                <>
                  <TableRow key={l.id}>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{new Date(l.created_at).toLocaleString()}</TableCell>
                    <TableCell><Badge variant="outline">{l.event_type}</Badge></TableCell>
                    <TableCell>
                      <Badge variant={l.status === "success" ? "default" : l.status === "failed" ? "destructive" : "secondary"}>
                        {l.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {l.order_id ? (
                        <button className="hover:underline inline-flex items-center gap-1" onClick={() => copy(l.order_id!)}>
                          {short(l.order_id, 16)} <Copy className="h-3 w-3" />
                        </button>
                      ) : "—"}
                    </TableCell>
                    <TableCell className="font-mono text-xs">{short(l.payment_id, 16)}</TableCell>
                    <TableCell className="text-xs">{l.amount != null ? `${l.currency || "INR"} ${l.amount}` : "—"}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost" onClick={() => setExpanded(expanded === l.id ? null : l.id)}>
                        {expanded === l.id ? "Hide" : "View"}
                      </Button>
                    </TableCell>
                  </TableRow>
                  {expanded === l.id && (
                    <TableRow key={l.id + "-d"}>
                      <TableCell colSpan={7} className="bg-muted/30">
                        <div className="space-y-2 text-xs">
                          {l.error_message && (
                            <div><span className="font-semibold text-destructive">Error:</span> {l.error_message}</div>
                          )}
                          {l.event_type === "verify" && (
                            <>
                              <div className="break-all"><span className="font-semibold">Provided signature:</span> <span className="font-mono">{l.signature_provided || "—"}</span></div>
                              <div className="break-all"><span className="font-semibold">Expected signature:</span> <span className="font-mono">{l.signature_expected || "—"}</span></div>
                              <div>
                                <span className="font-semibold">Match:</span>{" "}
                                {l.signature_provided && l.signature_expected
                                  ? l.signature_provided === l.signature_expected
                                    ? <Badge>Yes</Badge>
                                    : <Badge variant="destructive">No</Badge>
                                  : "—"}
                              </div>
                            </>
                          )}
                          {l.raw_response && (
                            <div>
                              <div className="font-semibold mb-1">Raw response</div>
                              <pre className="bg-background border rounded p-2 overflow-x-auto max-h-64">{JSON.stringify(l.raw_response, null, 2)}</pre>
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRazorpayDebug;