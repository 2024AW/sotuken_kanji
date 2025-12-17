import React, { useEffect } from "react";

export default function LevelIntroOverlay({ levelText, onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000); // 2秒後にフェードアウト終了
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div style={styles.overlay}>
      <div style={styles.text}>{levelText}</div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
    animation: "fadeout 0.8s ease-out 1.3s forwards",
  },
  text: {
    fontSize: "48px",
    color: "#fff",
    fontWeight: "900",
    textShadow: "2px 2px 6px rgba(0,0,0,0.8)",
  },
};
