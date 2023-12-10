// boardSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Cell {
  value: number;
  revealed: boolean;
  isMine: boolean;
  isFlagged: boolean;
}

interface BoardState {
  board: Cell[][];
  status: 'playing' | 'gameOver' | 'victory';
}

const initialState: BoardState = {
  board: [],
  status: 'playing',
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    initializeBoard: (state, action: PayloadAction<{ rows: number; cols: number }>) => {
      const { rows, cols } = action.payload;
      const newBoard: Cell[][] = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({ value: 0, revealed: false, isMine: false, isFlagged: false }))
      );
      state.board = newBoard;
    },

    setMines: (state, action: PayloadAction<{ mines: number; firstClick: { row: number; col: number } }>) => {
      const { mines, firstClick } = action.payload;
      console.log('mines', mines);
      const rows = state.board.length;
      const cols = state.board[0].length;
      const newBoard: Cell[][] = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({ value: 0, revealed: false, isMine: false, isFlagged: false }))
      );
      console.log('newBoard', newBoard);

      let minesCount = 0;
      while (minesCount < mines) {
        const randomRow = Math.floor(Math.random() * rows);
        const randomCol = Math.floor(Math.random() * cols);

        if ((randomRow !== firstClick.row || randomCol !== firstClick.col) && !newBoard[randomRow][randomCol].isMine) {
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

      if (cell.revealed) {
        return;
      }

      // Only reveal if the cell is not already revealed
      cell.revealed = true;
      // Handle logic for revealing a cell based on whether it's a mine or not
      if (cell.isMine) {
        // Game over logic goes here
        for (const row of state.board) {
          for (const cell of row) {
            cell.revealed = true;
          }
        }
        state.status = 'gameOver';
      } else {
        // Implement logic to reveal adjacent cells or update cell value based on neighboring mines
        revealAdjacentCells(state.board, row, col);
        // Check if the player has won the game
        let victory = true;
        for (const row of state.board) {
          for (const cell of row) {
            if (!cell.isMine && !cell.revealed) {
              victory = false;
              break;
            }
          }
        }
        if (victory) {
          state.status = 'victory';
        }
      }
    },
    toggleFlag: (state, action: PayloadAction<{ row: number; col: number }>) => {
      const { row, col } = action.payload;
      const cell = state.board[row][col];
      cell.isFlagged = !cell.isFlagged;
    },
  },
});

function revealAdjacentCells(board: Cell[][], row: number, col: number) {
  const rows = board.length;
  const cols = board[0].length;

  // Define the directions to check for adjacent cells
  const directions = [
    { row: -1, col: -1 }, // top left
    { row: -1, col: 0 }, // top
    { row: -1, col: 1 }, // top right
    { row: 0, col: -1 }, // left
    { row: 0, col: 1 }, // right
    { row: 1, col: -1 }, // bottom left
    { row: 1, col: 0 }, // bottom
    { row: 1, col: 1 }, // bottom right
  ];

  // Iterate through each direction
  for (const direction of directions) {
    const newRow = row + direction.row;
    const newCol = col + direction.col;

    // Check if the adjacent cell is within the board boundaries
    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
      const adjacentCell = board[newRow][newCol];

      // Only reveal the adjacent cell if it's not already revealed and not a mine
      if (!adjacentCell.revealed && !adjacentCell.isMine) {
        adjacentCell.revealed = true;

        // If the adjacent cell has no neighboring mines, recursively reveal its adjacent cells
        if (adjacentCell.value === 0) {
          revealAdjacentCells(board, newRow, newCol);
        }
      }
    }
  }
}

export const { initializeBoard, revealCell, setMines, toggleFlag } = boardSlice.actions;
export default boardSlice.reducer;
