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
  const [showOverlay, setShowOverlay] = useState(false); // ←★追加
  const audioRef = useRef(null);

  // BgmSelect が閉じる時に確実に停止
  React.useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // 試し聴き
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

  // ★ 保存処理（オーバーレイ表示 → 自動解除 → onSave）
  const handleSave = () => {
    stopPreview();

    setShowOverlay(true);

    // 保存だけ行う（ページ遷移しない）
    onSave(selectedBgm);

    setTimeout(() => {
      setShowOverlay(false);
    }, 1800);
  };

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundImage: `url("/images/kokuban330.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "40px",
        color: "white",
        position: "relative",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        🎵 BGM を選択してください
      </h1>

      <div
        style={{
          width: "70%",
          margin: "0 auto",
          background: "rgba(0,0,0,0.4)",
          padding: "20px",
          borderRadius: "15px",
        }}
      >
        {bgmList.map((bgm) => (
          <div
            key={bgm.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "15px",
              borderBottom: "1px solid #888",
            }}
          >
            {/* 左：ラジオボタン */}
            <label style={{ fontSize: "20px" }}>
              <input
                type="radio"
                name="bgm"
                value={bgm.id}
                checked={selectedBgm === bgm.id}
                onChange={() => setSelectedBgm(bgm.id)}
                style={{ marginRight: "10px" }}
              />
              {bgm.label}
            </label>

            {/* 右：試し聴きボタン */}
            <div>
              <button
                style={{
                  padding: "8px 20px",
                  marginRight: "10px",
                  borderRadius: "8px",
                  border: "2px solid #fff",
                  cursor: "pointer",
                }}
                onClick={() => playPreview(bgm.file)}
              >
                ▶ 再生
              </button>

              <button
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "2px solid #fff",
                  cursor: "pointer",
                }}
                onClick={stopPreview}
              >
                ■ 停止
              </button>
            </div>
          </div>
        ))}
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
          onClick={handleSave} // ★変更
        >
          ✔ 保存する
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
          onClick={() => {
            stopPreview();
            onBack();
          }}
        >
          ← 戻る
        </button>
      </div>

      {/* ★★★ 保存オーバーレイ ★★★ */}
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
          🎧 BGM「
          {bgmList.find((b) => b.id === selectedBgm)?.label.replace("♪ ", "")}
          」を設定しました！
        </div>
      )}

      {/* CSSアニメーション */}
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
