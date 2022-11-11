import { ColorModel } from '../color/color.model';
import { Grid } from '../grid/grid';
import { PointModel } from '../point/point.model';

export interface PlaneProps {
    background?: Partial<ColorModel>;
    border?: Partial<ColorModel>;
    wrapperWidth: number;
    wrapperHeight: number;
    rotate?: Partial<PointModel>;
    translate?: Partial<PointModel>;
    grid: Grid;
}