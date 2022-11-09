import { render } from '@testing-library/react';
import React from 'react';
import { Plane } from './plane';
import { PlaneProps } from './plane.model';

const planeProps: PlaneProps = {
    center: { x: 0, y: 0, z: 0 },
    background: { hex: '#33669980' },
    width: 500,
    height: 500,
    wrapperWidth: 1024,
    wrapperHeight: 1024,
    rotate: {
        X: 52,
        Y: 52,
        Z: 52,
    }
};

describe('it should render', () => {
    test('it should create a plane', () => {
        const mock = render(<Plane {...planeProps} />);
        expect(mock).toBeDefined();
        mock.unmount();
    });
});