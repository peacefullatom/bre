import { CSSProperties } from "react";
import { Color } from "../color/color";
import { BlockModel } from "./block.model";

export const Block = (props: BlockModel) => {
    const { grid, color: colorSettings, border: borderSettings, point: pointSettings } = props;
    const { blockSize, units } = grid;
    const color = new Color(colorSettings);
    const border = new Color(borderSettings);
    const background = color.hex;
    const size = `${blockSize}${units}`;
    const halfBlock = blockSize / 2;
    const sizeX2 = `${halfBlock}${units}`;
    const defaultSideCss: CSSProperties = { position: 'absolute', width: size, height: size, background, border: `1px solid ${border.hex}` };
    const point = grid.relativeToAbsolute(pointSettings);

    return (
        <div style={{
            position: 'absolute',
            left: `${point.X - halfBlock}${units}`,
            top: `${point.Y - halfBlock}${units}`,
            transform: `translateZ(${point.Z}${units})`,
            transformStyle: 'preserve-3d'
        }}>
            {/* front */}
            <div style={{ ...defaultSideCss, transform: `translateZ(${sizeX2})` }} />
            {/* top */}
            <div style={{ ...defaultSideCss, transform: `rotateX(90deg) translateZ(${sizeX2})` }} />
            {/* right */}
            <div style={{ ...defaultSideCss, transform: `rotateY(90deg) translateZ(${sizeX2})` }} />
            {/* left */}
            <div style={{ ...defaultSideCss, transform: `rotateY(-90deg) translateZ(${sizeX2})` }} />
            {/* bottom */}
            <div style={{ ...defaultSideCss, transform: `rotateX(-90deg) translateZ(${sizeX2})` }} />
            {/* back */}
            <div style={{ ...defaultSideCss, transform: `rotateY(-180deg) translateZ(${sizeX2})` }} />
        </div>
    );
};