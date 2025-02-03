import React, { FC, useState } from 'react';
import { SidePanel, FormField, Box, Loader, FieldSet, CornerRadiusInput, NumberInput, Input } from '@wix/design-system';
import ImageUploader from './ImageUploader';
import ListItem from './ListItem';

interface GeneralSettingsProps {
  isLeftLoading: boolean;
  isRightLoading: boolean;
  leftImage: string;
  rightImage: string;
  hoverPosition: boolean;
  isPortrait: boolean;
  isDraggable: boolean;
  cornerRadius: number;
  onLeftImageUpload: (file: File | null) => void;
  onRightImageUpload: (file: File | null) => void;
  onHoverPositionChange: (checked: boolean) => void;
  onPortraitChange: (checked: boolean) => void;
  onDraggableChange: (checked: boolean) => void;
  onCornerRadiusChange: (value: number) => void;
}

const GeneralSettings: FC<GeneralSettingsProps> = ({
  isLeftLoading,
  isRightLoading,
  leftImage,
  rightImage,
  hoverPosition,
  isPortrait,
  isDraggable,
  cornerRadius,
  onLeftImageUpload,
  onRightImageUpload,
  onHoverPositionChange,
  onPortraitChange,
  onDraggableChange,
  onCornerRadiusChange
}) => {

  return (
    <SidePanel.Section title="General Settings">
      <SidePanel.Field>
        <FormField label="Before Image">
          {!isLeftLoading ? (
            <ImageUploader
              imageUrl={leftImage}
              onImageUpload={onLeftImageUpload}
              onRemoveImage={async () => {
                onLeftImageUpload(null);
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
        <FormField label="After Image">
          {!isRightLoading ? (
            <ImageUploader
              imageUrl={rightImage}
              onImageUpload={onRightImageUpload}
              onRemoveImage={async () => {
                onRightImageUpload(null);
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
        <FieldSet gap="small" legend="Slider corner radius" columns="auto 130px">
          <NumberInput
            size="small"
            value={cornerRadius}
            onChange={(value:number) => onCornerRadiusChange(value)}
            suffix={<Input.Affix>px</Input.Affix>}
          />
        </FieldSet>
      </SidePanel.Field>
      <SidePanel.Field>
        <ListItem
          title="Change position on hover"
          subtitle=""
          checked={hoverPosition}
          onChange={onHoverPositionChange}
        />
      </SidePanel.Field>
      <SidePanel.Field>
        <ListItem
          title="Portrait mode"
          subtitle=""
          checked={isPortrait}
          onChange={onPortraitChange}
        />
      </SidePanel.Field>
      <SidePanel.Field>
        <ListItem
          title="Handle draggable"
          subtitle=""
          checked={isDraggable}
          onChange={onDraggableChange}
        />
      </SidePanel.Field>      
    </SidePanel.Section>
  );
};

export default GeneralSettings;