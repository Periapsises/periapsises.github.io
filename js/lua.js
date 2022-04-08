const handler = {
    get(target, prop, receiver) {
        if (typeof GLua !== 'undefined' && prop in GLua) return GLua[prop];

        return () => {};
    }
}

const Lua = new Proxy( {}, handler )

export { Lua }
