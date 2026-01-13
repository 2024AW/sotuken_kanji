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
import LevelIntroOverlay from "../LevelIntroOverlay"; // ★ 追加

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

  const [questionNumber, setQuestionNumber] = useState(1); // 現在の問題数
  const [lives, setLives] = useState(3);

  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [skipUsed, setSkipUsed] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

  const [showCorrectOverlay, setShowCorrectOverlay] = useState(false);
  const [correctAdvanceMode, setCorrectAdvanceMode] = useState("correct");

  // ★ BOSS演出用State
  const [showBossIntro, setShowBossIntro] = useState(false);

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
    // 難易度別に分けてシャッフル
    const normal = shuffle(
      famousPersons.filter((q) => q.difficulty !== "boss")
    );
    const boss = shuffle(famousPersons.filter((q) => q.difficulty === "boss"));

    // 通常問題 + ボス問題を結合して出題リストを作成
    // 例: 7問設定なら、通常6問 + ボス1問
    const selected = [...normal.slice(0, questionCount - 1), boss[0]];

    setAllQuestions(selected);
    setCurrent(selected[0]);
    setUsedQuestions([]);

    setQuestionNumber(1);
    setLives(3);
    setSkipUsed(false);
    setAnswer("");
    setResult("");
    setMessageType("");
    setIsGameOver(false);
    setShowGameClear(false);
    setIsChecking(false);
    setShowBossIntro(false); // ★
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
      showCorrectOverlay ||
      showBossIntro // ★ BOSS演出中はタイマー停止
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
    showConfirm,
    isGameOver,
    isChecking,
    showCorrectOverlay,
    showBossIntro,
  ]);

  // =========================================
  // 次の問題へ
  // =========================================
  const advanceToNextProblem = () => {
    // 1. まず「今回の問題」を出題済みに加える
    let nextUsedQuestions = [...usedQuestions, current];

    // 2. カウントアップ判定
    const shouldIncrement = correctAdvanceMode === "correct";
    const nextQuestionNum = shouldIncrement
      ? questionNumber + 1
      : questionNumber;

    // 3. 終了判定
    if (nextQuestionNum > questionCount) {
      setShowGameClear(true);
      return;
    }

    // 4. 問題番号を更新
    if (shouldIncrement) {
      setQuestionNumber(nextQuestionNum);
    }

    // 5. 次の問題を抽選
    let unused = allQuestions.filter((q) => !nextUsedQuestions.includes(q));

    // 在庫切れ対策（スキップ時などのため）
    if (unused.length === 0) {
      // 最後の問題（ボス）だけは残すようにしないと、ボスが消えてしまう可能性があるので注意
      // ここでは簡易的にリセット
      nextUsedQuestions = [current];
      unused = allQuestions.filter((q) => q !== current);
    }

    setUsedQuestions(nextUsedQuestions);

    // ★ 次の問題を決める（順番通りにするか、ランダムにするか）
    // allQuestionsは既に [通常, 通常, ..., ボス] の順で作られているので、
    // 未出題リスト(unused)の中にボス(配列の最後)が含まれているか確認

    // 基本はランダムだが、最後の1問（nextQuestionNum === questionCount）のときは
    // 強制的にボス（allQuestionsの最後）を選ばせる
    let next;

    if (nextQuestionNum === questionCount) {
      // 最終問題なら、allQuestionsの最後（ボス）を指定
      next = allQuestions[allQuestions.length - 1];
    } else {
      // それ以外はランダム（ボス以外から選ぶ）
      const nonBossUnused = unused.filter((q) => q.difficulty !== "boss");
      if (nonBossUnused.length > 0) {
        next = nonBossUnused[Math.floor(Math.random() * nonBossUnused.length)];
      } else {
        // 万が一ボスしか残ってないならボス
        next = unused[Math.floor(Math.random() * unused.length)];
      }
    }

    setCurrent(next);

    // ★ ボス演出判定
    // 次の問題がBOSS難易度なら演出を表示
    if (next.difficulty === "boss") {
      setShowBossIntro(true);
    }

    // 状態のリセット
    setAnswer("");
    setResult("");
    setMessageType("");
    setTimeLeft(timeLimit);
    setSkipUsed(false);
  };

  // =========================================
  // CorrectOverlay「次へ」処理
  // =========================================
  const handleNextAfterCorrect = () => {
    setShowCorrectOverlay(false);

    // 正解以外（skip / timeout）はライフを減らす
    if (correctAdvanceMode !== "correct") {
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
      {/* ★ BOSS演出オーバーレイ */}
      {showBossIntro && (
        <LevelIntroOverlay
          levelText="⚔️ BOSS STAGE ⚔️"
          onFinish={() => setShowBossIntro(false)}
        />
      )}

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
        questionsLength={allQuestions.length}
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
            {current?.image && (
              <img
                src={current.image}
                alt=""
                style={{ maxHeight: "280px", borderRadius: "8px" }}
              />
            )}
          </div>

          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="ひらがなで答えてね"
            className="answer-input"
            onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
            readOnly={isGameOver || isChecking || showBossIntro} // ボス演出中も入力不可に
            autoFocus
          />

          <MessageDisplay message={result} type={messageType} />

          <ActionButtons
            onAnswer={checkAnswer}
            onSwap={skipQuestion}
            onGiveUp={handleGiveUp}
            disabled={skipUsed || isChecking || showBossIntro}
          />
        </div>
      </div>

      {isGameOver && <GameOverOverlay onBack={onBack} />}
    </div>
  );
}
