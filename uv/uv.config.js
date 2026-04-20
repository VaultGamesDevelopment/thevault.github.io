self.__uv$config = {
    prefix: '/service/',
    bare: 'https://proxy-bare.vercel.app/',
    encodeUrl: (url) => {
        if (!url) return url;
        return encodeURIComponent(url.split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join(''));
    },
    decodeUrl: (url) => {
        if (!url) return url;
        let [str, ...search] = url.split('?');
        return (decodeURIComponent(str).split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join('') + (search.length ? '?' + search.join('?') : ''));
    },
    handler: 'https://cdn.jsdelivr.net/npm/@titaniumnetwork-dev/ultraviolet@3.0.0/dist/uv.handler.js',
    bundle: 'https://cdn.jsdelivr.net/npm/@titaniumnetwork-dev/ultraviolet@3.0.0/dist/uv.bundle.js',
    config: '/uv/uv.config.js',
    sw: '/uv.sw.js',
};
