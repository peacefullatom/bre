import { Cache } from '../../decorators/cache.decorator';
import { Axis } from '../../enums/axis.enum';
import { Units } from '../../enums/units.enum';
import { PointModel } from '../point/point.model';
import { DEFAULT_AXIS_LENGTH } from './grid.const';
import { BlockSize, GridCache, GridModel } from './grid.model';

export class Grid implements GridModel {
    private valueBlockSize: BlockSize | number;
    private valueUnits: Units;
    private valueAxisLength: PointModel;
    private valueGridCache: GridCache = { X: {}, Y: {}, Z: {} };

    set blockSize(value: BlockSize | number) {
        this.valueBlockSize = value;
        this.dropGridCache();
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
        this.dropGridCache();
    }

    get axisLength(): PointModel {
        return this.valueAxisLength;
    }

    constructor(settings?: Partial<GridModel>) {
        this.blockSize = settings?.blockSize || BlockSize.Md;
        this.units = settings?.units || Units.Px;
        this.axisLength = settings?.axisLength || {
            X: DEFAULT_AXIS_LENGTH,
            Y: DEFAULT_AXIS_LENGTH,
            Z: DEFAULT_AXIS_LENGTH,
        };
        this.dropGridCache();
    }

    getFullAxisLength(axisLength: number): string {
        return `${(axisLength * 2 + 1) * this.blockSize}${this.units}`;
    }

    @Cache()
    getAbsolutePosition(
        axis: Axis,
        axisLength: PointModel,
        blockSize: number,
        point: PointModel
    ): number {
        switch (axis) {
            case Axis.Z:
                return point[axis] * blockSize;
            default:
                const maxBlocks = axisLength[axis] * 2 + 1;
                const width = maxBlocks * blockSize;
                return width / 2 + blockSize * point[axis] - blockSize / 2;
        }
    }

    relativeToAbsolute(point: PointModel): PointModel {
        point = this.normalizeRelativePoint(point);
        const { blockSize, axisLength } = this;
        const newPoint = { ...point };

        Object.keys(Axis).forEach((key) => {
            const axis = key as Axis;
            const pointAxis = point[axis];
            const cache = this.valueGridCache[axis];
            const cachedValue = cache[pointAxis];
            let value: number;
            if (typeof cachedValue === 'number') {
                value = cachedValue;
            } else {
                const absolute = this.getAbsolutePosition(
                    axis,
                    axisLength,
                    blockSize,
                    point
                );
                value = absolute;
                cache[pointAxis] = absolute;
            }

            newPoint[axis] = value;
        });

        return newPoint;
    }

    @Cache()
    normalizeRelativePoint(point: PointModel): PointModel {
        Object.keys(Axis).forEach((axis) => {
            point[axis as Axis] = this.normalizeRelativeAgainstAxis(
                point[axis as Axis],
                this.axisLength[axis as Axis]
            );
        });

        return point;
    }

    @Cache()
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

    private dropGridCache(axis?: Axis): void {
        if (axis && this.valueGridCache[axis]) {
            this.valueGridCache[axis] = {};
        }

        Object.keys(Axis).forEach((key) => {
            this.valueGridCache[key as Axis] = {};
        });
    }
}
