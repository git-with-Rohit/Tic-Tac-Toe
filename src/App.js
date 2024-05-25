import React, { useState, useEffect } from 'react';
import './App.css';
import Message from './components/Message';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [mode, setMode] = useState(null); // null, 'PVP', 'PVC'
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  useEffect(() => {
    if (mode === 'PVC' && !isXNext && !winner && !isDraw) {
      const timer = setTimeout(() => computerMove(board), 500);
      return () => clearTimeout(timer);
    }
  }, [isXNext, mode, board, winner, isDraw]);

  const handleClick = (index) => {
    if (board[index] || winner || isDraw) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      setWinner(winner);
    } else if (board.every(square => square !== null)) {
      setIsDraw(true);
    }
  }, [board]);

  const computerMove = (board) => {
    const emptyIndices = board
      .map((value, index) => (value === null ? index : null))
      .filter((val) => val !== null);
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    if (randomIndex !== undefined) {
      const newBoard = board.slice();
      newBoard[randomIndex] = 'O';
      setBoard(newBoard);
      setIsXNext(true);
    }
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setMode(null);
    setWinner(null);
    setIsDraw(false);
  };

  const getStatusMessage = () => {
    if (winner) {
      if (mode === 'PVP') {
        return winner === 'X' ? 'Player 1 won' : 'Player 2 won';
      } else {
        return winner === 'X' ? 'Player won' : 'Computer won';
      }
    } else if (isDraw) {
      return 'Draw';
    } else {
      if (mode === 'PVP') {
        return `Next player: ${isXNext ? 'Player 1 (X)' : 'Player 2 (O)'}`;
      } else {
        return `Next player: ${isXNext ? 'Player (X)' : 'Computer (O)'}`;
      }
    }
  };

  return (
    <div className="game">
      {mode === null ? (
        <div className="mode-selection">
          <h2>Select Game Mode</h2>
          <button onClick={() => setMode('PVP')}>Player vs Player</button>
          <button onClick={() => setMode('PVC')}>Player vs Computer</button>
        </div>
      ) : (
        <div className="game-board">
          <div className="status">{getStatusMessage()}</div>
          <div className="board">
            {board.map((square, index) => (
              <button key={index} className="square" onClick={() => handleClick(index)}>
                {square}
              </button>
            ))}
          </div>
          {(winner || isDraw) && <Message message={getStatusMessage()} onReset={handleReset} />}
        </div>
      )}
    </div>
  );
}

export default App;
