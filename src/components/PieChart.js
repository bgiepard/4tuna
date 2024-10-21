// PieChart.js

import React, { useEffect, useRef, useState } from 'react';
import { useGameContext } from '../gameContext';
import wheelImage from '../assets/wheel.svg';

const PieChart = () => {
  const { gameInfo } = useGameContext();

  const [rotationAngle, setRotationAngle] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [transitionDuration, setTransitionDuration] = useState(2000);
  const easingFunction = 'cubic-bezier(0.22, 0.61, 0.36, 1)';

  // To keep track of previous rotate value
  const prevRotateRef = useRef(0);

  useEffect(() => {
    if (gameInfo.rotate && gameInfo.rotate !== prevRotateRef.current) {
      // Accumulate rotation angles
      setRotationAngle((prev) => prev + gameInfo.rotate);

      // Set transition duration proportional to rotation
      const duration = (gameInfo.rotate / 360) * 1000; // 1000ms per full rotation
      setTransitionDuration(duration);

      // Start animation
      setIsAnimating(true);

      // Update previous rotate value
      prevRotateRef.current = gameInfo.rotate;
    }
  }, [gameInfo.rotate]);

  return (
    <div className="mx-auto flex flex-col justify-center items-center relative">
      <img
        src={wheelImage}
        alt="Wheel"
        style={{
          transform: `rotate(${rotationAngle}deg)`,
          transition: isAnimating
            ? `transform ${transitionDuration}ms ${easingFunction}`
            : 'none',
          width: '80%',
          maxWidth: '320px',
          height: 'auto',
        }}
        onTransitionEnd={() => {
          setIsAnimating(false);
        }}
      />
      {/* Arrow Indicator */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '56.75%',
          transform: 'translateY(-50%)',
          width: '0',
          height: '0',
          borderTop: '5px solid transparent',
          borderBottom: '5px solid transparent',
          borderLeft: '12px solid white',
        }}
      ></div>
      {/* Display Selected Value */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 h-[50px] w-[50px] text-white text-[14px] flex items-center justify-center text-center">
        {gameInfo.selectedValue !== undefined ? gameInfo.selectedValue : ' '}
      </div>
    </div>
  );
};

export default PieChart;
