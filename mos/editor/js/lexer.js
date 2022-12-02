import Token from './token.js';

/**
 * Converts a string into a stream of tokens
 * @param {string} text The text input
 * @param {Object} grammar The grammar to use
 * @return {Token[]} The stream of tokens
 */
 export default function Tokenize(text, grammar) {
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