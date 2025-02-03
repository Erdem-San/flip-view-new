import React from 'react';
import { Box, Text, ToggleSwitch } from '@wix/design-system';

interface ListItemProps {
  title: string;
  subtitle: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

const ListItem: React.FC<ListItemProps> = ({ title, subtitle, checked, onChange }) => {
  return (
    <Box align="space-between">
      <Box direction="vertical">
        <Text weight="normal">{title}</Text>
        <Text size="small" secondary>
          {subtitle}
        </Text>
      </Box>
      <Box gap="24px" verticalAlign="middle">
        <ToggleSwitch size="medium" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      </Box>
    </Box>
  );
};

export default ListItem;