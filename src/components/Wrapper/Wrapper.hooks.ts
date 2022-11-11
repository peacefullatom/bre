import { RefObject, useEffect, useState } from "react";

export const useUpdateDimensions = (ref: RefObject<HTMLDivElement>) => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const updateDimensions = () => {
        const div = ref.current;

        if (div) {
            const newWidth = div.offsetWidth;
            const newHeight = div.offsetHeight;

            if (width !== newWidth) {
                setWidth(newWidth);
            }

            if (height !== newHeight) {
                setHeight(newHeight);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('resize', updateDimensions);

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => updateDimensions(), []);

    return [width, height];
};