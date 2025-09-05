import { useProjectTaskSectionUndeletedAndKeepTasksSubscription as useSubscription } from '@/graphql/hooks';
import type { ProjectTaskResponse } from '@/graphql/types/projectTask';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import {
  projectTasksByIdsState,
  useProjectTaskResponse,
} from '@/store/entities/projectTask';
import { useProjectTaskSectionResponse } from '@/store/entities/projectTaskSection';
import { useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useMemo } from 'react';
import { useCallback } from 'react';
import type { ProjectTaskSectionUndeletedAndKeepTasksSubscriptionResponse as Response } from '../type';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};
export const PROJECT_TASK_SECTION_UNDELETED_AND_KEEP_TASKS_SUBSCRIPTION_REQUEST_ID =
  uuid();
export const useProjectTaskSectionUndeletedAndKeepTasksSubscription = (
  props: Props,
) => {
  const { setProjectsTaskSections } = useProjectTaskSectionResponse();
  const { setProjectTask } = useProjectTaskResponse();

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  );
  const subscriptionResult = useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId:
        PROJECT_TASK_SECTION_UNDELETED_AND_KEEP_TASKS_SUBSCRIPTION_REQUEST_ID,
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

        const data = response.projectTaskSectionUndeletedAndKeepTasks;

        setProjectsTaskSections(
          [{ ...data.projectTaskSection, projectTasks: [] }],
          {
            includeProjectTasks: false,
          },
        );

        const projectTasks = get(projectTasksByIdsState(data.projectTaskIds));

        const newProjectTasks = projectTasks.map((t) => ({
          ...t,
          projectTaskSectionId: data.projectTaskSection.id,
        }));
        setProjectTask(newProjectTasks as ProjectTaskResponse[], {
          includeTask: false,
        });
      },
      [setProjectTask, setProjectsTaskSections],
    ),
  );

  return {
    subscriptionResult,
  };
};
