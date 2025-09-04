import { Container } from '@/pages/Home';
import { generateTitle } from '@/shared/metatag/generateTitle';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: generateTitle('Home'),
};

export default function HomePage() {
  return <Container />;
}
