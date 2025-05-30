# Sudoku App (React + TypeScript)

A simple object-oriented Sudoku game built using **React**, **TypeScript**, **Vite** and **Vitest**.

---

## Features

- Interactive 9x9 Sudoku board
- Input validation with red highlight for invalid entries
- Undo and redo functionality
- Object-Oriented design using a `SudokuBoard` class to encapsulate game logic
- Reset and Check buttons to validate the puzzle state
- Light CSS styling for better visual clarity (used ChatGPT)

---

## Issues

###  Backspace Bug
- When a user deletes a value in a cell using **Backspace**, the cell is cleared but becomes **uneditable**.
- This happens even though the cell was originally editable.
- As a workaround, you can use the **Undo** button after clearing the cell to restore editability.

> This is a known issue related to React re-rendering controlled input components with conditional disabling logic. 

---

## Possible Enhancements

- [ ] Generate random Sudoku puzzles (easy/medium/hard)
- [ ] Add Hint functionality
- [ ] Implement Solve Board feature
- [ ] Add keyboard navigation (arrow keys)

---

## Credits

- UI layout and CSS styling guided with help from **ChatGPT**