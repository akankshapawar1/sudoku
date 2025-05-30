import React, { useState, useEffect } from 'react';
import { initialBoard } from '../utils/sudokuUtils';
import { SudokuBoard as BoardModel } from '../models/SudokuBoard';
import '../styles/SudokuBoard.css';

const SudokuBoard: React.FC = () => {
  const [history, setHistory] = useState<BoardModel[]>([new BoardModel(initialBoard)]);
  const [step, setStep] = useState(0);
  const [invalidCells, setInvalidCells] = useState<Set<string>>(new Set());
  const current = history[step];
  const currentGrid = current.getBoard();

  const handleChange = (row: number, col: number, value: string) => {
    const num = parseInt(value);
    if ((Number.isNaN(num) || num < 1 || num > 9) && value !== '') return;

    const newBoard = current.clone();
    newBoard.setCell(row, col, value === '' ? 0 : num);

    setHistory(prev => [...prev.slice(0, step + 1), newBoard]);
    setStep(step + 1);
  };

  useEffect(() => {
    const newInvalids = new Set<string>();
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (!current.isCellValid(row, col)) {
          newInvalids.add(`${row}-${col}`);
        }
      }
    }
    setInvalidCells(newInvalids);
  }, [current]);

  return (
    <>
      <div className="board">
        {currentGrid.map((row, rIdx) => (
          <div key={rIdx} className="row">
            {row.map((cell, cIdx) => {
              const key = `${rIdx}-${cIdx}`;
              return (
                <input
                  key={key}
                  className={`cell ${invalidCells.has(key) ? 'invalid' : ''}`}
                  value={cell === 0 ? '' : cell}
                  onChange={(e) => handleChange(rIdx, cIdx, e.target.value)}
                  disabled={current.isPrefilled(rIdx, cIdx)}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="buttons">
        <button onClick={() => setStep(step - 1)} disabled={step === 0}>Undo</button>
        <button onClick={() => setStep(step + 1)} disabled={step >= history.length - 1}>Redo</button>
        <button 
          onClick={() => {
            setHistory([new BoardModel(initialBoard)]);
            setStep(0);
            setInvalidCells(new Set());
          }}>
          Reset
        </button>
        <button onClick={() => {
          const message = current.isSolved()
            ? "🎉 Board is correctly solved!"
            : "❌ There are mistakes.";
          alert(message);
        }} disabled={!current.isComplete()}>
          Check Board
        </button>
      </div>
    </>
  );
};

export default SudokuBoard;