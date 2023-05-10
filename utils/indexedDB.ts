// https://github.com/jakearchibald/idb-keyval
import * as idb from 'idb-keyval';
const supported = true;
// const inMemoryCache = new Map<string, any>();

// const testDB = indexedDB.open('test');
// testDB.onerror = () => {
//     supported = false;
// };

export async function set(key: any, value: any) {
    // inMemoryCache.set(key, value);

    if (supported) {
        try {
            await idb.set(key, value);
            return;
        } catch (e) {}
    }
}

export async function get(key: any) {
    if (supported) {
        try {
            return await idb.get(key);
        } catch (e) {}
    }
    // return inMemoryCache.get(key);
}

export async function del(key: string) {
    // inMemoryCache.delete(key);
    if (supported) {
        try {
            await idb.del(key);
            return;
        } catch (e) {}
    }
}
