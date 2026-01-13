import React, { useState, useEffect } from "react";
import "../styles.css";

export default function StartMenu({ onSelect }) {
  // 1. データは「ページごと」に分けず、フラットな1つの配列にします
  const allItems = [
    { img: "/images/エクストラ.png", target: "extra" },
    { img: "/images/メイン.png", target: "level" },
    { img: "/images/遊び方説明.png", target: "howto" },
    { img: "/images/ジュークボックス.png", target: "bgm" },
    { img: "/images/音量調整.png", target: "volume" },
    { img: "/images/クレジット・規定.png", target: "credit" },
  ];

  // 2. スマホ（縦向き/画面幅が狭い）かどうかを判定するState
  // 768px以下をスマホ扱いとします
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // 画面サイズが変わったら判定を更新する
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 3. 表示するアイテム数を決定（スマホなら1つ、PCなら3つ）
  const itemsPerPage = isMobile ? 1 : 3;

  // 全体のページ数を計算
  const maxPages = Math.ceil(allItems.length / itemsPerPage);

  // 現在のページ番号
  const [pageIndex, setPageIndex] = useState(0);

  // スマホ⇔PC切り替え時にページ番号がおかしくならないようリセット
  useEffect(() => {
    setPageIndex(0);
  }, [itemsPerPage]);

  const handlePrev = () => {
    setPageIndex((prev) => (prev - 1 + maxPages) % maxPages);
  };

  const handleNext = () => {
    setPageIndex((prev) => (prev + 1) % maxPages);
  };

  // 4. 現在表示すべきアイテムだけを切り出す
  const startIndex = pageIndex * itemsPerPage;
  const currentItems = allItems.slice(startIndex, startIndex + itemsPerPage);

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
        <div className="startmenu-slide active">
          <div
            className="startmenu-menu-items"
            style={{
              display: "flex",
              justifyContent: "center", // アイテムを中央寄せ
              alignItems: "center",
              width: "100%",
              gap: isMobile ? "0" : "20px", // スマホの時は隙間なし
            }}
          >
            {currentItems.map((item, index) => (
              <div
                key={`${pageIndex}-${index}`}
                className="startmenu-item-box"
                onClick={() => item.target && onSelect(item.target)}
                style={{
                  cursor: "pointer",
                  pointerEvents: "auto",
                  // スマホの時は少し大きく表示するなど調整可能
                  transform: isMobile ? "scale(1.1)" : "none",
                  transition: "transform 0.3s ease",
                }}
              >
                <img src={item.img} alt={item.target} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ナビゲーションボタン */}
      <button
        className="startmenu-prev"
        onClick={handlePrev}
        style={{ cursor: "pointer", zIndex: 10 }}
      >
        &lt;
      </button>
      <button
        className="startmenu-next"
        onClick={handleNext}
        style={{ cursor: "pointer", zIndex: 10 }}
      >
        &gt;
      </button>
    </div>
  );
}
