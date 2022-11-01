import { Language } from '../language.js'

let states = {
    "initial": [
        { "token": "comment.line", "regex": "^\/\/[^\n]*/is" },
        { "token": "comment.block", "regex": "^\/\\*.*?(\\*\/|$)/is" },
        { "token": "label", "regex": "^[_a-z][_\\.\\w]*:/is" },
        { "token": "instruction", "regex": "^[a-z]+/is", "state": "operands" },
        { "token": "directive.hash", "regex": "^#[^ \n]+/is", "state": "operands" },
        { "token": "directive.dot", "regex": "^\\.[^ \n]+/is", "state": "operands" },
        { "token": "control.newline", "regex": "^\n+/is" }
    ],
    "operands": [
        { "token": "operand.register", "regex": "^[xya]/is" },
        { "token": "operand.identifier", "regex": "^[_a-z][_\\.\\w]*/is" },
        { "token": "control.newline", "regex": "^\n+/is", "state": "last" },
        { "token": "comment.line", "regex": "^\/\/[^\n]*/is", "state": "last" },
        { "token": "comment.block", "regex": "^\/\\*.*?(\\*\/|$)/is", "state": "last" }
    ],
    "string.dquote": [
        { "token": "string.text", "regex": "^[^\"\n\\]/is" },
        { "token": "string.escape", "regex": "^\\./is" },
        { "token": "string.quote", "regex": "^[\"\n]/is", "state": "last" }
    ],
    "string.squote": [
        { "token": "string.text", "regex": "^[^'\n\\]/is" },
        { "token": "string.escape", "regex": "^\\./is" },
        { "token": "string.quote", "regex": "^['\n]/is", "state": "last" }
    ]
}

let common = [
    { "token": "string.quote", "regex": "^\"/is", "state": "string.dquote" },
    { "token": "string.quote", "regex": "/^'/is", "state": "string.squote" },
    { "token": "number.binary", "regex": "^0b[01]+/is" },
    { "token": "number.decimal", "regex": "^0d[0-9]+/is" },
    { "token": "number.hexadecimal", "regex": "^0[hx][0-9a-f]+/is" },
    { "token": "number.decimal", "regex": "^[0-9]+/is" },
    { "token": "operator", "regex": "^[\\+\\-\\*\/]/is" },
    { "token": "control.hash", "regex": "^#/is" },
    { "token": "control.paren.left", "regex": "^\\(/is" },
    { "token": "control.paren.right", "regex": "^\\)/is" },
    { "token": "control.colon", "regex": "^:/is" },
    { "token": "control.comma", "regex": "^,/is" },
    { "token": "decorator.whitespace", "regex": "^ +/is" }
]

states.forEach(state => {
    Array.prototype.push.apply(state, common);
});

let AssemblyLanguage = new Language("Assembly", ".asm", "text", states);
export { AssemblyLanguage }
