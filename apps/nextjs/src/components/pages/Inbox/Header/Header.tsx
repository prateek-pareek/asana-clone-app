import { Flex } from '@/components/ui/atoms';
import { memo } from 'react';
import { Tabs } from './Tabs';

export const Header = memo(function Header() {
  return (
    <Flex flex={1}>
      <Tabs />
    </Flex>
  );
});
