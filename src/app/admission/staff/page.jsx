'use client';
import Layout from "@/components/Layout/Layout";
import StaffAdmissionForm from "@/components/StaffAdmission";
import StudentForm from "@/components/StudentForm";

export default function NewStaff() {
  return (
    <Layout>
      <StaffAdmissionForm type="staff" />
    </Layout>
  );
}