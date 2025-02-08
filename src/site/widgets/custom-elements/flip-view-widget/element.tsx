import React, { useEffect, useState, type FC } from "react";
import ReactDOM from "react-dom";
import reactToWebComponent from "react-to-webcomponent";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import useCompareSliderAnimation from "./hook/useCompareSliderAnimation.js"; // Hook'u import et
import UpgradePlan from "./components/UpgradePlan";
import { httpClient } from "@wix/essentials";

async function fetchAppInstanceData() {
  try {
    const response = await httpClient.fetchWithAuth(
      // URL'deki "get-app-instances" -> "get-app-instance" olarak düzeltildi
      `${import.meta.env.BASE_API_URL}/get-app-instances`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    console.log("error fetching data:", error);
    throw error; // Mutation/Query için hata fırlat
  }
}


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
//https://www.wix.com/apps/upgrade/APPIDHERE?appInstanceId=INSTANCEIDHERE
const CustomElement: FC<Props> = (props) => {

  const [widgetId] = useState(() => `flip-view-${Math.random().toString(36).substr(2, 9)}`);

  const defaultIcon = "https://static.wixstatic.com/shapes/19eb0b_a3e37d713fdb4d98aeee701c132048bf.svg";
  const defaultLeftImage = "https://static.wixstatic.com/media/19eb0b_d133307a66484c7baf3e702c3bb8923f~mv2.png";
  const defaultRightImage = "https://static.wixstatic.com/media/19eb0b_e1eda2c08b2d44cbbe01acd9dcb4ec28~mv2.png";

  const [labelOpacity, setLabelOpacity] = useState(1);
  const [appInstanceStatus, setAppInstanceStatus] = useState(false);
  const [appInstanceId, setAppInstanceId] = useState();
  
  const enableAnimation = props.enableAnimation || false;
  const animationLoop = props.animationLoop || false;
  const animationSpeed = props.animationSpeed || 1000;
  const panelPosition = props.handlePosition || 50;
  const borderRadius = props.cornerRadius + "px";
  const positionLeft = "0px!important";
  const handleStyleColor = props.handleColor || '#FFFF';
  const labelKey = props.labelPosition || 'top';
  const labelPosition = (props.labelPositionValue !== undefined ? props.labelPositionValue + "%" : "4%");
  const showLabel = !props.showLabel || props.showLabel===null ? 'none' : '';
  
  const { position, containerRef } = useCompareSliderAnimation(enableAnimation, animationLoop, animationSpeed);

  useEffect(() => {
    fetchAppInstanceData().then( async(result)=>{
      console.log(result)
      await setAppInstanceId(result.instanceId)
      await setAppInstanceStatus(result.isFree)
    })
  }, []);

  useEffect(() => {
    // Get the parent flip-view-widget[data-widget-id="${widgetId}"] element
    const parentElement = containerRef.current?.closest('flip-view-widget');
    if (parentElement) {
      parentElement.setAttribute('data-widget-id', widgetId);
    }

    const style = document.createElement('style');
    style.innerHTML = `
    
      ${props.showMobileSettings ? 
        `@media screen and (max-width: 729px) {
          flip-view-widget[data-widget-id="${widgetId}"] [data-rcs="root"] {
            border-radius: ${props.mobileBorderRadius}px;
          }  
        }
          
        @media screen and (min-width: 729px) {
          flip-view-widget[data-widget-id="${widgetId}"] {
            display: ${props.hideOnDesktop ? 'none' : 'block'} !important;
          }              

          flip-view-widget[data-widget-id="${widgetId}"] [data-rcs="root"] {
              border-radius: ${borderRadius};
            }
          }
          `
        :
        `flip-view-widget[data-widget-id="${widgetId}"] [data-rcs="root"] {
            border-radius: ${borderRadius};
          }`
      }

      
      flip-view-widget[data-widget-id="${widgetId}"] [data-rcs="clip-item"] {
        left: ${positionLeft};
      }
      
      flip-view-widget[data-widget-id="${widgetId}"] .__rcs-handle-line, 
      flip-view-widget[data-widget-id="${widgetId}"] .__rcs-handle-button {
        color: ${handleStyleColor};
      }
      
      flip-view-widget[data-widget-id="${widgetId}"] .__rcs-handle-arrow {
      }


      flip-view-widget[data-widget-id="${widgetId}"] .__rcs-handle-button {
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

      flip-view-widget[data-widget-id="${widgetId}"] .__rcs-handle-arrow {
        display: none !important;
      }

      flip-view-widget[data-widget-id="${widgetId}"] .__rcs-handle-button::before {
        content: '';
        width: ${props.iconSize || 15}px;
        height: ${props.iconSize || 15}px;
        background-image: url("${!props.handleIcon || props.handleIcon==='' || props.handleIcon===null ? defaultIcon : props.handleIcon}");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      } 

       flip-view-widget[data-widget-id="${widgetId}"] .__rcs-handle-button {
        display: ${ props.showHandleButton===null || props.showHandleButton===undefined ? '' : props.showHandleButton ? '' : 'none!important'};
      }

    `;
    
    document.head.appendChild(style);

    return () => {
      if (parentElement) {
        parentElement.removeAttribute('data-widget-id');
      }
      document.head.removeChild(style);
    };
  }, [widgetId]);

  const labelStyle: React.CSSProperties = {
    fontSize: `${props.labelSize + .5 || 1.1}rem`, // 2x multiplier for fontSize
    position: 'absolute',
    padding: `${props.labelSize || .6}rem`, // 1x multiplier for padding
    color: `${props.labelColor || '#FFFF'}`,
    opacity: labelOpacity,
    border: '2px solid '+`${props.labelColor || '#FFFF'}`,
    borderRadius: `${props.labelCornerRadius}px`,
    backdropFilter: 'blur(0.25rem) saturate(180%) contrast(80%) brightness(120%)',
    WebkitBackdropFilter: 'blur(0.25rem) saturate(180%) contrast(80%) brightness(120%)',
    transition: 'opacity 0.25s ease-in-out',
    [labelKey]: labelPosition,
  };

  return (
    <div ref={containerRef}>
      { appInstanceStatus && <UpgradePlan appInstanceId={appInstanceId}/> }
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