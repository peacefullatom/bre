import { Grid } from '../../../../utils/grid/grid';
import { BlockModel } from '../../../Block/Block.model';

export interface PanelBlockPropertiesModel {
    block: Partial<BlockModel>;
    grid: Grid;
    update: (settings: Partial<BlockModel>) => void;
}
