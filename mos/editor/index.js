import { TextRenderer } from './renderers/text.js'

class Editor {
    constructor() {
        this.editor = document.createElement('div');
        this.editor.className = 'editor';

        this.container = document.createElement('div')
        this.container.className = 'container';

        this.editor.appendChild(this.container);
        document.body.appendChild(this.editor);

        new TextRenderer(this, this.container);
    }
}

function onDocumentLoaded() {
    new Editor();
}

document.addEventListener('DOMContentLoaded', onDocumentLoaded);
