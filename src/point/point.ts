import { PointModel } from './point.model';

export class Point implements PointModel {
    private valueX: number;
    private valueY: number;
    private valueZ: number;

    set x(value: number) {
        this.valueX = value;
    }

    get x(): number {
        return this.valueX;
    }

    set y(value: number) {
        this.valueY = value;
    }

    get y(): number {
        return this.valueY;
    }

    set z(value: number) {
        this.valueZ = value;
    }

    get z(): number {
        return this.valueZ;
    }

    constructor(settings?: Partial<PointModel>) {
        this.x = settings?.x || 0;
        this.y = settings?.y || 0;
        this.z = settings?.z || 0;
    }
}