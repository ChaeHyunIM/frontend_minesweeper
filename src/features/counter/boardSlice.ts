// boardSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Cell {
  value: number;
  revealed: boolean;
  isMine: boolean;
}

interface BoardState {
  board: Cell[][];
}

const initialState: BoardState = {
  board: [],
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    initializeBoard: (state, action: PayloadAction<{ rows: number; cols: number; mines: number }>) => {
      const { rows, cols, mines } = action.payload;
      const newBoard: Cell[][] = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({ value: 0, revealed: false, isMine: false }))
      );

      let minesCount = 0;
      while (minesCount < mines) {
        const randomRow = Math.floor(Math.random() * rows);
        const randomCol = Math.floor(Math.random() * cols);

        if (!newBoard[randomRow][randomCol].isMine) {
          newBoard[randomRow][randomCol].isMine = true;
          minesCount++;

          for (let i = Math.max(0, randomRow - 1); i <= Math.min(rows - 1, randomRow + 1); i++) {
            for (let j = Math.max(0, randomCol - 1); j <= Math.min(cols - 1, randomCol + 1); j++) {
              if (i !== randomRow || j !== randomCol) {
                newBoard[i][j].value++;
              }
            }
          }
        }
      }

      state.board = newBoard;
    },
    revealCell: (state, action: PayloadAction<{ row: number; col: number }>) => {
      const { row, col } = action.payload;
      const cell = state.board[row][col];

      // Only reveal if the cell is not already revealed
      if (!cell.revealed) {
        cell.revealed = true;

        // Handle logic for revealing a cell based on whether it's a mine or not
        if (cell.isMine) {
          // Game over logic goes here
        } else {
          // Implement logic to reveal adjacent cells or update cell value based on neighboring mines
          // You might want to create a separate function for this
        }
      }
    },
  },
});

export const { initializeBoard, revealCell } = boardSlice.actions;
export default boardSlice.reducer;
