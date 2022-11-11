import { useEffect, useRef, useState } from 'react';
import { Grid } from '../grid/grid';
import { Plane } from '../plane/plane';
import { PlaneProps } from '../plane/plane.model';

export const Wrapper = () => {
    const [wrapperWidth, setWrapperWidth] = useState(0);
    const [wrapperHeight, setWrapperHeight] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const grid = new Grid({ blockSize: 64, axisLength: { X: 3, Y: 3, Z: 3 } });
    const planeProps: PlaneProps = {
        center: { X: 0, Y: 0, Z: 0 },
        wrapperWidth,
        wrapperHeight,
        rotate: { X: -15, Y: -115, Z: 0, },
        grid,
    };

    const updateDimensions = () => {
        const div = ref.current;

        if (div) {
            const width = div.offsetWidth;
            const height = div.offsetHeight;

            if (wrapperWidth !== width) {
                setWrapperWidth(width);
            }

            if (wrapperHeight !== height) {
                setWrapperHeight(height);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('resize', updateDimensions);

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => updateDimensions(), []);

    return (
        <div ref={ref} style={{ width: '100vw', height: '100vh', position: 'relative', perspective: '800px' }}>
            <Plane {...planeProps} />
        </div>
    );
};