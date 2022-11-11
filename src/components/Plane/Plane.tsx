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
        blockScript,
    } = props;
    const { width, height, units, axisLength: bounds } = grid;
    const defaultScriptProps = blockScript.defaultProps || {};
    const scriptProps = {
        ...defaultScriptProps,
        color: { hex: '#6699cc80' },
        border: { hex: '#336699' },
    };
    const posInitial = `0${units}`;
    const [left, setLeft] = useState(posInitial);
    const [top, setTop] = useState(posInitial);
    const background = hexColor(backgroundColor);
    const border = borderGenerator(borderColor);
    const transformer = new Transform();

    const transform = transformer.getPointTransformBatch([
        { transform: TransformType.Rotate, units: Units.Deg, point: rotateTransform },
        { transform: TransformType.Translate, units, point: translateTransform },
    ]);

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

    const defaultProps = {
        ...scriptProps,
        grid,
        transform: transformer,
    };

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
            {blockScript.blocks.map((point, ind) => (
                <Block key={ind} {...defaultProps} point={point} />
            ))}
        </div>
    );
};