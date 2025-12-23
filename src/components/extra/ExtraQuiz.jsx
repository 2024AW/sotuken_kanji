import React, { useState, useEffect, useRef } from "react";

// ===== 共通UI =====
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
// 配列シャッフル
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
  const [allQuestions, setAllQuestions] = useState([]);
  const [current, setCurrent] = useState(null);
  const [usedQuestions, setUsedQuestions] = useState([]);

  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");
  const [messageType, setMessageType] = useState("");

  const [questionNumber, setQuestionNumber] = useState(1); // 正解数
  const [lives, setLives] = useState(3);

  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [skipUsed, setSkipUsed] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const [showTimeout, setShowTimeout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showGameClear, setShowGameClear] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const [lastAnswer, setLastAnswer] = useState("");

  // =========================================
  // 🎵 BGM
  // =========================================
  const normalBGMRef = useRef(new Audio("/bgm-normal-1.mp3"));
  const normalBGM = normalBGMRef.current;
  normalBGM.loop = true;

  useEffect(() => {
    const vol = Number.isFinite(bgmVolume) ? bgmVolume : 0;
    normalBGM.volume = vol;
  }, [bgmVolume]);

  // =========================================
  // 初期化
  // =========================================
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

    setAllQuestions(selected);
    setCurrent(selected[0]);
    setUsedQuestions([]);
    
    setCurrent(selected[0]);

    setQuestionNumber(1);
    
    setUsedQuestions([]); // ← ★ これを追加（超重要）
    setLives(3);
    setSkipUsed(false);
    setAnswer("");
    setResult("");
    setMessageType("");
    setIsGameOver(false);
    setShowGameClear(false);
    setIsChecking(false);
    setTimeLeft(timeLimit);

    normalBGM.currentTime = 0;
    normalBGM.play();
  }, [questionCount, timeLimit]);

  // =========================================
  // タイマー
  // =========================================
  useEffect(() => {
    if (!current || showTimeout || showConfirm || isGameOver || isChecking)
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
  }, [current, showTimeout, showConfirm, isGameOver, isChecking]);

  // =========================================
  // 次の問題へ
  // =========================================
  const advanceToNextProblem = () => {
    // 🎉 正解数が目標に達したらクリア
    if (questionNumber >= questionCount) {
      setShowGameClear(true);
      return;
    }
  
    // ★ 「今の問題」＋「正解済み」を除外
    const excluded = [...usedQuestions, current];
  
    const unused = allQuestions.filter(
      (q) => !excluded.includes(q)
    );
  
    if (unused.length === 0) {
      setShowGameClear(true);
      return;
    }
  
    // ランダムで次の問題を選ぶ
    const next = unused[Math.floor(Math.random() * unused.length)];
    setCurrent(next);
  
    setAnswer("");
    setResult("");
    setMessageType("");
    setTimeLeft(timeLimit);
  };
  
  
  
  

  // =========================================
  // 回答チェック
  // =========================================
  const checkAnswer = () => {
    if (!current || isChecking) return;
    setIsChecking(true);

    const ans = answer.trim();

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
          setQuestionNumber((n) => n + 1); // ← 正解時のみ
          advanceToNextProblem();
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
  // 時間切れ
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
  
    if (newLives <= 0) {
      setIsGameOver(true);
      return;
    }
  
    setTimeout(() => {
      advanceToNextProblem(); // ← 正解数は増えない
      setIsChecking(false);
    }, 500);
  };
  

  // =========================================
  // スキップ
  // =========================================
  const skipQuestion = () => {
    if (skipUsed || isChecking) return;
  
    setIsChecking(true);
    setSkipUsed(true);
  
    setMessageType("info");
    setResult("🔁 スキップしました");
  
    setTimeout(() => {
      advanceToNextProblem(); // ← 正解数は増えない
      setIsChecking(false);
    }, 800);
  };
  

  // =========================================
  // ギブアップ
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
  // レンダー
  // =========================================
  if (loading) return <LoadingScreen message="終了しています..." />;
  if (showConfirm) return <ConfirmGiveUp onConfirm={confirmGiveUp} />;
  if (showGameClear) return <GameClearScreen onBack={onBack} />;

  return (
    <div className="quiz-root" style={{ position: "relative" }}>
      <DebugPanel
  gameMode="extra"
  questionNumber={questionNumber}
  questionCount={questionCount}
  questionsLength={allQuestions.length - usedQuestions.length}
  usedCount={usedQuestions.length}
/>




      <div className="lives-container">
        <Lives lives={lives} />
      </div>

      <QuestionCounter current={questionNumber} total={questionCount} />

      <div className="quiz-mode">
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
            readOnly={showTimeout || isGameOver || isChecking}
          />

          <MessageDisplay message={result} type={messageType} />

          <ActionButtons
            onAnswer={checkAnswer}
            onSwap={skipQuestion}
            onGiveUp={handleGiveUp}
            disabled={skipUsed || isChecking}
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
