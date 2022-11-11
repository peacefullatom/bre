import { Units } from '../../transform/transform.model';
import { borderGenerator } from './border';
import { BorderStyle } from './border.model';

const defaultColor = { hex: '#d' };

describe('it should create a border CSS definition', () => {
    test('it should return default border', () => {
        const result = borderGenerator();
        expect(result).toEqual(undefined);
    });

    test('it should return border with predefined settings', () => {
        const result = borderGenerator(defaultColor, 2, BorderStyle.Dashed, Units.Em);
        expect(result).toEqual('2em dashed #ddddddff');
    });
});