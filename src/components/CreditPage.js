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
            width: "60%",
            height: "60%",
            background: "rgba(0, 0, 0, 0.3)",
            padding: "30px",
            borderRadius: "15px",
            border: "2px solid rgba(255,255,255,0.2)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            textAlign: "center",
            overflowY: "auto",
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

        {/* --- ボタンエリア --- */}
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
          {/* 左側のボタン：黄色 (StartMenuへ戻る or 前へ) */}
          {pageIndex === 0 ? (
            <button onClick={onBack} style={yellowBtnStyle}>
              ← メニューに戻る
            </button>
          ) : (
            <button
              onClick={() => setPageIndex(pageIndex - 1)}
              style={yellowBtnStyle}
            >
              ← 前へ
            </button>
          )}

          {/* 右側のボタン：青色 (次へ) */}
          {pageIndex < rulesPages.length && (
            <button
              onClick={() => setPageIndex(pageIndex + 1)}
              style={blueBtnStyle}
            >
              次へ →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ★修正: 共通のフォント設定 (Zen Kurenaido, Bold, Black Text)
const commonBtnStyle = {
  padding: "12px 28px", // 少し大きくして見やすく
  fontSize: "22px", // 手書きフォントなので少し大きめが見やすい
  fontFamily: '"Zen Kurenaido", sans-serif', // 指定のフォント
  fontWeight: "bold",
  color: "black", // 文字色は黒
  borderRadius: "8px",
  cursor: "pointer",
  transition: "transform 0.2s",
  textShadow: "none", // 黒文字なので影はなし（または薄い白）の方が見やすい
};

// ★修正: 左の黄色ボタン
const yellowBtnStyle = {
  ...commonBtnStyle,
  background: "#ffcc66", // 明るい黄色
  border: "3px solid #d6a84f",
};

// ★修正: 右の青ボタン
const blueBtnStyle = {
  ...commonBtnStyle,
  background: "#66ccff", // 明るい水色
  border: "3px solid #3ba4d4",
};
