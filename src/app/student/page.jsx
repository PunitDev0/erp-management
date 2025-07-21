'use client';
import Layout from '@/components/Layout/Layout';
import StudentsPage from '@/components/StudentTable';
import StudentTable from '@/components/StudentTable';

export default function Student() {
  return (
    <Layout>
      <StudentsPage />
    </Layout>
  );
}