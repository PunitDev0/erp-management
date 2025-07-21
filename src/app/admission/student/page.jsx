'use client';
import Layout from '@/components/Layout/Layout';
import StudentForm from '@/components/StudentForm';

export default function NewStudent() {
  return (
    <Layout>
      <StudentForm type="student" />
    </Layout>
  );
}