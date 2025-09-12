import { Container } from '@/components/pages/Projects';
import { generateTitle } from '@/shared/metatag/generateTitle';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: generateTitle('Projects'),
};

export default async function ProjectsPage() {
  return <Container />;
}
