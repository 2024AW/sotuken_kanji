// src/components/HowToPlay.js
import React, { useState } from "react";
import "../styles.css";

export default function HowToPlay({ onBack }) {
  const [mode, setMode] = useState("main"); // "main" or "extra"

  return (
    <div className="unified-board">
      {/* 背景画像 */}
      <img
        src="/images/kokuban223.png"
        alt="background"
        className="unified-board-bg"
      />

      <div className="unified-board-content">
        {/* タイトル */}
        <h2
          className="board-title"
          style={{ marginTop: "-10px", marginBottom: "20px" }}
        >
          {mode === "main" ? "1．漢字ゲーム" : "2．偉人画像ゲーム"}
        </h2>

        {/* スクロールエリア */}
        <div className="howto-scroll-area">
          <div className="howto-text-content">
            {mode === "main" ? (
              <>
                <h3 className="howto-heading">1．ゲームの目的</h3>
                <p className="howto-text">
                  表示される漢字を見て、読みを答えるゲームです。
                </p>

                <h3 className="howto-heading">2．ゲームの流れ</h3>
                <ul className="howto-list">
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
                <h3 className="howto-heading">1．ゲームの目的</h3>
                <p className="howto-text">
                  表示される偉人の画像を見て、名前を答えるゲームです。
                </p>

                <h3 className="howto-heading">2．ゲームの流れ</h3>
                <ul className="howto-list">
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

        {/* ボタンエリア */}
        <div className="howto-button-area">
          {/* 戻るボタン（黄色） */}
          <button onClick={onBack} className="common-btn btn-yellow">
            ← メニューに戻る
          </button>

          {/* 切り替えボタン（青色） */}
          <button
            onClick={() => setMode(mode === "main" ? "extra" : "main")}
            className="common-btn btn-blue"
          >
            {mode === "main" ? "エクストラの説明へ →" : "メインの説明に戻る →"}
          </button>
        </div>
      </div>
    </div>
  );
}
