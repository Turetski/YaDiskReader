export const HasLocalStorage = () => {
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

export class DefaultStorage {
    _store: Object;

    constructor() {
        this._store = {};
    }

    getItem = (key) => (
        key in this._store ? this._store[key] : undefined
    );


    setItem = (key, value) => {
        const val = String(value);

        this._store[key] = val;

        return val;
    };

    removeItem = (key) => (
        delete this._store[key]
    );

    clear = () => {
        this._store = {};

        return this._store;
    };
}

export default class UserStorage {
    _store: Storage;

    constructor(store) {
        if (store) {
            this._store = store;
        }

        if (!HasLocalStorage()) {
            this._store = new DefaultStorage();

            return;
        }

        this._store = window.localStorage;
    }

    getItem(key) {
        return this._store.getItem(key);
    }

    setItem(key, value) {
        this._store.setItem(key, value);
    }

    removeItem(key) {
        this._store.removeItem(key);
    }
}

export class StoredData extends UserStorage {
    _key;

    constructor(key, store) {
        super(store);

        this._key = key;
    }

    getItem() {
        return super.getItem(this._key);
    }

    setItem(value) {
        super.setItem(this._key, value);
    }

    setItemIdle(value) {
        super.setItemIdle(this._key, value);
    }

    removeItem() {
        super.removeItem(this._key);
    }
}

export const LocalStorage = new UserStorage();
