import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { FileText, CheckCircle2, Upload, Loader2, Trash2 } from "lucide-react";

export type DocType = "resume" | "aadhaar" | "pan" | "photo" | "education" | "bank_passbook" | "experience_letter";

export const DOC_LABELS: Record<DocType, { label: string; required: boolean }> = {
  resume: { label: "Resume", required: true },
  aadhaar: { label: "Aadhaar Card", required: true },
  pan: { label: "PAN Card", required: true },
  photo: { label: "Passport-size Photo", required: true },
  education: { label: "Education Certificate", required: true },
  bank_passbook: { label: "Bank Passbook / Cancelled Cheque", required: true },
  experience_letter: { label: "Experience Letter (if available)", required: false },
};

interface DocRow { id: string; document_type: string; file_name: string; storage_path: string; }

interface Props {
  applicantDetailId?: string | null;
  onChange?: (docs: DocRow[]) => void;
}

const DocumentUploader = ({ applicantDetailId, onChange }: Props) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [docs, setDocs] = useState<DocRow[]>([]);
  const [uploading, setUploading] = useState<DocType | null>(null);

  const load = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("applicant_documents")
      .select("id, document_type, file_name, storage_path")
      .eq("user_id", user.id);
    const rows = (data || []) as DocRow[];
    setDocs(rows);
    onChange?.(rows);
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [user?.id]);

  const upload = async (docType: DocType, file: File) => {
    if (!user) return;
    if (file.type !== "application/pdf" && docType !== "photo") {
      toast({ title: "PDF required", description: "Please upload documents as PDF.", variant: "destructive" });
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max 10 MB per document.", variant: "destructive" });
      return;
    }
    setUploading(docType);
    try {
      const ext = file.name.split(".").pop() || "pdf";
      const path = `${user.id}/${docType}-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("applicant-documents")
        .upload(path, file, { upsert: false, contentType: file.type });
      if (upErr) throw upErr;

      const { error: insErr } = await supabase.from("applicant_documents").insert({
        user_id: user.id,
        applicant_detail_id: applicantDetailId || null,
        document_type: docType,
        file_name: file.name,
        storage_path: path,
        mime_type: file.type,
        size_bytes: file.size,
      });
      if (insErr) throw insErr;

      toast({ title: "Uploaded", description: `${DOC_LABELS[docType].label} saved.` });
      await load();
    } catch (e: any) {
      toast({ title: "Upload failed", description: e.message, variant: "destructive" });
    } finally {
      setUploading(null);
    }
  };

  const remove = async (row: DocRow) => {
    await supabase.storage.from("applicant-documents").remove([row.storage_path]);
    await supabase.from("applicant_documents").delete().eq("id", row.id);
    await load();
  };

  const uploadedTypes = new Set(docs.map(d => d.document_type));

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Upload Documents (PDF)</CardTitle>
        <p className="text-xs text-muted-foreground">Max 10 MB each. Photo may be JPG/PNG; all other documents must be PDF.</p>
      </CardHeader>
      <CardContent className="space-y-2">
        {(Object.keys(DOC_LABELS) as DocType[]).map(dt => {
          const uploaded = docs.find(d => d.document_type === dt);
          const isUploading = uploading === dt;
          return (
            <div key={dt} className="flex items-center justify-between gap-3 border rounded-md px-3 py-2">
              <div className="flex items-center gap-2 min-w-0">
                {uploaded ? <CheckCircle2 className="h-4 w-4 text-healthcare shrink-0" /> : <FileText className="h-4 w-4 text-muted-foreground shrink-0" />}
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">
                    {DOC_LABELS[dt].label} {DOC_LABELS[dt].required && <span className="text-destructive">*</span>}
                  </div>
                  {uploaded && <div className="text-xs text-muted-foreground truncate">{uploaded.file_name}</div>}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {uploaded ? (
                  <Button size="sm" variant="ghost" onClick={() => remove(uploaded)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                ) : (
                  <>
                    <Label htmlFor={`doc-${dt}`}>
                      <Button size="sm" variant="outline" asChild disabled={isUploading}>
                        <span>
                          {isUploading ? <Loader2 className="h-3 w-3 mr-1 animate-spin" /> : <Upload className="h-3 w-3 mr-1" />}
                          Upload
                        </span>
                      </Button>
                    </Label>
                    <input
                      id={`doc-${dt}`}
                      type="file"
                      accept={dt === "photo" ? "image/*,application/pdf" : "application/pdf"}
                      className="hidden"
                      onChange={e => {
                        const f = e.target.files?.[0];
                        if (f) upload(dt, f);
                        e.target.value = "";
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          );
        })}
        <p className="text-xs text-muted-foreground pt-1">
          Uploaded {docs.length} of {Object.keys(DOC_LABELS).length} documents.
        </p>
      </CardContent>
    </Card>
  );
};

export default DocumentUploader;