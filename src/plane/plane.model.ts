import { ColorModel } from '../color/color.model';
import { PointModel } from '../point/point.model';
import { TransformModel } from '../transform/transform.model';

export interface PlaneProps {
    center: PointModel;
    background?: Partial<ColorModel>;
    border?: Partial<ColorModel>;
    width: number;
    height: number;
    wrapperWidth: number;
    wrapperHeight: number;
    rotate?: Partial<TransformModel>;
    translate?: Partial<TransformModel>;
}