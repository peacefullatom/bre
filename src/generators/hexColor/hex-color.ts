import { Color } from '../../utils/color/color';
import { ColorType } from '../../utils/color/color.model';

export const hexColor = (color?: ColorType): string | undefined => {
    if (!color) {
        return;
    }

    return new Color(color).hex;
};
