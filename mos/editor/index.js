import { Editor } from './scripts/editor.js';
import { Tab } from './scripts/tab.js';
import { Language } from './scripts/languages.js';

async function onWindowLoaded() {
    window.Editor = Editor;
    window.Language = Language;

    let editor = new Editor();
    let tab = new Tab('Untitled-1', editor);
    new Tab('Untitled-2', editor);

    editor.selectTab(tab);

    const tabDragArea = document.querySelector('.tabs');
    new Sortable(tabDragArea, {
        animation: 350
    });
}

window.addEventListener('DOMContentLoaded', onWindowLoaded);
