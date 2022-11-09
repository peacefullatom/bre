export interface TransformModel {
    X: number;
    Y: number;
    Z: number;
}

export enum Axis {
    X = 'X',
    Y = 'Y',
    Z = 'Z',
};

export enum TransformType {
    Rotate = 'rotate',
    Translate = 'translate',
}

// https://www.w3schools.com/csSref/css_units.php
export enum Units {
    Deg = 'deg',

    Cm = 'cm',
    Mm = 'mm',
    In = 'in',
    Px = 'px',
    Pt = 'pt',
    Pc = 'pc',

    Em = 'em',
    Ex = 'ex',
    Ch = 'ch',
    Rem = 'rem',
    Vw = 'vw',
    Vh = 'vh',
    Vmin = 'vmin',
    Vmax = 'vmax',
    Percent = '%',
}