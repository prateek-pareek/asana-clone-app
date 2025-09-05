import { useProjectTaskSectionCreatedSubscription as useSubscription } from '@/graphql/hooks';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import { useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useMemo } from 'react';
import { useCallback } from 'react';
import type { ProjectTaskSectionCreatedSubscriptionResponse as Response } from '../type';
import { useProjectTaskSectionResponse } from './useProjectTaskSectionResponse';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};
export const PROJECT_TASK_SECTION_CREATED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useProjectTaskSectionCreatedSubscription = (props: Props) => {
  const { setProjectsTaskSections } = useProjectTaskSectionResponse();

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  );
  const subscriptionResult = useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId: PROJECT_TASK_SECTION_CREATED_SUBSCRIPTION_REQUEST_ID,
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
      (_, _set, response: Response) => {
        const updated = response.projectTaskSectionCreated;

        if (isDev()) console.log('Project Task Section created!');

        setProjectsTaskSections([updated]);
      },
      [setProjectsTaskSections],
    ),
  );

  return {
    subscriptionResult,
  };
};
