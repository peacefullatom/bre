import { useEffect, useState } from "react";
import { Block } from "../block/block";
import { Color } from "../color/color";
import { Transform } from "../transform/transform";
import { TransformType, Units } from "../transform/transform.model";
import { PlaneProps } from "./plane.model";

export const Plane = (props: PlaneProps) => {
    const {
        center,
        background: backgroundColor,
        wrapperWidth,
        wrapperHeight,
        rotate: rotateTransform,
        translate: translateTransform,
        grid,
    } = props;
    const { X, Y, Z } = center;
    const { width, height, units, axisLength: bounds } = grid;
    const posInitial = `0${units}`;
    const [left, setLeft] = useState(posInitial);
    const [top, setTop] = useState(posInitial);
    const background = new Color(backgroundColor);
    const rotate = new Transform(rotateTransform);
    const translate = new Transform(translateTransform);
    const transform = [
        rotate.getTransform(TransformType.Rotate, Units.Deg),
        translate.getTransform(TransformType.Translate, units),
    ].join(' ');

    const getCenter = (outer: number, position: number, inner: number) => (outer / 2) + position - inner * grid.blockSize;

    useEffect(() => {
        const newPosX = `${getCenter(wrapperWidth, X, bounds.X)}${units}`;
        const newPosY = `${getCenter(wrapperHeight, Y, bounds.Y)}${units}`;

        if (left !== newPosX) {
            setLeft(newPosX);
        }

        if (top !== newPosY) {
            setTop(newPosY);
        }
    }, [wrapperWidth, wrapperHeight]);

    const defaultProps = { grid, color: { hex: '#6699cc80' }, border: { hex: '#336699' } };

    return (
        <div
            style={{
                position: 'absolute',
                width,
                height,
                left,
                top,
                background: background.hex,
                transform,
                transformStyle: 'preserve-3d',
            }}
        >
            <Block {...defaultProps} point={{ X: 0, Y: -1, Z: 0 }} />
            <Block {...defaultProps} point={{ X: 0, Y: 0, Z: 0 }} />
            <Block {...defaultProps} point={{ X: 0, Y: 1, Z: 0 }} />

            <Block {...defaultProps} point={{ X: 1, Y: -1, Z: 0 }} />
            <Block {...defaultProps} point={{ X: 1, Y: 0, Z: 0 }} />
            <Block {...defaultProps} point={{ X: 1, Y: 1, Z: 0 }} />

            <Block {...defaultProps} point={{ X: -1, Y: -1, Z: 0 }} />
            <Block {...defaultProps} point={{ X: -1, Y: 0, Z: 0 }} />
            <Block {...defaultProps} point={{ X: -1, Y: 1, Z: 0 }} />

            <Block {...defaultProps} point={{ X: 0, Y: -1, Z: 1 }} />
            <Block {...defaultProps} point={{ X: 0, Y: 0, Z: 1 }} />
            <Block {...defaultProps} point={{ X: 0, Y: 1, Z: 1 }} />

            <Block {...defaultProps} point={{ X: 0, Y: -1, Z: -1 }} />
            <Block {...defaultProps} point={{ X: 0, Y: 0, Z: -1 }} />
            <Block {...defaultProps} point={{ X: 0, Y: 1, Z: -1 }} />

            <Block {...defaultProps} point={{ X: -1, Y: 0, Z: 1 }} />
            <Block {...defaultProps} point={{ X: -1, Y: 0, Z: -1 }} />
            <Block {...defaultProps} point={{ X: 1, Y: 0, Z: -1 }} />
            <Block {...defaultProps} point={{ X: 1, Y: 0, Z: 1 }} />
        </div>
    );
};