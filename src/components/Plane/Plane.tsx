import { Units } from '../../enums/units.enum';
import { borderGenerator } from '../../generators/border/border';
import { hexColor } from '../../generators/hexColor/hex-color';
import { Transform } from '../../utils/transform/transform';
import { TransformType } from '../../utils/transform/transform.model';
import { Block } from '../Block/Block';
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
    const background = hexColor(backgroundColor);
    const border = borderGenerator(borderColor);
    const transformer = new Transform();

    const transform = transformer.getPointTransformBatch([
        { transform: TransformType.Rotate, units: Units.Deg, point: rotate },
        { transform: TransformType.Translate, units, point: translate },
    ]);

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
            {blockScript.blocks.map((block, ind) => (
                <Block
                    {...block}
                    defaultProps={blockScript?.defaultProps}
                    grid={grid}
                    key={ind}
                    transform={transformer}
                />
            ))}
        </div>
    );
};
