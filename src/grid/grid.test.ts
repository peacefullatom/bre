import { PointModel } from '../point/point.model';
import { Units } from '../transform/transform.model';
import { Grid } from './grid';
import { DEFAULT_AXIS_LENGTH } from './grid.const';
import { BlockSize } from './grid.model';

const grid = new Grid();
const defaultSize = '84px';
const defaultAxisLength = { X: DEFAULT_AXIS_LENGTH, Y: DEFAULT_AXIS_LENGTH, Z: DEFAULT_AXIS_LENGTH };

describe('it should create default grid', () => {
    test('it should return default values', () => {
        expect(grid.blockSize).toEqual(BlockSize.Md);
        expect(grid.units).toEqual(Units.Px);
        expect(grid.width).toEqual(defaultSize);
        expect(grid.height).toEqual(defaultSize);
        expect(grid.depth).toEqual(defaultSize);
        expect(grid.axisLength).toEqual(defaultAxisLength);
    });

    test('it should return provided values', () => {
        const blockSize = 16;
        const units = Units.Rem;
        const axisLength: PointModel = { X: 1, Y: 2, Z: 3 };
        const mock = new Grid({
            blockSize,
            units,
            axisLength,
        });
        expect(mock.blockSize).toEqual(blockSize);
        expect(mock.units).toEqual(units);
        expect(mock.width).toEqual('48rem');
        expect(mock.height).toEqual('80rem');
        expect(mock.depth).toEqual('112rem');
        expect(mock.axisLength).toEqual(axisLength);
    });
});

test('it should return valid axis length', () => {
    const value = grid.getFullAxisLength(1);
    expect(value).toEqual('12px');
});

describe('it should convert relative point to absolute', () => {
    test('it should convert point as is', () => {
        const mock = 0;
        const point: PointModel = { X: mock, Y: mock, Z: mock };
        const result = grid.relativeToAbsolute(point);
        expect(result).toEqual({ X: 42, Y: 42, Z: 0 });
    });

    test('it should normalize positive point', () => {
        const mock = 300;
        const point: PointModel = { X: mock, Y: mock, Z: mock };
        const result = grid.relativeToAbsolute(point);
        expect(result).toEqual({ X: 82, Y: 82, Z: 40 });
    });

    test('it should normalize negative point', () => {
        const mock = -300;
        const point: PointModel = { X: mock, Y: mock, Z: mock };
        const result = grid.relativeToAbsolute(point);
        expect(result).toEqual({ X: 2, Y: 2, Z: -40 });
    });
});

describe('it should normalize relative point', () => {
    test('it should return point as is', () => {
        const mock = 0;
        const point = { X: mock, Y: mock, Z: mock };
        const result = grid.normalizeRelativePoint(point);
        expect(result).toEqual(point);
    });

    test('it should normalize positive values', () => {
        const mock = 11;
        const value = 10;
        const point = { X: mock, Y: mock, Z: mock };
        const result = grid.normalizeRelativePoint(point);
        expect(result).toEqual({ X: value, Y: value, Z: value });
    });

    test('it should normalize negative values', () => {
        const mock = -11;
        const value = -10;
        const point = { X: mock, Y: mock, Z: mock };
        const result = grid.normalizeRelativePoint(point);
        expect(result).toEqual({ X: value, Y: value, Z: value });
    });
});

describe('it should normalize relative value against the axis', () => {
    const size = 10;

    test('it should return value as is', () => {
        const value = 0;
        const result = grid.normalizeRelativeAgainstAxis(value, size);
        expect(result).toEqual(value);
    });

    test('it should return a normalized positive value', () => {
        const value = 11;
        const result = grid.normalizeRelativeAgainstAxis(value, size);
        expect(result).toEqual(size);
    });

    test('it should return a normalized negative value', () => {
        const value = -11;
        const result = grid.normalizeRelativeAgainstAxis(value, size);
        expect(result).toEqual(size * -1);
    });
});