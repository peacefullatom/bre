import { Color } from "../../color/color";
import { ColorModel } from "../../color/color.model";

export const hexColor = (color?: Partial<ColorModel>): string | undefined => {
    if (!color) {
        return;
    }

    return new Color(color).hex;
};