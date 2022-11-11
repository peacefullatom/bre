import { useRef } from 'react';
import { Grid } from '../../utils/grid/grid';
import { Plane } from '../Plane/Plane';
import { PlaneProps } from '../Plane/Plane.model';
import { useUpdateDimensions } from './Wrapper.hooks';

export const Wrapper = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [wrapperWidth, wrapperHeight] = useUpdateDimensions(ref);
    const grid = new Grid({ blockSize: 64, axisLength: { X: 3, Y: 3, Z: 3 } });
    const planeProps: PlaneProps = {
        wrapperWidth,
        wrapperHeight,
        rotate: { X: -15, Y: -115, Z: 0, },
        grid,
        blockScript: {
            blocks: [
                { X: 0, Y: -1, Z: 0 },
                { X: 0, Y: 0, Z: 0 },
                { X: 0, Y: 1, Z: 0 },
                { X: 1, Y: -1, Z: 0 },
                { X: 1, Y: 0, Z: 0 },
                { X: 1, Y: 1, Z: 0 },
                { X: -1, Y: -1, Z: 0 },
                { X: -1, Y: 0, Z: 0 },
                { X: -1, Y: 1, Z: 0 },
                { X: 0, Y: -1, Z: 1 },
                { X: 0, Y: 0, Z: 1 },
                { X: 0, Y: 1, Z: 1 },
                { X: 0, Y: -1, Z: -1 },
                { X: 0, Y: 0, Z: -1 },
                { X: 0, Y: 1, Z: -1 },
                { X: -1, Y: 0, Z: 1 },
                { X: -1, Y: 0, Z: -1 },
                { X: 1, Y: 0, Z: -1 },
                { X: 1, Y: 0, Z: 1 },
            ],
        },
    };

    return (
        <div ref={ref} style={{ width: '100vw', height: '100vh', position: 'relative', perspective: '800px' }}>
            <Plane {...planeProps} />
        </div>
    );
};