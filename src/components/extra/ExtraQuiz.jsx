import React, { useState, useEffect, useRef } from "react";

// ===== 共通UI =====
import Timer from "../Timer";
import Lives from "../Lives";
import DebugPanel from "../DebugPanel";
import LoadingScreen from "../LoadingScreen";
import ConfirmGiveUp from "../ConfirmGiveUp";
import QuestionCounter from "../QuestionCounter";
import ActionButtons from "../ActionButtons";
import MessageDisplay from "../MessageDisplay";
import GameOverOverlay from "../GameOverOverlay";
import CorrectOverlay from "../CorrectOverlay";
import GameClearScreen from "../GameClearScreen";

// ===== Extra専用データ =====
import { famousPersons } from "./famousPersons";

// ===== スタイル =====
import "../../styles.css";

// =========================================
// 配列シャッフル関数
// =========================================
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
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
  const [normalPool, setNormalPool] = useState([]);
  const [bossPool, setBossPool] = useState([]);
  
  const [current, setCurrent] = useState(null);
  const [usedQuestions, setUsedQuestions] = useState([]);

  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");
  const [messageType, setMessageType] = useState("");

  const [questionNumber, setQuestionNumber] = useState(1);
  const [lives, setLives] = useState(3);

  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [skipUsed, setSkipUsed] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

  const [showCorrectOverlay, setShowCorrectOverlay] = useState(false);
  const [correctAdvanceMode, setCorrectAdvanceMode] = useState("correct");

  const [correctInfo, setCorrectInfo] = useState({
    kanji: "",
    reading: "",
    meaning: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showGameClear, setShowGameClear] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

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
    // 全データを難易度別に分けてシャッフルし、プール(在庫)として保持
    const normals = shuffle(famousPersons.filter((q) => q.difficulty === "normal"));
    const bosses = shuffle(famousPersons.filter((q) => q.difficulty === "boss"));

    setNormalPool(normals);
    setBossPool(bosses);
    setUsedQuestions([]);

    // 最初の問題を設定
    if (normals.length > 0) {
      setCurrent(normals[0]);
    } else if (bosses.length > 0) {
      setCurrent(bosses[0]);
    }

    setQuestionNumber(1);
    setLives(3);
    setSkipUsed(false);
    setAnswer("");
    setResult("");
    setMessageType("");
    setIsGameOver(false);
    setShowGameClear(false);
    setIsChecking(false);
    setTimeLeft(timeLimit);

    // BGM再生
    normalBGM.currentTime = 0;
    normalBGM.play().catch((e) => console.log("Audio play failed:", e));

    return () => {
      normalBGM.pause();
    };
  }, [questionCount, timeLimit]);

  // =========================================
  // タイマー
  // =========================================
  useEffect(() => {
    if (
      !current ||
      showConfirm ||
      isGameOver ||
      isChecking ||
      showCorrectOverlay
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
  }, [current, showConfirm, isGameOver, isChecking, showCorrectOverlay]);

  // =========================================
  // 次の問題へ
  // =========================================
  const advanceToNextProblem = () => {
    // 1. 今の問題を出題済みに登録
    const newUsedQuestions = [...usedQuestions, current];
    setUsedQuestions(newUsedQuestions);

    // 2. 正解かそれ以外(スキップ/時間切れ)かで次の番号を決定
    const isCorrect = correctAdvanceMode === "correct";
    
    // 正解したときだけ問題番号を進める
    const nextQNumber = isCorrect ? questionNumber + 1 : questionNumber;

    // 3. クリア判定
    if (isCorrect && questionNumber >= questionCount) {
      setShowGameClear(true);
      return;
    }

    setQuestionNumber(nextQNumber);

    // 4. 次の問題を選ぶ (最終問題ならBoss、それ以外はNormal)
    const isBossStage = nextQNumber === questionCount;
    const targetPool = isBossStage ? bossPool : normalPool;

    // 未出題の問題をプールから探す
    let candidates = targetPool.filter((q) => !newUsedQuestions.includes(q));

    // もし候補が尽きたらリサイクル
    if (candidates.length === 0) {
      candidates = targetPool.filter((q) => q !== current);
      if (candidates.length === 0) candidates = [current];
    }

    // ランダムに選択
    const next = candidates[Math.floor(Math.random() * candidates.length)];
    setCurrent(next);

    // 状態のリセット
    setAnswer("");
    setResult("");
    setMessageType("");
    
    setTimeLeft(timeLimit);
  };

  // =========================================
  // CorrectOverlay「次へ」処理
  // =========================================
  const handleNextAfterCorrect = () => {
    setShowCorrectOverlay(false);

    // タイムアウト（時間切れ）の時だけライフを減らす
    if (correctAdvanceMode === "timeout") {
      const newLives = lives - 1;
      setLives(newLives);

      if (newLives <= 0) {
        setIsGameOver(true);
        return;
      }
    }

    setTimeout(() => {
      advanceToNextProblem();
      setIsChecking(false);
    }, 300);
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

    const normalize = (s) => s.trim().replace(/\s+/g, "").toLowerCase();
    const isCorrect =
      normalize(ans) === normalize(current.name) ||
      (current.aliases || []).some((a) => normalize(a) === normalize(ans));

    if (isCorrect) {
      // 正解情報をセット
      setCorrectInfo({
        kanji: "",
        reading: current.display, 
        meaning: current.meaning,
        image: current.image,
      });

      setCorrectAdvanceMode("correct");
      setShowCorrectOverlay(true);
      return;
    }

    // 不正解の場合
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

    setCorrectInfo({
      kanji: "",
      reading: current.display,
      meaning: current.meaning,
      image: current.image,
    });

    setCorrectAdvanceMode("timeout");
    setShowCorrectOverlay(true);
  };

  // =========================================
  // スキップ
  // =========================================
  const skipQuestion = () => {
    if (skipUsed || isChecking) return;

    setIsChecking(true);
    setSkipUsed(true);

    setCorrectInfo({
      kanji: "",
      reading: current.display,
      meaning: current.meaning,
      image: current.image,
    });

    setCorrectAdvanceMode("skip");
    setShowCorrectOverlay(true);
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
      {showCorrectOverlay && (
        <CorrectOverlay
          kanji={correctInfo.kanji}
          reading={correctInfo.reading}
          meaning={correctInfo.meaning}
          image={correctInfo.image}
          mode={correctAdvanceMode}
          onNext={handleNextAfterCorrect}
        />
      )}

      <DebugPanel
        gameMode="extra"
        questionNumber={questionNumber}
        questionCount={questionCount}
        questionsLength={normalPool.length + bossPool.length}
        usedCount={usedQuestions.length}
        isChecking={isChecking}
        currentDifficulty={current?.difficulty} 
      />

      <div className="lives-container">
        <Lives lives={lives} />
      </div>

      <QuestionCounter current={questionNumber} total={questionCount} />

      <div className="quiz-mode">
        <div className="quiz-card">
          <Timer timeLeft={timeLeft} />

          <div style={{ textAlign: "center", margin: "20px 0" }}>
            {current?.image && (
              <img
                src={current.image}
                alt=""
                style={{
                  maxHeight: "280px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                }}
              />
            )}
          </div>

          {/* ★修正: プレースホルダーを変更 */}
          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="名前を入力してね！"
            className="answer-input"
            onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
            readOnly={isGameOver || isChecking}
            autoFocus
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

      {isGameOver && <GameOverOverlay onBack={onBack} />}
    </div>
  );
}