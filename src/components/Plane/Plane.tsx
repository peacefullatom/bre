import { useEffect, useState } from "react";
import { Units } from "../../enums/units.enum";
import { borderGenerator } from "../../generators/border/border";
import { hexColor } from "../../generators/hexColor/hex-color";
import { Transform } from "../../utils/transform/transform";
import { TransformType } from "../../utils/transform/transform.model";
import { Block } from "../Block/Block";
import { PlaneProps } from "./Plane.model";

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
    const transformBlock = new Transform();
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

    const defaultProps = { grid, color: { hex: '#6699cc80' }, border: { hex: '#336699' }, transform: transformBlock };

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