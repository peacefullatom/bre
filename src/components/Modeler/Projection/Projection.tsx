import { ViewLabel } from '../ViewLabel/ViewLabel';
import { ProjectionModel } from './Projection.model';

export const Projection = (props: ProjectionModel) => {
    const { axis, children } = props;
    return (
        <div
            style={{
                width: '50%',
                height: '50%',
                position: 'relative',
                boxSizing: 'border-box',
                borderBottom: '1px solid black',
                borderLeft: '1px solid black',
                perspective: '800px',
            }}
        >
            <ViewLabel label={axis} />
            {children}
        </div>
    );
};
