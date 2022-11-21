export const parseNumberInput = (value: string, min = 1, max = 255) => {
    const numeric = parseInt(value);
    if (typeof numeric !== 'number' || isNaN(numeric)) {
        return;
    }

    if (numeric < min) {
        return min;
    }
    if (numeric > max) {
        return max;
    }

    return numeric;
};
