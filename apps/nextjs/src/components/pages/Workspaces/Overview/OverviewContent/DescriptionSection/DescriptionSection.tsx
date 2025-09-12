import { Flex } from '@/components/ui/atoms';
import { useProjectsProjectId } from '@/store/app/projects/project';
import { memo } from 'react';
import { Description } from './Description';
import { DescriptionTitle } from './DescriptionTitle';

export const DescriptionSection = memo(function DescriptionSection() {
  const { projectId } = useProjectsProjectId();

  return (
    <Flex flexDirection="column">
      <DescriptionTitle projectId={projectId} />
      <Description projectId={projectId} />
    </Flex>
  );
});
