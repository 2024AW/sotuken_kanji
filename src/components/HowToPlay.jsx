import React, { useState } from "react";
import "../styles.css";

export default function HowToPlay({ onBack }) {
  // ★ 説明文を切り替えるための state
  const [mode, setMode] = useState("main"); // "main" or "extra"

  return (
    <div className="howto-root">
      <img src="/images/kokuban223.png" className="howto-bg" alt="黒板" />

      <div className="howto-content">
        {/* -------------------- タイトル -------------------- */}
        {mode === "main" ? (
          <h1 className="howto-title">1．漢字ゲーム</h1>
        ) : (
          <h1 className="howto-title">2．偉人画像ゲーム</h1>
        )}

        {/* -------------------- メイン説明 -------------------- */}
        {mode === "main" && (
          <>
            <h2 className="howto-heading">1．ゲームの目的</h2>
            <p className="howto-text">
              表示される漢字を見て、読みを答えるゲームです。
            </p>

            <h2 className="howto-heading">2．ゲームの流れ</h2>
            <ul className="howto-list">
              <li>スタートボタンを押すと問題が始まります。</li>
              <li>ランダムで難易度に適した漢字が1語表示されます。</li>
              <li>正しい漢字の読み仮名を入力して「Enter」を押します。</li>
              <li>正解すると次の問題に進みます。</li>
              <li>最後の一問はBOSS戦があります。</li>
              <li>クリアすると結果が表示されます。</li>
            </ul>
          </>
        )}

        {/* -------------------- エクストラ説明 -------------------- */}
        {mode === "extra" && (
          <>
            <h2 className="howto-heading">1．ゲームの目的</h2>
            <p className="howto-text">
              表示される偉人の画像を見て、名前を答えるゲームです。
            </p>

            <h2 className="howto-heading">2．ゲームの流れ</h2>
            <ul className="howto-list">
              <li>スタートボタンを押すと問題が始まります。</li>
              <li>ランダムで偉人の画像が1枚表示されます。</li>
              <li>正しい偉人の名前を入力して「Enter」を押します。</li>
              <li>正解すると次の問題に進みます。</li>
              <li>最後の一問は難問が出題されます。</li>
              <li>クリアすると結果が表示されます。</li>
            </ul>
          </>
        )}

        {/* -------------------- ボタン群 -------------------- */}

        {/* 戻るボタン */}
        <button className="howto-start-btn" onClick={onBack}>
          ← Start Menu に戻る
        </button>

        {/* メイン ←→ エクストラ切り替えボタン */}
        <button
          className="howto-switch-btn"
          onClick={() => setMode(mode === "main" ? "extra" : "main")}
        >
          {mode === "main"
            ? "エクストラステージの説明へ →"
            : "メインモードの説明に戻る →"}
        </button>
      </div>
    </div>
  );
}
