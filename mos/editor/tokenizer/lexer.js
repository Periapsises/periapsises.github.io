import { Token } from './token.js'

export class Lexer {
    constructor(text, states) {
        this.state = 'initial';
        this.stack = [];
        this.states = states;
        this.position = 0;
        this.text = text;
        this.states = states;
    }

    /**
     * @returns {Token[]} tokens
     */
    getTokens() {
        let token;
        let tokens = [];
        do {
            token = this.getNextToken();
            tokens.push(token);
        } while (token.type != 'eof');
        return tokens;
    }

    /**
     * @returns {Token} token
     */
    getNextToken() {
        if (this.position >= this.text.length)
            return new Token('eof', '');

        for (let pattern of this.states[this.state]) {
            let result = pattern.regex.exec(this.text.substring(this.position));
            
            if (result === null || result.length == 0)
                continue;
            
            this.position += result[0].length;

            let token = new Token(pattern.token, result[0]);
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

        let token = new Token('text', this.text.substring(this.position));
        this.position = this.text.length;
        return token;
    }
}
