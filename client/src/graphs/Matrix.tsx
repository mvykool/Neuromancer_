import React, { useEffect, useRef } from "react";

interface MatrixTerminalProps {
  title?: string;
}

const MatrixTerminal: React.FC<MatrixTerminalProps> = ({
  title = "Matrix Terminal",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match container with pixel ratio adjustment for crisp text
    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      if (container) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = container.clientWidth * dpr;
        canvas.height = container.clientHeight * dpr;

        // Scale all drawing operations
        ctx.scale(dpr, dpr);

        // Set CSS size
        canvas.style.width = `${container.clientWidth}px`;
        canvas.style.height = `${container.clientHeight}px`;
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Matrix character set
    const chars =
      "abcdefghijklmnopqrstuvwxyz0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const charArray = chars.split("");

    // Font settings
    const fontSize = 10; // Smaller font size
    const fontFamily = '"Courier New", Courier, monospace'; // Better terminal font
    const columns = Math.floor(
      canvas.width / (window.devicePixelRatio || 1) / fontSize,
    );

    // Initialize drops
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -20);
    }

    // Main animation function
    const draw = () => {
      // Background with semi-transparent black for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(
        0,
        0,
        canvas.width / (window.devicePixelRatio || 1),
        canvas.height / (window.devicePixelRatio || 1),
      );

      // Set text style
      ctx.fillStyle = "#0F0"; // Matrix green
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.textRendering = "geometricPrecision"; // Sharper text rendering

      // Draw the characters
      for (let i = 0; i < drops.length; i++) {
        // Get random character
        const char = charArray[Math.floor(Math.random() * charArray.length)];

        // Draw the character
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Randomly reset drop to top when it reaches bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
      }

      // Add occasional white letters for authenticity
      if (Math.random() > 0.95) {
        const col = Math.floor(Math.random() * columns);
        const row = Math.floor(Math.random() * (canvas.height / fontSize));

        ctx.fillStyle = "#FFF";
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(char, col * fontSize, row * fontSize);
      }
    };

    // Animation loop
    const interval = setInterval(draw, 80);

    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  return (
    <div className="w-full h-[40vh] flex flex-col border border-green-500 bg-black  overflow-hidden">
      {/* Terminal title bar */}
      <div className="flex items-center px-4 py-2 bg-green-800 border-b border-green-500">
        <div className="flex space-x-2 mr-2"></div>
        <div className="text-green-100 font-mono text-sm flex-1 text-center">
          {title}
        </div>
      </div>

      {/* Matrix rain container */}
      <div className="flex-1 overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
};

export default MatrixTerminal;
