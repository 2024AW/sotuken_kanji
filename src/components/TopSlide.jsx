import React from "react";

export default function TopSlide({ onStart }) {
  return (
    <div
      className="slider"
      style={{
        width: "100vw",
        height: "100dvh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* 背景黒板画像 */}
      <img
        src="/images/kokuban11.png"
        alt="背景"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover", // 画面全体にフィット
          objectPosition: "center",
          zIndex: 1,
        }}
      />

      {/* オーバーレイ（タイトルとメッセージ） */}
      <div
        className="overlay"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "none", // 背景クリックを邪魔しない
        }}
      >
        <img
          src="/images/kanjinojikan.png"
          alt="タイトル"
          style={{
            maxWidth: "90%",
            height: "auto",
            marginBottom: "30px",
          }}
        />
        <p
          className="tap-message"
          onClick={onStart}
          style={{
            fontSize: "22px",
            color: "#fff",
            textShadow: "0 0 6px rgba(0,0,0,0.7)",
            cursor: "pointer",
            pointerEvents: "auto", // クリック可能にする
          }}
        >
          この画面をタップしてね
        </p>
      </div>
    </div>
  );
}
