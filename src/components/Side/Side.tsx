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
    } = props;

    return (
        <div
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
