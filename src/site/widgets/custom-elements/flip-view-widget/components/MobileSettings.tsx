import React, { FC } from 'react';
import { Box, FieldSet, Input, NumberInput, SectionHelper, SidePanel } from '@wix/design-system';
import { StatusWarningFilled } from '@wix/wix-ui-icons-common';
import ListItem from './ListItem';

interface MobileSettingsProps {
  sliderMinHeight: number;
  mobileBorderRadius: number;
  hideOnDesktop: boolean;
  showMobileSettings: boolean;
  onSliderMinHeight: (value: number) => void;
  onHideOnDesktopChange: (checked: boolean) => void;
  onMobileBorderRadiusChange: (value: number) => void;
  onShowMobileSettingsChange: (checked: boolean) => void;
}

const MobileSettings: FC<MobileSettingsProps> = ({
  sliderMinHeight,
  mobileBorderRadius,
  hideOnDesktop,
  showMobileSettings,
  onSliderMinHeight,
  onHideOnDesktopChange,
  onMobileBorderRadiusChange,
  onShowMobileSettingsChange
}) => {
  return (
    <SidePanel.Section title="Mobile Settings">
      <Box padding={'4px'}>
        <SectionHelper appearance="warning" fullWidth> 
          After opening the mobile settings section, some confusion may occur in the editor, 
          but this issue will not appear in the live environment.
        </SectionHelper>
      </Box>
      <SidePanel.Field>
        <ListItem 
          title="Edit mobile settings" 
          subtitle="" 
          checked={showMobileSettings} 
          onChange={onShowMobileSettingsChange} 
        />
      </SidePanel.Field>
      {showMobileSettings && <>
        <SidePanel.Field>
          <FieldSet gap="small" legend="Slider minimum height" columns="auto 130px">
            <NumberInput
              size="small"
              value={sliderMinHeight}
              onChange={(value:number) => onSliderMinHeight(value)}
              suffix={<Input.Affix>px</Input.Affix>}
            />
          </FieldSet>
      </SidePanel.Field>
      <SidePanel.Field>
        <FieldSet gap="small" legend="Slider corner radius on mobile" columns="auto 130px">
          <NumberInput
            size="small"
            value={mobileBorderRadius}
            onChange={(value:number) => onMobileBorderRadiusChange(value)}
            suffix={<Input.Affix>px</Input.Affix>}
          />
        </FieldSet>
      </SidePanel.Field>
      {/* <SidePanel.Field>
        <ListItem 
          title="Hide slider on desktop" 
          subtitle="" 
          checked={hideOnDesktop} 
          onChange={onHideOnDesktopChange} 
        />
      </SidePanel.Field>      */}
      </>}
    </SidePanel.Section>
  );
};

export default MobileSettings;