import { Cache } from '../../decorators/cache.decorator';
import { BorderStyle } from '../../enums/border-style.enum';
import { Units } from '../../enums/units.enum';
import {
    DEFAULT_HEX_ALPHA,
    DEFAULT_HEX_BLACK,
    DEFAULT_HEX_COLOR,
    DEFAULT_NUMERIC_ALPHA,
    DEFAULT_NUMERIC_BLACK,
} from './color.const';
import { ColorModel, ColorType } from './color.model';

export class Color implements ColorModel {
    private valueR: number;
    private valueG: number;
    private valueB: number;
    private valueA: number;

    set r(value: number) {
        value = this.normalizeNumericValue(value);
        this.valueR = value;
    }

    get r(): number {
        return this.valueR;
    }

    set g(value: number) {
        value = this.normalizeNumericValue(value);
        this.valueG = value;
    }

    get g(): number {
        return this.valueG;
    }

    set b(value: number) {
        value = this.normalizeNumericValue(value);
        this.valueB = value;
    }

    get b(): number {
        return this.valueB;
    }

    set a(value: number) {
        value = this.normalizeNumericValue(value);
        this.valueA = value;
    }

    get a(): number {
        return this.valueA;
    }

    set hex(value: string) {
        const color = this.normalizeHex(value).replace(/#/, '');
        const colors =
            color.match(/([0-9a-f]{2})?([0-9a-f]{2})?([0-9a-f]{2})?([0-9a-f]{2})?/i) || [];
        const [, r, g, b, a] = colors;
        this.r = this.hexToNumeric(r);
        this.g = this.hexToNumeric(g);
        this.b = this.hexToNumeric(b);
        this.a = this.hexToNumeric(a);
    }

    get hex(): string {
        const r = this.numericToHex(this.r);
        const g = this.numericToHex(this.g);
        const b = this.numericToHex(this.b);
        const a = this.numericToHex(this.a);
        return `#${r}${g}${b}${a}`;
    }

    constructor(settings?: ColorType) {
        if (typeof settings === 'string') {
            this.hex = this.normalizeHex(settings);
        } else {
            this.r = settings?.r || DEFAULT_NUMERIC_BLACK;
            this.g = settings?.g || DEFAULT_NUMERIC_BLACK;
            this.b = settings?.b || DEFAULT_NUMERIC_BLACK;
            this.a = settings?.a || DEFAULT_NUMERIC_ALPHA;
            if (typeof settings?.hex === 'string') {
                this.hex = this.normalizeHex(settings.hex);
            }
        }
    }

    @Cache()
    parseColorType(color?: ColorType, shade = 0): string | undefined {
        if (typeof color === 'string') {
            return this.normalizeHex(color, shade);
        }

        if (typeof color === 'object') {
            const { r, g, b, a, hex } = color;
            if (typeof r === 'number' && typeof g === 'number' && typeof b === 'number') {
                return [
                    '#',
                    this.numericToHex(r, shade),
                    this.numericToHex(g, shade),
                    this.numericToHex(b, shade),
                    this.numericToHex(a || DEFAULT_NUMERIC_ALPHA),
                ].join('');
            }
            if (typeof hex === 'string') {
                return this.normalizeHex(color.hex, shade);
            }
        }
    }

    @Cache()
    parseBorder(
        color?: ColorType,
        thickness = 1,
        style = BorderStyle.Solid,
        units = Units.Px
    ): string | undefined {
        if (!color) {
            return;
        }

        const borderColor = this.parseColorType(color);
        return `${thickness}${units} ${style} ${borderColor}`;
    }

    @Cache()
    hexToNumeric(hex = DEFAULT_HEX_BLACK): number {
        const value = hex.replace(/#/, '');
        return parseInt(value, 16);
    }

    @Cache()
    numericToHex(value = 0, shade = 0): string {
        const shadedValue = value + shade;
        return this.normalizeHexValue(shadedValue.toString(16)).toLowerCase();
    }

    @Cache()
    normalizeNumericValue(value = 0): number {
        if (value < 0) {
            return 0;
        }
        if (value > 255) {
            return 255;
        }
        return value;
    }

    @Cache()
    normalizeHexValue(value?: string, defaultValue = DEFAULT_HEX_BLACK): string {
        const normal = value || defaultValue;
        if (normal.length > 2) {
            return defaultValue;
        }
        return normal.length < 2 ? `0${normal}` : normal;
    }

    /**
     * This is a lazy implementation which will try check string of color definition.
     *
     * You may provide:
     * - *#a* - it will return *#aaaaaaff*
     * - *#bcd* - it will return *#bbccddff*
     * - *#ef1234* - it will return *#ef1234ff*
     *
     * if normalization will fail it'll return *#000000ff*
     */
    @Cache()
    normalizeHex(color = DEFAULT_HEX_COLOR, shade = 0): string {
        const duplicate = (value?: string): string => {
            return value ? value + value : DEFAULT_HEX_BLACK;
        };
        const addShade = (color?: string, defaultValue = DEFAULT_HEX_BLACK) => {
            const shadedColor = this.normalizeNumericValue(
                parseInt(color || defaultValue, 16) + shade
            );
            return shadedColor.toString(16);
        };
        const glue = (r?: string, g?: string, b?: string, a?: string): string => {
            return (
                '#' +
                [addShade(r), addShade(g), addShade(b), a || DEFAULT_HEX_ALPHA]
                    .map((color) => this.normalizeHexValue(color))
                    .join('')
                    .toLowerCase()
            );
        };
        const value = color.replace(/#/, '');
        const len = value.length;

        if (len === 1) {
            const values = value.match(/([0-9a-f])?/i) || [];
            const [, c] = values;
            const n = duplicate(c);
            return glue(n, n, n);
        } else if (len === 3) {
            const values = value.match(/([0-9a-f])?([0-9a-f])?([0-9a-f])?/i) || [];
            const [, r, g, b] = values;
            const nR = duplicate(r);
            const nG = duplicate(g);
            const nB = duplicate(b);
            return glue(nR, nG, nB);
        } else if (len === 6) {
            const values = value.match(/([0-9a-f]{2})?([0-9a-f]{2})?([0-9a-f]{2})?/i) || [];
            const [, r, g, b] = values;
            return glue(r, g, b);
        } else if (len === 8) {
            const values =
                value.match(/([0-9a-f]{2})?([0-9a-f]{2})?([0-9a-f]{2})?([0-9a-f]{2})?/i) || [];
            const [, r, g, b, a] = values;
            return glue(r, g, b, a);
        }

        return DEFAULT_HEX_COLOR;
    }
}
