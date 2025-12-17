import React from "react";

export default function LevelSelect({ onSelect, onBack }) {
  const levels = [
    { id: "easy", label: "初級", img: "/images/初.jpg" },
    { id: "normal", label: "中級", img: "/images/中.jpg" },
    { id: "hard", label: "上級", img: "/images/上.jpg" },
    { id: "expert", label: "超級", img: "/images/超.jpg" },
  ];

  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px",
        minHeight: "100vh",
        backgroundImage: `url("/images/kokuban13.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative", // 子要素の絶対配置用
      }}
    >
      <h2
        style={{
          color: "white",
          textShadow: "0 0 5px black",
          marginBottom: "50px", // 下の余白を広めに
          marginTop: "-20px", // 上に少し寄せる
        }}
      >
        難易度を選んでください
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          width: "800px",
          alignItems: "flex-start",
          marginTop: "-20px",
        }}
      >
        {levels.map((lvl) => (
          <img
            key={lvl.id}
            src={lvl.img}
            alt={lvl.label}
            onClick={() => onSelect(lvl.id)}
            style={{
              width: "180px",
              height: "auto",
              cursor: "pointer",
              borderRadius: "12px",
              boxShadow: "0 0 5px rgba(0,0,0,0.5)",
              transition: "transform 0.25s, box-shadow 0.25s",
              marginTop: "-10px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.08)";
              e.currentTarget.style.boxShadow = "0 0 20px gold";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 5px rgba(0,0,0,0.5)";
            }}
          />
        ))}
      </div>

      {/* 左下の戻るボタン */}
      <button
        onClick={onBack}
        style={{
          position: "fixed",
          bottom: "40px", // 下の余白を広げる
          left: "40px", // 左の余白を広げる
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "8px",
          cursor: "pointer",
          background: "rgba(255, 255, 255, 0.2)",
          color: "#fff",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          textShadow: "1px 1px 2px black",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0 0 10px gold";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        戻る
      </button>
    </div>
  );
}
