import React, { FC } from 'react';
import { SidePanel, Slider, Input, FieldSet } from '@wix/design-system';
import ListItem from './ListItem';

interface AnimationSettingsProps {
  isAnimationEnabled: boolean;
  isAnimationLoop: boolean;
  animationSpeed: number;
  onAnimationEnabledChange: (checked: boolean) => void;
  onAnimationLoopChange: (checked: boolean) => void;
  onAnimationSpeedChange: (value: number) => void;
}

const AnimationSettings: FC<AnimationSettingsProps> = ({
  isAnimationEnabled,
  isAnimationLoop,
  animationSpeed,
  onAnimationEnabledChange,
  onAnimationLoopChange,
  onAnimationSpeedChange,
}) => {
  return (
    <SidePanel.Section title="Animation Settings">
      <SidePanel.Field>
        <ListItem
          title="Enable animation"
          subtitle=""
          checked={isAnimationEnabled}
          onChange={onAnimationEnabledChange}
        />
      </SidePanel.Field>
      {isAnimationEnabled && (
        <>
          <SidePanel.Field>
            <ListItem
              title="Animation loop"
              subtitle=""
              checked={isAnimationLoop}
              onChange={onAnimationLoopChange}
            />
          </SidePanel.Field>
          <SidePanel.Field>
            <FieldSet gap="small" legend="Animation speed" columns="auto 96px">
              <Slider
                onChange={(value) => onAnimationSpeedChange(Number(value))}
                min={250}
                max={10000}
                step={250}
                value={animationSpeed}
                displayMarks={false}
              />
              <Input
                size="small"
                value={animationSpeed}
                onChange={(e) => onAnimationSpeedChange(Number(e.target.value))}
                suffix={<Input.Affix>/ms</Input.Affix>}
              />
            </FieldSet>
          </SidePanel.Field>
        </>
      )}
    </SidePanel.Section>
  );
};

export default AnimationSettings;