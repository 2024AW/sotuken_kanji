// src/components/VolumeSetting.jsx
import React, { useState } from "react";
import "../styles.css";

export default function VolumeSetting({ bgmVolume, seVolume, onSave, onBack }) {
  const [bgm, setBgm] = useState(bgmVolume);
  const [se, setSe] = useState(seVolume);
  const [showOverlay, setShowOverlay] = useState(false);

  // 保存時の処理
  const handleSave = () => {
    onSave(bgm, se); // App へ保存値を渡す
    setShowOverlay(true); // オーバレイ表示
    // 1.8秒後にフェードアウト
    setTimeout(() => {
      setShowOverlay(false);
    }, 1800);
  };

  return (
    <div className="unified-board">
      {/* 背景画像 (kokuban412.png) */}
      <img
        src="/images/kokuban412.png"
        alt="background"
        className="unified-board-bg"
      />

      <div className="unified-board-content">
        {/* タイトル */}
        <h2
          className="board-title"
          style={{ marginTop: "-20px", marginBottom: "30px" }}
        >
          🔊 音量設定
        </h2>

        {/* スライダー部分のコンテナ */}
        <div
          style={{
            width: "60%",
            background: "rgba(0,0,0,0.3)", // 黒板に馴染む薄い黒
            padding: "40px",
            borderRadius: "15px",
            border: "2px solid rgba(255,255,255,0.2)",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            color: "#fff",
          }}
        >
          {/* BGMスライダー */}
          <div>
            <label
              style={{
                fontSize: "24px",
                display: "block",
                marginBottom: "10px",
                fontFamily: '"Zen Kurenaido", sans-serif',
              }}
            >
              🎵 BGM 音量：{Math.round(bgm * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={bgm}
              onChange={(e) => setBgm(Number(e.target.value))}
              style={{ width: "100%", cursor: "pointer" }}
            />
          </div>

          {/* SEスライダー */}
          <div>
            <label
              style={{
                fontSize: "24px",
                display: "block",
                marginBottom: "10px",
                fontFamily: '"Zen Kurenaido", sans-serif',
              }}
            >
              ✨ 効果音 音量：{Math.round(se * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={se}
              onChange={(e) => setSe(Number(e.target.value))}
              style={{ width: "100%", cursor: "pointer" }}
            />
          </div>
        </div>

        {/* ボタンエリア */}
        <div
          style={{
            // ★修正: position: absolute を削除し、マージンで調整
            marginTop: "40px", // コンテンツボックスとの余白
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            width: "100%",
          }}
        >
          {/* 戻る（黄色） */}
          <button onClick={onBack} style={yellowBtnStyle}>
            ← 戻る
          </button>

          {/* 保存（ピンク色） */}
          <button onClick={handleSave} style={pinkBtnStyle}>
            ✔ 保存する
          </button>
        </div>

        {/* 保存完了オーバーレイ */}
        {showOverlay && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              color: "white",
              fontFamily: '"Zen Kurenaido", sans-serif',
              fontWeight: "bold",
              borderRadius: "20px",
              animation: "fadeOut 1.8s forwards",
              zIndex: 100,
            }}
          >
            ✔ 設定を保存しました！
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes fadeOut {
            0% { opacity: 1; }
            80% { opacity: 1; }
            100% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
}

// ★スタイル定義
const commonBtnStyle = {
  padding: "12px 28px",
  fontSize: "22px",
  fontFamily: '"Zen Kurenaido", sans-serif',
  fontWeight: "bold",
  color: "black",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "transform 0.2s",
  textShadow: "none",
};

const yellowBtnStyle = {
  ...commonBtnStyle,
  background: "#ffcc66",
  border: "3px solid #d6a84f",
};

const pinkBtnStyle = {
  ...commonBtnStyle,
  background: "#ff99cc",
  border: "3px solid #d65c99",
};
