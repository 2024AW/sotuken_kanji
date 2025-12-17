// src/components/Quiz.jsx
import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import Lives from "./Lives";
import Enemy from "./Enemy";
import DebugPanel from "./DebugPanel";
import LoadingScreen from "./LoadingScreen";
import ConfirmGiveUp from "./ConfirmGiveUp";
import TimeoutScreen from "./TimeoutScreen";
import QuestionCounter from "./QuestionCounter";
import ActionButtons from "./ActionButtons";
import MessageDisplay from "./MessageDisplay";
import LevelIntroOverlay from "./LevelIntroOverlay";
import GameOverOverlay from "./GameOverOverlay";
import GameClearScreen from "./GameClearScreen";
import { questionSets } from "./questions";

import "../styles.css";

// =========================================
// 配列シャッフル関数
// =========================================
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Quiz({
  level,
  questionCount,
  timeLimit,
  onBack,
  bgmVolume,
  bgm,
}) {
  const selectedQuestions = questionSets[level];

  // =========================================
  // State
  // =========================================
  const [rankPools, setRankPools] = useState({});
  const [questionsRemaining, setQuestionsRemaining] = useState({});

  const [current, setCurrent] = useState(null);
  const [answer, setAnswer] = useState("");

  const [lives, setLives] = useState(3);
  const [result, setResult] = useState("");
  const [messageType, setMessageType] = useState("");

  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [skipUsed, setSkipUsed] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showTimeout, setShowTimeout] = useState(false);

  const [lastAnswer, setLastAnswer] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);

  const [warning, setWarning] = useState("");

  const [stage, setStage] = useState(1);
  const [showLevelIntro, setShowLevelIntro] = useState(true);

  const [isGameOver, setIsGameOver] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const [showGameClear, setShowGameClear] = useState(false);

  const FEEDBACK_DURATION = 1000;

  // =========================================
  // 🎵 BGM 管理
  // =========================================
  const normalBGMRef = React.useRef(
    new Audio(
      `/bgm-normal-${bgm === "normal1" ? 1 : bgm === "normal2" ? 2 : 3}.mp3`
    )
  );
  const bossBGMRef = React.useRef(new Audio("/bgm-boss.mp3"));
  const clearBGMRef = React.useRef(new Audio("/bgm-clear.mp3"));

  const normalBGM = normalBGMRef.current;
  const bossBGM = bossBGMRef.current;
  const clearBGM = clearBGMRef.current;

  normalBGM.loop = true;
  bossBGM.loop = true;
  clearBGM.loop = false;

  useEffect(() => {
    normalBGM.volume = bgmVolume;
    bossBGM.volume = bgmVolume;
    clearBGM.volume = bgmVolume;
  }, [bgmVolume]);

  // =========================================
  // ★ ステージ判定（rank 決定）
  // =========================================
  const getLevelStage = (qNum) => {
    const idx = qNum - 1;

    // 最後の問題は BOSS
    if (idx === questionCount - 1) return "BOSS";

    let interval = 2;
    if (questionCount === 10) interval = 3;
    if (questionCount === 16) interval = 5;

    return Math.min(3, Math.floor(idx / interval) + 1);
  };

  // =========================================
  // 初期化（rank グループ作成）
  // =========================================
  useEffect(() => {
    const selected = questionSets[level];

    const rank1 = shuffle(selected.filter((q) => q.rank === "1"));
    const rank2 = shuffle(selected.filter((q) => q.rank === "2"));
    const rank3 = shuffle(selected.filter((q) => q.rank === "3"));
    const boss = shuffle(selected.filter((q) => q.rank === "BOSS"));

    setRankPools({ 1: rank1, 2: rank2, 3: rank3, BOSS: boss });

    setQuestionsRemaining({
      1: rank1.slice(1),
      2: rank2,
      3: rank3,
      BOSS: boss,
    });

    setCurrent(rank1[0]);

    setQuestionNumber(1);
    setLives(3);
    setSkipUsed(false);
    setIsGameOver(false);
    setAnswer("");
    setResult("");
    setWarning("");
    setMessageType("");

    setStage(1);
    setShowLevelIntro(true);

    setTimeLeft(timeLimit);
    setIsChecking(false);

    normalBGM.currentTime = 0;
    normalBGM.play();
  }, [level, questionCount, timeLimit]);

  // =========================================
  // ★ BGM 切替
  // =========================================
  useEffect(() => {
    if (!current || isGameOver || showGameClear) return;

    if (stage === "BOSS") {
      normalBGM.pause();
      bossBGM.play();
    } else {
      bossBGM.pause();
      normalBGM.play();
    }
  }, [stage, current, isGameOver, showGameClear]);

  // =========================================
  // ★ タイマー
  // =========================================
  useEffect(() => {
    if (
      !current ||
      showTimeout ||
      showConfirm ||
      showLevelIntro ||
      isGameOver ||
      isChecking
    )
      return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [
    current,
    showTimeout,
    showConfirm,
    showLevelIntro,
    isGameOver,
    isChecking,
  ]);

  // =========================================
  // ★ 次の問題へ（rank 切替）
  // =========================================
  const advanceToNextProblem = (isCorrect = false) => {
    // ゲームクリア
    if (isCorrect && questionNumber === questionCount) {
      setShowGameClear(true);
      return;
    }

    const nextQuestionNum = isCorrect ? questionNumber + 1 : questionNumber;
    const nextStage = getLevelStage(nextQuestionNum);

    const rankKey = nextStage === "BOSS" ? "BOSS" : nextStage;

    const pool = questionsRemaining[rankKey];
    if (!pool || pool.length === 0) {
      setCurrent(null);
      return;
    }

    const [next, ...rest] = pool;
    setCurrent(next);

    setQuestionsRemaining((prev) => ({
      ...prev,
      [rankKey]: rest,
    }));

    if (isCorrect) setQuestionNumber(nextQuestionNum);

    // 必ずリセット
    setAnswer("");
    setWarning("");
    setResult("");
    setMessageType("");
    setTimeLeft(timeLimit);

    // ★ ステージ変更と Overlay 表示
    if (nextStage !== stage) {
      setStage(nextStage);
      setShowLevelIntro(true);
    }
  };

  // =========================================
  // ★ 回答チェック
  // =========================================
  const checkAnswer = () => {
    if (!current || isChecking) return;
    setIsChecking(true);

    const ans = answer.trim();

    // --- ローマ字チェック ---
    if (/^[a-zA-Z]+$/.test(ans)) {
      setMessageType("warning");
      setResult("⚠️ ひらがなで入力してね");
      setAnswer("");
      setIsChecking(false);
      return;
    }

    const readings = current.reading
      .replace(/、/g, ",")
      .split(",")
      .map((r) => r.trim());

    // --- ニアミス判定 ---
    const isNearMatch = (input, correct) => {
      if (input === correct) return false;
      if (Math.abs(input.length - correct.length) > 1) return false;

      let diff = 0,
        i = 0,
        j = 0;

      while (i < input.length && j < correct.length) {
        if (input[i] !== correct[j]) {
          diff++;
          if (diff > 1) return false;

          if (input.length > correct.length) i++;
          else if (input.length < correct.length) j++;
          else {
            i++;
            j++;
          }
        } else {
          i++;
          j++;
        }
      }

      if (i < input.length || j < correct.length) diff++;
      return diff === 1;
    };

    // --- 正解 ---
    if (readings.includes(ans)) {
      setMessageType("success");
      setResult("✅ 正解！");

      setTimeout(() => {
        advanceToNextProblem(true);
        setIsChecking(false);
      }, 800);
      return;
    }

    // --- おしい ---
    if (readings.some((r) => isNearMatch(ans, r))) {
      setMessageType("near");
      setResult("🤏 おしい！もう一度チャレンジ！");
      setAnswer("");
      setIsChecking(false);
      return;
    }

    // --- 不正解 ---
    setMessageType("error");
    setResult("❌ 間違い！もう一度チャレンジ！");

    setTimeout(() => {
      setAnswer("");
      setIsChecking(false);
    }, 800);
  };

  // =========================================
  // ★ 時間切れ
  // =========================================
  const handleTimeout = () => {
    if (isChecking) return;

    setIsChecking(true);
    setLastAnswer(current.reading);
    setShowTimeout(true);
  };

  const handleNextAfterTimeout = () => {
    setShowTimeout(false);

    const newLives = lives - 1;
    setLives(newLives);

    // ★ メッセージ表示
    setMessageType("error");
    setResult(`❌ 時間切れ！（残り${newLives}機）`);

    // ★ ライフが0 → GAME OVER
    if (newLives <= 0) {
      setTimeout(() => {
        setIsGameOver(true);
      }, 1000); // ← 少し余韻を持たせる
      return;
    }

    // ★ ここが重要ポイント！
    // TimeoutScreen が消えてからメッセージを少し見せて、
    // その後で次の問題へ進む
    setTimeout(() => {
      advanceToNextProblem(false);
      setIsChecking(false);
    }, 1000); // ← 好きな待ち時間（1000ms = 1秒）
  };

  // =========================================
  // ★ スキップ
  // =========================================
  const skipQuestion = () => {
    if (skipUsed || isChecking) return;

    setIsChecking(true); // 二重押し防止
    setSkipUsed(true);

    // ★ メッセージ表示（青色）
    setMessageType("info");
    setResult("🔁 スキップしました！");

    // ★ 少し表示してから次の問題へ
    setTimeout(() => {
      advanceToNextProblem(false);
      setIsChecking(false);
    }, 800);
  };

  // =========================================
  // ★ ギブアップ
  // =========================================
  const handleGiveUp = () => setShowConfirm(true);

  const confirmGiveUp = (choice) => {
    if (choice === "yes") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onBack();
      }, 800);
    } else {
      setShowConfirm(false);
    }
  };

  // =========================================
  // ★ 背景色
  // =========================================
  const getBackgroundStyle = () => {
    switch (stage) {
      case 1:
        return { background: "linear-gradient(to bottom, #56ab2f, #a8e063)" };
      case 2:
        return { background: "linear-gradient(to bottom, #f6d365, #fda085)" };
      case 3:
        return { background: "linear-gradient(to bottom, #ff512f, #1f1c18)" };
      case "BOSS":
        return { background: "linear-gradient(to bottom, #4b0082, #0d001a)" };
      default:
        return { background: "#000" };
    }
  };

  // =========================================
  // ★ レンダー
  // =========================================

  if (loading) return <LoadingScreen message="終了しています..." />;
  if (showConfirm) return <ConfirmGiveUp onConfirm={confirmGiveUp} />;
  if (showGameClear) return <GameClearScreen onBack={onBack} />;

  return (
    <div className="quiz-root" style={{ position: "relative" }}>
      {showLevelIntro && (
        <LevelIntroOverlay
          levelText={
            stage === "BOSS" ? "⚔️ BOSS STAGE ⚔️" : `LEVEL ${stage} 漢検4・5級`
          }
          onFinish={() => setShowLevelIntro(false)}
        />
      )}

      <DebugPanel
        questionNumber={questionNumber}
        questionCount={questionCount}
        questionsLength={
          questionsRemaining[stage === "BOSS" ? "BOSS" : stage]?.length || 0
        }
        isChecking={isChecking}
      />

      <div className="lives-container">
        <Lives lives={lives} />
      </div>

      <QuestionCounter current={questionNumber} total={questionCount} />

      <div className="quiz-mode" style={getBackgroundStyle()}>
        <div className="quiz-card">
          <Enemy visible={level === "easy"} />
          <Timer timeLeft={timeLeft} />

          <div className="question-text">{current?.kanji}</div>

          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="ひらがなで答えてね"
            className="answer-input"
            onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
            readOnly={showTimeout || isGameOver || isChecking || showLevelIntro}
          />

          <MessageDisplay message={warning || result} type={messageType} />

          <ActionButtons
            onAnswer={checkAnswer}
            onSwap={skipQuestion}
            onGiveUp={handleGiveUp}
            disabled={skipUsed || isChecking || showLevelIntro}
          />
        </div>
      </div>

      {showTimeout && (
        <TimeoutScreen
          correctAnswer={lastAnswer}
          onNext={handleNextAfterTimeout}
          lives={lives}
        />
      )}

      {isGameOver && <GameOverOverlay onBack={onBack} />}
    </div>
  );
}
