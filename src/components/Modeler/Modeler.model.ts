import { GridModel } from '../../utils/grid/grid.model';
import { BlockScript } from '../Block/Block.model';

export interface ModelerScript {
    id: string;
    name: string;
    grid?: Partial<GridModel>;
    blockScript: BlockScript;
}

export type ModelerModel = Partial<ModelerScript>;
