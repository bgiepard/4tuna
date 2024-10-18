import React, { useEffect, useRef, useState } from 'react';
import { useGameContext } from '../gameContext';

// Import your wheel image
import wheelImage from '../assets/wheel.svg'; // Update the path to your image

const PieChart = () => {
  const { gameInfo, setGameInfo, resetPoints, nextPlayer } = useGameContext();

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

  // Update the data array to match your 16 values
  const data = [
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
    '-100%',
    1000,
    400,
    300,
  ];

  useEffect(() => {
    if (gameInfo.rotate > 0) {
      handleRotate(gameInfo.rotate);
    }
  }, [gameInfo.rotate]);

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

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, []);

  return (
    <div className="mx-auto flex flex-col justify-center items-center relative ">
      {/* Wheel Image */}
      <img
        src={wheelImage}
        alt="Wheel"
        style={{
          transform: `rotate(${rotationAngle}deg)`,
          transition: isAnimatingRef.current
            ? 'none'
            : 'transform 0.5s ease-out',
          width: '250px',
          height: '250px',
        }}
      />
      {/* Arrow */}
      <div
        style={{
          position: 'absolute',
          top: 'calc(50% - 21px)',
          left: '50%',
          marginLeft: '-7px',
          width: '0',
          height: '0',
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderBottom: '20px solid white',
          transform: 'translateY(-100%)',
        }}
      ></div>
      <div className="absolute top-[46%] text-white text-[14px]">
        {selectedValue !== null ? selectedValue : ' '}
      </div>
      {/* Selected Value Display */}
      {/*<div*/}
      {/*  style={{*/}
      {/*    position: 'absolute',*/}
      {/*    top: 'calc(50% - 10px)',*/}
      {/*    left: '50%',*/}
      {/*    transform: 'translate(-50%, -50%)',*/}
      {/*    backgroundColor: 'rgba(255, 255, 255, 0.8)',*/}
      {/*    padding: '10px',*/}
      {/*    borderRadius: '50%',*/}
      {/*    border: '2px solid black',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <span style={{ fontWeight: 'bold', fontSize: '14px' }}>*/}
      {/*    {selectedValue !== null ? selectedValue : ' '}*/}
      {/*  </span>*/}
      {/*</div>*/}
    </div>
  );
};

export default PieChart;
