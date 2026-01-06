import React, { useState } from "react";
import TopSlide from "./components/TopSlide";
import StartMenu from "./components/StartMenu";
import HowToPlay from "./components/HowToPlay";
import VolumeSetting from "./components/VolumeSetting";
import BgmSelect from "./components/BgmSelect"; // ← ★追加
import CreditPage from "./components/CreditPage";
import ExtraMenu from "./components/ExtraMenu";
import ExtraQuiz from "./components/extra/ExtraQuiz";
import LevelSelect from "./components/LevelSelect";
import QuestionCount from "./components/QuestionCount";
import TimeSelect from "./components/TimeSelect";
import WaitScreen from "./components/WaitScreen";
import Quiz from "./components/Quiz";
import "./styles.css";

export default function App() {
  const [page, setPage] = useState("top");
  const [gameMode, setGameMode] = useState("main");
  // "main" | "extra-famous"
  const [level, setLevel] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [timeLimit, setTimeLimit] = useState(30);
  // 音量の初期値を最小（0）にする
  const [bgmVolume, setBgmVolume] = useState(0);
  const [seVolume, setSeVolume] = useState(0);

  // 🎵 ★ 現在選択されている BGM 名（通常ステージ用）
  const [bgm, setBgm] = useState("normal1");

  return (
    <div className="App">
      {page === "top" && <TopSlide onStart={() => setPage("startMenu")} />}

      {/* StartMenu */}
      {page === "startMenu" && (
        <StartMenu
          onSelect={(target) => {
            if (target === "level") {
              setGameMode("main");
              setPage("level");
            }
            if (target === "howto") setPage("howto");
            if (target === "bgm") setPage("bgm"); // ← ★ジュークボックス
            if (target === "volume") setPage("volume"); // ★これを追加
            if (target === "credit") setPage("credit");
            if (target === "extra") setPage("extraMenu");
          }}
        />
      )}

      {/* 遊び方 */}
      {page === "howto" && <HowToPlay onBack={() => setPage("startMenu")} />}

      {/* BGM設定ページ */}
      {page === "bgm" && (
        <BgmSelect
          currentBgm={bgm}
          onSave={(newBgm) => {
            setBgm(newBgm);
            // ★ ページ遷移は削除！
          }}
          onBack={() => setPage("startMenu")}
        />
      )}

      {page === "volume" && (
        <VolumeSetting
          bgmVolume={bgmVolume}
          seVolume={seVolume}
          onSave={(b, s) => {
            setBgmVolume(b);
            setSeVolume(s);
            // ★ここで画面遷移しない！
          }}
          onBack={() => setPage("startMenu")}
        />
      )}

      {page === "credit" && <CreditPage onBack={() => setPage("startMenu")} />}

      {page === "extraMenu" && (
        <ExtraMenu
          onSelect={(mode) => {
            setGameMode(mode); // ★ Extraモードを記録
            setPage("count"); // ← ★ 正解
          }}
          onBack={() => setPage("startMenu")}
        />
      )}

      {/* レベル選択 */}
      {page === "level" && (
        <LevelSelect
          onSelect={(lvl) => {
            setLevel(lvl);
            setPage("count");
          }}
          onBack={() => setPage("startMenu")}
        />
      )}

      {/* 問題数 */}
      {page === "count" && (
        <QuestionCount
          onSelect={(count) => {
            setQuestionCount(count);
            setPage("time");
          }}
          onBack={() => setPage("level")}
        />
      )}

      {/* 制限時間 */}
      {page === "time" && (
        <TimeSelect
          onSelect={(time) => {
            setTimeLimit(time);
            setPage("wait");
          }}
          onBack={() => setPage("count")}
        />
      )}

      {/* 開始前 */}
      {page === "wait" && (
        <WaitScreen
          level={level}
          questionCount={questionCount}
          timeLimit={timeLimit}
          gameMode={gameMode} // ★ これを追加
          onStart={() => setPage("quiz")}
          onBack={() => setPage("time")}
        />
      )}

      {/* クイズ */}
      {page === "quiz" &&
        (gameMode === "extra-famous" ? (
          <ExtraQuiz
            questionCount={questionCount}
            timeLimit={timeLimit}
            bgmVolume={bgmVolume}
            onBack={() => {
              setGameMode("main"); // ★ ここが重要
              setPage("startMenu");
            }}
          />
        ) : (
          <Quiz
  level={level}
  questionCount={questionCount}
  timeLimit={timeLimit}
  onBack={() => setPage("startMenu")}
  bgmVolume={bgmVolume}
  bgm={bgm}
/>

        ))}
    </div>
  );
}
