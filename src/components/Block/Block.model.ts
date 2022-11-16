import { Color } from '../../utils/color/color';
import { ColorType } from '../../utils/color/color.model';
import { Grid } from '../../utils/grid/grid';
import { PointModel } from '../../utils/point/point.model';
import { Transform } from '../../utils/transform/transform';
import { SideModel } from '../Side/Side.model';

export interface BlockModel {
    background?: ColorType;
    border?: ColorType;
    color: Color;
    defaultProps?: BlockOverride;
    grid: Grid;
    point: PointModel;
    sides?: { [key in BlockSide]?: BlockOverride };
    transform: Transform;
}

export enum BlockSide {
    Front = 'front',
    Top = 'top',
    Right = 'right',
    Left = 'left',
    Bottom = 'bottom',
    Back = 'back',
}

export interface BlockOverride
    extends Omit<SideModel, 'background' | 'border' | 'color'> {
    background?: ColorType;
    border?: ColorType;
    color?: ColorType;
}

export interface BlockScriptModel extends BlockOverride {
    point: PointModel;
    sides?: { [key in BlockSide]?: BlockOverride };
}

export interface BlockScript {
    defaultProps?: BlockOverride;
    blocks: BlockScriptModel[];
}
