import { Flex } from '@/components/ui/atoms';
import type React from 'react';
import { memo } from 'react';
import { useTimelineStyle } from '../useTimelineStyle';
import { ProjectDueDate } from './ProjectDueDate';

type Props = {
  projectId: string;
};

export const DueDate: React.FC<Props> = memo<Props>((props) => {
  const { projectId } = props;
  const { timelineBorderStyle } = useTimelineStyle();

  return (
    <Flex position="relative" pb={8} {...timelineBorderStyle}>
      <ProjectDueDate
        projectId={projectId}
        buttonStyle={{ ml: '-15px' }}
        iconStyle={{ size: 'xl', ml: '1px' }}
      />
    </Flex>
  );
});
DueDate.displayName = 'DueDate';
