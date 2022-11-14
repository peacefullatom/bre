import { PointModel } from './point.model';

export class Point implements PointModel {
    private valueX: number;
    private valueY: number;
    private valueZ: number;

    set X(value: number) {
        this.valueX = value;
    }

    get X(): number {
        return this.valueX;
    }

    set Y(value: number) {
        this.valueY = value;
    }

    get Y(): number {
        return this.valueY;
    }

    set Z(value: number) {
        this.valueZ = value;
    }

    get Z(): number {
        return this.valueZ;
    }

    constructor(settings?: Partial<PointModel>) {
        this.X = settings?.X || 0;
        this.Y = settings?.Y || 0;
        this.Z = settings?.Z || 0;
    }
}