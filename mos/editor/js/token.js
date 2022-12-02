export default class Token {
    /**
     * Creates a new Token
     * @param {string} type The type represented by the token
     * @param {string} value The value represented by the token
     */
    constructor(type, value) {
        /** @type {string} */
        this.type = type;
        /** @type {string} */
        this.value = value;
    }
}