const handler = {
    get(target, prop, receiver) {
        if (GLua != null && prop in GLua) return GLua[prop];

        return () => {};
    }
}

const Lua = new Proxy( {}, handler )

export { Lua }
