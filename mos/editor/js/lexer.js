const common = [
    { token: 'string.quote', regex: /^"/is, state: 'string.dquote' },
    { token: 'string.quote', regex: /^'/is, state: 'string.squote' },
    { token: 'number.binary', regex: /^0b[01]+/is },
    { token: 'number.decimal', regex: /^0d[0-9]+/is },
    { token: 'number.hexadecimal', regex: /^0[hx][0-9a-f]+/is },
    { token: 'number.decimal', regex: /^[0-9]+/is },
    { token: 'operator', regex: /^[\+\-\*\/]/is },
    { token: 'control.hash', regex: /^#/is },
    { token: 'control.paren.left', regex: /^\(/is },
    { token: 'control.paren.right', regex: /^\)/is },
    { token: 'control.colon', regex: /^:/is },
    { token: 'control.comma', regex: /^,/is },
    { token: 'decorator.whitespace', regex: /^ +/is }
]

const states = {
    'initial': [
        { token: 'comment.line', regex: /^\/\/[^\n]*/is },
        { token: 'comment.block', regex: /^\/\*.*?(\*\/|$)/is },
        { token: 'label', regex: /^[_a-z][_\.\w]*:/is },
        { token: 'instruction', regex: /^[a-z]+/is, state: 'operands' },
        { token: 'directive.hash', regex: /^#[^ \n]+/is, state: 'operands' },
        { token: 'directive.dot', regex: /^\.[^ \n]+/is, state: 'operands' },
        { token: 'control.newline', regex: /^\n+/is }
    ],
    'operands': [
        { token: 'operand.register', regex: /^[xya]/is },
        { token: 'operand.identifier', regex: /^[_a-z][_\.\w]*/is },
        { token: 'control.newline', regex: /^\n+/is, state: 'last' },
        { token: 'comment.line', regex: /^\/\/[^\n]*/is, state: 'last' },
        { token: 'comment.block', regex: /^\/\*.*?(\*\/|$)/is, state: 'last' }
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

class Lexer {
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
}

export { Lexer };
