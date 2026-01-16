// src/components/background/Stage3.js
import React, { useRef, useEffect } from "react";

const Stage3 = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let spawnInterval;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    // ゲーム内変数
    let time = 0;
    let scrollSpeed = 0;

    // --- 敵キャラクター設定 ---
    const enemy = {
      spawning: false,
      spawnProgress: 0,
      spawnDuration: 60,
      alive: false,
      x: canvas.width / 2,
      y: canvas.height * 0.4,
      floatPhase: 0,
    };

    function spawnEnemy() {
      if (!enemy.spawning && !enemy.alive) {
        enemy.spawning = true;
        enemy.spawnProgress = 0;
        // 画面中央に再配置
        enemy.x = canvas.width / 2;
        enemy.y = canvas.height * 0.4;
      }
    }

    // --- 描画関数群 ---

    // 床の木目を動かす
    function drawMovingFloorTexture(cX, vY) {
      ctx.save();
      ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
      ctx.lineWidth = 2;

      scrollSpeed = (time * 2) % 100;
      for (let i = 0; i < 20; i++) {
        let pos = i * 50 + scrollSpeed;
        let y = vY + Math.pow(pos / 100, 2) * 50;
        if (y > canvas.height) continue;

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      ctx.restore();
    }

    // 中央の道（絨毯）
    function drawCentralPath(cX, vY) {
      ctx.save();
      const carpetGrad = ctx.createLinearGradient(0, vY, 0, canvas.height);
      carpetGrad.addColorStop(0, "#4d0000");
      carpetGrad.addColorStop(1, "#2a0000");
      ctx.fillStyle = carpetGrad;

      ctx.beginPath();
      ctx.moveTo(cX - 50, vY);
      ctx.lineTo(cX + 50, vY);
      ctx.lineTo(cX + 600, canvas.height);
      ctx.lineTo(cX - 600, canvas.height);
      ctx.closePath();
      ctx.fill();

      // 絨毯の模様
      ctx.clip();
      ctx.strokeStyle = "rgba(184, 134, 11, 0.3)";
      ctx.lineWidth = 5;
      let carpetScroll = (time * 3) % 150;
      for (let i = 0; i < 15; i++) {
        let pos = i * 80 + carpetScroll;
        let y = vY + Math.pow(pos / 100, 2) * 60;
        if (y > canvas.height) continue;

        ctx.beginPath();
        ctx.moveTo(cX - 600, y);
        ctx.lineTo(cX + 600, y);
        ctx.stroke();
      }

      // 縁取り
      ctx.strokeStyle = "rgba(184, 134, 11, 0.5)";
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.restore();
    }

    // 本棚（単体）
    function drawOneBookshelf(x, y, w, h, rows, booksPerRow) {
      ctx.fillStyle = "#3e2723";
      ctx.fillRect(x, y, w, h);
      const rowH = h / rows;
      for (let i = 0; i < rows; i++) {
        let rowY = y + i * rowH;
        ctx.fillStyle = "#261a0d";
        ctx.fillRect(x, rowY + rowH - 5, w, 5);
        const bookW = w / (booksPerRow + 2);
        for (let j = 0; j < booksPerRow; j++) {
          const bH = rowH * 0.6 + Math.sin(j + i) * 10;
          // Reactではテンプレートリテラルの変数を正しく展開
          const hue = (j * 40 + i * 30) % 360;
          const light = 20 + (j % 3) * 10;
          ctx.fillStyle = `hsl(${hue}, 20%, ${light}%)`;
          ctx.fillRect(
            x + 5 + j * (bookW + 2),
            rowY + rowH - 5 - bH,
            bookW,
            bH
          );
        }
      }
    }

    // 本棚群の配置
    function drawBookshelves(cX, vY, isReflect) {
      // 奥の巨大な本棚
      drawOneBookshelf(cX - 200, vY - 250, 400, 250, 6, 15);

      // 左右に並ぶ本棚
      for (let i = 0; i < 3; i++) {
        let depth = 1 + i * 0.8;
        let xOffset = 280 * depth;
        let shelfW = 120 * depth;
        let shelfH = 400 * depth;
        // 左側
        drawOneBookshelf(
          cX - xOffset - shelfW,
          vY - shelfH + i * 50,
          shelfW,
          shelfH,
          5,
          8
        );
        // 右側
        drawOneBookshelf(
          cX + xOffset,
          vY - shelfH + i * 50,
          shelfW,
          shelfH,
          5,
          8
        );
      }
    }

    // 図書室全体の描画
    function drawGrandLibrary() {
      const vY = canvas.height * 0.45;
      const cX = canvas.width / 2;

      // 1. 背景
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. 床
      const floorGrad = ctx.createLinearGradient(0, vY, 0, canvas.height);
      floorGrad.addColorStop(0, "#3e2723");
      floorGrad.addColorStop(1, "#1b110b");
      ctx.fillStyle = floorGrad;
      ctx.fillRect(0, vY, canvas.width, canvas.height - vY);

      drawMovingFloorTexture(cX, vY);
      drawCentralPath(cX, vY);

      // 反射
      ctx.save();
      ctx.globalAlpha = 0.15;
      ctx.scale(1, -0.5);
      drawBookshelves(cX, -vY * 2, true);
      ctx.restore();

      // 本棚
      drawBookshelves(cX, vY, false);

      // 照明
      const lightGrad = ctx.createRadialGradient(
        cX,
        vY * 0.5,
        50,
        cX,
        vY * 0.5,
        600
      );
      lightGrad.addColorStop(0, "rgba(255, 230, 150, 0.2)");
      lightGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = lightGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // 敵（本のお化け）描画
    function drawEnemy(x, y, scale, prog) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.globalAlpha = prog;
      ctx.shadowBlur = 50;
      ctx.shadowColor = "red";

      const flap = Math.sin(time * 0.15) * 0.35;

      [1, -1].forEach((side) => {
        ctx.save();
        ctx.rotate(side * flap);
        // 本の表紙
        ctx.fillStyle = "#1a0000";
        ctx.fillRect(side === 1 ? 0 : -85, -60, 85, 120);
        // ページ
        ctx.fillStyle = "#d2b48c";
        ctx.fillRect(side === 1 ? 5 : -80, -55, 75, 110);

        // 右ページに顔を描く
        if (side === 1) {
          // 口
          ctx.fillStyle = "black";
          ctx.beginPath();
          ctx.ellipse(40, 25, 25, 12, 0, 0, Math.PI * 2);
          ctx.fill();

          // 牙
          ctx.fillStyle = "white";
          for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.moveTo(20 + i * 12, 18);
            ctx.lineTo(26 + i * 12, 30);
            ctx.lineTo(32 + i * 12, 18);
            ctx.fill();
          }
        }
        ctx.restore();
      });

      // 目玉本体
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(0, -10, 35, 0, Math.PI * 2);
      ctx.fill();

      // 黒目と赤目（動く）
      const lx = Math.sin(time * 0.05) * 12;
      const ly = Math.cos(time * 0.05) * 5;

      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(lx, -10 + ly, 16, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(lx, -10 + ly, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // アニメーションループ
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      if (enemy.spawning) {
        enemy.spawnProgress++;
        if (enemy.spawnProgress >= enemy.spawnDuration) {
          enemy.spawning = false;
          enemy.alive = true;
        }
      }
      if (enemy.alive) enemy.floatPhase += 0.04;

      drawGrandLibrary();

      if (enemy.spawning || enemy.alive) {
        const prog = enemy.spawning
          ? enemy.spawnProgress / enemy.spawnDuration
          : 1;
        const floatY = Math.sin(enemy.floatPhase) * 25;

        // 影
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.beginPath();
        ctx.ellipse(enemy.x, canvas.height * 0.85, 80, 15, 0, 0, Math.PI * 2);
        ctx.fill();

        // 敵本体
        drawEnemy(enemy.x, enemy.y + floatY, 1.4, prog);
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    spawnInterval = setInterval(() => {
      spawnEnemy();
    }, 4000);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
      clearInterval(spawnInterval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        background: "#dcd5c5", // CSSで指定されていた背景色
      }}
    />
  );
};

export default Stage3;
