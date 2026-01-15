// src/components/CreditPage.js
import React, { useState } from "react";
import "../styles.css";

export default function CreditPage({ onBack }) {
  // 0 = クレジット, 1~n = 規定ページ
  const [pageIndex, setPageIndex] = useState(0);

  // --- 規定ページの文章リスト ---
  const rulesPages = [
    [
      "【規定 第1条】",
      "本ゲームは教育目的で制作されています。",
      "画像・音源・フォントの無断転載を禁止します。",
      "プレイヤーはルールを遵守し公正にプレイしてください。",
    ],
    [
      "【規定 第2条】",
      "本ゲームの不具合報告は制作者に連絡してください。",
      "ゲームデータの改変は禁止されています。",
      "著作権に関わる素材は許可の範囲内で使用しています。",
    ],
    [
      "【規定 第3条】",
      "利用規約は予告なく変更される場合があります。",
      "変更後もゲームを利用した時点で同意したものとみなします。",
    ],
  ];

  return (
    <div className="unified-board">
      {/* 背景画像 (kokuban57.png) */}
      <img
        src="/images/kokuban57.png"
        alt="background"
        className="unified-board-bg"
      />

      <div className="unified-board-content">
        {/* タイトル (統一スタイル適用) */}
        <h2 className="board-title" style={{ marginTop: "-20px" }}>
          {pageIndex === 0 ? "🎉 クレジット" : "📘 規定ページ " + pageIndex}
        </h2>

        {/* コンテンツボックス (黒板風の半透明背景) */}
        <div
          style={{
            width: "80%",
            height: "60%", // 高さを固定して安定させる
            background: "rgba(0, 0, 0, 0.3)", // 黒板に馴染む薄い黒
            padding: "30px",
            borderRadius: "15px",
            border: "2px solid rgba(255,255,255,0.2)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            textAlign: "center",
            overflowY: "auto", // 内容が多い場合はスクロール
          }}
        >
          {/* クレジットページ */}
          {pageIndex === 0 && (
            <>
              <p style={{ fontSize: "24px", marginBottom: "15px" }}>
                制作：Kai
              </p>
              <p style={{ fontSize: "24px", marginBottom: "15px" }}>
                協力：ChatGPT（デザイン・構造提案）
              </p>
              <p style={{ fontSize: "24px", marginBottom: "15px" }}>
                使用素材：フリー音源 / イラスト素材
              </p>
              <p style={{ fontSize: "24px" }}>
                特別感謝：テストプレイヤーの皆さま
              </p>
            </>
          )}

          {/* 規定ページ */}
          {pageIndex > 0 &&
            rulesPages[pageIndex - 1].map((line, i) => (
              <p
                key={i}
                style={{
                  fontSize: "22px",
                  marginBottom: "12px",
                  lineHeight: "1.6",
                }}
              >
                {line}
              </p>
            ))}
        </div>

        {/* --- ボタンエリア (黒板の下部に配置) --- */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "30px",
          }}
        >
          {/* 戻るボタン (StartMenuへ) */}
          {pageIndex === 0 && (
            <button onClick={onBack} style={btnStyle}>
              ← メニューに戻る
            </button>
          )}

          {/* 前へボタン */}
          {pageIndex > 0 && (
            <button
              onClick={() => setPageIndex(pageIndex - 1)}
              style={btnStyle}
            >
              ← 前へ
            </button>
          )}

          {/* 次へボタン */}
          {pageIndex < rulesPages.length && (
            <button
              onClick={() => setPageIndex(pageIndex + 1)}
              style={btnStyle}
            >
              次へ →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ボタンの統一スタイル
const btnStyle = {
  padding: "10px 24px",
  fontSize: "18px",
  background: "rgba(255, 255, 255, 0.2)",
  color: "#fff",
  border: "1px solid rgba(255, 255, 255, 0.4)",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "0.2s",
};
