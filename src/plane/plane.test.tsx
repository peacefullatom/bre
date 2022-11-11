import { render } from '@testing-library/react';
import React from 'react';
import { Grid } from '../grid/grid';
import { Plane } from './plane';
import { PlaneProps } from './plane.model';

const grid = new Grid();

const planeProps: PlaneProps = {
    center: { X: 0, Y: 0, Z: 0 },
    background: { hex: '#33669980' },
    wrapperWidth: 1024,
    wrapperHeight: 1024,
    rotate: {
        X: 52,
        Y: 52,
        Z: 52,
    },
    grid,
};

describe('it should render', () => {
    test('it should create a plane', () => {
        const mock = render(<Plane {...planeProps} />);
        expect(mock).toBeDefined();
        mock.unmount();
    });
});