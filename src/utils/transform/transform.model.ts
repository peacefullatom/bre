import { Axis } from "../../enums/axis.enum";
import { Units } from "../../enums/units.enum";

export enum TransformType {
    Rotate = 'rotate',
    Translate = 'translate',
}

export interface TransformBatchOptions {
    axis: Axis;
    value: number;
    units: Units;
}

export type TransformBatch = {
    [key in TransformType]?: TransformBatchOptions[];
};