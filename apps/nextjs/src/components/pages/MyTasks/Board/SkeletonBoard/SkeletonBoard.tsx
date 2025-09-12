import { Flex, type FlexProps, Skeleton, Stack } from '@/components/ui/atoms';
import { memo } from 'react';

type Props = FlexProps;

const TEXT_HEIGHT = '16px';
const CARD_HEIGHT = '97px';
export const SkeletonBoardContent = memo<Props>(
  function SkeletonBoardContent() {
    return (
      <Flex flex={1} p={2}>
        {[...new Array(3)]
          .map((_, i) => i + 1)
          .map((v) => (
            <Flex flexDirection="column" w="304px" px={3} py={2} key={v}>
              <Flex h="36px" alignItems="center">
                <Skeleton h={TEXT_HEIGHT} w="100px" borderRadius="full" />
              </Flex>
              <Stack spacing={2}>
                <Skeleton h={CARD_HEIGHT} w="full" borderRadius="md" />
                <Skeleton h={CARD_HEIGHT} w="full" borderRadius="md" />
              </Stack>
            </Flex>
          ))}
      </Flex>
    );
  },
);
