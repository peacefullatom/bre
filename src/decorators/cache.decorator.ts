const storage: { [key: string]: { [key: string]: Map<any, any> } } = {};

export const Cache = <T extends Object>() => {
    return (target: T, propertyKey: string, descriptor: PropertyDescriptor) => {
        const type = target.constructor.name;
        if (!storage[type]) {
            storage[type] = {};
        }
        if (!storage[type][propertyKey]) {
            storage[type][propertyKey] = new Map();
        }
        const cache = storage[type][propertyKey];
        const method = descriptor.value;
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
