import React from "react";
import "./BackgroundShapes.css";

const BackgroundShapes = () => {
  const images = [
    "/BgImages/juice.png",
    "/BgImages/burger.png",
    "/BgImages/icecream1.png",
    "/BgImages/pizza.svg",
    "/BgImages/shakes.svg",
    "/BgImages/samosa.png",
    "/BgImages/wrap.svg",
    "/BgImages/fries.png",
    "/BgImages/pastry.svg",
    "/BgImages/momos.png",
  ];

  const elements = Array.from({ length: 10 }).map((_, index) => ({
    id: index,
    image: images[index % images.length],
    leftOffset: Math.random(), // Random horizontal placement
    delay: Math.random() * 5, // Random delay for animation
    duration: 10 + Math.random() * 10, // Random animation duration
  }));

  return (
    <div className="background-shapes">
      {elements.map(({ id, image, leftOffset, delay, duration }) => (
        <img
          key={id}
          src={image}
          alt="RapidQ"
          className="animated-image"
          style={{
            "--left-offset": `${leftOffset * 100}%`,
            "--animation-delay": `${delay}s`,
            "--animation-duration": `${duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundShapes;
