import { Axis } from "../../enums/axis.enum";
import { Units } from "../../enums/units.enum";
import { PointModel } from "../point/point.model";
import { TransformBatch, TransformType } from "./transform.model";

export class Transform implements PointModel {
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

    getTransformByAxis(transform: TransformType, axis: Axis, units?: Units): string {
        return `${transform}${axis}(${this[axis]}${units || ''})`;
    }

    getTransform(transform: TransformType, units?: Units): string {
        return Object.keys(Axis).map(axis => `${transform}${axis}(${this[axis as Axis]}${units || ''})`).join(' ');
    }

    getRotateByAxis(axis: Axis): string {
        return `${TransformType.Rotate}${axis}(${this[axis]}${Units.Deg})`;
    }

    getTranslateByAxis(axis: Axis, units = Units.Em): string {
        return `${TransformType.Translate}${axis}(${this[axis]}${units})`;
    }

    getTransformBatch(batch: TransformBatch): string {
        return Object.keys(batch)
            .map(key => {
                const transform = batch[key as TransformType] || [];
                return transform.map(settings => `${key}${settings.axis}(${settings.value}${settings.units})`);
            })
            .join(' ');
    }
}