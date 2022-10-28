class Editor {
    constructor() {
        this.editor = document.createElement('div');
        this.editor.className = 'editor';

        this.container = document.createElement('div')
        this.container.className = 'container';

        this.editor.appendChild(this.tabContainer);
        this.editor.appendChild(this.container);
        document.body.appendChild(this.editor);
    }
}

function onDocumentLoaded() {
    new Editor();
}

document.addEventListener('DOMContentLoaded', onDocumentLoaded);
