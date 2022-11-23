import { BorderStyle } from '../../enums/border-style.enum';
import { Units } from '../../enums/units.enum';
import { Color } from '../../utils/color/color';
import { Transform } from '../../utils/transform/transform';
import { TransformType } from '../../utils/transform/transform.model';
import { Block } from '../Block/Block';
import { PROJECTION_Y, PROJECTION_Z } from '../Modeler/Modeler.const';
import { useGetCenter } from './Plane.hooks';
import { PlaneProps } from './Plane.model';

export const Plane = (props: PlaneProps) => {
    const {
        background: backgroundColor,
        blockScript,
        border: borderColor,
        grid,
        rotate,
        translate,
        wrapperHeight,
        wrapperWidth,
    } = props;
    const { width, height, units, axisLength, blockSize } = grid;
    const [left, top] = useGetCenter(
        wrapperWidth,
        wrapperHeight,
        units,
        blockSize,
        axisLength,
        grid
    );
    const color = new Color();
    const background = color.parseColorType(backgroundColor);
    const border = color.parseBorder(borderColor);
    const transformer = new Transform();

    const transform = transformer.getPointTransformBatch([
        { transform: TransformType.Rotate, units: Units.Deg, point: rotate },
        { transform: TransformType.Translate, units, point: translate },
    ]);
    const axisBorder = color.parseBorder('#0', 1, BorderStyle.Dashed);

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
            {rotate?.Y !== PROJECTION_Z.Y && (
                <div
                    style={{
                        position: 'absolute',
                        width: grid.width,
                        borderTop: axisBorder,
                        top: '50%',
                        left: `calc(50% - ${grid.width} / 2)`,
                        transform: 'rotateX(45deg)',
                    }}
                ></div>
            )}
            {rotate?.X !== PROJECTION_Y.X && (
                <div
                    style={{
                        position: 'absolute',
                        height: grid.height,
                        borderLeft: axisBorder,
                        left: '50%',
                        transform: rotate?.Y === 90 ? 'rotateY(45deg)' : '',
                    }}
                ></div>
            )}
            {!(!rotate?.X && !rotate?.Y && !rotate?.Z) && (
                <div
                    style={{
                        position: 'absolute',
                        width: grid.depth,
                        borderTop: axisBorder,
                        top: '50%',
                        left: `calc(50% - ${grid.depth} / 2)`,
                        transform: 'rotateY(90deg) rotateX(45deg)',
                    }}
                ></div>
            )}
            {blockScript.blocks.map((block, ind) => (
                <Block
                    {...block}
                    defaultProps={blockScript?.defaultProps}
                    grid={grid}
                    key={ind}
                    transform={transformer}
                    color={color}
                />
            ))}
        </div>
    );
};
