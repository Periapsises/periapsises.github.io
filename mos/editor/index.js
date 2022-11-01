import { TextRenderer } from './renderers/text.js'
import { Language } from './tokenizer/language.js'

class Editor {
    constructor() {
        this.editor = document.createElement('div');
        this.editor.className = 'editor';
        document.body.appendChild(this.editor);

        new TextRenderer(this.editor);
    }
}

function onDocumentLoaded() {
    new Editor();
}

document.addEventListener('DOMContentLoaded', onDocumentLoaded);
