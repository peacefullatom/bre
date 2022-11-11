import { Axis } from '../enums/axis.enum';
import { Transform } from './transform';
import { TransformType, Units } from './transform.model';

const transform = new Transform();

describe('it should assign values properly', () => {
    test('it should return default values', () => {
        expect(transform.X).toEqual(0);
        expect(transform.Y).toEqual(0);
        expect(transform.Z).toEqual(0);
    });

    test('it should return provided values', () => {
        const X = 1;
        const Y = 2;
        const Z = 3;
        const mock = new Transform({ X, Y, Z });
        expect(mock.X).toEqual(X);
        expect(mock.Y).toEqual(Y);
        expect(mock.Z).toEqual(Z);
    });
});

describe('it should return correct transform values', () => {
    test('it should rotate by X axis via getTransformByAxis', () => {
        transform.X = 15;
        const result = transform.getTransformByAxis(TransformType.Rotate, Axis.X, Units.Deg);
        expect(result).toEqual('rotateX(15deg)');
    });

    test('it should translate by all axises via getTransform', () => {
        transform.X = 45;
        transform.Y = 90;
        transform.Z = 135;
        const result = transform.getTransform(TransformType.Translate, Units.Em);
        expect(result).toEqual('translateX(45em) translateY(90em) translateZ(135em)');
    });

    test('it should rotate by Y axis via getRotateByAxis', () => {
        transform.Y = 75;
        const result = transform.getRotateByAxis(Axis.Y);
        expect(result).toEqual('rotateY(75deg)');
    });

    test('it should translate by Z axis via getTranslateByAxis', () => {
        transform.Z = 1;
        const result = transform.getTranslateByAxis(Axis.Z);
        expect(result).toEqual('translateZ(1em)');
    });
});