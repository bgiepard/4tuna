import React, { useEffect, useState } from 'react';
import { useGameContext } from '../gameContext';
import wheelImage from '../assets/wheel.svg'; // Update the path to your image

const PieChart = () => {
  const { gameInfo, setGameInfo, resetPoints, resetHalf, nextPlayer } =
    useGameContext();

  const [rotationAngle, setRotationAngle] = useState(0); // in degrees
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null); // Track the selected value
  const [transitionDuration, setTransitionDuration] = useState(2000); // duration in ms
  const easingFunction = 'cubic-bezier(0.22, 0.61, 0.36, 1)'; // easeOutCubic

  // Update the data array to match your 16 values
  const data = [
    '-100%',
    1000,
    400,
    300,
    'STOP',
    600,
    700,
    800,
    '-50%',
    600,
    200,
    100,
    'STOP',
    500,
    800,
    1500,
  ];

  useEffect(() => {
    if (gameInfo.rotate > 0) {
      handleRotate(gameInfo.rotate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameInfo.rotate]);

  const handleRotate = (deg = 0) => {
    setGameInfo({ ...gameInfo, stake: 0 });
    if (isAnimating) return; // Prevent multiple animations at the same time
    const randomDeg = Math.floor(deg);

    // Ensure the wheel spins at least a minimum number of rotations
    const newRotationAngle = rotationAngle + randomDeg;

    // Calculate the duration based on the total degrees rotated
    const totalDegrees = newRotationAngle - rotationAngle;
    const rotations = totalDegrees / 360;
    const newTransitionDuration = rotations * 1000; // adjust duration per rotation as needed
    setTransitionDuration(newTransitionDuration);

    setRotationAngle(newRotationAngle);
    setIsAnimating(true);
    setSelectedValue(null); // Clear displayed value during animation
  };

  const determineSelectedValue = (rotationAngle) => {
    // Adjust angle so that 0 degrees corresponds to the top (12 o'clock position)
    let adjustedAngle = ((rotationAngle % 360) + 360) % 360;

    // Each slice covers 22.5 degrees (360 / 16 slices)
    const sliceAngle = 360 / data.length;

    // The arrow is pointing directly upwards (0 degrees)
    const arrowAngle = 0; // degrees

    // Calculate the angle where the arrow is pointing relative to the rotated wheel
    let angleAtArrow = (adjustedAngle + arrowAngle) % 360;

    const sliceIndex = Math.floor(angleAtArrow / sliceAngle) % data.length;

    return data[sliceIndex];
  };

  return (
    <div className="mx-auto flex flex-col justify-center items-center relative">
      {/* Wheel Image */}
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
          // Animation complete
          setIsAnimating(false);

          // Determine the selected value after rotation
          const selectedValue = determineSelectedValue(rotationAngle);
          setSelectedValue(selectedValue);

          if (selectedValue === '-100%') {
            resetPoints();
          } else if (selectedValue === '-50%') {
            resetHalf();
          } else if (selectedValue === 'STOP') {
            nextPlayer();
          } else {
            setGameInfo({
              ...gameInfo,
              stake: selectedValue,
              mode: 'letter',
              goodGuess: false,
              afterRotate: true, // todo wywalić
            });
          }
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
