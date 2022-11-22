import { ReactNode } from 'react';
import { Axis } from '../../../enums/axis.enum';

export interface ProjectionModel {
    axis: Axis;
    children: ReactNode;
}
