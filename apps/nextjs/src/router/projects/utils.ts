'use client';

import type { Params } from '@/shared/nextjs/navigation';
import {
  ROUTE_PROJECTS,
  ROUTE_PROJECTS_BOARD,
  ROUTE_PROJECTS_CALENDAR,
  ROUTE_PROJECTS_FILES,
  ROUTE_PROJECTS_LIST,
  ROUTE_PROJECTS_OVERVIEW,
} from './routes';

export const isProjectsURL = (pathname: string | null): boolean => {
  return ROUTE_PROJECTS.regex.test(pathname || '');
};

export const isProjectsListURL = (pathname: string | null): boolean => {
  return ROUTE_PROJECTS_LIST.regex.test(pathname || '');
};

export const isProjectsBoardURL = (pathname: string | null): boolean => {
  return ROUTE_PROJECTS_BOARD.regex.test(pathname || '');
};

export const isProjectsCalendarURL = (pathname: string | null): boolean => {
  return ROUTE_PROJECTS_CALENDAR.regex.test(pathname || '');
};

export const isProjectsFilesURL = (pathname: string | null): boolean => {
  return ROUTE_PROJECTS_FILES.regex.test(pathname || '');
};

export const isProjectsOverviewURL = (pathname: string | null): boolean => {
  return ROUTE_PROJECTS_OVERVIEW.regex.test(pathname || '');
};

// TODO: Should be verified
export const isProjectsDetailURL = (
  params: Params,
  pathname: string | null,
): boolean => {
  return (
    !!params &&
    !!params[ROUTE_PROJECTS.query.projects]?.length &&
    !!params[ROUTE_PROJECTS.query.projects]?.[0] &&
    !isProjectsListURL(pathname) &&
    !isProjectsBoardURL(pathname) &&
    !isProjectsCalendarURL(pathname) &&
    !isProjectsFilesURL(pathname) &&
    !isProjectsOverviewURL(pathname)
  );
};
export const isProjectsDetailURLById = (
  params: Params,
  pathname: string | null,
  taskId: string,
): boolean => {
  return (
    !!params &&
    !!params[ROUTE_PROJECTS.query.projects]?.length &&
    !!params[ROUTE_PROJECTS.query.projects]?.[0] &&
    params[ROUTE_PROJECTS.query.projects]?.[0] === taskId &&
    !isProjectsBoardURL(pathname) &&
    !isProjectsCalendarURL(pathname) &&
    !isProjectsFilesURL(pathname) &&
    !isProjectsOverviewURL(pathname)
  );
};

export const getProjectsIdFromURL = (
  params: Params,
  pathname: string | null,
): string => {
  return (
    (isProjectsURL(pathname) &&
      (params?.[ROUTE_PROJECTS.query.projectId] as string)) ||
    ''
  );
};

export const getProjectsDetailId = (
  params: Params,
  pathname: string | null,
): string => {
  return (
    (isProjectsDetailURL(params, pathname) &&
      (params?.[ROUTE_PROJECTS.query.projects]?.[0] as string)) ||
    ''
  );
};

export const getProjectsDetailFeedId = (
  params: Params,
  pathname: string | null,
): string => {
  return (
    (isProjectsDetailURL(params, pathname) &&
      (params?.[ROUTE_PROJECTS.query.projects]?.[1] as string)) ||
    ''
  );
};

export const getProjectsDetailFeedURL = (
  id: string,
  taskId: string,
  taskFeedId: string,
): string => {
  return `${window.location.origin}${ROUTE_PROJECTS.href.pathname(
    id,
  )}/${taskId}/${taskFeedId}`;
};

export const getProjectsURL = (id: string): string => {
  return `${window.location.origin}${ROUTE_PROJECTS.href.pathname(id)}`;
};
