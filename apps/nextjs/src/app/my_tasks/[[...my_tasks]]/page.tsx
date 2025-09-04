import { Container } from '@/pages/MyTasks';
import { generateTitle } from '@/shared/metatag/generateTitle';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: generateTitle('My Tasks'),
};

export default async function MyTasksPage() {
  return <Container />;
}
