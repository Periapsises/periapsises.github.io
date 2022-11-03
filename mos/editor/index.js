import { TextRenderer } from './renderers/text.js'

class Editor {
    static activeEditor;

    constructor() {
        this.editor = document.createElement('div');
        this.editor.className = 'editor';
        document.body.appendChild(this.editor);

        this.renderer = new TextRenderer(this.editor);

        if (Editor.activeEditor != null) {
            Editor.activeEditor.hide();
        }

        Editor.activeEditor = this;
    }

    hide() {
        this.editor.style = 'visibility: hidden;'
    }

    show() {
        this.editor.style = 'visibility: unset;'
    }
    
    remove() {
        this.editor.remove()
    }
}

function onDocumentLoaded() {
    new Editor();
}

window.Editor = Editor;
document.addEventListener('DOMContentLoaded', onDocumentLoaded);
