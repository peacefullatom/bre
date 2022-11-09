import { Point } from './point';

describe('must create point instance', () => {
    test('create point with default value', () => {
        const point = new Point();
        expect(point.x).toEqual(0);
        expect(point.y).toEqual(0);
        expect(point.z).toEqual(0);
    });

    test('create point with predefined x', () => {
        const point = new Point({ x: 1 });
        expect(point.x).toEqual(1);
        expect(point.y).toEqual(0);
        expect(point.z).toEqual(0);
    });

    test('create point with predefined y', () => {
        const point = new Point({ y: 1 });
        expect(point.x).toEqual(0);
        expect(point.y).toEqual(1);
        expect(point.z).toEqual(0);
    });

    test('create point with predefined z', () => {
        const point = new Point({ z: 1 });
        expect(point.x).toEqual(0);
        expect(point.y).toEqual(0);
        expect(point.z).toEqual(1);
    });

    test('create point with predefined values', () => {
        const point = new Point({ x: 1, y: 1, z: 1 });
        expect(point.x).toEqual(1);
        expect(point.y).toEqual(1);
        expect(point.z).toEqual(1);
    });
});