import { CSSProperties } from "react";
import { Axis } from "../../enums/axis.enum";
import { Units } from "../../enums/units.enum";
import { Color } from "../../utils/color/color";
import { TransformBatch } from "../../utils/transform/transform.model";
import { BlockModel } from "./Block.model";

export const Block = (props: BlockModel) => {
    const { grid, color: colorSettings, border: borderSettings, point: pointSettings, transform } = props;
    const { blockSize, units } = grid;
    const color = new Color(colorSettings);
    const border = new Color(borderSettings);
    const background = color.hex;
    const size = `${blockSize}${units}`;
    const defaultSideCss: CSSProperties = { position: 'absolute', width: size, height: size, background, border: `1px solid ${border.hex}` };
    const point = grid.relativeToAbsolute(pointSettings);
    const translateZ: TransformBatch = { translate: [{ axis: Axis.Z, units, value: blockSize / 2 }] };

    const getTransform = (axis: Axis, value: number) => transform.getTransformBatch({ rotate: [{ axis, units: Units.Deg, value }], ...translateZ });

    return (
        <div style={{
            position: 'absolute',
            left: `${point.X}${units}`,
            top: `${point.Y}${units}`,
            transform: `translateZ(${point.Z}${units})`,
            transformStyle: 'preserve-3d'
        }}>
            {/* front */}
            {/* <div style={{ ...defaultSideCss, transform: `translateZ(${sizeX2})` }} /> */}
            <div style={{ ...defaultSideCss, transform: transform.getTransformBatch({ ...translateZ }) }} />
            {/* top */}
            {/* <div style={{ ...defaultSideCss, transform: `rotateX(90deg) translateZ(${sizeX2})` }} /> */}
            <div style={{ ...defaultSideCss, transform: getTransform(Axis.X, 90) }} />
            {/* right */}
            {/* <div style={{ ...defaultSideCss, transform: `rotateY(90deg) translateZ(${sizeX2})` }} /> */}
            <div style={{ ...defaultSideCss, transform: getTransform(Axis.Y, 90) }} />
            {/* left */}
            {/* <div style={{ ...defaultSideCss, transform: `rotateY(-90deg) translateZ(${sizeX2})` }} /> */}
            <div style={{ ...defaultSideCss, transform: getTransform(Axis.Y, -90) }} />
            {/* bottom */}
            {/* <div style={{ ...defaultSideCss, transform: `rotateX(-90deg) translateZ(${sizeX2})` }} /> */}
            <div style={{ ...defaultSideCss, transform: getTransform(Axis.X, -90) }} />
            {/* back */}
            {/* <div style={{ ...defaultSideCss, transform: `rotateY(-180deg) translateZ(${sizeX2})` }} /> */}
            <div style={{ ...defaultSideCss, transform: getTransform(Axis.X, -180) }} />
        </div>
    );
};