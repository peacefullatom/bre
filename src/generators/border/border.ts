import { Units } from '../../enums/units.enum';
import { Color } from '../../utils/color/color';
import { ColorType } from '../../utils/color/color.model';
import { BorderStyle } from './border.model';

export const borderGenerator = (
    color?: ColorType,
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
