import { useProjectTaskUpdatedSubscription as useSubscription } from '@/graphql/hooks';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import { useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useMemo } from 'react';
import { useCallback } from 'react';
import type { ProjectTaskUpdatedSubscriptionResponse as Response } from '../type';
import { useProjectTaskResponse } from './useProjectTaskResponse';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};
export const PROJECT_TASK_UPDATED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useProjectTaskUpdatedSubscription = (props: Props) => {
  const { setProjectTask } = useProjectTaskResponse();

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  );
  const subscriptionResult = useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId: PROJECT_TASK_UPDATED_SUBSCRIPTION_REQUEST_ID,
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
      (_, __, response: Response) => {
        const projectTaskUpdated = response.projectTaskUpdated;

        if (isDev()) console.log('Project Task Updated!: ');

        setProjectTask([
          {
            ...projectTaskUpdated,
            task: {
              ...projectTaskUpdated.task,
              // To prevent autofocus on input.
              isNew: false,
            },
          },
        ]);
      },
      [setProjectTask],
    ),
  );

  return {
    subscriptionResult,
  };
};
