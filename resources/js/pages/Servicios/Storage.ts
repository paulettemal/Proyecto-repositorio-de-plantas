
export const getLocalStorage = <T>(key: string, defaultValue: T): T => {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) as T : defaultValue;
    } catch {
        return defaultValue;
    }
};

export const setLocalStorage = <T>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
};