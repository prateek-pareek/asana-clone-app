import { Container as Workspaces } from '@/pages/Workspaces';
import { generateTitle } from '@/shared/metatag/generateTitle';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: generateTitle('Workspaces'),
};

export default async function WorkspacesPage() {
  return <Workspaces />;
}
