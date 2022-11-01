export class Language {
    /**
     * @param {string} name The display name of the language
     * @param {string} extension The file extension for that language
     * @param {string} renderer The name of the renderer to be used
     * @param {Array} states A list of states for parsing the language
     */
    constructor(name, extension, renderer, states) {
        this.name = name;
        this.extension = extension;
        this.renderer = renderer;
        this.states = states;
    }
}
