import { Axis } from '../../enums/axis.enum';

export type PointModel = {
    [key in Axis]: number;
};
