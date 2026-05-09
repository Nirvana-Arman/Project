import React, { useState, useEffect } from "react";
import "./App.css";

// Winner logic
function calculateWinner(board) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];

  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line: [a, b, c] };
    }
  }
  return null;
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0 });

  const clickSound = new Audio("/click.mp3");
  const winSound = new Audio("/win.mp3");

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    clickSound.play();

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";

    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  const result = calculateWinner(board);
  const isDraw = !board.includes(null) && !result;

  // Update score when someone wins
  useEffect(() => {
    if (result) {
      winSound.play();

      setScore((prev) => ({
        ...prev,
        [result.player]: prev[result.player] + 1,
      }));
    }
  }, [result]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  };

  return (
    <div className="container">
      <h1>Tic Tac Toe 🎮</h1>

      <h2>
        {result
          ? `Winner: ${result.player}`
          : isDraw
          ? "It's a Draw!"
          : `Turn: ${isXTurn ? "X" : "O"}`}
      </h2>

      <p className="score">
        Score → X: {score.X} | O: {score.O}
      </p>

      <div className="board">
        {board.map((value, index) => (
          <div
            key={index}
            className={`cell ${result?.line.includes(index) ? "win" : ""}`}
            onClick={() => handleClick(index)}
          >
            {value}
          </div>
        ))}
      </div>

      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
}

export default App;