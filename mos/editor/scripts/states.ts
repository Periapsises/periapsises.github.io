class State {
    name: string;
    patterns: [{ type: string, pattern: RegExp, state: string | null }];

    constructor(name: string = 'initial') {
        this.name = name;
    }
}
