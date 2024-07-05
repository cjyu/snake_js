import React, { useState, useEffect } from 'react';

// Define the size of the game board
const gridSize = 20;
const gameWidth = 400; // Adjust according to your CSS
const gameHeight = 400; // Adjust according to your CSS
const gridCount = gameWidth / gridSize; // Calculate grid count based on game area size

// Calculate the maximum positions based on grid count
const maxPos = gridCount - 1;

// Type definitions for the snake and food pieces
type Position = {
  x: number;
  y: number;
};

// Helper function to generate a new food position
const generateFoodPosition = (): Position => {
  return {
    x: Math.floor(Math.random() * gridCount),
    y: Math.floor(Math.random() * gridCount)
  };
};

const Game: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>([{ x: 8, y: 8 }]);
  const [food, setFood] = useState<Position>(generateFoodPosition());
  const [direction, setDirection] = useState<string>('RIGHT');

  // Handle key presses
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft': setDirection('LEFT'); break;
        case 'ArrowUp': setDirection('UP'); break;
        case 'ArrowRight': setDirection('RIGHT'); break;
        case 'ArrowDown': setDirection('DOWN'); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Game loop
  useEffect(() => {
    const moveSnake = () => {
      setSnake(snake => {
        const newSnake = [...snake];
        let head = { ...newSnake[0] };

        // Update the position based on the direction
        switch (direction) {
          case 'LEFT': head.x -= 1; break;
          case 'RIGHT': head.x += 1; break;
          case 'UP': head.y -= 1; break;
          case 'DOWN': head.y += 1; break;
        }

        // Check game over conditions
        if (head.x < 0 || head.x >= gridCount || head.y < 0 || head.y >= gridCount) {
            alert('Game Over!');
            setSnake([{ x: gridCount / 2, y: gridCount / 2 }]); // Reset to center
          return [{ x: 8, y: 8 }]; // Reset the snake
        }

        // Check if the snake eats the food
        if (head.x === food.x && head.y === food.y) {
          newSnake.unshift(head);
          setFood(generateFoodPosition());
        } else {
          newSnake.pop();
          newSnake.unshift(head);
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [direction, food]);

  return (
    <div className="game-area">
      {snake.map((segment, index) => (
        <div key={index} className="snake-segment" style={{ left: `${segment.x * gridSize}px`, top: `${segment.y * gridSize}px` }} />
      ))}
      <div className="food" style={{ left: `${food.x * gridSize}px`, top: `${food.y * gridSize}px` }} />
    </div>
  );
};

export default Game;
