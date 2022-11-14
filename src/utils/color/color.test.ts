import { Color } from './color';
import { DEFAULT_HEX_ALPHA, DEFAULT_HEX_COLOR, DEFAULT_NUMERIC_ALPHA, DEFAULT_NUMERIC_BLACK } from './color.const';

const color = new Color();
const singleHex = '#a';
const invalidHex = '#h';
const tripleHex = '#bcd';
const normalHex = '#ef1234';
const normalHexAlpha = '#56789abc';

describe('it should properly get and set values', () => {
    test('it should return default colors if no colors were provided', () => {
        expect(color.r).toEqual(DEFAULT_NUMERIC_BLACK);
        expect(color.g).toEqual(DEFAULT_NUMERIC_BLACK);
        expect(color.b).toEqual(DEFAULT_NUMERIC_BLACK);
        expect(color.a).toEqual(DEFAULT_NUMERIC_ALPHA);
    });

    test('it should set given colors', () => {
        color.r = 1;
        color.g = 1;
        color.b = 1;
        color.a = 1;
        expect(color.r).toEqual(1);
        expect(color.g).toEqual(1);
        expect(color.b).toEqual(1);
        expect(color.a).toEqual(1);
    });

    test('it should apply a single hex value', () => {
        color.hex = singleHex;
        expect(color.r).toEqual(170);
        expect(color.g).toEqual(170);
        expect(color.b).toEqual(170);
        expect(color.a).toEqual(255);
    });

    test('it should apply default value instead of corrupted single hex', () => {
        color.hex = invalidHex;
        expect(color.r).toEqual(DEFAULT_NUMERIC_BLACK);
        expect(color.g).toEqual(DEFAULT_NUMERIC_BLACK);
        expect(color.b).toEqual(DEFAULT_NUMERIC_BLACK);
        expect(color.a).toEqual(DEFAULT_NUMERIC_ALPHA);
    });

    test('it should apply a triple hex value', () => {
        color.hex = tripleHex;
        expect(color.r).toEqual(187);
        expect(color.g).toEqual(204);
        expect(color.b).toEqual(221);
        expect(color.a).toEqual(255);
    });

    test('it should apply a normal hex value', () => {
        color.hex = normalHex;
        expect(color.r).toEqual(239);
        expect(color.g).toEqual(18);
        expect(color.b).toEqual(52);
        expect(color.a).toEqual(255);
    });

    test('it should apply a normal hex value with alpha', () => {
        color.hex = normalHexAlpha;
        expect(color.r).toEqual(86);
        expect(color.g).toEqual(120);
        expect(color.b).toEqual(154);
        expect(color.a).toEqual(188);
    });
});

test('it should convert hex to number', () => {
    const numeric = color.hexToNumeric(singleHex);
    expect(numeric).toEqual(10);
});

test('it should convert numeric to hex', () => {
    const hex = color.numericToHex(10);
    expect(hex).toEqual('0a');
});

describe('it should normalize numeric values', () => {
    test('it should return 0', () => {
        const numeric = color.normalizeNumericValue(-1);
        expect(numeric).toEqual(0);
    });

    test('it should return 255', () => {
        const numeric = color.normalizeNumericValue(256);
        expect(numeric).toEqual(255);
    });

    test('it should return 127', () => {
        const value = 127;
        const numeric = color.normalizeNumericValue(value);
        expect(numeric).toEqual(value);
    });
});

describe('it should normalize hex value', () => {
    test('it should normalize a single hex value', () => {
        const normal = color.normalizeHex(singleHex);
        expect(normal).toEqual('#aaaaaaff');
    });

    test('it should return default value instead of corrupted single hex', () => {
        const normal = color.normalizeHex(invalidHex);
        expect(normal).toEqual(DEFAULT_HEX_COLOR);
    });

    test('it should normalize a triple hex value', () => {
        const normal = color.normalizeHex(tripleHex);
        expect(normal).toEqual('#bbccddff');
    });

    test('it should normalize a normal hex value', () => {
        const normal = color.normalizeHex(normalHex);
        expect(normal).toEqual(`${normalHex}${DEFAULT_HEX_ALPHA}`);
    });

    test('it should normalize a default hex with alpha', () => {
        const normal = color.normalizeHex(normalHexAlpha);
        expect(normal).toEqual(normalHexAlpha);
    });

    test('it should return default hex instead of invalid value', () => {
        const normal = color.normalizeHex();
        expect(normal).toEqual(DEFAULT_HEX_COLOR);
    });
});