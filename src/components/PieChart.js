import React, { useEffect, useRef, useState } from 'react';
import { useGameContext } from '../gameContext';
import wheelImage from '../assets/wheel.svg';

const PieChart = () => {
  const { gameInfo, processValue } = useGameContext();

  const [rotationAngle, setRotationAngle] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [transitionDuration, setTransitionDuration] = useState(2000);
  const easingFunction = 'cubic-bezier(0.25, 0.1, 0.25, 1)'; // Updated easing function

  const prevRotateRef = useRef(0);

  useEffect(() => {
    if (
      gameInfo.totalRotate !== undefined &&
      gameInfo.totalRotate !== prevRotateRef.current
    ) {
      // Set rotation angle to totalRotate from backend
      setRotationAngle(gameInfo.totalRotate);

      // Set transition duration proportional to rotation
      const duration = 2000; // 2000ms for 720 degrees
      setTransitionDuration(duration);

      // Start animation
      setIsAnimating(true);

      // Update previous rotate value
      prevRotateRef.current = gameInfo.totalRotate;
    }
  }, [gameInfo.totalRotate, gameInfo.rotate]);

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
          // processValue();
        }}
      />
      {/* Arrow Indicator */}
      <div className="w-[50px] h-[50px] rounded-full bg-black absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white"></div>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '57.5%',
          transform: 'translateY(-50%)',
          width: '0',
          height: '0',
          borderTop: '5px solid transparent',
          borderBottom: '5px solid transparent',
          borderLeft: '12px solid white',
        }}
      ></div>
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 h-[50px] w-[50px] text-white text-[14px] flex items-center justify-center text-center">
        {isAnimating ? ' ' : gameInfo.stake}
      </div>
    </div>
  );
};

export default PieChart;
