import { MenuItem } from '@/components/ui/organisms/Menu';
import { useProjectTeammate } from '@/store/entities/projectTeammate';
import type React from 'react';
import { memo, useCallback, useMemo } from 'react';

type Props = {
  projectId: string;
  projectTeammateId: string;
  onOpenPopover: () => void;
};

export const AddRole: React.FC<Props> = memo<Props>((props) => {
  const { onOpenPopover, projectTeammateId } = props;
  const { role } = useProjectTeammate(projectTeammateId);

  const text = useMemo(() => {
    if (!role) return 'Add role';
    return 'Change role';
  }, [role]);

  const handleClick = useCallback(() => {
    onOpenPopover();
  }, [onOpenPopover]);

  return <MenuItem onClick={handleClick}>{text}</MenuItem>;
});
AddRole.displayName = 'AddRole';
