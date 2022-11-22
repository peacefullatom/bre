import { SideModel } from './Side.model';

export const Side = (props: SideModel) => {
    const {
        background,
        border,
        color,
        fontFamily,
        fontSize,
        fontStyle,
        fontWeight,
        lineHeight,
        size,
        text,
        transform,
        hoverHandler,
    } = props;

    const handleMouseHover = (value: boolean) => {
        if (!hoverHandler) {
            return;
        }
        hoverHandler(value);
    };

    return (
        <div
            onMouseEnter={() => handleMouseHover(true)}
            onMouseLeave={() => handleMouseHover(false)}
            style={{
                background,
                border,
                color,
                fontFamily,
                fontSize,
                fontStyle,
                fontWeight,
                lineHeight,
                height: size,
                position: 'absolute',
                transform,
                width: size,
            }}
        >
            {text || ''}
        </div>
    );
};
