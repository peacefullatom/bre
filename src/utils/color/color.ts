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
            color.match(
                /([0-9a-f]{2})?([0-9a-f]{2})?([0-9a-f]{2})?([0-9a-f]{2})?/i
            ) || [];
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

    hexToNumeric(hex = DEFAULT_HEX_BLACK): number {
        const value = hex.replace(/#/, '');
        return parseInt(value, 16);
    }

    numericToHex(value = 0): string {
        return this.normalizeHexValue(value.toString(16)).toLowerCase();
    }

    normalizeNumericValue(value = 0): number {
        if (value < 0) {
            return 0;
        }
        if (value > 255) {
            return 255;
        }
        return value;
    }

    normalizeHexValue(
        value?: string,
        defaultValue = DEFAULT_HEX_BLACK
    ): string {
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
    normalizeHex(color = DEFAULT_HEX_COLOR): string {
        const normalize = this.normalizeHexValue;
        const duplicate = (value?: string): string => {
            return value ? value + value : DEFAULT_HEX_BLACK;
        };
        const glue = (
            r?: string,
            g?: string,
            b?: string,
            a?: string
        ): string => {
            return `#${normalize(r)}${normalize(g)}${normalize(b)}${normalize(
                a,
                DEFAULT_HEX_ALPHA
            )}`.toLowerCase();
        };
        const value = color.replace(/#/, '');
        const len = value.length;

        if (len === 1) {
            const values = value.match(/([0-9a-f])?/i) || [];
            const [, c] = values;
            const n = duplicate(c);
            return glue(n, n, n);
        } else if (len === 3) {
            const values =
                value.match(/([0-9a-f])?([0-9a-f])?([0-9a-f])?/i) || [];
            const [, r, g, b] = values;
            const nR = duplicate(r);
            const nG = duplicate(g);
            const nB = duplicate(b);
            return glue(nR, nG, nB);
        } else if (len === 6) {
            const values =
                value.match(/([0-9a-f]{2})?([0-9a-f]{2})?([0-9a-f]{2})?/i) ||
                [];
            const [, r, g, b] = values;
            return glue(r, g, b);
        } else if (len === 8) {
            const values =
                value.match(
                    /([0-9a-f]{2})?([0-9a-f]{2})?([0-9a-f]{2})?([0-9a-f]{2})?/i
                ) || [];
            const [, r, g, b, a] = values;
            return glue(r, g, b, a);
        }

        return DEFAULT_HEX_COLOR;
    }
}
