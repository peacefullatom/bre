import { Axis } from '../../enums/axis.enum';
import { Units } from '../../enums/units.enum';
import { borderGenerator } from '../../generators/border/border';
import { hexColor } from '../../generators/hexColor/hex-color';
import { ColorModel, ColorType } from '../../utils/color/color.model';
import { TransformBatch } from '../../utils/transform/transform.model';
import { Side } from '../Side/Side';
import { BLOCK_DEFAULT_SETTINGS } from './Block.const';
import { BlockModel, BlockSide } from './Block.model';

export const Block = (props: BlockModel) => {
    const {
        background: backgroundSettings,
        border: borderSettings,
        grid,
        point: pointSettings,
        sides,
        transform,
    } = props;
    const { blockSize, units } = grid;
    const size = `${blockSize}${units}`;
    const point = grid.relativeToAbsolute(pointSettings);

    const translateZ: TransformBatch = {
        translate: [{ axis: Axis.Z, units, value: blockSize / 2 }],
    };

    const getTransform = (axis: Axis, value: number) => {
        return transform.getTransformBatch({
            rotate: [{ axis, units: Units.Deg, value }],
            ...translateZ,
        });
    };

    const parseSideTransform = (side: BlockSide): string | undefined => {
        switch (side) {
            // make cache on the level of transformer
            case BlockSide.Front:
                return transform.getTransformBatch({ ...translateZ });
            // make cache on the level of transformer
            case BlockSide.Top:
                return getTransform(Axis.X, 90);
            // make cache on the level of transformer
            case BlockSide.Right:
                return getTransform(Axis.Y, 90);
            // make cache on the level of transformer
            case BlockSide.Left:
                return getTransform(Axis.Y, -90);
            // make cache on the level of transformer
            case BlockSide.Bottom:
                return getTransform(Axis.X, -90);
            // make cache on the level of transformer
            case BlockSide.Back:
                return getTransform(Axis.X, -180);
        }
    };

    const parseColorType = (hex: ColorType) =>
        typeof hex === 'string' ? { hex } : hex;

    const parseSideBackground = (side: BlockSide): string | undefined => {
        const settings = sides ? sides[side] : undefined;
        const color = settings?.background
            ? parseColorType(settings.background)
            : backgroundSettings;
        const background = hexColor(color);
        return background || hexColor(BLOCK_DEFAULT_SETTINGS.background);
    };

    const parseSideBorder = (side: BlockSide): string | undefined => {
        const settings = sides ? sides[side] : undefined;
        const color = settings?.border
            ? ({ hex: settings?.border } as Partial<ColorModel>)
            : borderSettings;
        const border = borderGenerator(color);
        return border || borderGenerator(BLOCK_DEFAULT_SETTINGS.border);
    };

    return (
        <div
            style={{
                left: `${point.X}${units}`,
                position: 'absolute',
                top: `${point.Y}${units}`,
                transform: `translateZ(${point.Z}${units})`,
                transformStyle: 'preserve-3d',
            }}
        >
            {Object.values(BlockSide).map((side, ind) => (
                <Side
                    background={parseSideBackground(side)}
                    border={parseSideBorder(side)}
                    key={ind}
                    size={size}
                    transform={parseSideTransform(side)}
                />
            ))}
        </div>
    );
};
