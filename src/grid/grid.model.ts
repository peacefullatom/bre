import { PointModel } from "../point/point.model";
import { Units } from "../transform/transform.model";

export enum BlockSize {
    Xs = 1,
    Sm = 2,
    Md = 4,
    Lg = 8,
    Xl = 16,
}

export interface GridModel {
    blockSize: BlockSize | number;
    units: Units;
    width: string;
    height: string;
    depth: string;
    axisLength: PointModel;
}