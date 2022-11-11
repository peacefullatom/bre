import { ColorModel } from "../color/color.model";
import { Grid } from "../grid/grid";
import { PointModel } from "../point/point.model";

export interface BlockModel {
    point: PointModel;
    color: Partial<ColorModel>;
    border?: Partial<ColorModel>;
    grid: Grid;
}