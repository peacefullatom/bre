import { Color } from '../../utils/color/color';
import { ColorType } from '../../utils/color/color.model';
import { Grid } from '../../utils/grid/grid';
import { PointModel } from '../../utils/point/point.model';
import { Transform } from '../../utils/transform/transform';
import { SideModel } from '../Side/Side.model';

export interface BlockModel {
    id?: string;
    name?: string;
    background?: ColorType;
    border?: ColorType;
    color: Color;
    defaultProps?: BlockOverride;
    grid: Grid;
    point: PointModel;
    sides?: { [key in BlockSide]?: BlockOverride };
    transform: Transform;
    hoverBackground?: ColorType;
    hoverBorder?: ColorType;
}

export enum BlockSide {
    Front = 'Front',
    Top = 'Top',
    Right = 'Right',
    Left = 'Left',
    Bottom = 'Bottom',
    Back = 'Back',
}

export interface BlockOverride extends Omit<SideModel, 'background' | 'border' | 'color'> {
    background?: ColorType;
    border?: ColorType;
    color?: ColorType;
}

export interface BlockScriptModel extends BlockOverride {
    id: string;
    point: PointModel;
    sides?: { [key in BlockSide]?: BlockOverride };
}

export interface BlockScript {
    defaultProps?: BlockOverride;
    blocks: BlockScriptModel[];
}
