import { Axis } from "../enums/axis.enum";
import { PointModel } from "../point/point.model";
import { Units } from "../transform/transform.model";
import { DEFAULT_AXIS_LENGTH } from "./grid.const";
import { GridModel, BlockSize } from "./grid.model";

export class Grid implements GridModel {
    private valueBlockSize: BlockSize | number;
    private valueUnits: Units;
    private valueAxisLength: PointModel;

    set blockSize(value: BlockSize | number) {
        this.valueBlockSize = value;
    }

    get blockSize(): BlockSize | number {
        return this.valueBlockSize;
    }

    set units(value: Units) {
        this.valueUnits = value;
    }

    get units(): Units {
        return this.valueUnits;
    }

    get width(): string {
        return this.getFullAxisLength(this.axisLength.X);
    }

    get height(): string {
        return this.getFullAxisLength(this.axisLength.Y);
    }

    get depth(): string {
        return this.getFullAxisLength(this.axisLength.Z);
    }

    set axisLength(value: PointModel) {
        this.valueAxisLength = value;
    }

    get axisLength(): PointModel {
        return this.valueAxisLength;
    }

    constructor(settings?: Partial<GridModel>) {
        this.blockSize = settings?.blockSize || BlockSize.Md;
        this.units = settings?.units || Units.Px;
        this.axisLength = settings?.axisLength || { X: DEFAULT_AXIS_LENGTH, Y: DEFAULT_AXIS_LENGTH, Z: DEFAULT_AXIS_LENGTH };
    }

    getFullAxisLength(axisLength: number): string {
        return `${(axisLength * 2 + 1) * this.blockSize}${this.units}`;
    }

    getAbsolutePosition(axis: Axis, axisLength: PointModel, blockSize: number, point: PointModel): number {
        switch (axis) {
            case Axis.Z:
                return point[axis] * blockSize;
            default:
                const maxBlocks = axisLength[axis] * 2 + 1;
                const width = maxBlocks * blockSize;
                return width / 2 + blockSize * point[axis];
        }
    }

    relativeToAbsolute(point: PointModel): PointModel {
        point = this.normalizeRelativePoint(point);
        const { blockSize, axisLength } = this;
        const newPoint = { ...point };

        Object.keys(Axis).forEach(axis => {
            newPoint[axis as Axis] = this.getAbsolutePosition(axis as Axis, axisLength, blockSize, point);
        });

        return newPoint;
    }

    normalizeRelativePoint(point: PointModel): PointModel {
        Object.keys(Axis).forEach(axis => {
            point[axis as Axis] = this.normalizeRelativeAgainstAxis(point[axis as Axis], this.axisLength[axis as Axis]);
        });

        return point;
    }

    normalizeRelativeAgainstAxis(value: number, size: number): number {
        const reverse = size * -1;
        if (value > size) {
            return size;
        }
        if (value < reverse) {
            return reverse;
        }
        return value;
    }
}