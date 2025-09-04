import type { useRouter } from 'next/navigation';

type Push = ReturnType<typeof useRouter>['push'];

export type Options = Parameters<Push>[1];
