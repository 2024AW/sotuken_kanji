// src/components/StartMenu.js
import React, { useState } from "react";
import "../styles.css";

export default function StartMenu({ onSelect }) {
  // ===== データ定義 =====
  // PC用: 3つずつのグループ (2ページ)
  const pcSlides = [
    [
      { img: "/images/遊び方説明.png", target: "howto" },
      { img: "/images/メイン.png", target: "level" },
      { img: "/images/エクストラ.png", target: "extra" },
    ],
    [
      { img: "/images/ジュークボックス.png", target: "bgm" },
      { img: "/images/音量調整.png", target: "volume" },
      { img: "/images/クレジット・規定.png", target: "credit" },
    ],
  ];

  // スマホ用: 全データを1つの配列にまとめる (フラット化)
  // [item1, item2, item3, item4, item5, item6] という形になります
  const mobileItems = pcSlides.flat();

  // ===== State (状態管理) =====
  const [pcIndex, setPcIndex] = useState(0); // PC用のページ番号 (0 or 1)
  const [mobileIndex, setMobileIndex] = useState(0); // スマホ用のアイテム番号 (0 ~ 5)

  // ===== PC用 操作ハンドラ =====
  const handlePcPrev = () => {
    setPcIndex((prev) => (prev - 1 + pcSlides.length) % pcSlides.length);
  };
  const handlePcNext = () => {
    setPcIndex((prev) => (prev + 1) % pcSlides.length);
  };

  // ===== スマホ用 操作ハンドラ =====
  const handleMobilePrev = () => {
    setMobileIndex(
      (prev) => (prev - 1 + mobileItems.length) % mobileItems.length
    );
  };
  const handleMobileNext = () => {
    setMobileIndex((prev) => (prev + 1) % mobileItems.length);
  };

  return (
    <div className="unified-board">
      {/* 背景画像 */}
      <img
        src="/images/kokuban12.png"
        className="unified-board-bg"
        alt="黒板"
      />

      <div className="unified-board-content">
        {/* タイトル */}
        <div className="startmenu-title">遊びたいモードを選んでください</div>

        {/* =================================================
            🖥️ PC用レイアウト (クラス名: pc-layout-area)
            CSSでスマホの時は display: none にします
           ================================================= */}
        <div className="pc-layout-area">
          <div className="startmenu-slides">
            {pcSlides.map((slide, i) => (
              <div
                key={i}
                className={`startmenu-slide ${i === pcIndex ? "active" : ""}`}
              >
                <div className="startmenu-menu-items">
                  {slide.map((item, j) => (
                    <div
                      key={j}
                      className="startmenu-item-box"
                      onClick={() => item.target && onSelect(item.target)}
                    >
                      <img src={item.img} alt={`menu-${j}`} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* PC用矢印 */}
          <button className="startmenu-prev" onClick={handlePcPrev}>
            &lt;
          </button>
          <button className="startmenu-next" onClick={handlePcNext}>
            &gt;
          </button>
        </div>

        {/* =================================================
            📱 スマホ用レイアウト (クラス名: mobile-layout-area)
            CSSでPCの時は display: none にします
           ================================================= */}
        <div className="mobile-layout-area">
          {/* 画像表示エリア (1枚だけ表示) */}
          <div
            className="mobile-item-display"
            onClick={() => {
              const target = mobileItems[mobileIndex].target;
              if (target) onSelect(target);
            }}
          >
            <img src={mobileItems[mobileIndex].img} alt="menu-item" />
          </div>

          {/* 操作ボタンエリア (画像の下) */}
          <div className="mobile-controls-container">
            <button className="mobile-arrow-btn" onClick={handleMobilePrev}>
              ◀
            </button>

            {/* 今何番目かを示すドット */}
            <div className="mobile-dots">
              {mobileItems.map((_, i) => (
                <span
                  key={i}
                  className={`dot ${i === mobileIndex ? "active" : ""}`}
                ></span>
              ))}
            </div>

            <button className="mobile-arrow-btn" onClick={handleMobileNext}>
              ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
