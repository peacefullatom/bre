import { useRef } from 'react';
import { parseNumberInput } from './InputNumeric.const';
import { InputNumericModel } from './InputNumeric.model';

export const InputNumeric = (props: InputNumericModel) => {
    const { label, value, change, min, max } = props;
    const ref = useRef<HTMLInputElement>(null);
    const handleChange = (eventValue: string) => {
        if (typeof change !== 'function') {
            return;
        }
        const newValue = parseNumberInput(eventValue, min, max);
        if (typeof newValue === 'number' && value !== newValue) {
            change(newValue);
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
                    type="number"
                    min={min}
                    max={max}
                    value={value}
                    onChange={(event) => handleChange(event.currentTarget.value)}
                    style={{ width: '100%' }}
                />
            </div>
        </div>
    );
};
