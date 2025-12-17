// src/components/ActionButtons.jsx
import React from "react";
import "../styles.css";

export default function ActionButtons({ onSwap, onGiveUp, disabled }) {
  return (
    <>
      {/* 左端のあきらめるボタン */}
      <button className="side-btn giveup-side" onClick={onGiveUp}>
        あきらめる
      </button>

      {/* 右端の入れ替えボタン */}
      <button
        className="side-btn swap-side"
        onClick={onSwap}
        disabled={disabled}
      >
        🔄 入れ替える
      </button>

      {/* 真ん中の答えるボタンは削除 */}
    </>
  );
}
