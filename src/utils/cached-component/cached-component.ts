const storage: { [key: string]: Map<any, any> } = {};

export const CachedComponent = <T>(
    props: T,
    Component: (props: T) => JSX.Element
) => {
    const name = Component.name;
    if (!storage[name]) {
        storage[name] = new Map<string, JSX.Element>();
    }
    const cache = storage[name];
    const key = JSON.stringify(props);
    let value = cache.get(key);
    if (!cache.has(key) && value === undefined) {
        value = Component(props);
        cache.set(key, value);
    }
    return value as JSX.Element;
};
