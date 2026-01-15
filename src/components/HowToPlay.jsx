// src/components/HowToPlay.js
import React, { useState } from "react";
import "../styles.css";

export default function HowToPlay({ onBack }) {
  const [mode, setMode] = useState("main"); // "main" or "extra"

  return (
    <div className="unified-board">
      {/* 背景画像 (kokuban223.png) */}
      <img
        src="/images/kokuban223.png"
        alt="background"
        className="unified-board-bg"
      />

      <div className="unified-board-content">
        {/* タイトル (統一スタイル) */}
        <h2
          className="board-title"
          style={{ marginTop: "-10px", marginBottom: "20px" }}
        >
          {mode === "main" ? "1．漢字ゲーム" : "2．偉人画像ゲーム"}
        </h2>

        {/* スクロール可能なコンテンツエリア */}
        <div
          style={{
            width: "100%",
            height: "65%",
            overflowY: "auto",
            padding: "0 20px 0 120px", // 左余白大、右余白小
            textAlign: "left",
            boxSizing: "border-box",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255,255,255,0.5) transparent",
          }}
          className="howto-scroll-area"
        >
          {/* --- 説明文 --- */}
          <div
            className="howto-text-content"
            style={{ fontFamily: '"Yusei Magic", sans-serif' }}
          >
            {mode === "main" ? (
              <>
                <h3 style={headingStyle}>1．ゲームの目的</h3>
                <p style={textStyle}>
                  表示される漢字を見て、読みを答えるゲームです。
                </p>

                <h3 style={headingStyle}>2．ゲームの流れ</h3>
                <ul style={listStyle}>
                  <li>スタートボタンを押すと問題が始まります。</li>
                  <li>ランダムで難易度に適した漢字が1語表示されます。</li>
                  <li>正しい漢字の読み仮名を入力して「Enter」を押します。</li>
                  <li>正解して次へ進むボタンを押すと次の問題に進みます。</li>
                  <li>最後の一問はBOSS戦があります。</li>
                  <li>クリアすると結果が表示されます。</li>
                </ul>
              </>
            ) : (
              <>
                <h3 style={headingStyle}>1．ゲームの目的</h3>
                <p style={textStyle}>
                  表示される偉人の画像を見て、名前を答えるゲームです。
                </p>

                <h3 style={headingStyle}>2．ゲームの流れ</h3>
                <ul style={listStyle}>
                  <li>スタートボタンを押すと問題が始まります。</li>
                  <li>ランダムで偉人の画像が1枚表示されます。</li>
                  <li>
                    正しい偉人の名前をひらがな、カタカナで入力して「Enter」を押します。
                  </li>
                  <li>正解して次へ進むボタンを押すと次の問題に進みます。</li>
                  <li>最後の一問は難問が出題されます。</li>
                  <li>クリアすると結果が表示されます。</li>
                </ul>
              </>
            )}
          </div>
        </div>

        {/* --- ボタンエリア (下部に固定) --- */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            display: "flex",
            gap: "20px",
            zIndex: 10,
          }}
        >
          {/* 戻るボタン（黄色） */}
          <button onClick={onBack} style={yellowBtnStyle}>
            ← メニューに戻る
          </button>

          {/* 切り替えボタン（青色） */}
          <button
            onClick={() => setMode(mode === "main" ? "extra" : "main")}
            style={blueBtnStyle}
          >
            {mode === "main" ? "エクストラの説明へ →" : "メインの説明に戻る →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// 内部用スタイル定義
const headingStyle = {
  fontSize: "24px",
  color: "#ffeb3b",
  marginTop: "20px",
  marginBottom: "10px",
  borderBottom: "3px dashed rgba(255,255,255,0.4)",
  paddingBottom: "5px",
  width: "70%",
};

const textStyle = {
  fontSize: "20px",
  lineHeight: "1.6",
  marginBottom: "15px",
};

const listStyle = {
  fontSize: "19px",
  lineHeight: "1.8",
  paddingLeft: "20px",
  marginBottom: "20px",
};

// ★修正: 黄色のボタンスタイル
const yellowBtnStyle = {
  padding: "12px 24px",
  fontSize: "18px",
  background: "#ffcc66", // 黄色（オレンジ寄り）
  color: "#fff", // 白文字
  border: "2px solid #d6a84f", // 枠線
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 0.2s",
  fontWeight: "bold",
  textShadow: "1px 1px 2px rgba(0,0,0,0.4)", // 白文字を見やすくする影
};

// ★修正: 青色のボタンスタイル
const blueBtnStyle = {
  padding: "12px 24px",
  fontSize: "18px",
  background: "#66ccff", // 水色
  color: "#fff", // 白文字
  border: "2px solid #3ba4d4", // 枠線
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 0.2s",
  fontWeight: "bold",
  textShadow: "1px 1px 2px rgba(0,0,0,0.4)", // 白文字を見やすくする影
};
