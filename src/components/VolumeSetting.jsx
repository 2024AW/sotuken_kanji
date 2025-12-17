// src/components/VolumeSetting.jsx
import React, { useState, useEffect } from "react";
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
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundImage: `url("/images/kokuban412.png")`,
        backgroundSize: "cover",
        padding: "40px",
        color: "white",
        position: "relative",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>🔊 音量設定</h1>

      {/* スライダー部分 */}
      <div
        style={{
          width: "70%",
          margin: "0 auto",
          background: "rgba(0,0,0,0.4)",
          padding: "25px",
          borderRadius: "15px",
        }}
      >
        <div style={{ marginBottom: "25px" }}>
          <label style={{ fontSize: "20px" }}>🎵 BGM 音量：{bgm}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={bgm}
            onChange={(e) => setBgm(Number(e.target.value))}
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <label style={{ fontSize: "20px" }}>✨ 効果音（SE）音量：{se}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={se}
            onChange={(e) => setSe(Number(e.target.value))}
            style={{ width: "100%" }}
          />
        </div>
      </div>

      {/* ボタン */}
      <div
        style={{
          marginTop: "40px",
          display: "flex",
          justifyContent: "center",
          gap: "30px",
        }}
      >
        <button
          style={{
            padding: "12px 30px",
            fontSize: "20px",
            background: "#66ccff",
            borderRadius: "12px",
            border: "3px solid #3ba4d4",
            cursor: "pointer",
          }}
          onClick={handleSave}
        >
          ✔ 設定を保存する
        </button>

        <button
          style={{
            padding: "12px 30px",
            fontSize: "20px",
            background: "#ffcc66",
            borderRadius: "12px",
            border: "3px solid #d6a84f",
            cursor: "pointer",
          }}
          onClick={onBack}
        >
          ← 戻る
        </button>
      </div>

      {/* 保存オーバーレイ */}
      {showOverlay && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
            color: "white",
            animation: "fadeOut 1.8s forwards",
          }}
        >
          ✔ 設定を保存しました！
        </div>
      )}

      {/* CSS アニメーション */}
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
