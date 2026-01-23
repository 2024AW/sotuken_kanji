// src/components/QuestionCounter.js
import React, { useState, useEffect } from "react";
import "../styles.css";

export default function QuestionCounter({ current, total }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ★修正: スマホなら「3つ」、PCなら「7つ」表示する
  const visibleCount = isMobile ? 3 : 7;

  // ★修正: スクロール開始位置 (スマホなら2問目からスクロール)
  const scrollStart = isMobile ? 2 : 5;

  let startIndex = 0;
  if (current >= scrollStart) {
    startIndex = current - scrollStart;
  }

  if (startIndex + visibleCount > total) {
    startIndex = Math.max(0, total - visibleCount);
  }

  const visibleSteps = [...Array(total)].slice(
    startIndex,
    startIndex + visibleCount
  );

  return (
    <div className="map-progress">
      <div className="map-bar">
        {visibleSteps.map((_, i) => {
          const stepIndex = startIndex + i;
          return (
            <div key={stepIndex} className="map-step">
              {stepIndex === 0 && <div className="castle-icon">🏰</div>}
              {stepIndex === total - 1 && <div className="dragon-icon">🐉</div>}
              {stepIndex === current - 1 && (
                <div className="player-icon">🧙‍♂️</div>
              )}

              <div
                className={`step-circle ${stepIndex < current ? "active" : ""}`}
              >
                {stepIndex + 1}
              </div>

              {stepIndex < total - 1 && (
                <div
                  className={`step-line ${
                    stepIndex < current - 1 ? "filled" : ""
                  }`}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
