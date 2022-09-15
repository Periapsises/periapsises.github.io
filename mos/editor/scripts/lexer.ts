class Lexer {
    state: string = 'initial';
    stack: string[] = [];
    states: {[name: string]: State} = {};

    text: string;
    position: number = 0;

    constructor(text: string, states: {[id: string]: State}) {
        this.text = text;
        this.states = states;
    }

    getTokens(): Token[] {
        let token: Token;
        let tokens: Token[] = [];

        do {
            token = this.getNextToken();
            tokens.push(token);
        } while (token.type != 'eof')

        return tokens;
    }

    getNextToken(): Token {
        if (this.position > this.text.length)
            return new Token('eof', '');
        
        for (let pattern of this.states[this.state].patterns) {
            let result = pattern.pattern.exec(this.text.substring(this.position));
            if (result?.length == 0) continue;

            let token = new Token(pattern.type, result[0]);

            if (pattern.state == null) return token;

            if (pattern.state == 'last') {
                this.state = this.stack.pop();
            } else {
                this.stack.push(this.state);
                this.state = pattern.state;
            }

            return token;
        }
    }
}
