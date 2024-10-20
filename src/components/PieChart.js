import React, { useEffect, useRef, useState } from 'react';
import { useGameContext } from '../gameContext';
import wheelImage from '../assets/wheel.svg';

const PieChart = () => {
    const {
        gameInfo,
        processSelectedValue,
        determineSelectedValue,
        handleRotate
    } = useGameContext();

    const prevRoundRotate = useRef();
    const [rotationAngle, setRotationAngle] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);
    const [transitionDuration, setTransitionDuration] = useState(2000);
    const easingFunction = 'cubic-bezier(0.22, 0.61, 0.36, 1)';

    useEffect(() => {
        const prevRotate = prevRoundRotate.current;

        if (gameInfo.rotate > 0 && prevRotate !== gameInfo.rotate) {
            handleRotate(
                gameInfo.rotate,
                rotationAngle,
                setRotationAngle,
                isAnimating,
                setIsAnimating,
                setTransitionDuration
            );
        }
        prevRoundRotate.current = gameInfo.rotate;
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
                    const selectedValue = determineSelectedValue(rotationAngle);
                    setSelectedValue(selectedValue);
                    processSelectedValue(selectedValue);
                }}
            />
      {/* Arrow */}
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
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 h-[50px] w-[50px] text-white text-[14px] flex items-center justify-center text-center">
        {selectedValue !== null ? selectedValue : ' '}
      </div>
    </div>
  );
};

export default PieChart;
