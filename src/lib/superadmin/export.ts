import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { ReportColumn } from "./reports";

const cell = (row: Record<string, unknown>, col: ReportColumn) => {
  const v = row[col.key];
  if (v === null || v === undefined) return "";
  if (col.type === "date") return new Date(String(v)).toLocaleString("en-IN");
  if (col.type === "currency") return `₹${Number(v).toLocaleString("en-IN")}`;
  if (col.type === "boolean") return v ? "Yes" : "No";
  if (typeof v === "object") return JSON.stringify(v);
  return String(v);
};

const download = (content: BlobPart, filename: string, mime: string) => {
  const url = URL.createObjectURL(new Blob([content], { type: mime }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

const escapeCsv = (s: string) => `"${s.replace(/"/g, '""')}"`;

export const exportCSV = (title: string, columns: ReportColumn[], rows: Record<string, unknown>[]) => {
  const head = columns.map((c) => escapeCsv(c.label)).join(",");
  const body = rows.map((r) => columns.map((c) => escapeCsv(cell(r, c))).join(",")).join("\n");
  download(`${head}\n${body}`, `${title}.csv`, "text/csv;charset=utf-8;");
};

export const exportExcel = (title: string, columns: ReportColumn[], rows: Record<string, unknown>[]) => {
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const html = `<html xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="utf-8" /></head><body>
    <table border="1"><thead><tr>${columns.map((c) => `<th>${esc(c.label)}</th>`).join("")}</tr></thead>
    <tbody>${rows.map((r) => `<tr>${columns.map((c) => `<td>${esc(cell(r, c))}</td>`).join("")}</tr>`).join("")}</tbody>
    </table></body></html>`;
  download(html, `${title}.xls`, "application/vnd.ms-excel");
};

export const exportPDF = (title: string, columns: ReportColumn[], rows: Record<string, unknown>[]) => {
  const doc = new jsPDF({ orientation: "landscape" });
  doc.setFontSize(14);
  doc.text("AADHYRA INNOVATIONS PVT LTD", 14, 14);
  doc.setFontSize(11);
  doc.text(title, 14, 21);
  doc.setFontSize(9);
  doc.text(`Generated: ${new Date().toLocaleString("en-IN")} · ${rows.length} records`, 14, 27);
  autoTable(doc, {
    startY: 32,
    head: [columns.map((c) => c.label)],
    body: rows.map((r) => columns.map((c) => cell(r, c))),
    styles: { fontSize: 7, cellPadding: 2 },
    headStyles: { fillColor: [23, 47, 122] },
  });
  doc.save(`${title}.pdf`);
};

export const printReport = (title: string, columns: ReportColumn[], rows: Record<string, unknown>[]) => {
  const w = window.open("", "_blank", "width=1100,height=800");
  if (!w) return;
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  w.document.write(`<html><head><title>${esc(title)}</title><style>
    body{font-family:system-ui,sans-serif;padding:24px;color:#111}
    h1{font-size:18px;margin:0} h2{font-size:14px;font-weight:500;color:#555;margin:4px 0 16px}
    table{width:100%;border-collapse:collapse;font-size:11px}
    th,td{border:1px solid #ddd;padding:6px;text-align:left} th{background:#f3f5f9}
  </style></head><body>
    <h1>AADHYRA INNOVATIONS PVT LTD</h1>
    <h2>${esc(title)} · ${new Date().toLocaleString("en-IN")} · ${rows.length} records</h2>
    <table><thead><tr>${columns.map((c) => `<th>${esc(c.label)}</th>`).join("")}</tr></thead>
    <tbody>${rows.map((r) => `<tr>${columns.map((c) => `<td>${esc(cell(r, c))}</td>`).join("")}</tr>`).join("")}</tbody></table>
  </body></html>`);
  w.document.close();
  w.focus();
  w.print();
};

export const formatCell = cell;
