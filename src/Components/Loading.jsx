import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center max-h-20">
      <span className="loader"></span>
      <style>{`
        .loader {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          position: relative;
          animation: rotate 1s linear infinite;
        }

        .loader::before,
        .loader::after {
          content: "";
          box-sizing: border-box;
          position: absolute;
          inset: 0px;
          border-radius: 50%;
          border: 5px solid #fff;
          animation: prixClipFix 2s linear infinite;
        }

        .loader::after {
          transform: rotate3d(90, 90, 0, 180deg);
          border-color: #ff3800;
        }

        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes prixClipFix {
          0% {
            clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
          }
          50% {
            clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
          }
          75%, 100% {
            clip-path: polygon(
              50% 50%,
              0 0,
              100% 0,
              100% 100%,
              100% 100%,
              100% 100%
            );
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
