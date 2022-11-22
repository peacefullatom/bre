import { RefObject, useEffect, useState } from 'react';

export const useViewsSize = (ref: RefObject<HTMLDivElement>) => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const updateSize = () => {
        const div = ref.current;
        if (div) {
            const newWidth = div.offsetWidth / 2;
            const newHeight = div.offsetHeight / 2;
            if (width !== newWidth) {
                setWidth(newWidth);
            }
            if (height !== newHeight) {
                setHeight(newHeight);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('resize', updateSize);

        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => updateSize(), []);

    return [width, height];
};
