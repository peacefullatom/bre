import { CachedComponent } from '../../utils/cached-component/cached-component';
import { SideModel } from './Side.model';

export const SideCached = (props: SideModel) => CachedComponent(props, Side);

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
