import { Point } from './point';

describe('must create point instance', () => {
    test('create point with default value', () => {
        const point = new Point();
        expect(point.X).toEqual(0);
        expect(point.Y).toEqual(0);
        expect(point.Z).toEqual(0);
    });

    test('create point with predefined x', () => {
        const point = new Point({ X: 1 });
        expect(point.X).toEqual(1);
        expect(point.Y).toEqual(0);
        expect(point.Z).toEqual(0);
    });

    test('create point with predefined y', () => {
        const point = new Point({ Y: 1 });
        expect(point.X).toEqual(0);
        expect(point.Y).toEqual(1);
        expect(point.Z).toEqual(0);
    });

    test('create point with predefined z', () => {
        const point = new Point({ Z: 1 });
        expect(point.X).toEqual(0);
        expect(point.Y).toEqual(0);
        expect(point.Z).toEqual(1);
    });

    test('create point with predefined values', () => {
        const point = new Point({ X: 1, Y: 1, Z: 1 });
        expect(point.X).toEqual(1);
        expect(point.Y).toEqual(1);
        expect(point.Z).toEqual(1);
    });
});