// @flow

type Key = string | number;
interface Storage {
    setItem: Function,
    getItem: Function,
    removeItem: Function
}

export const HasLocalStorage = (): boolean => {
    try {
        const { localStorage } = window;
        const uid = new Date();

        localStorage.setItem(uid, uid);
        localStorage.getItem(uid);
        localStorage.removeItem(uid);

        return true;
    } catch (exception) {
        return false;
    }
};

export class DefaultStorage implements Storage {
    _store: Object;

    constructor() {
        this._store = {};
    }

    getItem = (key: Key) => (
        key in this._store ? this._store[key] : undefined
    );


    setItem = (key: Key, value: any) => {
        const val = String(value);

        this._store[key] = val;

        return val;
    };

    removeItem = (key: Key) => (
        delete this._store[key]
    );

    clear = () => {
        this._store = {};

        return this._store;
    };
}

export default class UserStorage {
    _store: Storage;

    constructor(store?: Storage) {
        if (store) {
            this._store = store;
        }

        if (!HasLocalStorage()) {
            this._store = new DefaultStorage();

            return;
        }

        this._store = window.localStorage;
    }

    getItem(key: Key): string {
        return this._store.getItem(key);
    }

    setItem(key: Key, value: any) {
        this._store.setItem(key, value);
    }

    removeItem(key: Key) {
        this._store.removeItem(key);
    }
}

export class StoredData extends UserStorage {
    _key: Key;

    constructor(key: Key, store?: Storage) {
        super(store);

        this._key = key;
    }

    getItem(): string {
        return super.getItem(this._key);
    }

    setItem(value: any) {
        super.setItem(this._key, value);
    }

    setItemIdle(value: any) {
        super.setItemIdle(this._key, value);
    }

    removeItem() {
        super.removeItem(this._key);
    }
}

export const LocalStorage = new UserStorage();
