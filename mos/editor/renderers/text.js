import { Renderer } from './renderer.js'
import { Lexer } from '../tokenizer/lexer.js'
import { TextLanguage } from '../tokenizer/languages/text.js'

export class TextRenderer extends Renderer {
    /**
     * @param {HTMLDivElement} editor
     */
    constructor(editor) {
        super(editor);
    }

    /**
     * @param {string} text
     */
    onTextInput(text) {
        this.overlay.innerHTML = '';

        let lexer = new Lexer(text, TextLanguage.states);
        let tokens = lexer.getTokens();

        tokens.forEach(token => {
            let span = document.createElement('span');
            span.innerHTML = token.value;
            span.classList.add('token');
            span.classList.add(token.type);

            this.overlay.appendChild(span);
        });
    }

    /**
     * 
     * @param {number} newCount
     * @param {number} oldCount
     */
    onRenderLines(newCount, oldCount) {
        this.gutter.innerHTML = '';

        let renderCount = Math.max(newCount, 1);
        for (let i = 0; i < renderCount; i++) {
            let line = document.createElement('span');
            line.innerHTML = (i + 1).toString();
            this.gutter.appendChild(line);
        }
    }
}
