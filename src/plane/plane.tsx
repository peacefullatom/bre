import { useEffect, useState } from "react";
import { Color } from "../color/color";
import { Transform } from "../transform/transform";
import { TransformType, Units } from "../transform/transform.model";
import { PlaneProps } from "./plane.model";

export const Plane = (props: PlaneProps) => {
    const {
        center,
        width,
        height,
        background: backgroundColor,
        wrapperWidth,
        wrapperHeight,
        rotate: rotateTransform,
        translate: translateTransform,
    } = props;
    const { x, y, z } = center;
    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);
    const background = new Color(backgroundColor);
    const rotate = new Transform(rotateTransform);
    const translate = new Transform(translateTransform);
    const transform = [
        rotate.getTransform(TransformType.Rotate, Units.Deg),
        translate.getTransform(TransformType.Translate, Units.Rem),
    ].join(' ');

    const getCenter = (outer: number, position: number, inner: number) => (outer / 2) + position - inner / 2;

    useEffect(() => {
        const newPosX = getCenter(wrapperWidth, x, width);
        const newPosY = getCenter(wrapperHeight, y, height);

        if (posX !== newPosX) {
            setPosX(newPosX);
        }

        if (posY !== newPosY) {
            setPosY(newPosY);
        }
    }, [wrapperWidth, wrapperHeight]);

    return (
        <div
            style={{
                position: 'absolute',
                width: `${width}px`,
                height: `${height}px`,
                left: `${posX}px`,
                top: `${posY}px`,
                background: background.hex,
                transform,
            }}
        ></div>
    );
}