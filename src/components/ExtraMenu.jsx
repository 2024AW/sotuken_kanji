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
    <div className="unified-board">
      <img
        src="/images/kokuban13.png"
        alt="background"
        className="unified-board-bg"
      />

      <div className="unified-board-content">
        <h2
          className="board-title"
          style={{
            marginBottom: "40px",
            marginTop: "-40px",
          }}
        >
          遊びたいモードを選んでください
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
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

        {/* ★ここを共通クラスに変更 */}
        <button className="unified-back-btn" onClick={onBack}>
          ← 戻る
        </button>
      </div>
    </div>
  );
}
