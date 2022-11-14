import { Axis } from "../../enums/axis.enum";
import { Units } from "../../enums/units.enum";
import { PointModel } from "../point/point.model";

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

export type GridCache = {
    [key in Axis]: { [key: number]: number | undefined; };
};