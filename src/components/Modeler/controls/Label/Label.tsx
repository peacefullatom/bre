import { LabelModel } from './Label.model';

export const Label = (props: LabelModel) => {
    const { label, value } = props;
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '0.5rem 1rem',
            }}
        >
            {label && (
                <div
                    style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    title={label}
                >
                    {label}
                </div>
            )}
            <div
                style={{
                    width: label ? '50%' : '100%',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
                title={`${value === undefined ? '' : value}`}
            >
                {value}
            </div>
        </div>
    );
};
