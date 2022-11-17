import { Axis } from '../../enums/axis.enum';
import { Units } from '../../enums/units.enum';
import { TransformBatch } from '../../utils/transform/transform.model';
import { SideCached } from '../Side/Side';
import { BLOCK_DEFAULT_SETTINGS } from './Block.const';
import { BlockModel, BlockSide } from './Block.model';

export const Block = (props: BlockModel) => {
    const {
        background: backgroundSettings,
        border: borderSettings,
        color,
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
            case BlockSide.Front:
                return transform.getTransformBatch({ ...translateZ });
            case BlockSide.Top:
                return getTransform(Axis.X, 90);
            case BlockSide.Right:
                return getTransform(Axis.Y, 90);
            case BlockSide.Left:
                return getTransform(Axis.Y, -90);
            case BlockSide.Bottom:
                return getTransform(Axis.X, -90);
            case BlockSide.Back:
                return getTransform(Axis.X, -180);
        }
    };

    const parseSideBackground = (side: BlockSide): string | undefined => {
        const settings = sides ? sides[side] : undefined;
        const colorSettings = settings?.background
            ? settings.background
            : backgroundSettings;
        const background = color.parseColorType(colorSettings);
        return (
            background ||
            color.parseColorType(BLOCK_DEFAULT_SETTINGS.background)
        );
    };

    const parseSideBorder = (side: BlockSide): string | undefined => {
        const settings = sides ? sides[side] : undefined;
        const colorSettings = settings?.border
            ? settings?.border
            : borderSettings;
        const border = color.parseBorder(colorSettings);
        return border || color.parseBorder(BLOCK_DEFAULT_SETTINGS.border);
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
                <SideCached
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
