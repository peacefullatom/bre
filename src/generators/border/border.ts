import { Color } from "../../color/color";
import { ColorModel } from "../../color/color.model";
import { Units } from "../../transform/transform.model";
import { BorderStyle } from "./border.model";

export const borderGenerator = (
    color?: Partial<ColorModel>,
    thickness = 1,
    style = BorderStyle.Solid,
    units = Units.Px
): string | undefined => {
    if (!color) {
        return;
    }

    const borderColor = new Color(color);
    return `${thickness}${units} ${style} ${borderColor.hex}`;
};