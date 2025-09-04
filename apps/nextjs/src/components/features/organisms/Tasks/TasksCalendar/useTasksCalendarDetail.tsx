import { useTaskDetail } from '@/components/features/organisms/TaskDetail';
import { useTaskDetailModal } from '@/components/features/organisms/TaskDetails';
import type { Params } from '@/shared/nextjs/navigation';
import { useParams, usePathname } from 'next/navigation';
import { useEffect } from 'react';

type Props = {
  isTaskDetailURL: (params: Params, pathname: string | null) => boolean;
  getTaskDetailId: (params: Params, pathname: string | null) => string;
  fetchQuery: (variables: { taskId: string }) => Promise<void>;
};

export const useTasksCalendarDetail = (props: Props) => {
  const params = useParams();
  const pathname = usePathname();
  const { setId, setLoading } = useTaskDetail();
  const { onOpen } = useTaskDetailModal();
  const { isTaskDetailURL, getTaskDetailId, fetchQuery } = props;

  useEffect(() => {
    if (!isTaskDetailURL(params, pathname)) return;
    const newId = getTaskDetailId(params, pathname);
    console.log('useTasksCalendarDetail!: ', newId);

    setLoading(true);
    setId(newId);
    onOpen(() => {
      setTimeout(async () => {
        await fetchQuery({ taskId: newId });
        setLoading(false);
      }, 200);
    });
  }, [
    params,
    pathname,
    onOpen,
    setLoading,
    setId,
    isTaskDetailURL,
    getTaskDetailId,
    fetchQuery,
  ]);
};
