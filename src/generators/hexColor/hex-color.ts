import { Color } from "../../utils/color/color";
import { ColorModel } from "../../utils/color/color.model";

export const hexColor = (color?: Partial<ColorModel>): string | undefined => {
    if (!color) {
        return;
    }

    return new Color(color).hex;
};