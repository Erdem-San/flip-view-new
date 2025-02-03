import React, { type FC, useState, useEffect } from 'react';
import { widget } from '@wix/editor';
import { files } from "@wix/media";
import { Buffer } from 'buffer';
import httpClient from "axios";
import { SidePanel, WixDesignSystemProvider} from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import useIconUpload from './hook/useIconUpload';
import GeneralSettings from './components/GeneralSettings';
import HandleSettings from './components/HandleSettings';
import AnimationSettings from './components/AnimationSettings';
import LabelSettings from './components/LabelSettings';
import MobileSettings from './components/MobileSettings';
import { appInstances } from "@wix/app-management";
async function getAppInstance() {
  const response = await appInstances.getAppInstance();
  console.log(response)
}

// @ts-ignore
import mime from "mime-types";

const Panel: FC = () => {
  const [valueLabel, setValueLabel] = useState<any>(4);
  const [valueHandle, setValueHandle] = useState<any>(25);
  const [iconSize, setIconSize] = useState<number>(15);
  const [labelSize, setLabelSize] = useState<number>(0.6);
  const [labelCornerRadius, setLabelCornerRadius] = useState<number>(0);
  const [labelColor, setLabelColor] = useState('#FFFF');
  const [isLeftLoading, setIsLeftLoading] = useState(false);
  const [isRightLoading, setIsRightLoading] = useState(false);
  const [showLabel, setShowLabel] = useState(true);
  const [leftLabelText, setLeftLabelText] = useState('Before');
  const [rightLabelText, setRightLabelText] = useState('After');
  const [labelPosition, setLabelPosition] = useState('top');
  const [handleButtonType, setHandleButtonType] = useState('slim');  
  const [showHandleButton, setShowHandleButton] = useState(true);
  
  const [cornerRadius, setCornerRadius] = useState<number>(0);
 
  const [leftImage, setLeftImage] = useState<string>();
  const [rightImage, setRightImage] = useState<string>();

  const [hoverPosition, setHoverPosition] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(false);
  const [isAnimationLoop, setIsAnimationLoop] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState<number>(1000);

  const [handleColor, setHandleColor] = useState('#FFFF');
  const [sliderMinHeight, setSliderMinHeight] = useState<number>(360);
  const [hideOnDesktop, setHideOnDesktop] = useState(false);
  const [mobileBorderRadius, setMobileBorderRadius] = useState<number>(0);
  const [showMobileSettings, setShowMobileSettings] = useState(false);
  const defaultIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='117' height='183' viewBox='0 0 117 183' fill='none'%3E%3Crect x='0' y='0' width='24' height='183' rx='12' fill='black'/%3E%3Crect x='46' y='0' width='25' height='183' rx='12.5' fill='black'/%3E%3Crect x='93' y='0' width='24' height='183' rx='12' fill='black'/%3E%3C/svg%3E";

  useEffect(() => {
    widget.getProp('left-image').then(image => setLeftImage(image || ''));
    widget.getProp('right-image').then(image => setRightImage(image || ''));
    widget.getProp('hover-position').then(value => setHoverPosition(value === 'true'));
    widget.getProp('is-portrait').then(value => setIsPortrait(value === 'true'));
    widget.getProp('is-draggable').then(value => setIsDraggable(value === 'true'));
    widget.getProp('handle-position').then(value => setValueHandle(Number(value) || 50));
    widget.getProp('handle-color').then(value => setHandleColor(value || '#FFFF'));
    widget.getProp('icon-size').then(value => setIconSize(Number(value) || 15));
    widget.getProp('show-handle-button').then(value => setShowHandleButton(value === 'true' || true));
    widget.getProp('label-size').then(value => setLabelSize(Number(value) || 0.6));
    
    widget.getProp('enable-animation').then(value => setIsAnimationEnabled(value === 'true'));
    widget.getProp('animation-loop').then(value => setIsAnimationLoop(value === 'true'));
    widget.getProp('animation-speed').then(value => setAnimationSpeed(Number(value) || 1000));
    
    widget.getProp('show-label').then(value => setShowLabel(value === 'true'));
    widget.getProp('left-label').then(value => setLeftLabelText(value || 'Before'));
    widget.getProp('right-label').then(value => setRightLabelText(value || 'After'));
    widget.getProp('label-position').then(value => setLabelPosition(value || 'top'));
    widget.getProp('handle-icon').then(image => setIcon(image || ''));
    widget.getProp('handle-button').then(value => setHandleButtonType(value || 'slim'));
    widget.getProp('label-position-value').then(value => setValueLabel(Number(value) || 4));
    widget.getProp('label-corner-radius').then(value => setLabelCornerRadius(Number(value) || 0));
    widget.getProp('label-color').then(value => setLabelColor(value || '#FFFFF'));

    widget.getProp('corner-radius').then(value => setCornerRadius(Number(value) || 0));    
    widget.getProp('slider-min-height').then(value => setSliderMinHeight(Number(value) || 360));
    widget.getProp('hide-on-desktop').then(value => setHideOnDesktop(value === 'true'));
    widget.getProp('mobile-border-radius').then(value => setMobileBorderRadius(Number(value) || 0));
    widget.getProp('show-mobile-settings').then(value => setShowMobileSettings(value === 'true'));
  }, []);

  const handleLeftImageUpload = async (file: File | null) => {
    if (!file) {
      setLeftImage('');
      return;
    }
  
    setIsLeftLoading(true);
    try {
      const mimeType = file.type || mime.lookup(file.name) || "application/octet-stream";
      const fileName = file.name;
      const fileContent = await file.arrayBuffer();
      const { uploadUrl } = await files.generateFileUploadUrl(mimeType);
      await uploadMyFile(uploadUrl, fileContent, mimeType, fileName, 'left');
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsLeftLoading(false);
    }
  };

  const handleRightImageUpload = async (file: File | null) => {
    if (!file) {
      setRightImage('');
      return;
    }

    setIsRightLoading(true);
    try {
      const mimeType = file.type || mime.lookup(file.name) || "application/octet-stream";
      const fileName = file.name;
      const fileContent = await file.arrayBuffer();
      const { uploadUrl } = await files.generateFileUploadUrl(mimeType);
      await uploadMyFile(uploadUrl, fileContent, mimeType, fileName, 'right');
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsRightLoading(false);
    }
  };

  const [isIconLoading, setIsIconLoading] = useState(false);
  const { icon, handleFileUpload, setIcon } = useIconUpload('');

  const handleIconUpload = async (file: File | null) => {
    if (!file) {
      setIcon('');
      return;
    }
  
    setIsIconLoading(true);
    try {
      const mimeType = file.type || mime.lookup(file.name) || "application/octet-stream";
      const fileName = file.name;
      const fileContent = await file.arrayBuffer();
      const { uploadUrl } = await files.generateFileUploadUrl(mimeType);
      await uploadMyFile(uploadUrl, fileContent, mimeType, fileName, 'icon');
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsIconLoading(false);
    }
  };

  const uploadMyFile = async (
    uploadUrl: string,
    fileContent: Buffer | ArrayBuffer,
    mimeType: string,
    fileName: string,
    type: 'left' | 'right' | 'icon'
  ) => {
    const params = { filename: fileName };
    const headers = { "Content-Type": mimeType };

    const { data } = await httpClient.put(uploadUrl, fileContent, { headers, params });

    if (type === 'left') {
      await widget.setProp('left-image', data?.file?.url);
      await setLeftImage(data?.file?.url.toString());
    } else if (type === 'right') {
      await widget.setProp('right-image', data?.file?.url);
      await setRightImage(data?.file?.url.toString());
    } else if (type === 'icon') {
      await widget.setProp('handle-icon', data?.file?.url);
      await setIcon(data?.file?.url.toString());
    }

    return data;
  };

  return (
    <WixDesignSystemProvider>
      <SidePanel width="300">
        <SidePanel.Content noPadding stretchVertically>
          <GeneralSettings
            isLeftLoading={isLeftLoading}
            isRightLoading={isRightLoading}
            leftImage={leftImage || ''}
            rightImage={rightImage || ''}
            hoverPosition={hoverPosition}
            isPortrait={isPortrait}
            isDraggable={isDraggable}
            onLeftImageUpload={handleLeftImageUpload}
            onRightImageUpload={handleRightImageUpload}
            onHoverPositionChange={(checked) => {
              setHoverPosition(checked);
              widget.setProp('hover-position', checked.toString());
            }}
            onPortraitChange={(checked) => {
              setIsPortrait(checked);
              widget.setProp('is-portrait', checked.toString());
            }}
            onDraggableChange={(checked) => {
              setIsDraggable(checked);
              widget.setProp('is-draggable', checked.toString());
            }}
            cornerRadius={cornerRadius}
            onCornerRadiusChange={(value) => {
              setCornerRadius(value);
              widget.setProp('corner-radius', String(value));
            }}
          />
          <HandleSettings
            icon={icon}
            isIconLoading={isIconLoading}
            valueHandle={valueHandle}
            iconSize={iconSize}
            handleColor={handleColor}
            handleButtonType={handleButtonType}
            showHandleButton={showHandleButton}
            onIconUpload={handleIconUpload}
            onHandlePositionChange={(value) => {
              setValueHandle(value);
              widget.setProp('handle-position', value.toString());
            }}
            onHandleColorChange={(value) => {
              setHandleColor(value);
              widget.setProp('handle-color', value);
            }}
            onHandleButtonTypeChange={(value) => {
              setHandleButtonType(value);
              widget.setProp('handle-button', value);
            }}
            onIconSizeChange={(value) => {
              setIconSize(value);
              widget.setProp('icon-size', value.toString());
            }}
            onShowHandleButtonChange={(checked) => {
              setShowHandleButton(checked);
              widget.setProp('show-handle-button', checked.toString());
            }}
          />
          <AnimationSettings
            isAnimationEnabled={isAnimationEnabled}
            isAnimationLoop={isAnimationLoop}
            animationSpeed={animationSpeed}
            onAnimationEnabledChange={(checked) => {
              setIsAnimationEnabled(checked);
              widget.setProp('enable-animation', checked.toString());
            }}
            onAnimationLoopChange={(checked) => {
              setIsAnimationLoop(checked);
              widget.setProp('animation-loop', checked.toString());
            }}
            onAnimationSpeedChange={(value) => {
              setAnimationSpeed(value);
              widget.setProp('animation-speed', value.toString());
            }}
          />
          <LabelSettings
            valueLabel={valueLabel}
            showLabel={showLabel}
            leftLabelText={leftLabelText}
            rightLabelText={rightLabelText}
            labelPosition={labelPosition}
            labelSize={labelSize}
            onLabelPositionChange={(value) => {
              setValueLabel(value);
              widget.setProp('label-position-value', value.toString());
            }}
            onShowLabelChange={(checked) => {
              setShowLabel(checked);
              widget.setProp('show-label', checked.toString());
            }}
            onLeftLabelChange={(value) => {
              setLeftLabelText(value);
              widget.setProp('left-label', value);
            }}
            onRightLabelChange={(value) => {
              setRightLabelText(value);
              widget.setProp('right-label', value);
            }}
            onLabelPositionTypeChange={(value) => {
              setLabelPosition(value);
              widget.setProp('label-position', value);
            }}
            onLabelSizeChange={(value) => {
              setLabelSize(value);
              widget.setProp('label-size', value.toString());
            }}
            labelCornerRadius={labelCornerRadius}
            onLabelCornerRadiusChange={(value) => {
              setLabelCornerRadius(value);
              widget.setProp('label-corner-radius', value.toString());
            }}
            labelColor={labelColor}
            onLabelColorChange={(value) => {
              setLabelColor(value);
              widget.setProp('label-color', value);
            }}
          />
          <MobileSettings 
            sliderMinHeight={sliderMinHeight}
            onSliderMinHeight={(value) => {
              setSliderMinHeight(value);
              widget.setProp('slider-min-height', value.toString());
            }}
            hideOnDesktop={hideOnDesktop}
            onHideOnDesktopChange={(checked) => {
              setHideOnDesktop(checked);
              widget.setProp('hide-on-desktop', checked.toString());
            }}
            mobileBorderRadius={mobileBorderRadius}
            onMobileBorderRadiusChange={(value) => {
              setMobileBorderRadius(value);
              widget.setProp('mobile-border-radius', value.toString());
            }}
            showMobileSettings={showMobileSettings}
            onShowMobileSettingsChange={(checked) => {
              setShowMobileSettings(checked);
              widget.setProp('show-mobile-settings', checked.toString());
            }}
          />
        </SidePanel.Content>
      </SidePanel>
    </WixDesignSystemProvider>
  );
};

export default Panel;