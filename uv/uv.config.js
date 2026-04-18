self.__uv$config = {
    prefix: '/service/',
    bare: 'https://bare.benroberts.dev/',
    encodeUrl: (url) => {
        if (!url) return url;
        return encodeURIComponent(url.split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join(''));
    },
    decodeUrl: (url) => {
        if (!url) return url;
        let [str, ...search] = url.split('?');
        return (decodeURIComponent(str).split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join('') + (search.length ? '?' + search.join('?') : ''));
    },
    handler: '/uv/uv.handler.js',
    bundle: '/uv/uv.bundle.js',
    config: '/uv/uv.config.js',
    sw: '/uv/uv.sw.js',
};
