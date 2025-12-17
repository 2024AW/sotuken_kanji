import React from "react";

export default function QuestionCount({ onSelect, onBack }) {
  const counts = [
    { num: 7, img: "/images/7course.png" },
    { num: 10, img: "/images/10course.png" },
    { num: 16, img: "/images/16course.png" },
  ];

  return (
    <div
      style={{
        position: "relative", // ★ 固定配置のため追加
        width: "100vw",
        height: "100dvh",
        overflowY: "auto",
        backgroundImage: `url("/images/kokuban14.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 0",
      }}
    >
      {/* タイトル */}
      <h2
        style={{
          color: "white",
          textShadow: "0 0 6px rgba(0,0,0,0.8)",
          marginBottom: "15px",
          fontSize: "24px",
        }}
      >
        出題数を選んでください
      </h2>

      {/* 画像ボタン群 */}
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
          padding: "0 10px",
        }}
      >
        {counts.map((item) => (
          <img
            key={item.num}
            src={item.img}
            alt={`${item.num}問`}
            onClick={() => onSelect(item.num)}
            style={{
              width: "80%",
              maxWidth: "600px",
              cursor: "pointer",
              transition: "transform 0.25s, filter 0.25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.12)";
              e.currentTarget.style.filter =
                "brightness(1.25) drop-shadow(0 0 12px rgba(255, 255, 180, 0.9))";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.filter = "brightness(1)";
            }}
          />
        ))}
      </div>

      {/* 左下に固定の戻るボタン */}
      <button
        onClick={onBack}
        style={{
          position: "fixed", // ★★ 左下固定
          left: "20px",
          bottom: "20px",

          padding: "10px 24px",
          fontSize: "18px",
          borderRadius: "6px",
          cursor: "pointer",
          background: "rgba(255, 255, 255, 0.85)",
          border: "1px solid #ddd",
          zIndex: 20,
        }}
      >
        ← 戻る
      </button>

      {/* 横向き専用レスポンシブ */}
      <style>
        {`
          @media (orientation: landscape) {
            img {
              width: 55% !important;
              max-width: 480px !important;
            }
            h2 {
              margin-bottom: 10px !important;
              font-size: 20px !important;
            }
          }
        `}
      </style>
    </div>
  );
}
