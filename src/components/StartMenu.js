// src/components/StartMenu.jsx
import React, { useState } from "react";
import "../styles.css";

export default function StartMenu({ onSelect }) {
  const slidesData = [
    // ===== 1ページ目 =====
    [
      { img: "/images/エクストラ.png", target: "extra" },
      { img: "/images/メイン.png", target: "level" },
      { img: "/images/遊び方説明.png", target: "howto" },
    ],

    // ===== 2ページ目 =====
    [
      { img: "/images/ジュークボックス.png", target: "bgm" },
      { img: "/images/音量調整.png", target: "volume" },
      { img: "/images/クレジット・規定.png", target: "credit" },
    ],
  ];

  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + slidesData.length) % slidesData.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % slidesData.length);
  };

  // 現在表示すべきスライドのデータを取得
  const currentSlideItems = slidesData[index];

  return (
    <div className="startmenu-slider">
      {/* 黒板固定 */}
      <img
        src="/images/kokuban12.png"
        className="startmenu-background"
        alt="黒板"
      />

      {/* タイトル */}
      <div className="startmenu-title">遊びたいモードを選んでください</div>

      {/* スライドエリア */}
      <div className="startmenu-slides">
        {/* ★修正箇所: 
            以前はここで全ページをmapしていましたが、
            「現在のアクティブなページ」だけを描画するように変更しました。
            これにより、非表示のページがクリックを邪魔する問題を解決します。
        */}
        <div className="startmenu-slide active">
          <div className="startmenu-menu-items">
            {currentSlideItems.map((item, j) => (
              <div
                key={j}
                className="startmenu-item-box"
                onClick={() => item.target && onSelect(item.target)}
                // スマホなどでの押しやすさを向上させるスタイル
                style={{ cursor: "pointer", pointerEvents: "auto" }}
              >
                <img src={item.img} alt={`menu-${j}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ナビゲーション */}
      <button
        className="startmenu-prev"
        onClick={handlePrev}
        style={{ cursor: "pointer", zIndex: 10 }} // zIndexを追加して確実に押せるように
      >
        &lt;
      </button>
      <button
        className="startmenu-next"
        onClick={handleNext}
        style={{ cursor: "pointer", zIndex: 10 }} // zIndexを追加して確実に押せるように
      >
        &gt;
      </button>
    </div>
  );
}
