export default (source) => {
    if (typeof source !== 'string') {
        return {};
    }

    const str = source.trim().replace(/^(\?|#|&)/, '');

    if (!str) {
        return {};
    }

    return str.split('&').reduce((res, param) => {
        const parts = param.replace(/\+/g, ' ').split('=');
        let key = decodeURIComponent(parts.shift());
        const val = parts.length > 0 ? decodeURIComponent(parts.join('=')) : null;

        if (!val) {
            return res;
        }

        const result = res;
        // Если массив
        if (key.substring(key.length - 2) === '[]') {
            key = key.substring(0, key.length - 2);

            result[key] = result[key] || [];

            result[key] = result[key].concat(val);
        } else {
            result[key] = val;
        }

        return result;
    }, {});
};
