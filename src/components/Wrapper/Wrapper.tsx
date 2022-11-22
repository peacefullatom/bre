import { useRef } from 'react';
import { Grid } from '../../utils/grid/grid';
import { Plane } from '../Plane/Plane';
import { PlaneProps } from '../Plane/Plane.model';
import { useUpdateDimensions } from './Wrapper.hooks';

export const Wrapper = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [wrapperWidth, wrapperHeight] = useUpdateDimensions(ref);
    const grid = new Grid({ blockSize: 100, axisLength: { X: 1, Y: 1, Z: 1 } });
    const planeProps: PlaneProps = {
        wrapperWidth,
        wrapperHeight,
        // border: { hex: '#f00' },
        // background: { hex: '#ff000040' },
        rotate: { X: -15, Y: -115, Z: 0 },
        grid,
        blockScript: {
            defaultProps: {
                background: { hex: '#00ff0040' },
                border: { hex: '#ff000080' },
            },
            blocks: [
                // {
                //     point: { X: 0, Y: 0, Z: 0 },
                //     sides: {
                //         front: { background: { hex: '#f0000040' } },
                //         top: { background: { hex: '#0f000040' } },
                //         right: { background: { hex: '#00f00040' } },
                //         left: { background: { hex: '#000f0040' } },
                //         bottom: { background: { hex: '#0000f040' } },
                //         back: { background: { hex: '#00000f40' } },
                //     },
                // },
                // {
                //     point: { X: 1, Y: 0, Z: 0 },
                //     background: { hex: '#f0f0f040' },
                //     border: { hex: '#f0804040' },
                // },
                // {
                //     point: { X: -1, Y: 0, Z: 0 },
                // }

                { id: '', point: { X: 0, Y: -1, Z: 0 } },
                { id: '', point: { X: 0, Y: 0, Z: 0 } },
                { id: '', point: { X: 0, Y: 1, Z: 0 } },
                { id: '', point: { X: 1, Y: -1, Z: 0 } },
                { id: '', point: { X: 1, Y: 0, Z: 0 } },
                { id: '', point: { X: 1, Y: 1, Z: 0 } },
                { id: '', point: { X: -1, Y: -1, Z: 0 } },
                { id: '', point: { X: -1, Y: 0, Z: 0 } },
                { id: '', point: { X: -1, Y: 1, Z: 0 } },
                { id: '', point: { X: 0, Y: -1, Z: 1 } },
                { id: '', point: { X: 0, Y: 0, Z: 1 } },
                { id: '', point: { X: 0, Y: 1, Z: 1 } },
                { id: '', point: { X: 0, Y: -1, Z: -1 } },
                { id: '', point: { X: 0, Y: 0, Z: -1 } },
                { id: '', point: { X: 0, Y: 1, Z: -1 } },
                { id: '', point: { X: -1, Y: 0, Z: 1 } },
                { id: '', point: { X: -1, Y: 0, Z: -1 } },
                { id: '', point: { X: 1, Y: 0, Z: -1 } },
                { id: '', point: { X: 1, Y: 0, Z: 1 } },
            ],
        },
    };

    return (
        <div
            ref={ref}
            style={{
                width: '100vw',
                height: '100vh',
                position: 'relative',
                perspective: '800px',
            }}
        >
            <Plane {...planeProps} />
        </div>
    );
};
