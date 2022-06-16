import { expect, test } from '@jest/globals';
import { ArrayBoard, createBoard, exportBoard, updateBoard } from './game';

//Dead, alive, ignore

enum CellExpect {
    Dead,
    Alive,
    Ignore,
}

type ExpectedBoard = CellExpect[][];

function boardExpect(
    expectedBoard: CellExpect[][],
    actualBoard: ArrayBoard
): void {
    expect(expectedBoard.length).toEqual(actualBoard.length);
    for (let y = 0; y < expectedBoard.length; y++) {
        for (let x = 0; x < expectedBoard[y].length; x++) {
            expect(expectedBoard[y].length).toEqual(actualBoard[y].length);
            if (expectedBoard[y][x] == CellExpect.Ignore) continue;
            expect(expectedBoard[y][x]).toEqual(actualBoard[y][x] ? 1 : 0);
        }
    }
}

test('Any live cell with fewer than two live neighbours dies, as if by underpopulation.', () => {
    const testBoard = createBoard([
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
    ]);

    const newBoard = updateBoard(testBoard);

    const expectedBoard: ExpectedBoard = [
        [2, 2, 2],
        [2, 0, 2],
        [2, 2, 2],
    ];

    boardExpect(expectedBoard, newBoard);
});

test('Any live cell with two or three live neighbours lives on to the next generation.', () => {
    const testBoard = createBoard([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
    ]);

    const newBoard = updateBoard(testBoard);

    expect(exportBoard(newBoard)).toEqual([
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
    ]);
});
test('Any live cell with more than three live neighbours dies, as if by overpopulation.', () => {
    const testBoard = createBoard([
        [1, 0, 1],
        [0, 1, 0],
        [1, 0, 1],
    ]);

    const newBoard = updateBoard(testBoard);

    expect(exportBoard(newBoard)).toEqual([
        [0, 1, 0],
        [1, 0, 1],
        [0, 1, 0],
    ]);
});
test('Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.', () => {
    const testBoard = createBoard([
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
    ]);

    const newBoard = updateBoard(testBoard);

    expect(exportBoard(newBoard)).toEqual([
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
    ]);
});
