import React, { useEffect, useRef } from "react";

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;

    const particles = Array.from({ length: 150 }, () => {
      const depth = Math.random();
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: depth,
        size: Math.random() * 2 + 0.5 + depth * 2,
        speedX: (Math.random() - 0.5) * 0.3 * (1 + depth),
        speedY: (Math.random() - 0.5) * 0.2 + 0.1,
        opacity: Math.random() * 0.4 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.02,
      };
    });

    function drawParticles() {
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < -50) p.x = canvas.width + 50;
        if (p.x > canvas.width + 50) p.x = -50;
        if (p.y > canvas.height + 50) {
          p.y = -50;
          p.x = Math.random() * canvas.width;
        }
        const pulse = Math.sin(time * p.pulseSpeed + p.x * 0.01) * 0.4 + 0.6;
        const size = p.size * (0.5 + p.z * 0.5);
        ctx.fillStyle = `rgba(0, 200, 255, ${
          p.opacity * pulse * (0.3 + p.z * 0.7)
        })`;
        ctx.shadowBlur = 8 + p.z * 8;
        ctx.shadowColor = "#00CCFF";
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    }

    function animate() {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 透明背景
      drawParticles();
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "transparent", // ← ここで透明に
        zIndex: 0, // Quizより下に表示
      }}
    />
  );
}
