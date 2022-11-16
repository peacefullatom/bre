export const Cache = <T = any>() => {
    const storage: { [key: string]: Map<any, any> } = {};
    return (target: T, propertyKey: string, descriptor: PropertyDescriptor) => {
        if (!storage[propertyKey]) {
            storage[propertyKey] = new Map();
        }
        const cache = storage[propertyKey];
        let method = descriptor.value;
        descriptor.value = function () {
            const key = JSON.stringify(arguments);
            let value = cache.get(key);
            if (!cache.has(key) && value === undefined) {
                value = method.apply(this, arguments);
                cache.set(key, value);
            }
            return value;
        };
    };
};
