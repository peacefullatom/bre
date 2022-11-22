import { ViewLabel } from '../ViewLabel/ViewLabel';
import { PreviewModel } from './Preview.model';

export const Preview = (props: PreviewModel) => {
    const { children } = props;

    return (
        <div
            style={{
                width: '50%',
                height: '50%',
                position: 'relative',
                boxSizing: 'border-box',
                borderBottom: '1px solid black',
                borderLeft: '1px solid black',
                overflow: 'hidden',
            }}
        >
            <ViewLabel label="3D" />
            {children}
        </div>
    );
};
