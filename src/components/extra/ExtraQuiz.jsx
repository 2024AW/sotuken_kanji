import React, { useState, useEffect } from "react";

// ===== 共通UI（Quizと同じ）=====
import Timer from "../Timer";
import Lives from "../Lives";
import DebugPanel from "../DebugPanel";
import LoadingScreen from "../LoadingScreen";
import ConfirmGiveUp from "../ConfirmGiveUp";
import TimeoutScreen from "../TimeoutScreen";
import QuestionCounter from "../QuestionCounter";
import ActionButtons from "../ActionButtons";
import MessageDisplay from "../MessageDisplay";
import GameOverOverlay from "../GameOverOverlay";
import GameClearScreen from "../GameClearScreen";

// ===== Extra専用データ =====
import { famousPersons } from "./famousPersons";

// ===== スタイル =====
import "../../styles.css";


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

export default function ExtraQuiz({
  questionCount,
  timeLimit,
  onBack,
  bgmVolume,
}) {

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
  const normalBGMRef = React.useRef(new Audio("/bgm-normal-1.mp3"));

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
  const getLevelStage = () => "EXTRA";


  useEffect(() => {
    const normal = shuffle(
      famousPersons.filter((q) => q.difficulty !== "boss")
    );
    const boss = shuffle(
      famousPersons.filter((q) => q.difficulty === "boss")
    );
  
    const selected = [
      ...normal.slice(0, questionCount - 1),
      boss[0],
    ];
  
    setRankPools({ ALL: selected });
    setQuestionsRemaining({ ALL: selected.slice(1) });
    setCurrent(selected[0]);
  
    setQuestionNumber(1);
    setLives(3);
    setSkipUsed(false);
    setIsGameOver(false);
    setAnswer("");
    setResult("");
    setWarning("");
    setMessageType("");
  
    setStage("EXTRA");
    setShowLevelIntro(false);
  
    setTimeLeft(timeLimit);
    setIsChecking(false);
  
    normalBGM.currentTime = 0;
    normalBGM.play();
  }, [questionCount, timeLimit]);
  
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
    if (isCorrect && questionNumber === questionCount) {
      setShowGameClear(true);
      return;
    }
  
    const pool = questionsRemaining.ALL;
    if (!pool || pool.length === 0) {
      setCurrent(null);
      return;
    }
  
    const [next, ...rest] = pool;
  
    setCurrent(next);
    setQuestionsRemaining({ ALL: rest });
  
    if (isCorrect) setQuestionNumber((n) => n + 1);
  
    setAnswer("");
    setWarning("");
    setResult("");
    setMessageType("");
    setTimeLeft(timeLimit);
  };
  
  // =========================================
  // ★ 回答チェック
  // =========================================
  const checkAnswer = () => {
    if (!current || isChecking) return;
    setIsChecking(true);
  
    const ans = answer.trim();
  
    // ローマ字禁止
    if (/^[a-zA-Z]+$/.test(ans)) {
      setMessageType("warning");
      setResult("⚠️ ひらがなで入力してね");
      setAnswer("");
      setIsChecking(false);
      return;
    }
  
    const normalize = (s) =>
      s.trim().replace(/\s+/g, "").toLowerCase();
  
    const isCorrect =
      normalize(ans) === normalize(current.name) ||
      (current.aliases || []).some(
        (a) => normalize(a) === normalize(ans)
      );
  
    if (isCorrect) {
      setMessageType("success");
      setResult("✅ 正解！");
      setTimeout(() => {
        advanceToNextProblem(true);
        setIsChecking(false);
      }, 800);
      return;
    }
  
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
    setLastAnswer(current.name);
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
  const getBackgroundStyle = () => ({
    background: "linear-gradient(to bottom, #222, #000)",
  });
  

  // =========================================
  // ★ レンダー
  // =========================================

  if (loading) return <LoadingScreen message="終了しています..." />;
  if (showConfirm) return <ConfirmGiveUp onConfirm={confirmGiveUp} />;
  if (showGameClear) return <GameClearScreen onBack={onBack} />;

  return (
    <div className="quiz-root" style={{ position: "relative" }}>

      <DebugPanel
        questionNumber={questionNumber}
        questionCount={questionCount}
        questionsLength={
          questionsRemaining.ALL?.length || 0
        }
        isChecking={isChecking}
      />

      <div className="lives-container">
        <Lives lives={lives} />
      </div>

      <QuestionCounter current={questionNumber} total={questionCount} />

      <div className="quiz-mode" style={getBackgroundStyle()}>
        <div className="quiz-card">
          <Timer timeLeft={timeLeft} />

          <div style={{ textAlign: "center", margin: "20px 0" }}>
  <img
    src={current?.image}
    alt=""
    style={{ maxHeight: "280px", borderRadius: "8px" }}
  />
</div>

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
