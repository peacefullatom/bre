import { useEffect, useRef, useState } from 'react';
import { Plane } from '../plane/plane';
import { PlaneProps } from '../plane/plane.model';

export const Wrapper = () => {
    const [wrapperWidth, setWrapperWidth] = useState(0);
    const [wrapperHeight, setWrapperHeight] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const planeProps: PlaneProps = {
        center: { x: 0, y: 0, z: 0 },
        background: { hex: '#33669980' },
        width: 500,
        height: 500,
        wrapperWidth,
        wrapperHeight,
        rotate: {
            X: 52,
            Y: 52,
            Z: 52,
        }
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
}