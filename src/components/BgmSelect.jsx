// src/components/BgmSelect.jsx
import React, { useState, useRef } from "react";
import "../styles.css";

export default function BgmSelect({ currentBgm, onSave, onBack }) {
  const bgmList = [
    { id: "normal1", file: "/bgm-normal-1.mp3", label: "♪ 通常ステージBGM 1" },
    { id: "normal2", file: "/bgm-normal-2.mp3", label: "♪ 通常ステージBGM 2" },
    { id: "normal3", file: "/bgm-normal-3.mp3", label: "♪ 通常ステージBGM 3" },
  ];

  const [selectedBgm, setSelectedBgm] = useState(currentBgm);
  const [showOverlay, setShowOverlay] = useState(false);
  const audioRef = useRef(null);

  React.useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playPreview = (file) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    audioRef.current = new Audio(file);
    audioRef.current.volume = 0.8;
    audioRef.current.play();
  };

  const stopPreview = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  };

  const handleSave = () => {
    stopPreview();
    setShowOverlay(true);
    onSave(selectedBgm);
    setTimeout(() => {
      setShowOverlay(false);
    }, 1800);
  };

  const handleBack = () => {
    stopPreview();
    onBack();
  };

  return (
    <div className="unified-board">
      <img
        src="/images/kokuban330.png"
        alt="background"
        className="unified-board-bg"
      />

      <div className="unified-board-content">
        <h2
          className="board-title"
          style={{ marginTop: "-10px", marginBottom: "20px" }}
        >
          🎵 BGM を選択してください
        </h2>

        {/* BGMリストコンテナ */}
        <div
          style={{
            width: "70%",
            maxHeight: "60%",
            overflowY: "auto",
            background: "rgba(0,0,0,0.3)",
            padding: "20px",
            borderRadius: "15px",
            border: "2px solid rgba(255,255,255,0.2)",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255,255,255,0.5) transparent",
          }}
        >
          {bgmList.map((bgm, index) => (
            <div
              key={bgm.id}
              className="bgm-list-item" /* ★重要: CSS用のクラスを追加 */
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "15px",
                borderBottom:
                  index === bgmList.length - 1
                    ? "none"
                    : "1px dashed rgba(255,255,255,0.3)",
                color: "#fff",
              }}
            >
              <label
                className="bgm-name" /* ★重要: CSS用のクラスを追加 */
                style={{
                  fontSize: "20px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  fontFamily: '"Zen Kurenaido", sans-serif',
                }}
              >
                <input
                  type="radio"
                  name="bgm"
                  value={bgm.id}
                  checked={selectedBgm === bgm.id}
                  onChange={() => setSelectedBgm(bgm.id)}
                  style={{ transform: "scale(1.5)", marginRight: "15px" }}
                />
                {bgm.label}
              </label>

              <div
                className="bgm-controls" /* ★重要: CSS用のクラスを追加 */
                style={{ display: "flex", gap: "10px" }}
              >
                <button
                  onClick={() => playPreview(bgm.file)}
                  style={miniBtnStyle}
                >
                  ▶ 再生
                </button>
                <button onClick={stopPreview} style={miniBtnStyle}>
                  ■ 停止
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ボタンエリア */}
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            width: "100%",
          }}
        >
          {/* 戻る（黄色） */}
          <button onClick={handleBack} style={yellowBtnStyle}>
            ← 戻る
          </button>

          {/* 保存（ピンク色） */}
          <button onClick={handleSave} style={pinkBtnStyle}>
            ✔ 保存する
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
              background: "rgba(0,0,0,0.7)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              color: "white",
              fontFamily: '"Zen Kurenaido", sans-serif',
              fontWeight: "bold",
              animation: "fadeOut 1.8s forwards",
              zIndex: 100,
              padding: "20px",
              textAlign: "center",
            }}
          >
            <p>🎧 BGMを設定しました！</p>
            <p
              style={{ fontSize: "24px", marginTop: "10px", color: "#ffd700" }}
            >
              「{bgmList.find((b) => b.id === selectedBgm)?.label}」
            </p>
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

const miniBtnStyle = {
  padding: "5px 12px",
  fontSize: "14px",
  borderRadius: "6px",
  border: "1px solid #fff",
  background: "rgba(255,255,255,0.2)",
  color: "white",
  cursor: "pointer",
};
