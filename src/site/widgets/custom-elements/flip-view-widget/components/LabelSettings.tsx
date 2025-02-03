import React, { FC } from 'react';
import { SidePanel, FormField, Input, SegmentedToggle, Slider, FieldSet, NumberInput, Box, ColorInput } from '@wix/design-system';
import ListItem from './ListItem';

interface LabelSettingsProps {
  valueLabel: number;
  labelSize: number;
  showLabel: boolean;
  leftLabelText: string;
  rightLabelText: string;
  labelPosition: string;
  labelCornerRadius: number;
  labelColor: string;
  onLabelPositionChange: (value: number) => void;
  onLabelSizeChange: (value: number) => void;
  onShowLabelChange: (checked: boolean) => void;
  onLeftLabelChange: (value: string) => void;
  onRightLabelChange: (value: string) => void;
  onLabelPositionTypeChange: (value: string) => void;
  onLabelCornerRadiusChange: (value: number) => void;
  onLabelColorChange: (value: string) => void;
}

const LabelSettings: FC<LabelSettingsProps> = ({
  valueLabel,
  labelSize,
  showLabel,
  leftLabelText,
  rightLabelText,
  labelPosition,
  labelCornerRadius,
  labelColor,
  onLabelPositionChange,
  onLabelCornerRadiusChange,
  onLabelSizeChange,
  onShowLabelChange,
  onLeftLabelChange,
  onRightLabelChange,
  onLabelPositionTypeChange,
  onLabelColorChange
}) => {
  return (
    <SidePanel.Section title="Label Settings">
      <SidePanel.Field>
        <ListItem title="Show label" subtitle="" checked={showLabel} onChange={onShowLabelChange} />
      </SidePanel.Field>
      { showLabel &&
        <>
          <SidePanel.Field>
            <FormField label="Left label">
              <Input
                placeholder="Before"
                value={leftLabelText}
                onChange={(e) => onLeftLabelChange(e.target.value)}
              />
            </FormField>
          </SidePanel.Field>
          <SidePanel.Field>
            <FormField label="Right label">
              <Input
                placeholder="After"
                value={rightLabelText}
                onChange={(e) => onRightLabelChange(e.target.value)}
              />
            </FormField>
          </SidePanel.Field>
          <SidePanel.Field>
            <SegmentedToggle
              selected={labelPosition}
              onClick={(_, value) => onLabelPositionTypeChange(value)}>
              <SegmentedToggle.Button value="top">Top</SegmentedToggle.Button>
              <SegmentedToggle.Button value="bottom">Bottom</SegmentedToggle.Button>
            </SegmentedToggle>
          </SidePanel.Field>
          <SidePanel.Field>
            <FieldSet gap="small" legend="Label position" columns="auto 72px">
              <Slider
                onChange={(value: number | number[]) => onLabelPositionChange(Number(value))}
                min={0}
                max={100}
                step={1}
                value={valueLabel}
                displayMarks={false}
              />
              <Input
                size="small"
                value={valueLabel}
                onChange={(e) => onLabelPositionChange(Number(e.target.value))}
                suffix={<Input.Affix>%</Input.Affix>}
              />
            </FieldSet>
          </SidePanel.Field>
          <SidePanel.Field>
            <FieldSet gap="small" legend="Label Size" columns="auto 82px">
              <Slider
                onChange={(value: number | number[]) => onLabelSizeChange(Number(value))}
                min={0.1}
                max={5}
                step={0.1}
                value={labelSize}
                displayMarks={false}
              />
              <Input
                size="small"
                value={labelSize}
                onChange={(e) => onLabelSizeChange(Number(e.target.value))}
                suffix={<Input.Affix>rem</Input.Affix>}
              />
            </FieldSet>
          </SidePanel.Field>
          <SidePanel.Field>
            <FieldSet gap="small" legend="Label corner radius" columns="auto 130px">
              <NumberInput
                size="small"
                value={labelCornerRadius}
                onChange={(value:number) => onLabelCornerRadiusChange(value)}
                suffix={<Input.Affix>px</Input.Affix>}
              />
            </FieldSet>
          </SidePanel.Field>
          <SidePanel.Field>
            <FormField label="Label color">
              <Box width="150px" height="30px">
                <ColorInput 
                  onConfirm={(color: string | object) => {
                    if (typeof color === 'string') {
                      onLabelColorChange(color);
                    }
                  }}
                  value={labelColor} 
                  popoverProps={{
                    animate: true,
                  }}
                />
              </Box>
            </FormField>
          </SidePanel.Field>
        </>
      }
    </SidePanel.Section>
  );
};

export default LabelSettings;