const handler = {
    get(target, prop, receiver) {
        if (GLua && prop in GLua) return GLua[prop];

        return () => {};
    }
}

const Lua = new Proxy( {}, handler )

export { Lua }
