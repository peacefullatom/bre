import { Grid } from '../../../../utils/grid/grid';
import { GridModel } from '../../../../utils/grid/grid.model';

export interface PanelGridModel {
    grid: Grid;
    update: (settings: Partial<GridModel>) => void;
}
