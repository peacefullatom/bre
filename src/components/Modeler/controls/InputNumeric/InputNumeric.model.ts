export interface InputNumericModel {
    label?: string;
    value?: number;
    min?: number;
    max?: number;
    change?: (value: number) => void;
}
