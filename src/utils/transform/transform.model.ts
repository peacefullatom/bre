import { Axis } from "../../enums/axis.enum";
import { Units } from "../../enums/units.enum";
import { PointModel } from "../point/point.model";

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

export interface TransformPoint {
    transform: TransformType,
    units: Units,
    point?: Partial<PointModel>;
}