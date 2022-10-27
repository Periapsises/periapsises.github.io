class Editor {
    tabs = [];

    constructor() {
        this.editor = document.createElement('div');
        this.editor.className = 'editor';

        this.tabs = document.createElement('div');
        this.tabs.className = 'tabs';

        this.container = document.createElement('div')
        this.container.className = 'container';

        this.editor.appendChild(this.tabs);
        this.editor.appendChild(this.container);
        document.body.appendChild(this.editor);

        new Sortable(this.tabs, {
            animation: 350
        });
    }
}

function onDocumentLoaded() {
    new Editor();
}

document.addEventListener('DOMContentLoaded', onDocumentLoaded);
