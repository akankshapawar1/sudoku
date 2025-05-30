export type SudokuGrid = number[][];

export class SudokuBoard {
  private initial: SudokuGrid;    
  private board: SudokuGrid;

  constructor(initialBoard: SudokuGrid) {
    this.initial = initialBoard.map(row => [...row]);
    this.board = initialBoard.map(row => [...row]); 
  }

  isPrefilled(row: number, col: number): boolean {
    return this.initial[row][col] !== 0;
  }

  getBoard(): SudokuGrid {
    return this.board.map(row => [...row]); 
  }

  setCell(row: number, col: number, value: number): void {
    this.board[row][col] = value;
  }

  getCell(row: number, col: number): number {
    return this.board[row][col];
  }

  isCellEmpty(row: number, col: number): boolean {
    return this.board[row][col] === 0;
  }

  isCellValid(row: number, col: number): boolean {
    const num = this.board[row][col];
    if (num === 0) return true;

    for (let i = 0; i < 9; i++) {
      if (i !== col && this.board[row][i] === num) return false;
      if (i !== row && this.board[i][col] === num) return false;
    }

    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const i = boxRow + r;
        const j = boxCol + c;
        if ((i !== row || j !== col) && this.board[i][j] === num) return false;
      }
    }

    return true;
  }

  isComplete(): boolean {
    return this.board.every(row => row.every(cell => cell !== 0));
  }

  isSolved(): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (!this.isCellValid(row, col)) return false;
      }
    }
    return this.isComplete();
  }

  clone(): SudokuBoard {
    return new SudokuBoard(this.getBoard());
  }
}