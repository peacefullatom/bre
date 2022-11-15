export interface ColorModel {
    hex: string;
    r: number;
    g: number;
    b: number;
    a: number;
}

export type ColorType = Partial<ColorModel> | string;
