import React, { useEffect, useRef, useState } from 'react';
import { useGameContext } from '../gameContext';

const PieChart = () => {
  const { gameInfo, setGameInfo, resetPoints, nextPlayer } = useGameContext();

  useEffect(() => {
    if (gameInfo.rotate > 0) {
      handleRotate(gameInfo.rotate);
    }
  }, [gameInfo.rotate]);

  const canvasRef = useRef(null);
  const [rotationAngle, setRotationAngle] = useState(0); // in degrees
  const targetRotationRef = useRef(0); // Target angle in degrees
  const initialRotationAngleRef = useRef(0); // Starting angle for animation
  const animationStartTimeRef = useRef(null); // Start time of animation
  const animationFrameIdRef = useRef();
  const isAnimatingRef = useRef(false);
  const [selectedValue, setSelectedValue] = useState(null); // Track the selected value

  // Easing function for smooth animation
  const easeOutCubic = (t) => {
    return 1 - Math.pow(1 - t, 3);
  };

  const data = [
    500,
    700,
    'STOP',
    600,
    100,
    300,
    400,
    1500,
    'RESET',
    1000,
    50,
    200,
  ];
  const colors = [
    '#FF6384',
    '#36A2EB',
    '#900f0f',
    '#4BC0C0',
    '#9966FF',
    '#FF9F40',
    '#D3D3D3',
    '#b76c36',
    '#1e1e1e',
    '#FFD700',
    '#FFA07A',
    '#bea657',
  ];

  const animateRotation = (timestamp) => {
    if (!animationStartTimeRef.current) {
      animationStartTimeRef.current = timestamp;
    }
    const elapsed = timestamp - animationStartTimeRef.current;
    const duration = 2000; // 2 seconds
    const progress = Math.min(elapsed / duration, 1); // Clamp progress between 0 and 1

    // Apply easing function
    const easedProgress = easeOutCubic(progress);

    // Calculate the new rotation angle
    const newAngle =
      initialRotationAngleRef.current +
      (targetRotationRef.current - initialRotationAngleRef.current) *
        easedProgress;

    setRotationAngle(newAngle);

    if (progress < 1) {
      animationFrameIdRef.current = requestAnimationFrame(animateRotation);
    } else {
      // Animation complete
      isAnimatingRef.current = false;

      // Determine the selected value after rotation
      const selectedValue = determineSelectedValue(newAngle);
      setSelectedValue(selectedValue); // Set the selected value

      if (selectedValue === 'RESET') {
        resetPoints();
      } else if (selectedValue === 'STOP') {
        nextPlayer();
      } else {
        setGameInfo({
          ...gameInfo,
          stake: selectedValue,
          goodGuess: false,
          afterRotate: true,
        });
      }
    }
  };

  const handleRotate = (deg = 0) => {
    setGameInfo({ ...gameInfo, stake: 0 });
    if (isAnimatingRef.current) return; // Prevent multiple animations at the same time
    const randomDeg = Math.floor(deg);
    targetRotationRef.current = rotationAngle + randomDeg;
    initialRotationAngleRef.current = rotationAngle;
    animationStartTimeRef.current = null;
    isAnimatingRef.current = true;
    setGameInfo({ ...gameInfo, stake: 0 }); // Clear displayed value during animation
    animationFrameIdRef.current = requestAnimationFrame(animateRotation);
  };

  const determineSelectedValue = (rotationAngle) => {
    // Adjust angle so that 0 degrees corresponds to the right (positive x-axis)
    let adjustedAngle = ((rotationAngle % 360) + 360) % 360;

    // Each slice covers 30 degrees (360 / 12 slices)
    const sliceAngle = 360 / data.length;

    // The arrow is pointing directly right (0 degrees in canvas coordinate system)
    const arrowAngle = 0; // degrees

    // Calculate the angle where the arrow is pointing relative to the rotated pie chart
    let angleAtArrow = (arrowAngle - adjustedAngle + 360) % 360;

    const sliceIndex = Math.floor(angleAtArrow / sliceAngle) % data.length;

    return data[sliceIndex];
  };

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear the canvas before redrawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate slice angles
    const totalSlices = data.length;
    const sliceAngle = (2 * Math.PI) / totalSlices;

    // Convert rotation angle from degrees to radians
    const rotationInRadians = (rotationAngle * Math.PI) / 180;

    let startAngle = rotationInRadians;

    data.forEach((value, index) => {
      const endAngle = startAngle + sliceAngle;

      // Draw the pie slice
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, canvas.height / 2);
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        canvas.height / 2 - 10, // Slightly smaller radius to avoid overlapping with the arrow
        startAngle,
        endAngle
      );
      ctx.closePath();

      // Fill the slice with color
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();

      // Calculate text position
      const midAngle = (startAngle + endAngle) / 2;
      const textX =
        canvas.width / 2 + (canvas.height / 2.5) * Math.cos(midAngle);
      const textY =
        canvas.height / 2 + (canvas.height / 2.5) * Math.sin(midAngle);

      // Draw the text
      ctx.save();
      ctx.translate(textX, textY);
      ctx.rotate(midAngle);
      ctx.fillStyle = 'black';
      ctx.font = '12px Arial';
      let text = String(value);
      if (value === 'RESET') {
        ctx.fillStyle = 'white';
        // ctx.fillText(text, -55, 5);
      } else if (value === 'STOP') {
        ctx.fillStyle = 'white';
        // ctx.fillText(text, -40, 5);
      } else {
      }
      ctx.fillText(text, -20, 5);

      ctx.restore();

      // Update the start angle for the next slice
      startAngle = endAngle;
    });

    // Draw the fixed arrow on the right
    drawArrow(
      ctx,
      canvas.width,
      canvas.height / 2,
      canvas.width - 30,
      canvas.height / 2
    );

    // Draw the smaller wheel in the center
    drawCenterWheel(ctx, canvas.width, canvas.height);
  }, [rotationAngle, selectedValue]);

  const drawArrow = (ctx) => {
    ctx.save();
    ctx.fillStyle = 'black';

    // Define the triangle coordinates
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;
    const triangleHeight = 20;
    const triangleBase = 40;

    // Coordinates for the triangle (initially pointing left)
    const x = canvasWidth - -10; // Right edge minus some padding
    const y = canvasHeight / 2;

    // Translate the context to the center of the triangle's base
    ctx.translate(x - triangleBase / 2, y); // Translate to the center of the base
    ctx.rotate(Math.PI); // Rotate 180 degrees (in radians)

    // Draw the triangle pointing right (after rotation)
    ctx.beginPath();
    ctx.moveTo(triangleBase / 2, 0); // Tip of the triangle (now rightmost point)
    ctx.lineTo(-triangleBase / 2, -triangleHeight / 2); // Top left
    ctx.lineTo(-triangleBase / 2, triangleHeight / 2); // Bottom left
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  };

  const drawCenterWheel = (ctx, canvasWidth, canvasHeight) => {
    const radius = canvasHeight / 9; // Smaller radius for the center wheel
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    // Draw the inner circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(256,256,256,0.8)'; // White background for the inner circle
    ctx.fill();
    ctx.strokeStyle = '#000000'; // Black border
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw the selected value in the center
    ctx.fillStyle = '#000000'; // Black text color
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      selectedValue !== null ? selectedValue : ' ',
      centerX,
      centerY + 2
    );
  };

  return (
    <div className="mx-auto flex flex-col justify-center items-center">
      <canvas ref={canvasRef} width="250" height="250"></canvas>
    </div>
  );
};

export default PieChart;
