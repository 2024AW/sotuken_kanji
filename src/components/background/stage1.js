import React, { useEffect, useRef } from "react";

const Stage1 = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let spawnInterval;

    // キャンバスサイズ設定
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    // --- 変数定義 ---
    let time = 0;

    // 画像読み込み設定
    const images = {};
    let imagesLoaded = 0;
    const requiredImages = {
      portraitLeft: "/images/famous/バッハ.jpg",
      portraitRight: "/images/famous/ベートーヴェン.jpg",
    };
    const totalImages = Object.keys(requiredImages).length;
    let isReady = false;

    // 画像プリロード
    for (let key in requiredImages) {
      const img = new Image();
      img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === totalImages) isReady = true;
      };
      img.onerror = () => {
        console.warn(`画像が見つかりません: ${requiredImages[key]}`);
        imagesLoaded++;
        if (imagesLoaded === totalImages) isReady = true;
      };
      img.src = encodeURI(requiredImages[key]);
      images[key] = img;
    }

    // パーティクル初期設定
    const dustParticles = [];
    for (let i = 0; i < 40; i++) {
      dustParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random(),
      });
    }

    const musicalNotes = ["♪", "♫", "♬", "♩", "♯", "♭"];
    const noteParticles = [];

    // 敵キャラクター設定
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

    // 敵スポーンロジック
    const spawnEnemy = () => {
      if (!enemy.spawning && !enemy.alive) {
        enemy.spawning = true;
        enemy.spawnProgress = 0;
        enemy.x = canvas.width / 2;
        enemy.y = canvas.height * 0.35;
      }
    };
    spawnInterval = setInterval(spawnEnemy, 3000);

    // 敵更新ロジック
    const updateEnemy = () => {
      if (enemy.spawning) {
        enemy.spawnProgress++;
        if (enemy.spawnProgress >= enemy.spawnDuration) {
          enemy.spawning = false;
          enemy.alive = true;
          enemy.despawnTimer = 1500;
        }
      }
      if (enemy.alive) {
        enemy.despawnTimer--;
        enemy.moveTimer--;
        if (enemy.moveTimer <= 0) {
          enemy.moveTimer = Math.random() * 120 + 60;
          const centerX = canvas.width / 2,
            centerY = canvas.height * 0.35;
          enemy.targetX =
            centerX + (Math.random() - 0.5) * (canvas.width * 0.3);
          enemy.targetY =
            centerY + (Math.random() - 0.5) * (canvas.height * 0.15);
        }
        const dx = enemy.targetX - enemy.x,
          dy = enemy.targetY - enemy.y;
        enemy.velocityX += dx * 0.001;
        enemy.velocityY += dy * 0.001;
        enemy.velocityX *= 0.95;
        enemy.velocityY *= 0.95;
        enemy.x += enemy.velocityX;
        enemy.y += enemy.velocityY;
        enemy.floatPhase += 0.02;
        enemy.wobblePhase += 0.03;
        if (enemy.despawnTimer <= 0) enemy.alive = false;
      }
    };

    // --- 描画関数群 (省略: 元のコードと同じ) ---
    // (drawMovingLongRug, drawImagePortrait, drawBlackboard, drawAdditionalInstruments,
    //  drawChandelier, drawPlant, drawAward, drawRealisticWindows, drawMusicStand,
    //  drawCleanRoom, drawUltraRealPiano, drawEnemy, drawLightShaftsAndParticles)
    // ※長くなるため、ここには記載しませんが、元のコードのまま維持してください。

    // 動く長い絨毯
    const drawMovingLongRug = () => {
      const vanishY = canvas.height * 0.48;
      const centerX = canvas.width / 2;
      const bottomWidth = 600;
      const topWidth = 60;

      ctx.save();
      const rugGrad = ctx.createLinearGradient(0, vanishY, 0, canvas.height);
      rugGrad.addColorStop(0, "#7d1111");
      rugGrad.addColorStop(1, "#4a0a0a");
      ctx.fillStyle = rugGrad;
      ctx.beginPath();
      ctx.moveTo(centerX - topWidth, vanishY);
      ctx.lineTo(centerX + topWidth, vanishY);
      ctx.lineTo(centerX + bottomWidth, canvas.height);
      ctx.lineTo(centerX - bottomWidth, canvas.height);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = "#daa520";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(centerX - topWidth, vanishY);
      ctx.lineTo(centerX - bottomWidth, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(centerX + topWidth, vanishY);
      ctx.lineTo(centerX + bottomWidth, canvas.height);
      ctx.stroke();

      ctx.strokeStyle = "rgba(218, 165, 32, 0.5)";
      ctx.lineWidth = 3;
      const numLines = 12;
      const speed = time * 0.005;
      for (let i = 0; i < numLines; i++) {
        let progress = (speed + i / numLines) % 1;
        let lineY =
          vanishY + Math.pow(progress, 1.8) * (canvas.height - vanishY);
        let currentWidth = topWidth + progress * (bottomWidth - topWidth);

        if (progress > 0.02) {
          ctx.beginPath();
          ctx.moveTo(centerX - currentWidth * 0.8, lineY);
          ctx.lineTo(centerX + currentWidth * 0.8, lineY);
          ctx.stroke();
        }
      }
      ctx.restore();
    };

    // 肖像画
    const drawImagePortrait = (imgKey, x, y, w, h) => {
      ctx.save();
      ctx.fillStyle = "#5c3317";
      ctx.fillRect(x - 5, y - 5, w + 10, h + 10);
      ctx.strokeStyle = "#d4af37";
      ctx.lineWidth = 3;
      ctx.strokeRect(x - 3, y - 3, w + 6, h + 6);

      const img = images[imgKey];
      if (img && img.complete && img.naturalWidth !== 0) {
        const scale = Math.min(w / img.width, h / img.height);
        const drawW = img.width * scale;
        const drawH = img.height * scale;
        const drawX = x + (w - drawW) / 2;
        const drawY = y + (h - drawH) / 2;

        ctx.fillStyle = "#1a1a2e";
        ctx.fillRect(x, y, w, h);
        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          drawX,
          drawY,
          drawW,
          drawH
        );
      } else {
        ctx.fillStyle = "#333";
        ctx.fillRect(x, y, w, h);
        ctx.fillStyle = "#555";
        ctx.fillRect(x + 10, y + 10, w - 20, h - 20);
      }
      ctx.restore();
    };

    // 黒板
    const drawBlackboard = () => {
      const bbW = canvas.width * 0.3;
      const bbH = canvas.height * 0.15;
      const bbX = canvas.width / 2 - bbW / 2;
      const bbY = canvas.height * 0.12;

      ctx.save();
      ctx.fillStyle = "#6b4423";
      ctx.fillRect(bbX - 5, bbY - 5, bbW + 10, bbH + 10);
      ctx.fillStyle = "#2F4F2F";
      ctx.fillRect(bbX, bbY, bbW, bbH);
      ctx.fillStyle = "#5c3317";
      ctx.fillRect(bbX - 5, bbY + bbH, bbW + 10, 8);
      ctx.fillStyle = "#fff";
      ctx.fillRect(bbX + 20, bbY + bbH + 2, 30, 4);
      ctx.fillStyle = "#444";
      ctx.fillRect(bbX + bbW - 50, bbY + bbH - 2, 40, 8);
      ctx.fillStyle = "#8B4513";
      ctx.fillRect(bbX + bbW - 50, bbY + bbH + 4, 40, 2);

      ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
      ctx.lineWidth = 1.5;
      const startX = bbX + 20;
      const endX = bbX + bbW - 20;
      const startY = bbY + 30;
      const lineGap = 10;

      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(startX, startY + i * lineGap);
        ctx.lineTo(endX, startY + i * lineGap);
        ctx.stroke();
      }
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.font = "30px serif";
      ctx.fillText("∮", startX, startY + lineGap * 3);

      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      const notes = [0, 2, 1, 3, 2, 4, 3, 1];
      for (let i = 0; i < notes.length; i++) {
        const nx = startX + 40 + i * 30;
        const ny = startY + notes[i] * lineGap;
        ctx.beginPath();
        ctx.ellipse(nx, ny, 5, 4, 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(nx + 4, ny);
        ctx.lineTo(nx + 4, ny - 25);
        ctx.stroke();
      }
      ctx.restore();
    };

    // 楽器群
    const drawAdditionalInstruments = () => {
      ctx.save();

      // 1. ハープ
      ctx.save();
      ctx.translate(canvas.width * 0.15, canvas.height * 0.55);
      const hs = 0.8;
      const pillarGrad = ctx.createLinearGradient(-20 * hs, 0, 0, 0);
      pillarGrad.addColorStop(0, "#5c3317");
      pillarGrad.addColorStop(1, "#8B4513");
      ctx.fillStyle = pillarGrad;
      ctx.beginPath();
      ctx.moveTo(-15 * hs, -100 * hs);
      ctx.lineTo(0, -100 * hs);
      ctx.lineTo(5 * hs, 40 * hs);
      ctx.lineTo(-20 * hs, 40 * hs);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-15 * hs, -100 * hs);
      ctx.bezierCurveTo(
        10 * hs,
        -130 * hs,
        50 * hs,
        -130 * hs,
        80 * hs,
        -80 * hs
      );
      ctx.lineWidth = 12 * hs;
      ctx.strokeStyle = "#5c3317";
      ctx.stroke();
      ctx.lineWidth = 2 * hs;
      ctx.strokeStyle = "#d4af37";
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(80 * hs, -80 * hs);
      ctx.quadraticCurveTo(40 * hs, 0, 10 * hs, 110 * hs);
      ctx.lineTo(-15 * hs, 40 * hs);
      ctx.closePath();
      const bodyGrad = ctx.createLinearGradient(0, -80 * hs, 0, 110 * hs);
      bodyGrad.addColorStop(0, "#A0522D");
      bodyGrad.addColorStop(0.5, "#CD853F");
      bodyGrad.addColorStop(1, "#8B4513");
      ctx.fillStyle = bodyGrad;
      ctx.fill();
      ctx.lineWidth = 3 * hs;
      ctx.strokeStyle = "#5c3317";
      ctx.stroke();
      ctx.strokeStyle = "#F0F0F0";
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = "#d4af37";
      for (let i = 0; i < 16; i++) {
        ctx.beginPath();
        const t = i / 15;
        const sx = -10 * hs + t * 80 * hs;
        const sy = -105 * hs + Math.sin(t * Math.PI) * -20 * hs;
        const ex = 10 * hs + t * 5 * hs;
        const ey = 90 * hs - t * 130 * hs;
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(sx, sy - 5 * hs, 2 * hs, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 2. クラシックギター
      ctx.save();
      ctx.translate(canvas.width * 0.18, canvas.height * 0.82);
      ctx.rotate(Math.PI / 8);
      const gs = 1.2;
      const guitarGrad = ctx.createRadialGradient(0, 0, 5 * gs, 0, 0, 45 * gs);
      guitarGrad.addColorStop(0, "#FFA07A");
      guitarGrad.addColorStop(0.7, "#CD853F");
      guitarGrad.addColorStop(1, "#8B4513");
      ctx.fillStyle = guitarGrad;
      ctx.beginPath();
      ctx.ellipse(0, 18 * gs, 32 * gs, 42 * gs, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(0, -22 * gs, 26 * gs, 32 * gs, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#1a0a00";
      ctx.beginPath();
      ctx.arc(0, -5 * gs, 11 * gs, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#d4af37";
      ctx.lineWidth = 2 * gs;
      ctx.stroke();
      ctx.fillStyle = "#3d1f00";
      ctx.fillRect(-15 * gs, 40 * gs, 30 * gs, 8 * gs);
      ctx.fillStyle = "#fff";
      ctx.fillRect(-15 * gs, 42 * gs, 30 * gs, 2 * gs);
      ctx.fillStyle = "#5c3317";
      ctx.fillRect(-9 * gs, -100 * gs, 18 * gs, 85 * gs);
      ctx.fillStyle = "#2a1a0a";
      ctx.fillRect(-8 * gs, -100 * gs, 16 * gs, 85 * gs);
      ctx.strokeStyle = "#C0C0C0";
      ctx.lineWidth = 1.5 * gs;
      for (let i = 0; i < 12; i++) {
        const fy = -95 * gs + i * 7 * gs;
        ctx.beginPath();
        ctx.moveTo(-8 * gs, fy);
        ctx.lineTo(8 * gs, fy);
        ctx.stroke();
      }
      ctx.fillStyle = "#5c3317";
      ctx.fillRect(-10 * gs, -135 * gs, 20 * gs, 35 * gs);
      ctx.fillStyle = "#fff";
      for (let i = 0; i < 3; i++) {
        ctx.fillRect(-14 * gs, -130 * gs + i * 10 * gs, 4 * gs, 6 * gs);
        ctx.fillRect(10 * gs, -130 * gs + i * 10 * gs, 4 * gs, 6 * gs);
      }
      ctx.restore();

      // 3. トライアングル
      ctx.save();
      ctx.translate(canvas.width * 0.73, canvas.height * 0.35);
      ctx.strokeStyle = "#aaa";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -40);
      ctx.lineTo(0, -10);
      ctx.stroke();
      const triGrad = ctx.createLinearGradient(-20, -10, 20, 40);
      triGrad.addColorStop(0, "#E0E0E0");
      triGrad.addColorStop(0.5, "#FFFFFF");
      triGrad.addColorStop(1, "#C0C0C0");
      ctx.strokeStyle = triGrad;
      ctx.lineWidth = 5;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.shadowColor = "#fff";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(0, -10);
      ctx.lineTo(-25, 40);
      ctx.lineTo(25, 40);
      ctx.closePath();
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.save();
      ctx.translate(15, 35);
      ctx.rotate(Math.sin(time * 0.05) * 0.2);
      ctx.strokeStyle = "#D0D0D0";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 35);
      ctx.stroke();
      ctx.restore();
      ctx.restore();

      ctx.restore();
    };

    const drawChandelier = () => {
      const cx = canvas.width / 2;
      const cy = 0;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.strokeStyle = "#daa520";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 40);
      ctx.stroke();
      ctx.fillStyle = "#b8860b";
      ctx.beginPath();
      ctx.arc(0, 40, 30, 0, Math.PI, false);
      ctx.fill();
      const lightCount = 5;
      for (let i = 0; i < lightCount; i++) {
        const lx = -30 + i * 15;
        const ly = 45 + Math.sin(time * 0.05 + i) * 2;
        ctx.fillStyle = "#fffacd";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#ffff00";
        ctx.beginPath();
        ctx.arc(lx, ly, 6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const drawPlant = () => {
      const px = canvas.width * 0.1;
      const py = canvas.height * 0.85;
      ctx.save();
      ctx.fillStyle = "#5d4037";
      ctx.beginPath();
      ctx.moveTo(px - 15, py);
      ctx.lineTo(px + 15, py);
      ctx.lineTo(px + 10, py + 30);
      ctx.lineTo(px - 10, py + 30);
      ctx.fill();
      ctx.fillStyle = "#2e7d32";
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.ellipse(
          px,
          py - 10,
          8,
          25,
          (i * Math.PI) / 3 + Math.sin(time * 0.02),
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
      ctx.restore();
    };

    const drawAward = () => {
      const ax = canvas.width * 0.92;
      const ay = canvas.height * 0.15;
      ctx.save();
      ctx.fillStyle = "#ffd700";
      ctx.fillRect(ax, ay, 40, 50);
      ctx.fillStyle = "#fffaf0";
      ctx.fillRect(ax + 3, ay + 3, 34, 44);
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(ax + 10, ay + 15);
      ctx.lineTo(ax + 30, ay + 15);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(ax + 10, ay + 25);
      ctx.lineTo(ax + 30, ay + 25);
      ctx.stroke();
      ctx.restore();
    };

    const drawRealisticWindows = () => {
      const windowCount = 3;
      const winW = canvas.width * 0.08;
      const winH = canvas.height * 0.22;
      const startX = canvas.width * 0.05;
      const spacing = canvas.width * 0.35;
      for (let i = 0; i < windowCount; i++) {
        if (i === 1) continue;
        const x = startX + i * spacing;
        const y = canvas.height * 0.08;
        ctx.fillStyle = "#3a2a1a";
        ctx.fillRect(x - 6, y - 6, winW + 12, winH + 12);
        const glassGrad = ctx.createLinearGradient(x, y, x, y + winH);
        glassGrad.addColorStop(0, "#87ceeb");
        glassGrad.addColorStop(1, "#e0f7ff");
        ctx.fillStyle = glassGrad;
        ctx.fillRect(x, y, winW, winH);
        ctx.fillStyle = "#4a3a2a";
        ctx.fillRect(x + winW / 2 - 2, y, 4, winH);
        ctx.fillRect(x, y + winH / 2 - 2, winW, 4);
        ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + winW * 0.5, y);
        ctx.lineTo(x, y + winH * 0.6);
        ctx.fill();
      }
    };

    const drawMusicStand = () => {
      ctx.save();
      ctx.translate(canvas.width * 0.62, canvas.height * 0.82);
      const s = 1.0;
      ctx.strokeStyle = "#222";
      ctx.lineWidth = 4 * s;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -70 * s);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-15 * s, 15 * s);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(15 * s, 15 * s);
      ctx.stroke();
      ctx.fillStyle = "#111";
      ctx.beginPath();
      ctx.moveTo(-35 * s, -70 * s);
      ctx.lineTo(35 * s, -80 * s);
      ctx.lineTo(35 * s, -35 * s);
      ctx.lineTo(-35 * s, -25 * s);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.fillRect(-28 * s, -65 * s, 22 * s, 32 * s);
      ctx.fillRect(4 * s, -70 * s, 22 * s, 32 * s);
      ctx.restore();
    };

    const drawCleanRoom = () => {
      const vanishPointY = canvas.height * 0.48;
      const wallGrad = ctx.createLinearGradient(0, 0, 0, vanishPointY);
      wallGrad.addColorStop(0, "#c9bfab");
      wallGrad.addColorStop(1, "#f5efdf");
      ctx.fillStyle = wallGrad;
      ctx.fillRect(0, 0, canvas.width, vanishPointY);
      const floorGrad = ctx.createLinearGradient(
        0,
        vanishPointY,
        0,
        canvas.height
      );
      floorGrad.addColorStop(0, "#7a4a21");
      floorGrad.addColorStop(1, "#2b1a0a");
      ctx.fillStyle = floorGrad;
      ctx.fillRect(0, vanishPointY, canvas.width, canvas.height - vanishPointY);
      ctx.save();
      ctx.strokeStyle = "rgba(0, 0, 0, 0.15)";
      ctx.lineWidth = 2;
      for (let i = 0; i < 8; i++) {
        let progress = ((time * 0.5 + i * 25) % 200) / 200;
        let lineY =
          vanishPointY + Math.pow(progress, 2) * (canvas.height - vanishPointY);
        ctx.beginPath();
        ctx.moveTo(0, lineY);
        ctx.lineTo(canvas.width, lineY);
        ctx.stroke();
      }
      const centerX = canvas.width / 2;
      for (let i = -10; i <= 10; i++) {
        if (Math.abs(i) < 2) continue;
        ctx.beginPath();
        ctx.moveTo(centerX + i * 10, vanishPointY);
        ctx.lineTo(centerX + i * 800, canvas.height);
        ctx.stroke();
      }
      ctx.restore();
      drawMovingLongRug();
    };

    const drawUltraRealPiano = () => {
      ctx.save();
      ctx.translate(canvas.width * 0.8, canvas.height * 0.75);
      const s = 1.4;
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.beginPath();
      ctx.ellipse(0, 70 * s, 170 * s, 45 * s, 0, 0, Math.PI * 2);
      ctx.fill();
      const legs = [
        { x: -85, y: 15 },
        { x: 45, y: 45 },
        { x: -100, y: 45 },
      ];
      legs.forEach((l) => {
        ctx.fillStyle = "#0a0a0a";
        ctx.fillRect(l.x * s, l.y * s, 12 * s, 55 * s);
        ctx.fillStyle = "#daa520";
        ctx.fillRect(l.x * s, (l.y + 55) * s, 12 * s, 5 * s);
      });
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.moveTo(-105 * s, 0);
      ctx.lineTo(65 * s, 0);
      ctx.quadraticCurveTo(105 * s, 35 * s, 95 * s, 75 * s);
      ctx.lineTo(-105 * s, 75 * s);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#111";
      ctx.beginPath();
      ctx.moveTo(-105 * s, 0);
      ctx.lineTo(70 * s, -50 * s);
      ctx.quadraticCurveTo(120 * s, -15 * s, 100 * s, 35 * s);
      ctx.lineTo(-105 * s, 0);
      ctx.fill();
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "#080808";
      ctx.fillRect(-108 * s, 42 * s, 165 * s, 38 * s);
      const keyW = 6 * s;
      for (let i = 0; i < 26; i++) {
        ctx.fillStyle = "#fff";
        ctx.fillRect(-105 * s + i * keyW, 45 * s, keyW - 1, 22 * s);
      }
      ctx.fillStyle = "#000";
      for (let i = 0; i < 25; i++) {
        if (
          [0, 1, 3, 4, 5, 7, 8, 10, 11, 12, 14, 15, 17, 18, 19].includes(i % 21)
        ) {
          ctx.fillRect(-102 * s + i * keyW, 45 * s, keyW * 0.6, 14 * s);
        }
      }
      ctx.save();
      ctx.translate(-50 * s, 20 * s);
      ctx.fillStyle = "#4a2a1a";
      ctx.beginPath();
      ctx.moveTo(0, -30);
      ctx.lineTo(15, 20);
      ctx.lineTo(-15, 20);
      ctx.closePath();
      ctx.fill();
      const metroAngle = Math.sin(time * 0.15) * 0.6;
      ctx.save();
      ctx.translate(0, 15);
      ctx.rotate(metroAngle);
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -35);
      ctx.stroke();
      ctx.fillStyle = "#daa520";
      ctx.fillRect(-3, -30, 6, 6);
      ctx.restore();
      ctx.restore();
      ctx.restore();
    };

    const drawEnemy = (x, y, scale, spawnProgress, rotation) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      const size = 160 * scale;
      ctx.globalAlpha = spawnProgress;
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#4400ff";
      ctx.fillStyle = "#110022";
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.8);
      ctx.quadraticCurveTo(
        size * 0.5,
        0,
        size * 0.3,
        size * 0.6 + Math.sin(time * 0.1) * 10
      );
      ctx.lineTo(0, size * 0.2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.8);
      ctx.quadraticCurveTo(
        -size * 0.5,
        0,
        -size * 0.3,
        size * 0.6 + Math.cos(time * 0.1) * 10
      );
      ctx.lineTo(0, size * 0.2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.ellipse(0, -size * 0.75, size * 0.25, size * 0.3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#000033";
      ctx.font = `bold ${size * 0.4}px serif`;
      ctx.textAlign = "center";
      ctx.fillText("∮", 0, -size * 0.65);
      ctx.save();
      ctx.translate(size * 0.5, -size * 0.3);
      ctx.rotate(Math.sin(time * 0.1) * 0.5);
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(size * 0.4, -size * 0.2);
      ctx.stroke();
      ctx.restore();
      ctx.restore();
    };

    const drawLightShaftsAndParticles = () => {
      const spacing = canvas.width * 0.35;
      const winW = canvas.width * 0.08;
      ctx.save();
      for (let i = 0; i < 3; i++) {
        if (i === 1) continue;
        const x = canvas.width * 0.05 + i * spacing + winW / 2;
        const grad = ctx.createLinearGradient(x, 0, x + 150, canvas.height);
        grad.addColorStop(0, "rgba(255, 255, 220, 0.2)");
        grad.addColorStop(1, "rgba(255, 255, 220, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(x - 30, 0);
        ctx.lineTo(x + 30, 0);
        ctx.lineTo(x + 300, canvas.height);
        ctx.lineTo(x + 100, canvas.height);
        ctx.fill();
      }
      dustParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.fillStyle = `rgba(255, 255, 230, ${
          Math.abs(Math.sin(time * 0.01 + p.opacity)) * 0.4
        })`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      if (enemy.alive && time % 15 === 0) {
        noteParticles.push({
          x: enemy.x,
          y: enemy.y,
          text: musicalNotes[Math.floor(Math.random() * musicalNotes.length)],
          vx: (Math.random() - 0.5) * 2,
          vy: -Math.random() * 2 - 1,
          life: 1.0,
        });
      }
      noteParticles.forEach((n, i) => {
        n.x += n.vx;
        n.y += n.vy;
        n.life -= 0.01;
        ctx.globalAlpha = n.life;
        ctx.fillStyle = "#fff";
        ctx.font = "18px serif";
        ctx.fillText(n.text, n.x, n.y);
        if (n.life <= 0) noteParticles.splice(i, 1);
      });
      ctx.restore();
    };

    // --- メインアニメーションループ ---
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;
      updateEnemy();

      drawCleanRoom();
      drawBlackboard();
      drawAward();

      const portraitW = canvas.width * 0.08;
      const portraitH = canvas.height * 0.14;
      const portraitY = canvas.height * 0.12;

      // 肖像画
      drawImagePortrait(
        "portraitLeft",
        canvas.width * 0.25,
        portraitY,
        portraitW,
        portraitH
      );
      drawImagePortrait(
        "portraitRight",
        canvas.width * 0.655,
        portraitY,
        portraitW,
        portraitH
      );

      drawRealisticWindows();
      drawLightShaftsAndParticles();
      drawChandelier();
      drawPlant();
      drawAdditionalInstruments();
      drawMusicStand();
      drawUltraRealPiano();

      if (enemy.spawning || enemy.alive) {
        ctx.fillStyle = "rgba(0,0,0,0.15)";
        ctx.beginPath();
        ctx.ellipse(enemy.x, canvas.height * 0.88, 60, 15, 0, 0, Math.PI * 2);
        ctx.fill();
        if (enemy.spawning) {
          drawEnemy(
            enemy.x,
            enemy.y,
            1,
            enemy.spawnProgress / enemy.spawnDuration,
            0
          );
        } else {
          drawEnemy(
            enemy.x,
            enemy.y + Math.sin(enemy.floatPhase) * 15,
            1,
            1,
            0
          );
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // クリーンアップ
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(spawnInterval);
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="stage1-canvas"
      style={{
        display: "block",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        background: "#FDF5E6",
        opacity: 0.85, // ★少し透明に
      }}
    />
  );
};

export default Stage1;
