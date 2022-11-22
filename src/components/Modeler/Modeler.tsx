import { useRef, useState } from 'react';
import { Axis } from '../../enums/axis.enum';
import { Color } from '../../utils/color/color';
import { Grid } from '../../utils/grid/grid';
import { BlockScript } from '../Block/Block.model';
import { Plane } from '../Plane/Plane';
import { PlaneProjection } from '../Plane/Plane.model';
import { DEFAULT_MODELER_MODEL, modelerGetRotate } from './Modeler.const';
import { useViewsSize } from './Modeler.hooks';
import { Preview } from './Preview/Preview';
import { Projection } from './Projection/Projection';

export const Modeler = (props = DEFAULT_MODELER_MODEL) => {
    const defaultProps = { ...props, ...DEFAULT_MODELER_MODEL };
    const {
        name,
        grid: gridSettings,
        blockScript: blockScriptSettings,
    } = defaultProps;
    const ref = useRef<HTMLDivElement>(null);
    const [wrapperWidth, wrapperHeight] = useViewsSize(ref);
    const color = new Color();
    const grid = new Grid(gridSettings);
    const [blockScript, setBlockScript] = useState<BlockScript>({
        blocks: [
            {
                point: { X: 0, Y: 0, Z: 0 },
                background: '#44884480',
                border: '#44884480',
            },
            {
                point: { X: 0, Y: 1, Z: 0 },
                background: '#ff884480',
                border: '#ff884480',
            },
            {
                point: { X: 0, Y: -1, Z: 0 },
                background: '#4488ff80',
                border: '#4488ff80',
            },
            {
                point: { X: 1, Y: 0, Z: 0 },
                background: '#22ff2280',
                border: '#22ff2280',
            },
            {
                point: { X: -1, Y: 0, Z: 0 },
                background: '#ff22ff80',
                border: '#ff22ff80',
            },
            {
                point: { X: 0, Y: 0, Z: 1 },
                background: '#cc339980',
                border: '#cc339980',
            },
            {
                point: { X: 0, Y: 0, Z: -1 },
                background: '#00336680',
                border: '#00336680',
            },
        ],
    });
    const CommonPlane = (props: { projection: PlaneProjection }) => {
        return (
            <Plane
                grid={grid}
                wrapperWidth={wrapperWidth}
                wrapperHeight={wrapperHeight}
                blockScript={blockScript}
                rotate={modelerGetRotate(props.projection)}
            />
        );
    };

    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                display: 'flex',
                boxSizing: 'border-box',
                flexDirection: 'column',
            }}
        >
            {/* header */}
            <div
                style={{
                    width: '100%',
                    height: '2rem',
                    background: color.parseColorType('#f0f0f0'),
                    flexShrink: 0,
                    lineHeight: '2rem',
                    textAlign: 'center',
                    borderBottom: '1px solid black',
                }}
            >
                {name}
            </div>
            {/* body */}
            <div
                style={{
                    display: 'flex',
                    flexGrow: 1,
                }}
            >
                {/* views */}
                <div
                    ref={ref}
                    style={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        flexFlow: 'wrap',
                    }}
                >
                    {Object.values(Axis).map((axis, index) => (
                        <Projection key={index} axis={axis}>
                            <CommonPlane projection={axis as PlaneProjection} />
                        </Projection>
                    ))}
                    <Preview>
                        <CommonPlane projection={'D' as PlaneProjection} />
                    </Preview>
                </div>
                {/* props */}
                <div
                    style={{
                        background: color.parseColorType('#d0d0d0'),
                        flexShrink: 0,
                        width: '300px',
                        height: '100%',
                        display: 'flex',
                        flexFlow: 'wrap',
                        borderLeft: '1px solid black',
                    }}
                >
                    {/* title */}
                    <div
                        style={{
                            width: '100%',
                            height: '2rem',
                            lineHeight: '2rem',
                            padding: '0 2rem',
                            background: color.parseColorType('#b0b0b0'),
                        }}
                    >
                        Properties
                    </div>
                </div>
            </div>
        </div>
    );
};
