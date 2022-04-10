const common = [
    { token: 'string.quote', regex: /^"/is, state: 'string.dquote' },
    { token: 'string.quote', regex: /^'/is, state: 'string.squote' },
    { token: 'number.format.bin', regex: /^0b[01]+/is },
    { token: 'number.format.dec', regex: /^0d[0-9]+/is },
    { token: 'number.format.hex', regex: /^0[hx][0-9a-f]+/is },
    { token: 'number.decimal', regex: /^[0-9]+/is },
    { token: 'control.hash', regex: /^#/is },
    { token: 'control.paren.left', regex: /^\(/is },
    { token: 'control.paren.right', regex: /^\)/is },
    { token: 'control.colon', regex: /^:/is },
    { token: 'control.comma', regex: /^,/is },
]

const states = {
    'initial': [
        { token: 'identifier.label', regex: /^[\._a-z][_a-z0-9]*?(?=:)/is },
        { token: 'identifier.instruction', regex: /^[a-z]+/is, state: 'operands' },
        { token: 'preprocessor', regex: /^#[^ \n]+/is, state: 'operands' },
        { token: 'preprocessor.directive', regex: /^\.[^ \n]+/is, state: 'operands' },
        { token: 'preprocessor.comment', regex: /^\/\/[^\n]*/is },
        { token: 'preprocessor.comment', regex: /^\/\*.*?\*\//is },
        { token: 'control.newline', regex: /^\n+/is },
        { token: 'decorator.whitespace', regex: /^ +/is }
    ],
    'operands': [
        { token: 'identifier.operand', regex: /^[a-z]+/is },
        { token: 'control.newline', regex: /^\n+/is, state: 'last' },
        { token: 'decorator.whitespace', regex: /^ +/is }
    ],
    'string.dquote': [
        { token: 'string.text', regex: /^[^"\n\\]/is },
        { token: 'string.escape', regex: /^\\./is },
        { token: 'string.quote', regex: /^["\n]/is, state: 'last' }
    ],
    'string.squote': [
        { token: 'string.text', regex: /^[^'\n\\]/is },
        { token: 'string.escape', regex: /^\\./is },
        { token: 'string.quote', regex: /^['\n]/is, state: 'last' }
    ]
}

Array.prototype.push.apply(states.initial, common);
Array.prototype.push.apply(states.operands, common);

class Parser {
    static changed = true;
    static text = ''

    static setText(text) {
        this.text = text;
        this.changed = true;
    }

    static getTokens() {
        if (!this.changed) return this.tokens;

        let state = 'initial';
        let stack = [];

        let text = this.text;
        const tokens = [];

        while (text.length > 0) {
            let found = false;

            for (let pattern of states[state]) {
                let result = pattern.regex.exec(text);

                if (result?.length > 0) {
                    tokens.push({ type: pattern.token, value: result[0] });

                    if (pattern.state != null) {
                        if (pattern.state == 'last') {
                            state = stack.pop();
                        } else {
                            stack.push(state);
                            state = pattern.state;
                        }
                    }

                    text = text.slice(result[0].length);
                    found = true;
                    break;
                }
            }

            if (!found) {
                tokens.push({ type: 'text', value: text.slice(0, 1) });
                text = text.slice(1);
            };
        }

        this.tokens = tokens;
        this.changed = false;

        return tokens;
    }

    static setHighlight(element) {
        const tokens = this.getTokens();
        element.innerHTML = '';

        for (let token of tokens) {
            const child = document.createElement('span');
            child.className = token.type.replaceAll('.', ' ');
            child.innerHTML = token.value;

            element.appendChild(child);
        }
    }

    static luaGetTokens() {
        const tokens = this.getTokens();

        for (let token of tokens) {
            console.log( `RUNLUA:Mos.Javascript:AddToken( "${token.type}", [[${token.value}]] )` );
        }

        console.log( `RUNLUA:Mos.Javascript:FinishTokens()` );
    }
}

export { Parser };
