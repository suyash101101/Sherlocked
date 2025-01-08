"use client";

import React, { useState } from "react";
import LevelModal from "./LevelModal";

const FloatingIsland = ({
  id,
  name,
  x,
  y,
  isUnlocked,
  onComplete,
  score,
  unlockThreshold,
  backgroundImage, // New prop for the level image
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // Track hover state
  const [mousePosition, setMousePosition] = useState({ rotateX: 0, rotateY: 0 });
  const [isMouseMoved, setIsMouseMoved] = useState(false); // Track mouse movement

  const handleClick = () => {
    if (isUnlocked) {
      setIsModalOpen(true);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true); // Show tooltip on hover
  };

  const handleMouseLeave = () => {
    setIsHovered(false); // Hide tooltip when mouse leaves
    setIsMouseMoved(false); // Reset mouse movement
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 4;
    const centerY = window.innerHeight / 4;

    const rotateX = (clientY - centerY) / 20; // Adjusted intensity for stronger 3D effect
    const rotateY = (clientX - centerX) / 20; // Adjusted intensity for stronger 3D effect

    setMousePosition({ rotateX, rotateY });
    setIsMouseMoved(true); // Set to true when mouse is moved
  };

  return (
    <>
      <div
        className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all z-40 duration-300 ${
          isUnlocked ? "opacity-100 hover:scale-110" : "opacity-60 cursor-not-allowed"
        }`}
        style={{
          left: `${x}%`,
          top: `${y}%`,
          animation: "float 4s ease-in-out infinite", // Floating animation
          perspective: "1000px", // Add perspective for depth
        }}
        onClick={handleClick}
        onMouseMove={isUnlocked ? handleMouseMove : null} // Apply mouse hover effect only if unlocked
        onMouseEnter={handleMouseEnter} // Show tooltip when mouse enters
        onMouseLeave={handleMouseLeave} // Hide tooltip when mouse leaves
      >
        {/* Glowing effect behind the level image */}
        <div
          className="absolute inset-0 bg-orange-700 opacity-80 blur-3xl rounded-full"
          style={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1, // Ensure it stays behind the image
          }}
        />
        {/* Level image with enhanced 3D rotating effect */}
        <div
          className="lg:w-60 lg:h-60 md:w-40 md:h-40 w-40 h-40 bg-contain bg-no-repeat bg-center relative transition-transform duration-200 ease-in-out"
          style={{
            backgroundImage: `url(${backgroundImage})`, // Use the passed backgroundImage prop
            transform: `rotateX(${isMouseMoved ? mousePosition.rotateX : 0}deg) rotateY(${isMouseMoved ? mousePosition.rotateY : 0}deg)`,
            transition: "transform 0.3s ease-out", // Smooth transition when returning to original state
          }}
        />

        {/* Locked Icon (Padlock) */}
        {!isUnlocked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/lock.png" // Replace with the actual path to your image
              alt="Locked Icon"
              className="lg:w-40 lg:h-40 md:w-28 md:h-28 w-20 h-20 " // Adjust width and height as needed
            />
            {/* Tooltip: Show only when hovered */}
            {isHovered && (
              <div className="absolute top-[1.5em] right-[-3em] p-2 bg-[#160b05] text-white text-sm rounded-md shadow-md">
                Unlock with {unlockThreshold} points
              </div>
            )}
          </div>
        )}
      </div>

      {isModalOpen && (
        <LevelModal location={{ id, name }} onClose={handleClose} onComplete={onComplete} />
      )}

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>
    </>
  );
};

export default FloatingIsland;
