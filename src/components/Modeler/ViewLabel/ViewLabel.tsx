import { ViewLabelModel } from './ViewLabel.model';

export const ViewLabel = (props: ViewLabelModel) => {
    const { label } = props;

    return (
        <div
            style={{
                width: '2rem',
                height: '2rem',
                lineHeight: '2rem',
                textAlign: 'center',
                position: 'absolute',
            }}
        >
            {label}
        </div>
    );
};
