import { Renderer } from './renderer.js'

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
    onTextInput(text) { }

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
