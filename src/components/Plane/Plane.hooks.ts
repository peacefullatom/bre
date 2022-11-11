import { useEffect, useState } from "react";
import { Units } from "../../enums/units.enum";
import { Grid } from "../../utils/grid/grid";
import { PointModel } from "../../utils/point/point.model";

export const useGetCenter = (
    wrapperWidth: number,
    wrapperHeight: number,
    units: Units,
    blockSize: number,
    axisLength: PointModel,
    grid: Grid,
) => {
    const posInitial = `0${units}`;
    const [left, setLeft] = useState(posInitial);
    const [top, setTop] = useState(posInitial);
    const getCenter = (outer: number, inner: number) => (outer / 2) - inner * blockSize;

    useEffect(() => {
        const newLeft = `${getCenter(wrapperWidth, axisLength.X)}${units}`;
        const newTop = `${getCenter(wrapperHeight, axisLength.Y)}${units}`;

        if (left !== newLeft) {
            setLeft(newLeft);
        }

        if (top !== newTop) {
            setTop(newTop);
        }
    }, [wrapperWidth, wrapperHeight, grid]);

    return [left, top];
};