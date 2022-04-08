const handler = {
    get(target, prop, receiver) {
        if (Lua[prop] == null) return () => {};

        return Lua[prop]
    }
}

const Lua = new Proxy( {}, handler )

export { Lua }
