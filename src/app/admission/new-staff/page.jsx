'use client';
import Layout from "@/components/Layout/Layout";
import StaffAdmissionForm from "@/components/StaffAdmission";
import StudentForm from "@/components/StudentForm";

export default function NewStaff() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 text-erp-blue">New Staff Admission</h1>
      <StaffAdmissionForm type="staff" />
    </Layout>
  );
}