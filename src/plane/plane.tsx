import { useEffect, useState } from "react";
import { Block } from "../block/block";
import { borderGenerator } from "../generators/border/border";
import { Color } from "../color/color";
import { Transform } from "../transform/transform";
import { TransformType, Units } from "../transform/transform.model";
import { PlaneProps } from "./plane.model";
import { hexColor } from "../generators/hexColor/hex-color";

export const Plane = (props: PlaneProps) => {
    const {
        background: backgroundColor,
        border: borderColor,
        wrapperWidth,
        wrapperHeight,
        rotate: rotateTransform,
        translate: translateTransform,
        grid,
    } = props;
    const { width, height, units, axisLength: bounds } = grid;
    const posInitial = `0${units}`;
    const [left, setLeft] = useState(posInitial);
    const [top, setTop] = useState(posInitial);
    const background = hexColor(backgroundColor);
    const border = borderGenerator(borderColor);
    const rotate = new Transform(rotateTransform);
    const translate = new Transform(translateTransform);
    const transform = [
        rotate.getTransform(TransformType.Rotate, Units.Deg),
        translate.getTransform(TransformType.Translate, units),
    ].join(' ');

    const getCenter = (outer: number, inner: number) => (outer / 2) - inner * grid.blockSize;

    useEffect(() => {
        const newLeft = `${getCenter(wrapperWidth, bounds.X)}${units}`;
        const newTop = `${getCenter(wrapperHeight, bounds.Y)}${units}`;

        if (left !== newLeft) {
            setLeft(newLeft);
        }

        if (top !== newTop) {
            setTop(newTop);
        }
    }, [wrapperWidth, wrapperHeight, grid]);

    const defaultProps = { grid, color: { hex: '#6699cc80' }, border: { hex: '#336699' } };

    return (
        <div
            style={{
                position: 'absolute',
                width,
                height,
                left,
                top,
                background,
                transform,
                transformStyle: 'preserve-3d',
                border,
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