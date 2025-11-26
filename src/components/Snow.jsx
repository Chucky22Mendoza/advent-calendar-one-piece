import React from 'react';
import './Snow.css';

const Snow = () => {
  const snowflakes = Array.from({ length: 50 });
  return (
    <div className="snow-container">
      {snowflakes.map((_, i) => (
        <div key={i} className="snowflake" style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${Math.random() * 3 + 2}s`,
          opacity: Math.random(),
          fontSize: `${Math.random() * 10 + 10}px`
        }}>
          ❄
        </div>
      ))}
    </div>
  );
};

export default Snow;
