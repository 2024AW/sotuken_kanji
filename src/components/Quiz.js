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
import CorrectOverlay from "./CorrectOverlay";
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
  const [showCorrectOverlay, setShowCorrectOverlay] = useState(false);
  const [correctAdvanceMode, setCorrectAdvanceMode] = useState("correct");
  // "correct" | "skip"

  const [correctInfo, setCorrectInfo] = useState({
    kanji: "",
    reading: "",
    meaning: "",
  });

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
  const playingRef = React.useRef("none"); // "normal" | "boss" | "none"

  const normalBGM = normalBGMRef.current;
  const bossBGM = bossBGMRef.current;
  const clearBGM = clearBGMRef.current;

  // ✅ すべてのBGMを止める（戻る/クリア/ゲームオーバー用）
  const stopAllBgm = () => {
    normalBGM.pause();
    normalBGM.currentTime = 0;

    bossBGM.pause();
    bossBGM.currentTime = 0;

    clearBGM.pause();
    clearBGM.currentTime = 0;
  };

  normalBGM.loop = true;
  bossBGM.loop = true;
  clearBGM.loop = false;

  useEffect(() => {
    const vol = Number.isFinite(bgmVolume) ? bgmVolume : 0;
    normalBGM.volume = vol;
    bossBGM.volume = vol;
    clearBGM.volume = vol;
  }, [bgmVolume, normalBGM, bossBGM, clearBGM]);

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

    normalBGM.volume = Number.isFinite(bgmVolume) ? bgmVolume : 0;

    if (normalBGM.paused) {
      normalBGM.play().catch(() => {});
    }
    playingRef.current = "normal";
  }, [level, questionCount, timeLimit]);

  // =========================================
  // ★ BGM 切替
  // =========================================
  useEffect(() => {
    if (isGameOver || showGameClear) return;

    const want = stage === "BOSS" ? "boss" : "normal";
    if (playingRef.current === want) return; // すでにそのBGMなら何もしない

    if (want === "boss") {
      // normal -> boss
      if (!normalBGM.paused) normalBGM.pause();
      bossBGM.currentTime = 0; // 切替時だけ先頭から
      bossBGM.play().catch(() => {});
    } else {
      // boss -> normal
      if (!bossBGM.paused) bossBGM.pause();
      // ★ここが重要：stage1〜3は流し続けたいので currentTime=0 しない
      normalBGM.play().catch(() => {});
    }

    playingRef.current = want;
  }, [stage, isGameOver, showGameClear, normalBGM, bossBGM]);

  // ✅ Quiz画面から離れたら必ずBGM停止（クリア画面は Quiz 自体を返さないのでここは問題なし）
  useEffect(() => {
    return () => {
      stopAllBgm();
    };
  }, []);

  // =========================================
  // ★ タイマー
  // =========================================
  useEffect(() => {
    if (
      !current ||
      showTimeout ||
      showConfirm ||
      showLevelIntro ||
      showCorrectOverlay || // ✅ 追加：正解オーバーレイ中は止める
      isGameOver ||
      isChecking
    ) {
      return;
    }

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
    showCorrectOverlay, // ✅ 追加：依存配列にも必須
    isGameOver,
    isChecking,
  ]);

  // =========================================
  // ★ 次の問題へ（rank 切替）
  // =========================================
  const advanceToNextProblem = (isCorrect = false) => {
    // ゲームクリア
    if (isCorrect && questionNumber === questionCount) {
      // ✅ 通常BGMを止める
      normalBGM.pause();
      bossBGM.pause();
      normalBGM.currentTime = 0;
      bossBGM.currentTime = 0;

      // ✅ クリアBGMを鳴らす
      clearBGM.currentTime = 0;
      clearBGM.play().catch(() => {}); // 自動再生制限対策

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
      setResult(""); // 下のメッセージ表示は使わないなら空に

      // ★ オーバーレイに表示したい情報をセット
      setCorrectInfo({
        kanji: current.kanji,
        reading: current.reading,
        meaning: current.meaning || "",
      });
      setCorrectAdvanceMode("correct");
      setShowCorrectOverlay(true);

      setIsChecking(false); // overlay中は入力できないので解除してOK
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
        stopAllBgm(); // ✅ 追加
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

    setIsChecking(true);
    setSkipUsed(true);

    // スキップでも答え情報をOverlayに渡す
    setCorrectInfo({
      kanji: current?.kanji || "",
      reading: current?.reading || "",
      meaning: current?.meaning || "",
    });

    setCorrectAdvanceMode("skip");
    setShowCorrectOverlay(true);

    setIsChecking(false);
  };

  // =========================================
  // ★ ギブアップ
  // =========================================
  const handleGiveUp = () => setShowConfirm(true);

  const confirmGiveUp = (choice) => {
    if (choice === "yes") {
      stopAllBgm(); // ✅ 先に止める
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

  // ...省略（上はそのまま）

  const handleNextAfterCorrect = () => {
    setShowCorrectOverlay(false);

    if (correctAdvanceMode === "skip") {
      // スキップは正解数を進めない
      advanceToNextProblem(false);
    } else {
      // 正解は正解数を進める
      advanceToNextProblem(true);
    }
  };

  // =========================================
  // ★ レンダー
  // =========================================
  if (loading) return <LoadingScreen message="終了しています..." />;
  if (showConfirm) return <ConfirmGiveUp onConfirm={confirmGiveUp} />;

  // ✅ クリア時のreturnは1要素で返す
  if (showGameClear) {
    return (
      <GameClearScreen
        onBack={() => {
          stopAllBgm();
          onBack();
        }}
      />
    );
  }

  return (
    <div className="quiz-root" style={{ position: "relative" }}>
      {/* ✅ CorrectOverlayは通常画面の上に出す */}
      {showCorrectOverlay && (
        <CorrectOverlay
          kanji={correctInfo.kanji}
          reading={correctInfo.reading}
          meaning={correctInfo.meaning}
          mode={correctAdvanceMode} // ← 追加
          onNext={handleNextAfterCorrect}
        />
      )}

      {showLevelIntro && (
        <LevelIntroOverlay
          levelText={
            stage === "BOSS" ? "⚔️ BOSS STAGE ⚔️" : `LEVEL ${stage} 漢検4・5級`
          }
          onFinish={() => setShowLevelIntro(false)}
        />
      )}

      <DebugPanel
        gameMode="main"
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

          <div className="question-text">
            {showCorrectOverlay ? "" : current?.kanji}
          </div>

          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="ひらがなで答えてね"
            className="answer-input"
            onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
            readOnly={
              showTimeout ||
              isGameOver ||
              isChecking ||
              showLevelIntro ||
              showCorrectOverlay
            }
          />

          <MessageDisplay message={warning || result} type={messageType} />

          <ActionButtons
            onAnswer={checkAnswer}
            onSwap={skipQuestion}
            onGiveUp={handleGiveUp}
            disabled={
              skipUsed || isChecking || showLevelIntro || showCorrectOverlay
            }
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

      {isGameOver && (
        <GameOverOverlay
          onBack={() => {
            stopAllBgm();
            onBack();
          }}
        />
      )}
    </div>
  );
}
