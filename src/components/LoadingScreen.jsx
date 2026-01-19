import React from "react";

export default function LoadingScreen({ message = "終了しています..." }) {
  return (
    <>
      <style>
        {`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes blinkBorder {
          0%, 100% {
            box-shadow: 0 0 20px 5px #f8b400;
            border-color: #f8b400;
          }
          50% {
            box-shadow: 0 0 5px 1px rgba(248,180,0,0.5);
            border-color: rgba(248,180,0,0.5);
          }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
      </style>

      {/* 背景のオーバーレイ（全画面を覆って背景を少し暗くする） */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1900,
          // 必要であれば背景色をつける（なければ透明でクリックガードのみ）
          // background: "rgba(0, 0, 0, 0.3)",
        }}
      />

      {/* ローディングボックス本体 */}
      <div
        style={{
          // ★変更点: 絶対配置で位置を固定
          position: "absolute",
          top: "35%", // 上からの位置 (ConfirmGiveUpに近い位置)
          left: 0,
          right: 0,
          margin: "auto", // 左右中央寄せ
          width: "60%", // 幅を少しコンパクトに
          zIndex: 2000,

          // ★変更点: 高さを自動にし、内側の余白で形を作る
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",

          background: "rgba(0,0,0,0.85)",
          color: "white",
          border: "3px solid #f8b400",
          borderRadius: "20px",
          textAlign: "center",
          animation: "slideDown 0.6s ease-out, blinkBorder 2s infinite",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            border: "5px solid rgba(255,255,255,0.2)",
            borderTopColor: "#f8b400",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            marginBottom: "20px",
          }}
        ></div>
        <h2 style={{ margin: "0 0 10px 0", fontSize: "24px" }}>{message}</h2>
        <p style={{ margin: 0, fontSize: "16px", opacity: 0.8 }}>
          少々お待ちください
        </p>
      </div>
    </>
  );
}
