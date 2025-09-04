import { useRouter as useRouterNext } from 'next/navigation';
import { useCallback } from 'react';
import type { Options } from '../types';
import { ROUTE_WORKSPACES_OVERVIEW } from './routes';

export const useRouterWorkspace = () => {
  const router = useRouterNext();
  const { push } = router;

  const navigateToWorkspaceOverview = useCallback(
    (id: string, options?: Options) => {
      push(ROUTE_WORKSPACES_OVERVIEW.href.pathname(id), options);
    },
    [push],
  );

  return {
    navigateToWorkspaceOverview,
  };
};
