import React, { FC } from 'react';
import { SidePanel, FormField, Box, ColorInput, Slider, Input, FieldSet, Loader, SegmentedToggle, Text } from '@wix/design-system';
import ImageUploader from './ImageUploader';
import ListItem from './ListItem';
import { CircleDashed, CircleLarge, LayoutOneColumn } from '@wix/wix-ui-icons-common';

interface HandleSettingsProps {
  icon: string;
  valueHandle: number;
  iconSize: number;
  isIconLoading: boolean;
  handleColor: string;
  handleButtonType: string;
  showHandleButton: boolean;
  onIconUpload: (file: File | null) => void;
  onHandlePositionChange: (value: number) => void;
  onHandleColorChange: (color: string) => void;
  onHandleButtonTypeChange: (value: string) => void;
  onIconSizeChange: (value: number) => void;
  onShowHandleButtonChange: (checked: boolean) => void;
}

const HandleSettings: FC<HandleSettingsProps> = ({
  icon,
  valueHandle,
  iconSize,
  isIconLoading,
  handleColor,
  handleButtonType,
  showHandleButton,
  onIconUpload,
  onHandlePositionChange,
  onHandleColorChange,
  onHandleButtonTypeChange,
  onIconSizeChange,
  onShowHandleButtonChange
}) => {
  return (
    <SidePanel.Section title="Handle Settings">
      <SidePanel.Field>
        <ListItem 
          title="Show handle button" 
          subtitle="" 
          checked={showHandleButton} 
          onChange={onShowHandleButtonChange} 
        />
      </SidePanel.Field>
      {showHandleButton && (
        <>
          <SidePanel.Field>
            <FormField label="Handle button icon(jpeg,png,svg)">
            {!isIconLoading ? (
              <ImageUploader
                imageUrl={icon}            
                onImageUpload={onIconUpload}
                onRemoveImage={() => {
                  onIconUpload(null);
                }}
              />
            ) : (
              <Box align="center" marginTop="SP2">
                <Loader size="small" />
              </Box>
            )}
            </FormField>
          </SidePanel.Field>
          <SidePanel.Field>
            <FieldSet gap="small" legend="Icon size" columns="auto 72px">
              <Slider
                onChange={(value: number | number[]) => {
                  if (typeof value === 'number') {
                    onIconSizeChange(value);
                  }
                }}
                min={0}
                max={50}
                step={1}
                value={iconSize}
                displayMarks={false}
              />
              <Input
                size="small"
                suffix={<Input.Affix>px</Input.Affix>}
                value={iconSize}
                onChange={(e) => onIconSizeChange(Number(e.target.value))}
              />
            </FieldSet>
          </SidePanel.Field>      
          <SidePanel.Field>
          <FormField label="Handle button type">
            <SegmentedToggle
              selected={handleButtonType}
              onClick={(_, value) => onHandleButtonTypeChange(value)}>
              <SegmentedToggle.Button value="slim"><LayoutOneColumn/></SegmentedToggle.Button>
              <SegmentedToggle.Button value="rounded"><CircleLarge/></SegmentedToggle.Button>
              <SegmentedToggle.Button value="transparent"><CircleDashed/></SegmentedToggle.Button>
            </SegmentedToggle>
          </FormField>
          </SidePanel.Field>
          </>
      )}
          <SidePanel.Field>
            <FormField label="Handle color">
              <Box width="150px" height="30px">
                <ColorInput 
                  onConfirm={(color: string | object) => {
                    if (typeof color === 'string') {
                      onHandleColorChange(color);
                    }
                  }}
                  value={handleColor} 
                  popoverProps={{
                    animate: true,
                  }}
                />
              </Box>
            </FormField>
          </SidePanel.Field>
          <SidePanel.Field>
            <FieldSet gap="small" legend="Handle position" columns="auto 72px">
              <Slider
                onChange={(value: number | number[]) => {
                  if (typeof value === 'number') {
                    onHandlePositionChange(value);
                  }
                }}
                min={0}
                max={100}
                step={1}
                value={valueHandle}
                displayMarks={false}
              />
              <Input
                size="small"
                suffix={<Input.Affix>%</Input.Affix>}
                value={valueHandle}
                onChange={(e) => onHandlePositionChange(Number(e.target.value))}
              />
            </FieldSet>
          </SidePanel.Field>       
    </SidePanel.Section>
  );
};

export default HandleSettings;