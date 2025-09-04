import { Container } from '@/pages/Inbox';
import { generateTitle } from '@/shared/metatag/generateTitle';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: generateTitle('Inbox'),
};

export default async function InboxPage() {
  return <Container />;
}
