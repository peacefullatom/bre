export interface InputStringModel {
    label?: string;
    value?: string;
    maxLength?: number;
    change?: (value: string) => void;
}
