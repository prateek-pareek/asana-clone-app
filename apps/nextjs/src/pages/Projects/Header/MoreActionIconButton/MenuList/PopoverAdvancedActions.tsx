import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  type MenuProps,
} from '@/components/ui/organisms/Menu';
import { chakra } from '@/shared/chakra';

type Props = {
  onClose: () => void;
} & MenuProps;

export function PopoverAdvancedActions(props: Props) {
  return (
    <Menu isLazy {...props}>
      <MenuButton w="full" as={MenuButtonAs}>
        {props.children}
      </MenuButton>
      <MenuList pointerEvents="auto" mr="5px">
        <MenuItem as="div">Make a subtask of</MenuItem>
        <MenuItem as="div">Convert to a project</MenuItem>
        <MenuItem as="div" command="⇧+Tab+D">
          Merge duplicate tasks
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

// NOTE: Use custom component instead of `Box` because of styling issue with positioning menu item
const MenuButtonAs = chakra('div', {
  baseStyle: {
    w: 'full',
  },
});
