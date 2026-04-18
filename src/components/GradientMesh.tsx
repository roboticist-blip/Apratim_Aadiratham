import * as React from "react";

export function GradientMesh() {
  const [isClient, setIsClient] = React.useState(false);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const animationRef = React.useRef<number | undefined>(undefined);
  const mouseRef = React.useRef({ x: 0, y: 0 });
  const meshRef = React.useRef<{
    points: Array<{ x: number; y: number }>;
    velocity: Array<{ x: number; y: number }>;
  }>({
    points: [],
    velocity: [],
  });

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  React.useEffect(() => {
    if (!isClient) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize mesh grid
    const gridSize = 5; // 5x5 grid
    const points: Array<{ x: number; y: number }> = [];
    const velocity: Array<{ x: number; y: number }> = [];

    const cellWidth = canvas.width / (gridSize - 1);
    const cellHeight = canvas.height / (gridSize - 1);

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        points.push({
          x: i * cellWidth,
          y: j * cellHeight,
        });
        velocity.push({
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5,
        });
      }
    }

    meshRef.current = { points, velocity };

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Gradient colors - blue technical theme
    const colors = [
      "#0066FF", // Electric blue
      "#00D9FF", // Cyan
      "#004FFF", // Deep blue
      "#0099FF", // Light blue
      "#1A2540", // Navy blue
    ];

    const drawMesh = () => {
      const { points, velocity } = meshRef.current;
      const mouse = mouseRef.current;
      const gridSize = 5;

      // Update points based on cursor proximity
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const dx = mouse.x - point.x;
        const dy = mouse.y - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - distance / 400);

        // Apply cursor influence
        velocity[i].x += (dx * influence * 0.001 - velocity[i].x * 0.02) * 0.5;
        velocity[i].y += (dy * influence * 0.001 - velocity[i].y * 0.02) * 0.5;

        // Apply gravity back to original position
        const originalX = (i % gridSize) * cellWidth;
        const originalY = Math.floor(i / gridSize) * cellHeight;
        velocity[i].x += (originalX - point.x) * 0.0001;
        velocity[i].y += (originalY - point.y) * 0.0001;

        // Update position
        point.x += velocity[i].x;
        point.y += velocity[i].y;
      }

      // Clear canvas
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw mesh gradient
      const createGradient = (x1: number, y1: number, x2: number, y2: number, colorIndex: number) => {
        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        const color1 = colors[colorIndex % colors.length];
        const color2 = colors[(colorIndex + 1) % colors.length];

        grad.addColorStop(0, color1 + "15");
        grad.addColorStop(1, color2 + "15");
        return grad;
      };

      // Draw quads
      let colorIndex = 0;
      for (let i = 0; i < gridSize - 1; i++) {
        for (let j = 0; j < gridSize - 1; j++) {
          const p1 = points[i * gridSize + j];
          const p2 = points[i * gridSize + j + 1];
          const p3 = points[(i + 1) * gridSize + j + 1];
          const p4 = points[(i + 1) * gridSize + j];

          ctx.fillStyle = createGradient(p1.x, p1.y, p3.x, p3.y, colorIndex);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.lineTo(p4.x, p4.y);
          ctx.fill();

          // Optional: draw mesh outline
          ctx.strokeStyle = "rgba(0, 102, 255, 0.1)";
          ctx.lineWidth = 1;
          ctx.stroke();

          colorIndex++;
        }
      }

      animationRef.current = requestAnimationFrame(drawMesh);
    };

    drawMesh();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isClient]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ mixBlendMode: "darken" }}
    />
  );
}
