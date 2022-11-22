import { PointModel } from '../../utils/point/point.model';
import { PlaneProjection } from '../Plane/Plane.model';
import { ModelerModel } from './Modeler.model';

export const DEFAULT_MODELER_MODEL: ModelerModel = {
    name: 'Scene 0',
    blockScript: { blocks: [] },
    grid: { blockSize: 100 },
};

export const modelerGetRotate = (projection: PlaneProjection): Partial<PointModel> => {
    switch (projection) {
        case 'X':
            return { X: 0, Y: 0, Z: 0 };
        case 'Y':
            return { X: -90, Y: 0, Z: 0 };
        case 'Z':
            return { X: 0, Y: 90, Z: 0 };
        case 'D':
            return { X: -15, Y: 45, Z: 0 };
    }
};
