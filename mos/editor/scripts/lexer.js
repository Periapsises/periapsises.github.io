class Lexer {
    constructor(text, states) {
        this.state = 'initial';
        this.stack = [];
        this.states = {};
        this.position = 0;
        this.text = text;
        this.states = states;
    }

    getTokens() {
        let token;
        let tokens = [];
        do {
            token = this.getNextToken();
            tokens.push(token);
        } while (token.type != 'eof');
        return tokens;
    }

    getNextToken() {
        if (this.position > this.text.length)
            return new Token('eof', '');

        for (let pattern of this.states[this.state].patterns) {
            let result = pattern.pattern.exec(this.text.substring(this.position));
            if ((result === null || result === void 0 ? void 0 : result.length) == 0)
                continue;

            let token = new Token(pattern.type, result[0]);
            if (pattern.state == null)
                return token;

            if (pattern.state == 'last') {
                this.state = this.stack.pop();
            }
            else {
                this.stack.push(this.state);
                this.state = pattern.state;
            }

            return token;
        }
    }
}
