import { render } from '@testing-library/react';
import React from 'react';
import { Grid } from '../../utils/grid/grid';
import { Plane } from './Plane';
import { PlaneProps } from './Plane.model';

const grid = new Grid();

const planeProps: PlaneProps = {
    background: { hex: '#33669980' },
    wrapperWidth: 1024,
    wrapperHeight: 1024,
    rotate: {
        X: 52,
        Y: 52,
        Z: 52,
    },
    grid,
    blockScript: {
        blocks: [],
    },
};

describe('it should render', () => {
    test('it should create a plane', () => {
        const mock = render(<Plane {...planeProps} />);
        expect(mock).toBeDefined();
        mock.unmount();
    });
});
