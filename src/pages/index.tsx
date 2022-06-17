import type { NextPage } from 'next';

import React, { useReducer } from 'react';
import { ArrayBoard, createBoard, updateBoard } from 'game/game';
import { GameCanvas } from '../components/GameCanvas';

function reducer(state: ArrayBoard): ArrayBoard {
    return updateBoard(state);
}

const Home: NextPage = () => {
    const testBoard = createBoard([
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
    ]);
    const [state, dispatch] = useReducer(reducer, testBoard);
    const renderRow = (row: ArrayBoard[number]) => {
        return row.map((cell, i) => <span key={i}>{cell ? '1' : '0'}</span>);
    };

    return (
        <>
            <div className="h-screen w-screen">
                <GameCanvas />
            </div>
            <button>Update</button>
        </>
    );
};

export default Home;
