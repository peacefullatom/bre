import { ColorType } from '../../utils/color/color.model';
import { Grid } from '../../utils/grid/grid';
import { PointModel } from '../../utils/point/point.model';
import { BlockScript } from '../Block/Block.model';

export interface PlaneProps {
    background?: ColorType;
    border?: ColorType;
    wrapperWidth: number;
    wrapperHeight: number;
    rotate?: Partial<PointModel>;
    translate?: Partial<PointModel>;
    grid: Grid;
    blockScript: BlockScript;
}
