import { useInviteModal } from '@/components/features/organisms/Modals';
import { TeammateAvatar } from '@/components/features/organisms/TeammateAvatar';
import { Flex, Text } from '@/components/ui/atoms';
import { useClickableHoverStyle } from '@/hooks';
import { memo, useCallback } from 'react';

export const AddMemberListItem = memo(function AddMemberListItem() {
  const { setIsOpen } = useInviteModal();
  const { clickableHoverLightStyle } = useClickableHoverStyle();

  const handleClick = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return (
    <Flex
      flex={1}
      py={3}
      alignItems="center"
      onClick={handleClick}
      cursor="pointer"
      {...clickableHoverLightStyle}
    >
      <TeammateAvatar teammateId="" size="sm" />
      <Flex
        ml={3}
        flexDirection="column"
        minW="1px"
        flex={1}
        justifyContent="center"
      >
        <Text fontSize="sm" fontWeight="medium" color="text.muted">
          Add member
        </Text>
      </Flex>
    </Flex>
  );
});
