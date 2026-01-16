// src/components/background/BossStage.js
import React, { useRef, useEffect } from "react";

const BossStage = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // アニメーション制御用変数
    let animationFrameId;
    let spawnInterval;
    let spawnTimeout;

    // リサイズ対応
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    // ゲーム内変数
    let offset = 0;
    const speed = 3; // スクロール速度
    let time = 0;

    // ----------------------------------------------------
    // 敵キャラクターのデータと挙動
    // ----------------------------------------------------
    const enemy = {
      spawning: false,
      spawnProgress: 0,
      spawnDuration: 60,
      alive: false,
      despawnTimer: 0,
      x: canvas.width / 2,
      y: canvas.height * 0.35,
      targetX: canvas.width / 2,
      targetY: canvas.height * 0.35,
      velocityX: 0,
      velocityY: 0,
      rotation: 0,
      moveTimer: 0,
      floatPhase: Math.random() * Math.PI * 2,
      wobblePhase: Math.random() * Math.PI * 2,
    };

    function spawnEnemy() {
      if (!enemy.spawning && !enemy.alive) {
        enemy.spawning = true;
        enemy.spawnProgress = 0;
        enemy.x = canvas.width / 2;
        enemy.y = canvas.height * 0.35;
        enemy.targetX = canvas.width / 2;
        enemy.targetY = canvas.height * 0.35;
      }
    }

    function updateEnemy() {
      // 出現演出
      if (enemy.spawning) {
        enemy.spawnProgress += 1 / enemy.spawnDuration;
        if (enemy.spawnProgress >= 1) {
          enemy.spawnProgress = 1;
          enemy.spawning = false;
          enemy.alive = true;
          enemy.despawnTimer = 1200;
        }
      }

      // 生存中の動き（威圧的な挙動）
      if (enemy.alive) {
        enemy.despawnTimer--;

        // 画面中央上部でゆらゆら動く
        const targetX =
          canvas.width / 2 + Math.sin(time * 0.02) * (canvas.width * 0.1);
        const targetY = canvas.height * 0.25 + Math.cos(time * 0.015) * 30;

        enemy.velocityX += (targetX - enemy.x) * 0.004;
        enemy.velocityY += (targetY - enemy.y) * 0.004;

        enemy.velocityX *= 0.94;
        enemy.velocityY *= 0.94;

        enemy.x += enemy.velocityX;
        enemy.y += enemy.velocityY;

        enemy.rotation = Math.sin(time * 0.04) * 0.05;

        if (enemy.despawnTimer <= 0) {
          enemy.alive = false;
        }
      }
    }

    // ----------------------------------------------------
    // 描画関数群
    // ----------------------------------------------------

    // 召喚エフェクト
    function drawSummonEffect(x, y, progress) {
      const maxRadius = 120;
      const radius = maxRadius * progress;

      ctx.strokeStyle = `rgba(0, 150, 255, ${1 - progress})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = `rgba(0, 200, 255, ${1 - progress * 0.5})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, radius * 0.7, 0, Math.PI * 2);
      ctx.stroke();

      const pillarHeight = 200 * progress;
      const gradient = ctx.createLinearGradient(x, y, x, y - pillarHeight);
      gradient.addColorStop(0, `rgba(0, 150, 255, ${0.4 * (1 - progress)})`);
      gradient.addColorStop(1, "rgba(0, 150, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(x - 30, y - pillarHeight, 60, pillarHeight);

      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + time * 0.1;
        const px = x + Math.cos(angle) * radius * 0.8;
        const py = y + Math.sin(angle) * radius * 0.8;
        ctx.fillStyle = `rgba(0, 255, 255, ${1 - progress})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#00FFFF";
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // 敵キャラクター（断罪の執行者デザイン）
    function drawEnemy(x, y, scale, spawnProgress, rotation) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      const size = 130 * scale;
      const alpha = spawnProgress;
      ctx.globalAlpha = alpha;

      // 1. 背景の暗黒星雲
      const auraPulse = Math.sin(time * 0.15) * 20;
      const grad = ctx.createRadialGradient(
        0,
        0,
        0,
        0,
        0,
        size * 2 + auraPulse
      );
      grad.addColorStop(0, "rgba(30, 0, 60, 0.9)");
      grad.addColorStop(0.5, "rgba(10, 0, 20, 0.4)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, size * 2 + auraPulse, 0, Math.PI * 2);
      ctx.fill();

      // 2. 外周の刃
      for (let i = 0; i < 4; i++) {
        ctx.save();
        const bladeAng = (i / 4) * Math.PI * 2 + time * 0.04;
        const dist = size * 1.2 + Math.sin(time * 0.1 + i) * 10;
        ctx.translate(Math.cos(bladeAng) * dist, Math.sin(bladeAng) * dist);
        ctx.rotate(bladeAng + Math.PI / 2);

        ctx.fillStyle = "#111";
        ctx.strokeStyle = "#ff00ff";
        ctx.lineWidth = 3;
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#ff00ff";
        ctx.beginPath();
        ctx.moveTo(0, -size * 0.4);
        ctx.lineTo(size * 0.15, size * 0.2);
        ctx.lineTo(-size * 0.15, size * 0.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      // 3. 本体（コア）
      ctx.shadowBlur = 30;
      ctx.shadowColor = "#000";
      ctx.fillStyle = "#050010";
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        const r = size * 0.7;
        ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      }
      ctx.closePath();
      ctx.fill();

      // 4. コアの眼光
      const eyeSize = size * 0.25;
      const glow = Math.sin(time * 0.2) * 0.2 + 1.0;

      ctx.strokeStyle = "#ff0055";
      ctx.lineWidth = 5 * glow;
      ctx.shadowBlur = 20 * glow;
      ctx.shadowColor = "#ff0055";

      ctx.beginPath();
      ctx.moveTo(-eyeSize * 2, 0);
      ctx.lineTo(eyeSize * 2, 0);
      ctx.moveTo(0, -eyeSize * 2);
      ctx.lineTo(0, eyeSize * 2);
      ctx.stroke();

      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(0, 0, eyeSize * 0.6, 0, Math.PI * 2);
      ctx.fill();

      // 5. 放電エフェクト
      if (time % 10 < 3) {
        ctx.strokeStyle = "#00ffff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        let lx = 0,
          ly = 0;
        for (let i = 0; i < 5; i++) {
          const tx = lx + (Math.random() - 0.5) * 100;
          const ty = ly + (Math.random() - 0.5) * 100;
          ctx.lineTo(tx, ty);
          lx = tx;
          ly = ty;
        }
        ctx.stroke();
      }

      ctx.restore();
    }

    // 体育館の背景描画
    function drawGymBackground() {
      // 壁
      const wallGradient = ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height * 0.5
      );
      wallGradient.addColorStop(0, "#F5EFE0");
      wallGradient.addColorStop(0.5, "#EBE1CC");
      wallGradient.addColorStop(1, "#DFD4BC");
      ctx.fillStyle = wallGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height * 0.5);

      // パネル線
      ctx.strokeStyle = "rgba(140, 120, 90, 0.25)";
      ctx.lineWidth = 3;
      for (let i = 1; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * 0.1 * i);
        ctx.lineTo(canvas.width, canvas.height * 0.1 * i);
        ctx.stroke();
      }
      for (let i = 1; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.125 * i, 0);
        ctx.lineTo(canvas.width * 0.125 * i, canvas.height * 0.5);
        ctx.stroke();
      }

      // 床
      const floorGradient = ctx.createLinearGradient(
        0,
        canvas.height * 0.5,
        0,
        canvas.height
      );
      floorGradient.addColorStop(0, "#D4A574");
      floorGradient.addColorStop(0.3, "#C89A68");
      floorGradient.addColorStop(0.7, "#BC8E5C");
      floorGradient.addColorStop(1, "#A87D4F");
      ctx.fillStyle = floorGradient;
      ctx.fillRect(0, canvas.height * 0.5, canvas.width, canvas.height * 0.5);

      // 床板の境界線（横）
      const vanishPointY = canvas.height * 0.48;
      ctx.strokeStyle = "rgba(100, 70, 40, 0.35)";
      ctx.lineWidth = 2;
      for (let i = 0; i < 200; i++) {
        const z = i * 8 + offset * 0.8;
        const progress = (z % 1600) / 1600;
        if (progress > 1 || progress < 0) continue;
        const scale = progress;
        const y = vanishPointY + (canvas.height - vanishPointY) * scale;
        const lineThickness = Math.max(1, 3 * scale);
        ctx.lineWidth = lineThickness;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // 床板の木目（縦）
      ctx.strokeStyle = "rgba(90, 60, 30, 0.2)";
      for (let i = 0; i < 150; i++) {
        const z = i * 15 + offset * 0.8;
        const progress = (z % 1600) / 1600;
        if (progress > 1 || progress < 0) continue;
        const scale = progress;
        const y = vanishPointY + (canvas.height - vanishPointY) * scale;
        const x =
          canvas.width / 2 + Math.sin(i * 0.5) * canvas.width * 0.4 * scale;
        const length = Math.max(3, 15 * scale);
        const lineWidth = Math.max(0.5, 1.5 * scale);
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.random() * 4 - 2, y + length);
        ctx.stroke();
      }

      // 照明
      for (let i = 0; i < 5; i++) {
        const lightX = canvas.width * (0.15 + i * 0.175);
        const lightY = 30;
        ctx.fillStyle = "#B0B0B0";
        ctx.fillRect(lightX - 60, lightY - 10, 120, 20);
        ctx.fillStyle = "#FFFEF0";
        ctx.fillRect(lightX - 55, lightY - 7, 110, 14);
        const lightGlow = ctx.createRadialGradient(
          lightX,
          lightY + 15,
          0,
          lightX,
          lightY + 15,
          180
        );
        lightGlow.addColorStop(0, "rgba(255, 255, 245, 0.5)");
        lightGlow.addColorStop(0.4, "rgba(255, 255, 245, 0.2)");
        lightGlow.addColorStop(1, "rgba(255, 255, 245, 0)");
        ctx.fillStyle = lightGlow;
        ctx.beginPath();
        ctx.arc(lightX, lightY + 15, 180, 0, Math.PI * 2);
        ctx.fill();
      }

      // バスケットゴール
      const drawBasketGoal = (goalX, isLeft) => {
        const goalY = canvas.height * 0.2;

        // バックボード
        ctx.fillStyle = "rgba(245, 245, 250, 0.95)";
        ctx.fillRect(goalX - 60, goalY - 45, 120, 90);
        ctx.strokeStyle = "rgba(160, 160, 165, 0.9)";
        ctx.lineWidth = 5;
        ctx.strokeRect(goalX - 60, goalY - 45, 120, 90);

        ctx.strokeStyle = "rgba(210, 40, 40, 0.9)";
        ctx.lineWidth = 4;
        ctx.strokeRect(goalX - 25, goalY - 5, 50, 35);

        // リング
        ctx.strokeStyle = "rgba(255, 110, 20, 0.95)";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(goalX, goalY + 50, 18, 0, Math.PI * 2);
        ctx.stroke();

        // ネット
        ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
        ctx.lineWidth = 1.5;
        for (let i = 0; i < 12; i++) {
          const angle = ((Math.PI * 2) / 12) * i;
          const x1 = goalX + Math.cos(angle) * 18;
          const y1 = goalY + 50 + Math.sin(angle) * 18;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(goalX, goalY + 70);
          ctx.stroke();
        }

        // 支柱
        ctx.fillStyle = "rgba(90, 90, 95, 0.7)";
        ctx.fillRect(
          goalX - 4,
          goalY + 45,
          8,
          canvas.height * 0.5 - goalY - 45
        );
      };

      drawBasketGoal(canvas.width * 0.12, true); // 左
      drawBasketGoal(canvas.width * 0.88, false); // 右

      // 窓
      for (let i = 1; i < 4; i++) {
        const winX = canvas.width * (0.25 + i * 0.18);
        const winY = canvas.height * 0.06;
        ctx.fillStyle = "rgba(170, 210, 245, 0.5)";
        ctx.fillRect(winX, winY, 85, 55);
        ctx.strokeStyle = "rgba(100, 100, 105, 0.7)";
        ctx.lineWidth = 4;
        ctx.strokeRect(winX, winY, 85, 55);
        ctx.beginPath();
        ctx.moveTo(winX + 42.5, winY);
        ctx.lineTo(winX + 42.5, winY + 55);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(winX, winY + 27.5);
        ctx.lineTo(winX + 85, winY + 27.5);
        ctx.stroke();
      }

      // ステージ
      const stageY = canvas.height * 0.48;
      const stageGradient = ctx.createLinearGradient(0, stageY, 0, stageY + 15);
      stageGradient.addColorStop(0, "rgba(100, 80, 60, 0.6)");
      stageGradient.addColorStop(1, "rgba(80, 60, 40, 0.6)");
      ctx.fillStyle = stageGradient;
      ctx.fillRect(canvas.width * 0.25, stageY, canvas.width * 0.5, 15);

      // 時計
      const clockX = canvas.width * 0.5;
      const clockY = canvas.height * 0.12;
      ctx.fillStyle = "rgba(50, 50, 50, 0.7)";
      ctx.beginPath();
      ctx.arc(clockX, clockY, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(40, 40, 40, 0.8)";
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.fillStyle = "rgba(240, 240, 240, 0.9)";
      ctx.beginPath();
      ctx.arc(clockX, clockY, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(30, 30, 30, 0.9)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(clockX, clockY);
      ctx.lineTo(clockX + 8, clockY - 8);
      ctx.stroke();
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(clockX, clockY);
      ctx.lineTo(clockX + 3, clockY + 10);
      ctx.stroke();
    }

    // ボール
    const drawBall = (zOffset, side, vanishPointY) => {
      const ballZ = zOffset + offset;
      const ballProgress = (ballZ % 2000) / 2000;

      if (ballProgress > 0.1 && ballProgress < 1) {
        const scale = ballProgress;
        const baseY = vanishPointY + (canvas.height - vanishPointY) * scale;
        const lateralDist = canvas.width * 0.45 * scale;
        const ballX =
          side === "left"
            ? canvas.width / 2 - lateralDist
            : canvas.width / 2 + lateralDist;

        const ballSize = 25 * scale;

        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        ctx.beginPath();
        ctx.ellipse(ballX, baseY, ballSize, ballSize * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();

        const grad = ctx.createRadialGradient(
          ballX - ballSize * 0.3,
          baseY - ballSize * 1.3,
          ballSize * 0.1,
          ballX,
          baseY - ballSize,
          ballSize
        );
        grad.addColorStop(0, "#ff9d5c");
        grad.addColorStop(1, "#8b4513");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(ballX, baseY - ballSize, ballSize, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(0, 0, 0, 0.4)";
        ctx.lineWidth = Math.max(0.5, 1.5 * scale);
        ctx.beginPath();
        ctx.arc(ballX, baseY - ballSize, ballSize, 0.2, Math.PI - 0.2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(ballX - ballSize, baseY - ballSize);
        ctx.lineTo(ballX + ballSize, baseY - ballSize);
        ctx.stroke();
      }
    };

    // 跳び箱
    const drawVaultingBox = (zOffset, side, vanishPointY) => {
      const vaultZ = zOffset + offset;
      const vaultProgress = (vaultZ % 2000) / 2000;

      if (vaultProgress > 0.3 && vaultProgress < 1) {
        const scale = vaultProgress;
        const baseY = vanishPointY + (canvas.height - vanishPointY) * scale;
        const lateralOffset = 750 * scale;
        const baseWidth = 350 * scale;
        const vaultX =
          side === "left"
            ? canvas.width / 2 - baseWidth - lateralOffset
            : canvas.width / 2 + lateralOffset;

        const levels = 8;
        const boxH = 32 * scale;

        for (let j = levels - 1; j >= 0; j--) {
          const yPos = baseY - (levels - 1 - j) * boxH;
          const widthShift = j * (15 * scale);
          const currentW = baseWidth + widthShift;
          const currentX = vaultX - widthShift / 2;

          if (j === 0) {
            ctx.fillStyle = "#E8E2D0";
            ctx.beginPath();
            ctx.roundRect(currentX, yPos, currentW, boxH, 10 * scale);
            ctx.fill();
            ctx.strokeStyle = "rgba(0,0,0,0.1)";
            ctx.stroke();
          } else {
            const grad = ctx.createLinearGradient(
              currentX,
              yPos,
              currentX,
              yPos + boxH
            );
            grad.addColorStop(0, "#C68E5A");
            grad.addColorStop(1, "#A47142");
            ctx.fillStyle = grad;
            ctx.fillRect(currentX, yPos, currentW, boxH);

            ctx.fillStyle = "rgba(0,0,0,0.2)";
            const holeW = 40 * scale;
            const holeH = 10 * scale;
            ctx.fillRect(
              currentX + 20 * scale,
              yPos + boxH / 2 - holeH / 2,
              holeW,
              holeH
            );
            ctx.fillRect(
              currentX + currentW - 20 * scale - holeW,
              yPos + boxH / 2 - holeH / 2,
              holeW,
              holeH
            );
          }
          ctx.strokeStyle = "rgba(60, 40, 20, 0.4)";
          ctx.lineWidth = 1 * scale;
          ctx.strokeRect(currentX, yPos, currentW, boxH);
        }
      }
    };

    // マット
    const drawMat = (zOffset, vanishPointY) => {
      const matZ = zOffset + offset;
      const matProgress = (matZ % 2000) / 2000;

      if (matProgress > 0.3 && matProgress < 1) {
        const scale = matProgress;
        const baseY = vanishPointY + (canvas.height - vanishPointY) * scale;
        const matW = 500 * scale;
        const matH = 40 * scale;
        const matX = canvas.width / 2 + 750 * scale;

        const matGrad = ctx.createLinearGradient(
          matX,
          baseY,
          matX,
          baseY + matH
        );
        matGrad.addColorStop(0, "#4A7856");
        matGrad.addColorStop(1, "#355A3F");

        ctx.fillStyle = matGrad;
        ctx.beginPath();
        ctx.roundRect(matX, baseY - matH, matW, matH, 4 * scale);
        ctx.fill();

        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.lineWidth = 2 * scale;
        ctx.beginPath();
        ctx.moveTo(matX, baseY - matH / 2);
        ctx.lineTo(matX + matW, baseY - matH / 2);
        ctx.stroke();

        ctx.fillStyle = "#6B4226";
        const cornerSize = 15 * scale;
        ctx.fillRect(matX, baseY - matH, cornerSize, cornerSize);
        ctx.fillRect(
          matX + matW - cornerSize,
          baseY - matH,
          cornerSize,
          cornerSize
        );
      }
    };

    // 全体描画ループ
    function drawGym() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGymBackground();

      const aisleWidth = canvas.width * 0.6;
      const vanishPointY = canvas.height * 0.48;

      // コートライン
      for (let i = 0; i < 150; i++) {
        const z = i * 15 + offset;
        const progress = (z % 2000) / 2000;
        if (progress > 1 || progress < 0) continue;
        const scale = progress;
        const y = vanishPointY + (canvas.height - vanishPointY) * scale;
        const w = aisleWidth * scale;

        if (Math.floor(z / 100) % 2 === 0) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
          const lineWidth = Math.max(2, 12 * scale);
          const lineThickness = Math.max(2, 20 * scale);
          ctx.fillRect(
            canvas.width / 2 - lineWidth / 2,
            y,
            lineWidth,
            lineThickness
          );
        }

        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        const sideWidth = Math.max(1, w * 0.04);
        const sideThickness = Math.max(2, 20 * scale);
        ctx.fillRect(canvas.width / 2 - w / 2, y, sideWidth, sideThickness);
        ctx.fillRect(
          canvas.width / 2 + w / 2 - sideWidth,
          y,
          sideWidth,
          sideThickness
        );
      }

      // オブジェクト
      drawBall(100, "left", vanishPointY);
      drawBall(600, "right", vanishPointY);
      drawBall(1100, "left", vanishPointY);
      drawBall(1600, "right", vanishPointY);

      drawVaultingBox(800, "left", vanishPointY);
      drawMat(400, vanishPointY);
      drawVaultingBox(1400, "right", vanishPointY);

      // 敵
      if (enemy.spawning) {
        const progress = enemy.spawnProgress;
        drawSummonEffect(enemy.x, enemy.y, progress);
        drawEnemy(enemy.x, enemy.y, 1, progress, 0);
      } else if (enemy.alive) {
        const floatY =
          Math.sin(enemy.floatPhase) * 15 + Math.sin(enemy.wobblePhase) * 8;
        const breathe = Math.sin(time * 0.1) * 0.05 + 1;
        drawEnemy(enemy.x, enemy.y + floatY, breathe, 1, enemy.rotation);
      }
    }

    // アニメーションループ
    function animate() {
      offset += speed;
      if (offset >= 2000) offset = 0;
      time++;
      updateEnemy();
      drawGym();
      animationFrameId = requestAnimationFrame(animate);
    }

    spawnInterval = setInterval(() => {
      spawnEnemy();
    }, 2000);
    spawnTimeout = setTimeout(() => {
      spawnEnemy();
    }, 100);

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
      clearInterval(spawnInterval);
      clearTimeout(spawnTimeout);
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
        zIndex: -1, // UIの後ろに配置
        background: "#000",
      }}
    />
  );
};

export default BossStage;
