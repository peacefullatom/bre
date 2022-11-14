import { ColorModel } from "../../utils/color/color.model";
import { Grid } from "../../utils/grid/grid";
import { PointModel } from "../../utils/point/point.model";
import { Transform } from "../../utils/transform/transform";

export interface BlockModel {
    point: PointModel;
    color: Partial<ColorModel>;
    border?: Partial<ColorModel>;
    grid: Grid;
    transform: Transform;
}

export interface BlockScript {
    defaultProps?: {
        color?: Partial<ColorModel>;
        border?: Partial<ColorModel>;
    };
    blocks: PointModel[];
}