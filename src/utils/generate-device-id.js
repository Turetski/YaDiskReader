// @flow

import generateUuidV1 from 'uuid/v1';

import { LocalStorage } from './user-storage';

export default (): string => {
    const key = 'deviceId';
    let deviceId = LocalStorage.getItem(key);

    if (deviceId) {
        return deviceId;
    }

    deviceId = generateUuidV1();

    LocalStorage.setItem(key, deviceId);

    return deviceId;
};
