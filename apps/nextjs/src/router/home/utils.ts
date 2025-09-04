import type { Params } from '@/shared/nextjs/navigation';
import { ROUTE_HOME } from './routes';

export const isHomeDetailURL = (params: Params): boolean => {
  return (
    !!params &&
    !!params[ROUTE_HOME.query]?.length &&
    !!params[ROUTE_HOME.query]?.[0]
  );
};
export const getHomeDetailId = (params: Params): string => {
  return (
    (isHomeDetailURL(params) && (params?.[ROUTE_HOME.query]?.[0] as string)) ||
    ''
  );
};
