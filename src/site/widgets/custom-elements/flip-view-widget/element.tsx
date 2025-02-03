import React, { useEffect, useState, type FC } from "react";
import ReactDOM from "react-dom";
import reactToWebComponent from "react-to-webcomponent";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import useCompareSliderAnimation from "./hook/useCompareSliderAnimation.js"; // Hook'u import et

interface Props {
  displayName: string;
  handleIcon: string;
  leftImage: string;
  rightImage: string;
  isPortrait: boolean;
  isDraggable: boolean;
  hoverPosition: boolean;
  enableAnimation: boolean;
  animationLoop: boolean;
  animationSpeed: number;
  leftLabel: string;
  rightLabel: string;
  labelPosition: string;
  labelPositionValue: number;
  showLabel: boolean;
  handlePosition: number;
  handleColor: string;
  handleButton: string;
  iconSize: number;
  showHandleButton: boolean;
  labelSize: number;
  labelCornerRadius: number;
  labelColor: string;
  sliderMinHeight: number;
  cornerRadius: number;
  hideOnDesktop: boolean;
  mobileBorderRadius: number;
  showMobileSettings: boolean;
}

const CustomElement: FC<Props> = (props) => {

  const defaultIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='117' height='183' viewBox='0 0 117 183' fill='none'%3E%3Crect x='0' y='0' width='24' height='183' rx='12' fill='black'/%3E%3Crect x='46' y='0' width='25' height='183' rx='12.5' fill='black'/%3E%3Crect x='93' y='0' width='24' height='183' rx='12' fill='black'/%3E%3C/svg%3E";
  const defaultLeftImage = "https://static.wixstatic.com/media/19eb0b_ec9250c40e774297b1b7eb5578b22dac~mv2.png";
  const defaultRightImage = "https://static.wixstatic.com/media/19eb0b_f68880d2f60d4663a851dce0961dae3b~mv2.png";

  const [labelOpacity, setLabelOpacity] = useState(1);
  
  const enableAnimation = props.enableAnimation || false;
  const animationLoop = props.animationLoop || false;
  const animationSpeed = props.animationSpeed || 1000;
  const panelPosition = props.handlePosition || 50;
  const borderRadius = props.cornerRadius + "px";
  const positionLeft = "0px!important";
  const handleStyleColor = props.handleColor || '#FFFF';
  const labelKey = props.labelPosition || 'top';
  const labelPosition = props.labelPositionValue + "%" || 4 + "%";
  const showLabel = !props.showLabel || props.showLabel===null ? 'none' : '';
  
  const { position, containerRef } = useCompareSliderAnimation(enableAnimation, animationLoop, animationSpeed);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
    
      ${props.showMobileSettings ? 
        `@media screen and (max-width: 729px) {
          flip-view-widget [data-rcs="root"] {
            border-radius: ${props.mobileBorderRadius}px;
          }  
        }
          
        @media screen and (min-width: 729px) {
          flip-view-widget {
            display: ${props.hideOnDesktop ? 'none' : 'block'} !important;
          }              

          flip-view-widget [data-rcs="root"] {
              border-radius: ${borderRadius};
            }
          }
          `
        :
        `flip-view-widget [data-rcs="root"] {
            border-radius: ${borderRadius};
          }`
      }

      
      flip-view-widget [data-rcs="clip-item"] {
        left: ${positionLeft};
      }
      
      flip-view-widget .__rcs-handle-line, 
      flip-view-widget .__rcs-handle-button {
        color: ${handleStyleColor};
      }
      
      flip-view-widget .__rcs-handle-arrow {
      }


      flip-view-widget .__rcs-handle-button {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        ${props.handleButton === 'slim' ? `
          width: 26px !important;
          height: 40px !important;
          border-radius: 15px !important;
          background-color: ${handleStyleColor} !important;
        ` : props.handleButton === 'rounded' ? `
          background-color: ${handleStyleColor} !important;
        ` : props.handleButton === 'transparent' ? `          
        ` : `
          width: 26px !important;
          height: 40px !important;
          border-radius: 15px !important;
          background-color: ${handleStyleColor} !important;
        `}
        box-shadow: rgba(0, 0, 0, 0.35) 0px 0px 4px !important;
      }

      flip-view-widget .__rcs-handle-arrow {
        display: none !important;
      }

      flip-view-widget .__rcs-handle-button::before {
        content: '';
        width: ${props.iconSize || 15}px;
        height: ${props.iconSize || 15}px;
        background-image: url("${!props.handleIcon || props.handleIcon==='' || props.handleIcon===null ? defaultIcon : props.handleIcon}");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      } 

       flip-view-widget .__rcs-handle-button {
        display: ${ props.showHandleButton===null || props.showHandleButton===undefined ? '' : props.showHandleButton ? '' : 'none!important'};
      }

    `;
    
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const labelStyle: React.CSSProperties = {
    fontSize: `${props.labelSize + .5 || 1.1}rem`, // 2x multiplier for fontSize
    position: 'absolute',
    padding: `${props.labelSize || .6}rem`, // 1x multiplier for padding
    color: `${props.labelColor || '#FFFF'}`,
    opacity: labelOpacity,
    border: '2px solid '+`${props.labelColor || '#FFFF'}`,
    borderRadius: `${props.labelCornerRadius || 8}px`,
    backdropFilter: 'blur(0.25rem) saturate(180%) contrast(80%) brightness(120%)',
    WebkitBackdropFilter: 'blur(0.25rem) saturate(180%) contrast(80%) brightness(120%)',
    transition: 'opacity 0.25s ease-in-out',
    [labelKey]: labelPosition,
  };

  return (
    <div ref={containerRef}>
      <ReactCompareSlider
        changePositionOnHover={props.hoverPosition}
        portrait={props.isPortrait}
        onlyHandleDraggable={props.isDraggable}             
        onPointerDown={() => setLabelOpacity(0)} onPointerUp={() => setLabelOpacity(1)}   
        position={enableAnimation ? position : panelPosition}
        itemOne={
          <>            
            <div style={{ ...labelStyle, left: '1rem', display: showLabel }}>{props.leftLabel || 'Before'}</div>
            <ReactCompareSliderImage
              src={!props.leftImage || props.leftImage==='' || props.leftImage===null ? defaultLeftImage : props.leftImage}
              alt="Image one"
              style={{
                backgroundColor: '#fff',
                minHeight: props.showMobileSettings ? props.sliderMinHeight + 'px' : 'auto',
              }}
            />
          </>
        }
        itemTwo={
          <>
          <div style={{ ...labelStyle, right: '1rem', display: showLabel }}>{props.rightLabel || 'After'}</div>
            <ReactCompareSliderImage
              src={!props.rightImage || props.rightImage==='' || props.rightImage===null ? defaultRightImage : props.rightImage}
              alt="Image two"
              style={{
                backgroundColor:'#fff',
                minHeight: props.showMobileSettings ? props.sliderMinHeight + 'px' : 'auto',
              }} 
            />
          </>
        }
        style={{
          width: '100%',
          height: '100%',      
        }}
      />
    </div>
  );
};

const customElement = reactToWebComponent(
  CustomElement,
  React,
  ReactDOM as any,
  {
    props: {
      displayName: 'string',
      handleIcon:'string',
      leftImage:'string',
      rightImage:'string',
      isPortrait:'boolean',
      isDraggable:'boolean',
      hoverPosition:'boolean',
      enableAnimation:'boolean',
      animationLoop:'boolean',
      animationSpeed:'number',
      leftLabel:'string',
      rightLabel:'string',
      labelPosition:'string',
      labelPositionValue: 'number',
      showLabel:'boolean',
      handlePosition: 'number',
      handleColor: 'string',
      handleButton: 'string',
      iconSize: 'number',
      showHandleButton:'boolean',
      labelSize: 'number', 
      labelCornerRadius: 'number', 
      labelColor: 'string',      
      sliderMinHeight: 'number',      
      cornerRadius: 'number',      
      hideOnDesktop:'boolean',
      mobileBorderRadius: 'number', 
      showMobileSettings: 'boolean',
    },
  }
);
export default customElement;