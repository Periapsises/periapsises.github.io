// NOTE: Comments aren't included in common because they reset the state in 'operands'
const grammar = {
    'initial': [
        { type: 'comment line', regex: /^\/\/[^\n]*/is },
        { type: 'comment block', regex: /^\/\*.*?(\*\/|$)/is },
        { type: 'label', regex: /^[_a-z][_\.\w]*:/is },
        { type: 'instruction', regex: /^[a-z]+/is, state: 'operands' },
        { type: 'directive hash', regex: /^#[^ \n]+/is, state: 'operands' },
        { type: 'directive dot', regex: /^\.[^ \n]+/is, state: 'operands' },
        { type: 'control newline', regex: /^\n+/is },
    ],
    'operands': [
        { type: 'operand register', regex: /^[xya]/is },
        { type: 'operand identifier', regex: /^[_a-z][_\.\w]*/is },
        { type: 'control newline', regex: /^\n+/is, state: 'last' },
        { type: 'comment line', regex: /^\/\/[^\n]*/is, state: 'last' },
        { type: 'comment block', regex: /^\/\*.*?(\*\/|$)/is, state: 'last' },
    ],
    'string.dquote': [
        { type: 'string', regex: /^[^"\n\\]*/is },
        { type: 'string escape', regex: /^\\./is },
        { type: 'string quote', regex: /^"/is, state: 'last' },
        { type: 'control newline', regex: /^\n/is, state: 'last' },
    ],
    'string.squote': [
        { type: 'string', regex: /^[^'\n\\]*/is },
        { type: 'string escape', regex: /^\\./is },
        { type: 'string quote', regex: /^'/is, state: 'last' },
        { type: 'control newline', regex: /^\n/is, state: 'last' },
    ]
};

const common = [
    { type: 'string quote', regex: /^"/is, state: 'string.dquote' },
    { type: 'string quote', regex: /^'/is, state: 'string.squote' },
    { type: 'number decimal', regex: /^\d+/is },
    { type: 'number decimal', regex: /^0d\d+/is },
    { type: 'number hexadecimal', regex: /^0x[0-9a-f]+/is },
    { type: 'number binary', regex: /^0b[0-1]+/is },
    { type: 'operator', regex: /^[+\-*\/]/is },
    { type: 'control hash', regex: /^#/is },
    { type: 'control paren left', regex: /^\(/is },
    { type: 'control paren right', regex: /^\)/is },
    { type: 'control colon', regex: /^:/is },
    { type: 'control comma', regex: /^,/is },
    { type: 'decorator whitespace', regex: /^ +/is }
]

Array.prototype.push.apply(grammar.initial, common);
Array.prototype.push.apply(grammar.operands, common);

class Token {
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

/**
 * Converts a string into a stream of tokens
 * @param {string} text The text input
 * @return {Token[]} The stream of tokens
 */
const tokenize = function (text) {
    let state = 'initial';
    let stack = [];
    let position = 0;
    /** @type {Token[]} */
    let tokens = [];

    while (position < text.length) {
        let goto = null;
        let type = '';
        let match = '';

        for (let rule of grammar[state]) {
            let result = rule.regex.exec(text.substring(position));
            if (result == null || result.length == 0 || result[0].length == 0)
                continue;

            // Find the biggest match
            if (result[0].length < match.length)
                continue;

            type = rule.type;
            goto = rule.state;
            match = result[0];
        }

        // If we didn't find anything
        if (match.length == 0) {
            let token = null;

            if (tokens.length == 0 || tokens[tokens.length - 1].type != 'text')
                tokens.push(new Token('text', ''));

            tokens[tokens.length - 1].value += text.charAt(position);
            position += 1;
            continue;
        }

        position += match.length;
        let token = new Token(type, match);
        tokens.push(token);

        if (goto != null) {
            if (goto == 'last') {
                state = stack.pop();
            } else {
                stack.push(state);
                state = goto;
            }
        }
    }

    return tokens;
}

/**
 * Handles tokenizing the new text and adjusting the gutter line numbers
 * @param {string} text 
 * @param {HTMLDivElement} overlay 
 * @param {HTMLDivElement} gutter
 */
const onTextinputChanged = function (text, overlay, gutter) {
    overlay.innerHTML = '';
    gutter.innerHTML = '';

    let lineCount = text.split('\n').length;
    for (let i = 0; i < lineCount; i++) {
        let lineNum = document.createElement('span');
        lineNum.innerHTML = i.toString();
        gutter.appendChild(lineNum);
    }

    let tokens = tokenize(text);
    tokens.forEach(token => {
        let element = document.createElement('span');
        element.innerHTML = token.value;
        element.classList = 'token ' + token.type;

        overlay.appendChild(element);
    });
}

/**
 * Creates the required HTML elements to form an Editor
 */
const createEditorHTML = function () {
    let editor = document.createElement('div');
    editor.className = 'editor';

    let container = document.createElement('div');
    container.className = 'container';

    let gutter = document.createElement('div');
    gutter.className = 'gutter';

    let input = document.createElement('textarea');
    input.className = 'input';
    input.placeholder = 'Enter your code here'

    let overlay = document.createElement('div');
    overlay.className = 'overlay';

    input.addEventListener('input', () => onTextinputChanged(input.value, overlay, gutter));

    let e = new Event('input');
    input.dispatchEvent(e);

    container.appendChild(input);
    container.appendChild(overlay);
    editor.appendChild(gutter);
    editor.appendChild(container);
    document.body.appendChild(editor);

    window.Editor.input = input;
}

function onContentLoaded() {
    let Editor = {
        setCode: text => {
            Editor.input.value = text;
            let e = new Event('input');
            Editor.input.dispatchEvent(e);
        }
    };

    window.Editor = Editor;
    createEditorHTML();
}

document.addEventListener('DOMContentLoaded', onContentLoaded);
