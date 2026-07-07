import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface ApplicantDetailsData {
  full_name: string;
  phone: string;
  email: string;
  domain: string;
  // permanent
  perm_door_no: string; perm_street: string; perm_area: string; perm_landmark: string;
  perm_city: string; perm_pincode: string; perm_district: string; perm_state: string; perm_country: string;
  // present
  pres_door_no: string; pres_street: string; pres_area: string; pres_landmark: string;
  pres_city: string; pres_pincode: string; pres_district: string; pres_state: string; pres_country: string;
  same_as_permanent: boolean;
  // employment (optional)
  team_leader_name: string; hr_name: string; date_of_joining: string; salary_package: string;
  // family
  father_name: string; father_mobile: string;
  mother_name: string; mother_mobile: string;
  guardian_name: string; guardian_mobile: string;
}

export const emptyApplicantDetails = (seed?: Partial<ApplicantDetailsData>): ApplicantDetailsData => ({
  full_name: "", phone: "", email: "", domain: "",
  perm_door_no: "", perm_street: "", perm_area: "", perm_landmark: "",
  perm_city: "", perm_pincode: "", perm_district: "", perm_state: "", perm_country: "India",
  pres_door_no: "", pres_street: "", pres_area: "", pres_landmark: "",
  pres_city: "", pres_pincode: "", pres_district: "", pres_state: "", pres_country: "India",
  same_as_permanent: false,
  team_leader_name: "", hr_name: "", date_of_joining: "", salary_package: "",
  father_name: "", father_mobile: "", mother_name: "", mother_mobile: "",
  guardian_name: "", guardian_mobile: "",
  ...seed,
});

interface Props {
  value: ApplicantDetailsData;
  onChange: (v: ApplicantDetailsData) => void;
  showEmployment?: boolean;
}

const F = ({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) => (
  <div>
    <Label className="text-xs">{label}</Label>
    <Input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} type={type} className="mt-1" />
  </div>
);

const ApplicantDetailsForm = ({ value, onChange, showEmployment = false }: Props) => {
  const set = (patch: Partial<ApplicantDetailsData>) => onChange({ ...value, ...patch });

  const toggleSameAddr = (checked: boolean) => {
    if (checked) {
      set({
        same_as_permanent: true,
        pres_door_no: value.perm_door_no, pres_street: value.perm_street, pres_area: value.perm_area,
        pres_landmark: value.perm_landmark, pres_city: value.perm_city, pres_pincode: value.perm_pincode,
        pres_district: value.perm_district, pres_state: value.perm_state, pres_country: value.perm_country,
      });
    } else {
      set({ same_as_permanent: false });
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base">Personal Information</CardTitle></CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-3">
          <F label="Full Name *" value={value.full_name} onChange={v => set({ full_name: v })} />
          <F label="Phone Number *" value={value.phone} onChange={v => set({ phone: v })} placeholder="10-digit mobile" />
          <F label="Email *" value={value.email} onChange={v => set({ email: v })} type="email" />
          <F label="Domain *" value={value.domain} onChange={v => set({ domain: v })} placeholder="e.g. IT / HR / Digital Marketing" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base">Permanent Address</CardTitle></CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-3">
          <F label="Door / House No." value={value.perm_door_no} onChange={v => set({ perm_door_no: v })} />
          <F label="Street / Road" value={value.perm_street} onChange={v => set({ perm_street: v })} />
          <F label="Area / Locality" value={value.perm_area} onChange={v => set({ perm_area: v })} />
          <F label="Landmark" value={value.perm_landmark} onChange={v => set({ perm_landmark: v })} />
          <F label="City" value={value.perm_city} onChange={v => set({ perm_city: v })} />
          <F label="Pincode" value={value.perm_pincode} onChange={v => set({ perm_pincode: v })} />
          <F label="District" value={value.perm_district} onChange={v => set({ perm_district: v })} />
          <F label="State" value={value.perm_state} onChange={v => set({ perm_state: v })} />
          <F label="Country" value={value.perm_country} onChange={v => set({ perm_country: v })} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Present Address</CardTitle>
          <label className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <Checkbox checked={value.same_as_permanent} onCheckedChange={c => toggleSameAddr(!!c)} />
            Same as permanent address
          </label>
        </CardHeader>
        {!value.same_as_permanent && (
          <CardContent className="grid md:grid-cols-3 gap-3">
            <F label="Door / House No." value={value.pres_door_no} onChange={v => set({ pres_door_no: v })} />
            <F label="Street / Road" value={value.pres_street} onChange={v => set({ pres_street: v })} />
            <F label="Area / Locality" value={value.pres_area} onChange={v => set({ pres_area: v })} />
            <F label="Landmark" value={value.pres_landmark} onChange={v => set({ pres_landmark: v })} />
            <F label="City" value={value.pres_city} onChange={v => set({ pres_city: v })} />
            <F label="Pincode" value={value.pres_pincode} onChange={v => set({ pres_pincode: v })} />
            <F label="District" value={value.pres_district} onChange={v => set({ pres_district: v })} />
            <F label="State" value={value.pres_state} onChange={v => set({ pres_state: v })} />
            <F label="Country" value={value.pres_country} onChange={v => set({ pres_country: v })} />
          </CardContent>
        )}
      </Card>

      {showEmployment && (
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Employment (optional)</CardTitle></CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-3">
            <F label="Team Leader Name" value={value.team_leader_name} onChange={v => set({ team_leader_name: v })} />
            <F label="HR Name" value={value.hr_name} onChange={v => set({ hr_name: v })} />
            <F label="Date of Joining" value={value.date_of_joining} onChange={v => set({ date_of_joining: v })} type="date" />
            <F label="Salary Package" value={value.salary_package} onChange={v => set({ salary_package: v })} placeholder="e.g. 4.5 LPA" />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base">Family Details</CardTitle></CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-3">
          <F label="Father's Name" value={value.father_name} onChange={v => set({ father_name: v })} />
          <F label="Father's Mobile" value={value.father_mobile} onChange={v => set({ father_mobile: v })} />
          <F label="Mother's Name" value={value.mother_name} onChange={v => set({ mother_name: v })} />
          <F label="Mother's Mobile" value={value.mother_mobile} onChange={v => set({ mother_mobile: v })} />
          <F label="Guardian's Name" value={value.guardian_name} onChange={v => set({ guardian_name: v })} />
          <F label="Guardian's Mobile" value={value.guardian_mobile} onChange={v => set({ guardian_mobile: v })} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicantDetailsForm;