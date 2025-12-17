import React from "react";

export default function TimeSelect({ onSelect, onBack }) {
  const times = [
    { sec: 30, img: "/images/timer30.png" },
    { sec: 15, img: "/images/timer15.png" },
  ];

  return (
    <div
      style={{
        width: "100vw",
        height: "100dvh",
        backgroundImage: `url("/images/kokuban15.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",

        paddingTop: "40px",
      }}
    >
      {/* タイトル */}
      <h2
        style={{
          color: "white",
          textShadow: "0 0 6px rgba(0,0,0,0.8)",
          marginBottom: "30px",
          fontSize: "26px",
          fontWeight: "600",
        }}
      >
        制限時間を選んでください
      </h2>

      {/* タイム画像２つ（横並び） */}
      <div
        style={{
          display: "flex",
          gap: "60px",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {times.map((t) => (
          <img
            key={t.sec}
            src={t.img}
            alt={`${t.sec}秒`}
            onClick={() => onSelect(t.sec)}
            style={{
              width: "280px",
              maxWidth: "45vw",
              cursor: "pointer",
              transition: "transform 0.25s ease, filter 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.2)"; // 拡大率アップ
              e.currentTarget.style.filter = "brightness(1.7) contrast(1.1)"; // 明るささらにアップ
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.filter = "brightness(1) contrast(1)";
            }}
          />
        ))}
      </div>

      {/* 戻るボタン（中央下） */}
      <button
        onClick={onBack}
        style={{
          marginTop: "40px",
          padding: "12px 24px",
          fontSize: "20px",
          borderRadius: "6px",
          cursor: "pointer",
          background: "rgba(255, 255, 255, 0.9)",
          border: "1px solid #ddd",
        }}
      >
        ← 戻る
      </button>

      {/* 横向きレイアウト最適化 */}
      <style>
        {`
          @media (orientation: landscape) {
            h2 {
              margin-bottom: 20px !important;
              font-size: 22px !important;
            }
            img {
              width: 220px !important;
              max-width: 30vw !important;
            }
            button {
              margin-top: 25px !important;
            }
          }
        `}
      </style>
    </div>
  );
}
