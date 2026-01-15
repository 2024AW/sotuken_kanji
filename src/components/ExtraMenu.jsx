// src/components/ExtraMenu.jsx
import React, { useState } from "react";
import "../styles.css";

export default function ExtraMenu({ onSelect, onBack }) {
  const slidesData = [
    [
      {
        label: "偉人クイズ",
        target: "extra-famous",
        imgSrc: "/images/偉人問題.jpg",
      },
    ],
  ];

  const [currentSlide] = useState(0);

  const handleClick = (target) => {
    if (!target) return;
    onSelect(target);
  };

  return (
    <div className="startmenu-slider">
      {/* 背景 */}
      <img
        src="/images/kokuban13.png"
        alt="background"
        className="startmenu-background"
      />

      {/* ★追加: タイトルテキスト */}
      <div className="startmenu-title">遊びたいモードを選んでください</div>

      {/* スライド（画像ボタン） */}
      <div
        className="startmenu-slides"
        style={{
          display: "flex",
          // alignItems: "center",  ← これを削除（真ん中揃えをやめる）
          alignItems: "flex-start", // ★変更：上詰めで配置する
          justifyContent: "center",
          pointerEvents: "auto",
          gap: "20px",

          // ★追加：上からの余白で位置を調整
          // タイトルが12%なので、それより少し下の「20%〜25%」くらいが丁度いいです
          paddingTop: "22%",

          height: "100%", // 親要素の高さを確保
          boxSizing: "border-box", // paddingを含めて計算させる
        }}
      >
        {slidesData[currentSlide].map((item, index) => (
          <button
            key={index}
            onClick={() => handleClick(item.target)}
            className="img-menu-btn"
            aria-label={item.label}
          >
            <img
              src={item.imgSrc}
              alt={item.label}
              className="img-menu-content"
            />
          </button>
        ))}
      </div>

      {/* 戻るボタン */}
      <button
        onClick={onBack}
        style={{
          position: "absolute",
          bottom: 40,
          left: 40,
          zIndex: 10,
          padding: "10px 20px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        戻る
      </button>
    </div>
  );
}
