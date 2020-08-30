export function localStorageGet<T>(key: string): T {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(localStorage.getItem(key)) as T : null
}

export function localStorageSet<T>(key: string, value: T): void {
     localStorage.setItem(key, JSON.stringify(value));
}