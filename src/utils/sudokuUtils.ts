export type SudokuGrid = number[][];

export const initialBoard: SudokuGrid = [
  [0, 0, 0, 6, 0, 0, 4, 0, 0],
  [7, 0, 0, 0, 0, 3, 6, 0, 0],
  [0, 0, 0, 0, 9, 1, 0, 8, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 5, 0, 1, 8, 0, 0, 0, 3],
  [0, 0, 0, 3, 0, 6, 0, 4, 5],
  [0, 4, 0, 2, 0, 0, 0, 6, 0],
  [9, 0, 3, 0, 0, 0, 0, 0, 0],
  [0, 2, 0, 0, 0, 0, 1, 0, 0]
];

export const isCellMutable = (row: number, col: number): boolean => {
  return initialBoard[row][col] === 0;
};

export const isValidMove = (board: SudokuGrid, row: number, col: number, num: number): boolean => {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num && i !== col) return false; 
    if (board[i][col] === num && i !== row) return false; 
  }

  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const cellRow = boxRow + r;
      const cellCol = boxCol + c;
      if (board[cellRow][cellCol] === num && (cellRow !== row || cellCol !== col)) {
        return false;
      }
    }
  }

  return true;
};

export const isBoardSolved = (board: SudokuGrid): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const val = board[row][col];
      if (val === 0 || !isValidMove(board, row, col, val)) {
        return false;
      }
    }
  }
  return true;
};