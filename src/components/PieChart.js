import React, { useEffect, useRef, useState } from 'react';
import { useGameContext } from '../gameContext';
import wheelImage from '../assets/wheel.svg';
import socket from '../socket';

const PieChart = () => {
  const { gameInfo } = useGameContext();

  const [rotationAngle, setRotationAngle] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [transitionDuration, setTransitionDuration] = useState(2000);
  const easingFunction = 'cubic-bezier(0.25, 0.1, 0.25, 1)';

  const prevRotateRef = useRef(0);
  const isFirstRender = useRef(true);

  const currentPlayerId = gameInfo?.players?.length > 0 && gameInfo?.players[gameInfo?.currentPlayer]?.id;
  const isMyTurn = gameInfo?.players?.length > 0 && currentPlayerId && currentPlayerId === socket.id;

  useEffect(() => {
    if (isFirstRender.current) {
      // On first render, set the rotation angle without animating
      isFirstRender.current = false;
      setRotationAngle(gameInfo.totalRotate || 0);
      prevRotateRef.current = gameInfo.totalRotate || 0;
    } else if (gameInfo.totalRotate !== undefined && gameInfo.totalRotate !== prevRotateRef.current) {
      setRotationAngle(gameInfo.totalRotate);

      const duration = 2000; // Adjust duration as needed
      setTransitionDuration(duration);

      setIsAnimating(true);

      prevRotateRef.current = gameInfo.totalRotate;
    }
  }, [gameInfo.totalRotate]);

  return (
    <div className="flex flex-col justify-center items-center relative">
      <div className={`w-[70%] max-w-[300px] transition-all duration-500 ${gameInfo.mode === 'rotating' ? 'scale-100' : 'scale-0'}`}>
        <img
          src={wheelImage}
          alt="Wheel"
          style={{
            transform: `rotate(${rotationAngle}deg)`,
            transition: isAnimating ? `transform ${transitionDuration}ms ${easingFunction}` : 'none',
            border: isMyTurn ? '15px solid #9758D8' : '15px solid rgba(256,256,256,0.2)',
            boxShadow: '0 0 0 15px rgba(256,256,256,0.1)',
            borderRadius: '100%',
          }}
          onTransitionEnd={() => {
            setIsAnimating(false);
          }}
          className={`w-full   `}
        />
      </div>
      {/*circle*/}

      <div className="w-[80px] h-[80px] rounded-full bg-[#E3744B] absolute left-0 right-0 mx-auto top-1/2  -translate-y-1/2 border-2 border-yellow-300"></div>

      {/* Arrow Indicator */}
      {gameInfo.mode === 'rotating' && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(39px, -50%)',
            width: '0',
            height: '0',
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderLeft: '20px solid white',
          }}
        ></div>
      )}
      <div className="absolute top-[50%] left-[50%] pt-[2.5px] -translate-x-1/2 -translate-y-1/2 h-[50px] w-[50px] text-[22px] flex items-center justify-center text-center font-bold text-white">
        {isAnimating ? ' ' : gameInfo.stake > 0 && gameInfo.stake}
      </div>
    </div>
  );
};

export default PieChart;
