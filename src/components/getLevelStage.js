// src/components/getLevelStage.js
export default function getLevelStage(index, questionCount) {
  if (index === questionCount - 1) return "BOSS";
  if (questionCount <= 7) return Math.min(3, Math.floor(index / 2) + 1);
  if (questionCount <= 10) return Math.min(3, Math.floor(index / 3) + 1);
  if (questionCount <= 16) return Math.min(3, Math.floor(index / 5) + 1);
  return 3;
}
