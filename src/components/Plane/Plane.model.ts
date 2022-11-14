import { ColorModel } from "../../utils/color/color.model";
import { Grid } from "../../utils/grid/grid";
import { PointModel } from "../../utils/point/point.model";
import { BlockScript } from "../Block/Block.model";

export interface PlaneProps {
    background?: Partial<ColorModel>;
    border?: Partial<ColorModel>;
    wrapperWidth: number;
    wrapperHeight: number;
    rotate?: Partial<PointModel>;
    translate?: Partial<PointModel>;
    grid: Grid;
    blockScript: BlockScript;
}