let Grammar = {
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

let common = [
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

Array.prototype.push.apply(Grammar.initial, common);
Array.prototype.push.apply(Grammar.operands, common);

export default Grammar;