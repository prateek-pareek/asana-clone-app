import { useProjectTaskSectionDeletedAndKeepTasksSubscription as useSubscription } from '@/graphql/hooks';
import type { ProjectTaskResponse } from '@/graphql/types/projectTask';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import {
  projectTasksByProjectTaskSectionIdState,
  useProjectTaskResponse,
} from '@/store/entities/projectTask';
import { useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useMemo } from 'react';
import { useCallback } from 'react';
import type { ProjectTaskSectionDeletedAndKeepTasksSubscriptionResponse as Response } from '../type';
import { useResetProjectTaskSection } from './useResetProjectTaskSection';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};
export const PROJECT_TASK_SECTION_DELETED_AND_KEEP_TASKS_SUBSCRIPTION_REQUEST_ID =
  uuid();
export const useProjectTaskSectionDeletedAndKeepTasksSubscription = (
  props: Props,
) => {
  const { resetProjectTaskSection } = useResetProjectTaskSection();
  const { setProjectTask } = useProjectTaskResponse();

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  );
  const subscriptionResult = useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId:
        PROJECT_TASK_SECTION_DELETED_AND_KEEP_TASKS_SUBSCRIPTION_REQUEST_ID,
    },
    onSubscriptionData: (data) => {
      if (
        isEqual(
          data.subscriptionData.data,
          previousData?.subscriptionData?.data,
        )
      )
        return;

      if (data.subscriptionData.data)
        setBySubscription(data.subscriptionData.data);
      previousData = data;
    },
    skip: skipSubscription,
  });

  const setBySubscription = useAtomCallback(
    useCallback(
      async (get, set, response: Response) => {
        if (isDev()) console.log('Project Task Section deleted!');

        const projectTaskSection =
          response.projectTaskSectionDeletedAndKeepTasks.projectTaskSection;
        resetProjectTaskSection(projectTaskSection.id);

        const newProjectTaskSection =
          response.projectTaskSectionDeletedAndKeepTasks.keptProjectTaskSection;
        resetProjectTaskSection(projectTaskSection.id);

        const projectTasks = get(
          projectTasksByProjectTaskSectionIdState(projectTaskSection.id),
        );

        const newProjectTasks = projectTasks.map((t) => ({
          ...t,
          projectTaskSectionId: newProjectTaskSection.id,
        }));
        setProjectTask(newProjectTasks as ProjectTaskResponse[], {
          includeTask: false,
        });
      },
      [resetProjectTaskSection, setProjectTask],
    ),
  );

  return {
    subscriptionResult,
  };
};
