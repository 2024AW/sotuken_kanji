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
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundImage: `url("/images/kokuban57.png")`,
        backgroundSize: "cover",
        padding: "40px",
        color: "white",
      }}
    >
      {/* タイトル */}
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        {pageIndex === 0 ? "🎉 クレジット" : "📘 規定ページ " + pageIndex}
      </h1>

      <div
        style={{
          width: "75%",
          margin: "0 auto",
          background: "rgba(0,0,0,0.4)",
          padding: "25px",
          borderRadius: "15px",
        }}
      >
        {/* クレジットページ */}
        {pageIndex === 0 && (
          <>
            <p style={{ fontSize: "22px", marginBottom: "12px" }}>制作：Kai</p>
            <p style={{ fontSize: "22px", marginBottom: "12px" }}>
              協力：ChatGPT（デザイン・構造提案）
            </p>
            <p style={{ fontSize: "22px", marginBottom: "12px" }}>
              使用素材：フリー音源 / イラスト素材
            </p>
            <p style={{ fontSize: "22px" }}>
              特別感謝：テストプレイヤーの皆さま
            </p>
          </>
        )}

        {/* 規定ページ */}
        {pageIndex > 0 &&
          rulesPages[pageIndex - 1].map((line, i) => (
            <p key={i} style={{ fontSize: "20px", marginBottom: "10px" }}>
              {line}
            </p>
          ))}
      </div>

      {/* --- ボタンエリア --- */}
      <div
        style={{
          marginTop: "40px",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {/* 前へ */}
        {pageIndex > 0 && (
          <button style={btnStyle} onClick={() => setPageIndex(pageIndex - 1)}>
            ← 戻る
          </button>
        )}

        {/* 次へ（規定ページへ進む） */}
        {pageIndex < rulesPages.length ? (
          <button style={btnStyle} onClick={() => setPageIndex(pageIndex + 1)}>
            → 次へ
          </button>
        ) : null}

        {/* 最初のクレジットページでは StartMenu に戻るを表示 */}
        {pageIndex === 0 && (
          <button style={btnStyle} onClick={onBack}>
            ← メニューに戻る
          </button>
        )}
      </div>
    </div>
  );
}

// 共通ボタンスタイル
const btnStyle = {
  padding: "12px 24px",
  fontSize: "18px",
  background: "#ffcc66",
  borderRadius: "12px",
  border: "3px solid #d6a84f",
  cursor: "pointer",
};
