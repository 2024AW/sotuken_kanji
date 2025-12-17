import React from "react";

export default function Lives({ lives }) {
  console.log("残機:", lives);

  const hearts = Array.from({ length: lives }, (_, i) => (
    <span
      key={i}
      style={{
        fontSize: "1.8rem",
        margin: "0 2px",
        lineHeight: "1.0",
        display: "inline-block",
      }}
    >
      ❤️
    </span>
  ));

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "10px",
        padding: "8px 8px", // ← 最小限の余白
        border: "1.5px solid #eee",
        borderRadius: "8px",
        background: "rgba(0, 0, 0, 0.3)",
        display: "inline-flex", // ← flex を使う！
        alignItems: "center", // ← 縦方向の中央揃え
        justifyContent: "center",
        boxShadow: "0 0 4px rgba(0,0,0,0.2)",
      }}
    >
      {hearts}
    </div>
  );
}
