/*
Any live cell with two or three live neighbours survives.
Any dead cell with three live neighbours becomes a live cell.
All other live cells die in the next generation. Similarly, all other dead cells stay dead.
 */

//My idea with this is to abstract away the details of how the game is implemented,
// so that I can try and investigate different ways of storing the board

interface Board {
    getCell(x: number, y: number): boolean;

    setCell(x: number, y: number, state: boolean): void;

    updateCell(x: number, y: number): boolean;
}

/*interface BoardController<T extends Board> {

}*/

// Simplest idea: store every cell as a 2d array

export type ArrayBoard = boolean[][];

export function createBoard(board: number[][]) {
    return board.map((row) => row.map((val) => !!val));
}

export function createEmptyBoard(width: number, height: number) {}

export function exportBoard(board: ArrayBoard): number[][] {
    return board.map((row) => row.map((val) => (val ? 1 : 0)));
}

export function updateCell(x: number, y: number, board: ArrayBoard): boolean {
    const cell = board[y][x];
    let aliveNeighbours = 0;
    for (let dy = -1; dy <= 1; dy++) {
        const ny = dy + y;
        if (ny < 0 || ny >= board.length) continue;
        for (let dx = -1; dx <= 1; dx++) {
            const nx = dx + x;
            if (nx < 0 || nx >= board[ny].length) continue;
            if (dy == 0 && dx == 0) continue;
            const neighbourCell = board[ny][nx];
            if (neighbourCell) aliveNeighbours++;
        }
    }

    if (cell && aliveNeighbours == 2) return true;
    return aliveNeighbours == 3;
}

export function updateBoard(board: ArrayBoard): ArrayBoard {
    const newBoard: ArrayBoard = [];
    for (let y = 0; y < board.length; y++) {
        newBoard.push([]);
        for (let x = 0; x < board[y].length; x++) {
            newBoard[y][x] = updateCell(x, y, board);
        }
    }
    return newBoard;
}
