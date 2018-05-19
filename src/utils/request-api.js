import fetch from 'fetch-polyfill';

export default (url) => {
    fetch(`https://cloud-api.yandex.net/v1/disk/${url}`, {
        method: 'get',
    });
};
