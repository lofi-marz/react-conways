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

    let oldMouse: Vector | undefined;
    let newMouse: Vector;

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
        const xOffset = center.x / (CELL_SIZE + GAP) / zoom;
        const yOffset = center.y / (CELL_SIZE + GAP) / zoom;
        //If we shift 10 cells to the left
        //There are 10 cells on the left that don't need to be rendered
        //So instead of starting from 0 we'd start at 10
        //And there are 10 extra on the right that need to be rendered
        for (let j = -yOffset - 1; j < cellYCount - yOffset + 1; j++) {
            for (let i = -xOffset - 1; i < cellXCount - xOffset + 1; i++) {
                const x = CELL_SIZE * i * zoom + GAP * (i - 1) + center.x;
                const y = CELL_SIZE * j * zoom + GAP * (j - 1) + center.y;
                if (Math.round(j) == 5 && Math.round(i) == 5) {
                    p5.fill('red');
                } else {
                    p5.fill('white');
                }
                p5.noStroke();

                p5.square(x, y, CELL_SIZE * zoom);
                p5.fill('black');
                p5.text(
                    `${i.toFixed(0)},\n${j.toFixed(0)}`,
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
        if (!oldMouse) {
            console.log('oldMouse was null');
            oldMouse = { x: p5.mouseX, y: p5.mouseY };
        }
        newMouse = {
            x: p5.mouseX,
            y: p5.mouseY,
        };

        const delta: Vector = {
            x: newMouse.x - oldMouse.x,
            y: newMouse.y - oldMouse.y,
        };
        //This isn't working and idk why
        /*center.x += delta.x;
        center.y += delta.y;*/
        console.log(oldMouse, newMouse, delta);
    };

    const onMouseClick = (p5: P5) => {
        oldMouse = { x: p5.mouseX, y: p5.mouseY };
        center = { x: p5.mouseX, y: p5.mouseY };
    };

    return (
        <Sketch
            setup={setup}
            draw={draw}
            windowResized={onResize}
            mouseDragged={onMouseDrag}
            mouseClicked={onMouseClick}
        />
    );
}
