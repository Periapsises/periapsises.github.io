const handler = {
    get(target, prop, receiver) {
        return prop in target ? target[prop] : () => {};
    }
}

const Lua = new Proxy( {}, handler )

export { Lua }
