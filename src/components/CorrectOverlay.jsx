import React from "react";
import "../styles.css";

export default function CorrectOverlay({
  kanji,
  reading,
  meaning,
  image, // ★追加: 画像パスを受け取る
  mode, // "correct" | "skip" | "timeout"
  onNext,
}) {
  const getMessage = () => {
    if (mode === "skip") return "🔁 スキップしました";
    if (mode === "timeout") return "⏰ 時間切れ！";
    return "✅ 正解！";
  };

  // 画像があるかどうかで、Extraモード判定をする
  const isExtraMode = !!image;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        style={{
          background: "rgba(20,20,20,0.95)",
          border: "3px solid #f5c542",
          boxShadow: "0 0 18px rgba(245,197,66,0.45)",
          borderRadius: 16,
          padding: 24,
          width: "min(640px, 94vw)",
          color: "#fff",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* メッセージ (正解！など) */}
        <div
          style={{
            fontSize: 32,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 22,
            letterSpacing: 1,
            lineHeight: 1.3,
          }}
        >
          {getMessage()}
        </div>

        {/* 内容：左右分割 */}
        <div
          style={{
            display: "flex",
            gap: 0, // gapは0にして、paddingで調整します
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {/* 左：【Extraモード】画像＋名前 / 【通常】漢字＋読み */}
          <div
            style={{
              flex: "1 1 240px",
              textAlign: "center",
              // ▼ 修正: 画像と線の間にも余白を作る (Extraモードなら24px、通常なら16px)
              paddingRight: isExtraMode ? 24 : 16,

              // ▼ Extraモードなら境界線なし（右側のdivに左線をつけるため）
              borderRight: isExtraMode
                ? "none"
                : "1px solid rgba(255,255,255,0.15)",

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isExtraMode ? (
              /* ... (画像表示部分の中身はそのまま) ... */
              <>
                <img
                  src={image}
                  alt={reading}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "180px",
                    borderRadius: 8,
                    marginBottom: 12,
                    objectFit: "contain",
                    border: "2px solid #fff",
                  }}
                />
                <div
                  style={{ fontSize: 28, fontWeight: "bold", color: "#f5c542" }}
                >
                  {reading}
                </div>
              </>
            ) : (
              /* ... (通常モードの中身はそのまま) ... */
              <>
                <div
                  style={{ fontSize: 42, fontWeight: "bold", marginBottom: 8 }}
                >
                  {kanji}
                </div>
                <div style={{ fontSize: 20 }}>
                  よみ：
                  <strong style={{ marginLeft: 6 }}>
                    {reading || "（なし）"}
                  </strong>
                </div>
              </>
            )}
          </div>

          {/* 右：意味・経歴 */}
          <div
            style={{
              flex: "1 1 240px",
              // ▼ 修正: 線と文字の間に余白を作る (Extraモードで0だったのを24pxに変更)
              paddingLeft: isExtraMode ? 24 : 16,

              // Extraモードならここに「左線」を表示
              borderLeft: isExtraMode
                ? "1px solid rgba(255,255,255,0.15)"
                : "none",

              fontSize: 18,
              lineHeight: 1.6,
            }}
          >
            {isExtraMode ? (
              <div style={{ fontWeight: "normal", textAlign: "left" }}>
                {meaning || "（解説なし）"}
              </div>
            ) : (
              <>
                <div style={{ fontSize: 16, opacity: 0.8, marginBottom: 6 }}>
                  意味
                </div>
                <div style={{ fontWeight: "bold" }}>
                  {meaning || "（未登録）"}
                </div>
              </>
            )}
          </div>
        </div>

        {/* フッター：次へボタン */}
        <div
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            onClick={onNext}
            style={{
              background: "#f5c542",
              color: "#222",
              border: "none",
              borderRadius: 24,
              padding: "14px 36px",
              fontSize: 18,
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            }}
          >
            次へ ▶
          </button>
        </div>
      </div>
    </div>
  );
}
