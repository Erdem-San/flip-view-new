import React, { FC } from 'react';
interface UpgradeModalProps {
  appInstanceId?: string;
}

const UpgradeModal: FC<UpgradeModalProps> = ({ appInstanceId }) => {
  return (
    <div
      style={{
        position: "absolute", // Changed from "fixed" to "absolute"
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          width: "90%", // Changed from 100%
          maxWidth: "400px", // Reduced from 450px
          position: "relative",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          margin: "10px", // Reduced from 20px
        }}
      >
        {/* Purple Header */}
        <div
          style={{
            backgroundColor: "#9333EA",
            height: "80px",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        >
          <button
            style={{
              position: "absolute",
              right: "12px",
              top: "12px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "white",
            }}
          >
            {/* <X size={24} /> */}
          </button>
        </div>

        {/* Content */}
        <div
          style={{
            padding: "20px",
            display: "flex",
            zIndex: 10,
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* Checkmark Circle */}
          <div
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#3B82F6",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "-60px",
              marginBottom: "20px",
            }}
          >
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" color='#ffff' strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
            </svg>

          </div>

          {/* Text Content */}
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "600",
              marginBottom: "16px",
              color: "#111827",
            }}
          >
            Upgrade to Unlock FlipView App
          </h2>

          <p
            style={{
              color: "#6B7280",
              fontSize: "16px",
              lineHeight: "1.5",
              marginBottom: "24px",
              maxWidth: "360px",
            }}
          >
            Enhance your product showcase with our stunning before-and-after slider. Upgrade to our Premium plan today!
          </p>

          {/* Buttons */}
          <button
            onClick={() => window.open(`https://www.wix.com/apps/upgrade/becc2dbe-e635-412f-9579-52717fec076f?appInstanceId=${appInstanceId}`, '_blank')}
            style={{
              backgroundColor: "#9333EA",
              color: "white",
              padding: "10px 20px",
              borderRadius: "6px",
              border: "none",
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
              marginBottom: "16px",
              width: "200px",
            }}
          >
            Upgrade Now
          </button>

        </div>
      </div>
    </div>
  )
}

export default UpgradeModal;