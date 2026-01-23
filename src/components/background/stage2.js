import React, { useEffect, useRef } from "react";

const Stage2 = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // ★重要: 描画解像度を固定（PC基準の高画質設定 16:9）
    const BASE_HEIGHT = 1080;
    const ASPECT_RATIO = 16 / 9;

    const setSize = () => {
      canvas.width = BASE_HEIGHT * ASPECT_RATIO; // 1920
      canvas.height = BASE_HEIGHT; // 1080
    };
    setSize();
    // リサイズイベントは不要になります（CSSで調整するため）

    // --- 変数定義 ---
    let time = 0;
    const particles = [];

    // 敵キャラクターの初期位置 (Canvasの固定サイズ基準)
    const enemy = { x: canvas.width / 2, y: canvas.height * 0.35 };

    // --- 粒子エフェクトクラス ---
    class AuraFragment {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.size = Math.random() * 4 + 1;
        this.life = 1.0;
        const rand = Math.random();
        this.color =
          rand > 0.6 ? "#22d3ee" : rand > 0.2 ? "#ffffff" : "#fbbf24";
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.97;
        this.vy *= 0.97;
        this.life -= 0.015;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.life); // 負の値にならないように
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // --- 描画関数群 ---
    // ※座標計算はすべて canvas.width / canvas.height (固定値) に依存するため
    //   スマホでもレイアウトが崩れません。

    // 知的なオーラを纏う眼球
    const drawEyeWithNewAura = (x, y, scale) => {
      ctx.save();
      const wobble = Math.sin(time * 0.05) * 8;
      const targetY = y + wobble;
      ctx.translate(x, targetY);
      ctx.scale(scale, scale);

      const pulse = Math.sin(time * 0.08) * 15;
      const bgGrad = ctx.createRadialGradient(0, 0, 30, 0, 0, 130 + pulse);
      bgGrad.addColorStop(0, "rgba(34, 211, 238, 0.3)");
      bgGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = bgGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 130 + pulse, 0, Math.PI * 2);
      ctx.fill();

      for (let i = 0; i < 3; i++) {
        ctx.save();
        ctx.rotate(time * 0.015 * (i + 1));
        ctx.strokeStyle =
          i % 2 === 0 ? "rgba(34, 211, 238, 0.5)" : "rgba(255, 255, 255, 0.3)";
        ctx.setLineDash([15, 30]);
        ctx.beginPath();
        ctx.ellipse(0, 0, 80 + i * 20, 35 + i * 15, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      ctx.shadowBlur = 25;
      ctx.shadowColor = "#22d3ee";
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(0, 0, 60, 0, Math.PI * 2);
      ctx.fill();

      const eyeX = Math.sin(time * 0.03) * 12;
      const eyeY = Math.cos(time * 0.03) * 6;
      ctx.fillStyle = "#b45309";
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (time % 3 === 0) particles.push(new AuraFragment(x, targetY));
    };

    // アイテム描画関数群
    const drawBeaker = (ctx, x, y, size) => {
      ctx.save();
      ctx.translate(x, y);
      const w = size * 0.8;
      const h = size * 1.2;
      const liquidLevel = Math.sin(time * 0.07) * 5;
      ctx.fillStyle = "rgba(50, 100, 255, 0.6)";
      ctx.fillRect(
        -w / 2 + 2,
        -h / 2 + liquidLevel,
        w - 4,
        h / 2 - liquidLevel
      );
      ctx.strokeStyle = "rgba(255,255,255,0.7)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-w / 2, -h);
      ctx.lineTo(-w / 2, 0);
      ctx.lineTo(w / 2, 0);
      ctx.lineTo(w / 2, -h);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(w / 2, -h);
      ctx.lineTo(w / 2 + 5, -h - 5);
      ctx.stroke();
      ctx.restore();
    };

    const drawTestTubes = (ctx, x, y, size) => {
      ctx.save();
      ctx.translate(x, y);
      const rackW = size * 1.5;
      const rackH = size * 0.8;
      ctx.fillStyle = "#8B4513";
      ctx.fillRect(-rackW / 2, -rackH, rackW, rackH);
      for (let i = -1; i <= 1; i++) {
        let tx = i * size * 0.4;
        let ty = -rackH + Math.sin(time * 0.1 + i) * 2;
        ctx.fillStyle =
          i === 0 ? "rgba(255,50,50,0.5)" : "rgba(255,255,50,0.5)";
        ctx.fillRect(tx - size * 0.1, ty - size * 0.8, size * 0.2, size * 1.5);
        ctx.strokeStyle = "rgba(255,255,255,0.8)";
        ctx.lineWidth = 1;
        ctx.strokeRect(
          tx - size * 0.1,
          ty - size * 0.8,
          size * 0.2,
          size * 1.5
        );
      }
      ctx.restore();
    };

    const drawPrettyFlask = (ctx, x, y, size) => {
      ctx.save();
      ctx.translate(x, y);
      const w = size;
      const h = size * 1.5;
      const neckW = size * 0.3;
      const neckH = size * 0.7;
      const wave = Math.sin(time * 0.1) * 2;
      ctx.fillStyle = "#10b981";
      ctx.beginPath();
      ctx.moveTo(-w * 0.7, 0);
      ctx.lineTo(w * 0.7, 0);
      ctx.lineTo(neckW * 0.4, -h * 0.4 + wave);
      ctx.lineTo(-neckW * 0.4, -h * 0.4 + wave);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
      ctx.lineWidth = 2;
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(-w, 0);
      ctx.lineTo(w, 0);
      ctx.lineTo(neckW, -neckH);
      ctx.lineTo(neckW, -h);
      ctx.lineTo(-neckW, -h);
      ctx.lineTo(-neckW, -neckH);
      ctx.closePath();
      ctx.stroke();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-w * 0.6, -size * 0.2);
      ctx.lineTo(-neckW * 0.8, -neckH);
      ctx.stroke();
      ctx.fillStyle = "#a16207";
      ctx.fillRect(-neckW * 1.1, -h - 5, neckW * 2.2, 8);
      ctx.restore();
    };

    // 奥にある白い薬品棚
    const drawRearChemicalShelves = (vanishY, bX, bW) => {
      const shelfColor = "#f3f4f6";
      const shadowColor = "#d1d5db";

      // 黒板の左右
      const shelfWidth = 200;
      const shelfHeight = 120;
      const shelfY = vanishY + 20;

      const leftShelfX = bX - shelfWidth - 20;
      const rightShelfX = bX + bW + 20;

      [leftShelfX, rightShelfX].forEach((sx, sideIdx) => {
        // 棚の枠
        ctx.fillStyle = shelfColor;
        ctx.fillRect(sx, shelfY - shelfHeight, shelfWidth, shelfHeight);
        ctx.strokeStyle = shadowColor;
        ctx.lineWidth = 3;
        ctx.strokeRect(sx, shelfY - shelfHeight, shelfWidth, shelfHeight);

        const numShelves = 3;
        const shelfGap = shelfHeight / numShelves;

        for (let i = 0; i < numShelves; i++) {
          const sy = shelfY - shelfHeight + shelfGap * (i + 1);

          // 棚板
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(sx + shelfWidth, sy);
          ctx.stroke();

          const numBottles = 6;
          for (let j = 0; j < numBottles; j++) {
            const seed = sideIdx * 100 + i * 10 + j;
            const rand1 = Math.abs(Math.sin(seed * 12.9898));
            const rand2 = Math.abs(Math.sin(seed * 78.233));

            const bx = sx + 15 + j * 30;
            const by = sy - 2;
            const bWidth = 20;
            const bHeight = 25 + rand1 * 10;

            const hue = rand2 * 360;
            ctx.fillStyle = `hsl(${hue}, 60%, 50%)`;
            ctx.fillRect(bx, by - bHeight, bWidth, bHeight);

            // 蓋
            ctx.fillStyle = "#374151";
            ctx.fillRect(bx + 2, by - bHeight - 5, bWidth - 4, 5);

            // ラベル
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(bx + 4, by - bHeight + 5, bWidth - 8, bHeight / 2);
          }
        }
      });
    };

    // 理科室の動く背景
    const drawScienceRoom = () => {
      const vY = canvas.height * 0.45;
      const cX = canvas.width / 2;
      const scrollSpeed = 0.005;
      const moveOffset = (time * scrollSpeed) % 1;

      // 背景
      ctx.fillStyle = "#e2e8f0";
      ctx.fillRect(0, 0, canvas.width, vY);
      const floorGrad = ctx.createLinearGradient(0, vY, 0, canvas.height);
      floorGrad.addColorStop(0, "#94a3b8");
      floorGrad.addColorStop(1, "#475569");
      ctx.fillStyle = floorGrad;
      ctx.fillRect(0, vY, canvas.width, canvas.height - vY);

      // 床のタイル
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.lineWidth = 2;
      for (let i = -8; i <= 8; i++) {
        ctx.beginPath();
        ctx.moveTo(cX + i * 200, canvas.height);
        ctx.lineTo(cX, vY);
        ctx.stroke();
      }

      // 黒板座標
      const bW = 600,
        bH = 180;
      const bX = cX - bW / 2,
        bY = 50;

      // 奥の薬品棚
      drawRearChemicalShelves(vY, bX, bW);

      // 黒板
      ctx.fillStyle = "#064e3b";
      ctx.fillRect(bX, bY, bW, bH);
      ctx.strokeStyle = "#78350f";
      ctx.lineWidth = 8;
      ctx.strokeRect(bX, bY, bW, bH);

      // 黒板の書き込み
      ctx.save();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.lineWidth = 1.2;
      // DNA
      ctx.beginPath();
      for (let t = 0; t < 65; t++) {
        let ty = bY + 35 + t * 1.8;
        let xOff = Math.sin(t * 0.25) * 12;
        ctx.moveTo(cX + xOff, ty);
        if (t % 8 === 0) ctx.lineTo(cX - xOff, ty);
      }
      ctx.stroke();
      // 公式
      ctx.font = "16px serif";
      ctx.fillText("E = mc²", bX + 40, bY + 120);
      ctx.fillText("H₂O", bX + bW - 80, bY + 50);
      // ベンゼン環
      const rx = bX + bW - 100,
        ry = bY + 120;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        let ang = (Math.PI / 3) * i;
        ctx.lineTo(rx + Math.cos(ang) * 22, ry + Math.sin(ang) * 22);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(rx, ry, 14, 0, Math.PI * 2);
      ctx.stroke();
      // レンズ
      ctx.beginPath();
      ctx.ellipse(bX + 80, bY + 60, 8, 22, 0, 0, Math.PI * 2);
      ctx.moveTo(bX + 40, bY + 45);
      ctx.lineTo(bX + 120, bY + 75);
      ctx.moveTo(bX + 40, bY + 75);
      ctx.lineTo(bX + 120, bY + 45);
      ctx.stroke();
      ctx.restore();

      // 机とアイテム
      const itemDrawers = [drawPrettyFlask, drawBeaker, drawTestTubes];
      const positions = [0.25, 0.5, 0.75];
      const aisleWidth = 350;

      for (let i = 0; i < 6; i++) {
        let zRaw = i / 5 - moveOffset;
        if (zRaw < 0) zRaw += 1.2;
        let z = zRaw * 0.8 + 0.2;
        const ty = vY + Math.pow(zRaw, 2) * (canvas.height - vY);
        if (ty < vY) continue;

        [-1, 1].forEach((side) => {
          const w = 500 * z;
          const h = 25 * z;
          const tx =
            side === 1 ? cX + aisleWidth * zRaw : cX - aisleWidth * zRaw - w;

          ctx.save();
          ctx.globalAlpha = Math.min(1, zRaw * 2);
          ctx.fillStyle = "#1e293b";
          ctx.fillRect(tx, ty, w, h);
          ctx.fillStyle = "#334155";
          ctx.fillRect(tx, ty + h, w, 50 * z);

          if (zRaw > 0.3) {
            const itemSize = 30 * z;
            const pseudoRand = Math.abs(Math.sin(i * 13.7 + side * 3.1 + 5));
            let numItems;
            if (pseudoRand < 0.33) numItems = 1;
            else if (pseudoRand < 0.66) numItems = 2;
            else numItems = 3;
            for (let k = 0; k < numItems; k++) {
              const typeRand = Math.abs(
                Math.sin(i * 19.3 + side * 7.1 + k * 4.7)
              );
              const itemTypeIndex = Math.floor(typeRand * 3);
              const posOffset = positions[k];
              itemDrawers[itemTypeIndex](ctx, tx + w * posOffset, ty, itemSize);
            }
          }
          ctx.restore();
        });
      }
    };

    // --- メインアニメーションループ ---
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      drawScienceRoom();

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0) particles.splice(i, 1);
      }

      drawEyeWithNewAura(enemy.x, enemy.y, 1.1);

      animationFrameId = requestAnimationFrame(render);
    };

    // 初期化
    // setSize(); // ← これは不要
    render();

    // クリーンアップ
    return () => {
      cancelAnimationFrame(animationFrameId);
      // window.removeEventListener("resize", setSize); // ← これも不要
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="stage2-canvas"
      style={{
        display: "block",
        position: "fixed",
        top: 0,
        left: "50%", // 中央寄せ
        transform: "translateX(-50%)", // 中央寄せ
        width: "100%", // PCでは幅100%
        height: "100%", // PCでは高さ100%
        zIndex: -1,
        background: "#FDF5E6",
        opacity: 0.9,
        // PC版: 横幅最大（CSS側で制御される前提）
        maxWidth: "100%",
      }}
    />
  );
};

export default Stage2;
