// src/components/credit/CreditPage.js
import React, { useState } from "react";
import "../../styles.css";
import { creditPages, rulesPages } from "./CreditData";

export default function CreditPage({ onBack }) {
  const [mode, setMode] = useState("credit");
  const [creditPageIndex, setCreditPageIndex] = useState(0);
  const [rulesPageIndex, setRulesPageIndex] = useState(0);

  const currentPages = mode === "credit" ? creditPages : rulesPages;
  const currentPageIndex = mode === "credit" ? creditPageIndex : rulesPageIndex;
  const setCurrentPageIndex =
    mode === "credit" ? setCreditPageIndex : setRulesPageIndex;

  const currentPageData = currentPages[currentPageIndex];

  const toggleMode = () => {
    setMode(mode === "credit" ? "rules" : "credit");
  };

  const prevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };
  const nextPage = () => {
    if (currentPageIndex < currentPages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  return (
    <div className="unified-board">
      <img
        src="/images/kokuban57.png"
        alt="background"
        className="unified-board-bg"
      />

      <div className="unified-board-content">
        {/* タイトル */}
        <h2 className="board-title" style={{ marginTop: "-10px" }}>
          {mode === "credit" ? "🎉 クレジット" : "📘 利用規定"}
        </h2>

        {/* コンテンツボックス */}
        <div
          style={{
            width: "75%",
            height: "60%",
            background: "rgba(0, 0, 0, 0.5)",
            padding: "20px",
            borderRadius: "15px",
            border: "3px solid rgba(255,255,255,0.3)",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#fff",
            position: "relative",
            // ★フォント適用：中身も手書き風にする
            fontFamily: '"Zen Kurenaido", sans-serif',
          }}
        >
          {/* 左矢印 */}
          <button
            onClick={prevPage}
            style={{
              ...arrowBtnStyle,
              visibility: currentPageIndex > 0 ? "visible" : "hidden",
            }}
          >
            ◀
          </button>

          {/* メイン表示エリア */}
          <div
            style={{
              flex: 1,
              textAlign: "center",
              padding: "0 20px",
              overflowY: "auto",
              maxHeight: "100%",
            }}
          >
            {/* ★修正: 色を白(#fff)に変更し、視認性を高める */}
            <h3
              style={{
                color: "#fff",
                fontSize: "28px",
                marginBottom: "20px",
                textShadow: "0 0 5px black", // 少し影をつける
                borderBottom: "2px dashed rgba(255,255,255,0.5)",
                display: "inline-block",
                paddingBottom: "5px",
              }}
            >
              {currentPageData.title}
            </h3>

            {mode === "credit" ? (
              <div
                style={{
                  textAlign: "left",
                  display: "inline-block",
                  width: "100%",
                }}
              >
                {currentPageData.content.map((staff, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: "12px",
                      borderBottom: "1px dashed rgba(255,255,255,0.2)",
                      paddingBottom: "5px",
                    }}
                  >
                    {/* 役割（黄色） */}
                    <span
                      style={{
                        fontSize: "18px",
                        color: "#ffeb3b",
                        display: "block",
                      }}
                    >
                      {staff.role}
                    </span>
                    {/* 名前（白・太字） */}
                    <span
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        marginLeft: "10px",
                        display: "block",
                        textAlign: "right",
                        whiteSpace: "pre-line", // ★ここを追加！これで改行されます
                      }}
                    >
                      {staff.name}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "left" }}>
                {currentPageData.content.map((line, i) => (
                  <p
                    key={i}
                    style={{
                      fontSize: "20px",
                      marginBottom: "12px",
                      lineHeight: "1.6",
                    }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* 右矢印 */}
          <button
            onClick={nextPage}
            style={{
              ...arrowBtnStyle,
              visibility:
                currentPageIndex < currentPages.length - 1
                  ? "visible"
                  : "hidden",
            }}
          >
            ▶
          </button>

          {/* ページ番号 */}
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              right: "20px",
              fontSize: "16px",
              opacity: 0.8,
            }}
          >
            {currentPageIndex + 1} / {currentPages.length}
          </div>
        </div>

        {/* ボタンエリア */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "30px",
          }}
        >
          <button onClick={onBack} style={yellowBtnStyle}>
            ← メニューに戻る
          </button>

          <button onClick={toggleMode} style={blueBtnStyle}>
            {mode === "credit" ? "規約を見る →" : "← クレジットを見る"}
          </button>
        </div>
      </div>
    </div>
  );
}

// スタイル定義
const commonBtnStyle = {
  padding: "10px 24px",
  fontSize: "20px",
  fontFamily: '"Zen Kurenaido", sans-serif',
  fontWeight: "bold",
  color: "black",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "transform 0.2s",
  borderWidth: "3px",
  borderStyle: "solid",
};

const yellowBtnStyle = {
  ...commonBtnStyle,
  background: "#ffcc66",
  borderColor: "#d6a84f",
};
const blueBtnStyle = {
  ...commonBtnStyle,
  background: "#66ccff",
  borderColor: "#3ba4d4",
};

const arrowBtnStyle = {
  background: "none",
  border: "none",
  color: "#fff",
  fontSize: "36px",
  cursor: "pointer",
  padding: "0 10px",
  transition: "transform 0.2s",
  outline: "none",
  textShadow: "0 0 5px rgba(0,0,0,0.5)",
  fontFamily: '"Zen Kurenaido", sans-serif', // 矢印にもフォント適用
};
