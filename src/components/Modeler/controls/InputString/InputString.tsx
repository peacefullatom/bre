import { useRef } from 'react';
import { InputStringModel } from './InputString.model';

export const InputString = (props: InputStringModel) => {
    const { label, value, maxLength, change } = props;
    const ref = useRef<HTMLInputElement>(null);
    const handleChange = (eventValue: string) => {
        if (value !== eventValue && typeof change === 'function') {
            change(eventValue);
        }
    };

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
                    onClick={() => ref.current?.focus()}
                >
                    {label}
                </div>
            )}
            <div style={{ width: label ? '50%' : '100%' }}>
                <input
                    ref={ref}
                    type="text"
                    maxLength={maxLength}
                    value={value}
                    onChange={(event) => handleChange(event.currentTarget.value)}
                    style={{ width: '100%' }}
                />
            </div>
        </div>
    );
};
