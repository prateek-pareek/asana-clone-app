import { Flex } from '@/components/ui/atoms';
import { memo } from 'react';
import {
  OverviewSectionHeader,
  OverviewSectionHeaderHeading,
} from '../OverviewSectionHeader';
import { Description } from './Description';

export const DescriptionSection = memo(function DescriptionSection() {
  return (
    <Flex flexDirection="column">
      <OverviewSectionHeader>
        <OverviewSectionHeaderHeading>Description</OverviewSectionHeaderHeading>
      </OverviewSectionHeader>
      <Description />
    </Flex>
  );
});
