import React, { useState } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [xTurn, setXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (winner) return;
    if (board[index] !== '') return;

    const newBoard = [...board];
    newBoard[index] = xTurn ? 'X' : 'O';
    setBoard(newBoard);

    checkWinner(newBoard);
    setXTurn(!xTurn);
  };

  const checkWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (!board.includes('')) {
      setWinner('Draw');
    }
  };

  const handleReset = () => {
    setBoard(Array(9).fill(''));
    setXTurn(true);
    setWinner(null);
  };

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((cell, index) => (
          <div key={index} className="cell" onClick={() => handleClick(index)}>
            {cell}
          </div>
        ))}
      </div>
      {winner && (
        <div className="winner">
          {winner === 'Draw' ? "It's a draw!" : `Winner: ${winner}!`}
        </div>
      )}
      <button className="reset" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

export default App;