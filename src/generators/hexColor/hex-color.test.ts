import { hexColor } from './hex-color';

describe('it should generate hex colors', () => {
    test('it should return undefined', () => {
        const result = hexColor();
        expect(result).toEqual(undefined);
    });

    test('it should return predefined color', () => {
        const result = hexColor({ hex: '#d' });
        expect(result).toEqual('#ddddddff');
    });
});