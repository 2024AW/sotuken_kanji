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
          objectFit: "cover",
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
          pointerEvents: "none", // 文字などがクリック判定を邪魔しないようにする
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

        {/* CSSクラスでフォントとアニメーションを適用 */}
        <p className="tap-message">この画面をタップしてね</p>
      </div>

      {/* ★全画面クリック用透明レイヤー（最前面） */}
      {/* これがあることで、画面のどこを触っても確実に反応します */}
      <div
        onClick={onStart}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 9999 /* 最前面に配置 */,
          cursor: "pointer" /* 指カーソル */,
          backgroundColor: "transparent" /* 透明 */,
        }}
      />
    </div>
  );
}
