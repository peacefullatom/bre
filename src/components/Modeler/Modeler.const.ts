import { PointModel } from '../../utils/point/point.model';
import { PlaneProjection } from '../Plane/Plane.model';
import { ModelerModel } from './Modeler.model';

export const DEFAULT_MODELER_MODEL: ModelerModel = {
    name: 'Scene 0',
    blockScript: { blocks: [] },
    grid: { blockSize: 60, axisLength: { X: 1, Y: 2, Z: 3 } },
};

export const PROJECTION_X = { X: 0, Y: 0, Z: 0 };
export const PROJECTION_Y = { X: -90, Y: 0, Z: 0 };
export const PROJECTION_Z = { X: 0, Y: 90, Z: 0 };

export const modelerGetRotate = (projection: PlaneProjection): Partial<PointModel> => {
    switch (projection) {
        case 'X':
            return PROJECTION_X;
        case 'Y':
            return PROJECTION_Y;
        case 'Z':
            return PROJECTION_Z;
        case 'D':
            return { X: -17, Y: 47, Z: -17 };
    }
};
