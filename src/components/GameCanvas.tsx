import dynamic from 'next/dynamic';

import React from 'react';
import P5 from 'p5'; //Import this for typechecking and intellisense

const Sketch = dynamic(() => import('react-p5'), {
    ssr: false,
});

const GAP = 1;
const CELL_SIZE = 50;

type Vector = {
    x: number;
    y: number;
};

export function GameCanvas() {
    //See annotations in JS for more information
    let width: number;
    let height: number;
    let zoom = 1;
    let slider: P5.Element;

    const mouseX = 0;
    const mouseY = 0;
    let center: Vector;
    const setup = (p5: P5, canvasParentRef: Element) => {
        width = p5.windowWidth;
        height = p5.windowHeight;
        p5.createCanvas(width, height).parent(canvasParentRef);
        slider = p5.createSlider(0.1, 2, 1, 0.1);
        center = { x: width / 2, y: height / 2 };
    };

    const draw = (p5: P5) => {
        p5.background(0);
        zoom = slider.value() as number;
        const cellXCount = p5.width / (CELL_SIZE + GAP) / zoom;
        const cellYCount = p5.height / (CELL_SIZE + GAP) / zoom;
        const xOffset = 2;
        const yOffset = 2;
        //If we shift 10 cells to the left
        //There are 10 cells on the left that don't need to be rendered
        //So instead of starting from 0 we'd start at 10
        //And there are 10 extra on the right that need to be rendered
        for (let j = -yOffset; j < cellYCount - yOffset; j++) {
            for (let i = -xOffset; i < cellXCount - xOffset; i++) {
                const x =
                    CELL_SIZE * i * zoom +
                    GAP * (i - 1) +
                    (center.x - p5.width / 2);
                const y =
                    CELL_SIZE * j * zoom +
                    GAP * (j - 1) +
                    (center.y - p5.height / 2);
                if (j == 5 && i == 5) {
                    p5.fill('red');
                } else {
                    p5.fill('white');
                }
                p5.noStroke();

                p5.square(x, y, CELL_SIZE * zoom);
                p5.fill('black');
                p5.text(
                    `${i.toFixed(1)},\n${j.toFixed(1)}`,
                    x + CELL_SIZE / 2,
                    y + CELL_SIZE / 2
                );
            }
        }
    };

    const onResize = (p5: P5) => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };

    const onMouseDrag = (p5: P5) => {
        p5.stroke('black');
        p5.line(mouseX, mouseY, p5.mouseX, p5.mouseY);
        console.log(mouseX, mouseY, p5.mouseX, p5.mouseY);
    };

    return (
        <Sketch
            setup={setup}
            draw={draw}
            windowResized={onResize}
            mouseDragged={onMouseDrag}
            mousePressed={(p5: P5) => {
                center = {
                    x: p5.mouseX,
                    y: p5.mouseY,
                };
            }}
        />
    );
}
