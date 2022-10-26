import { Editor } from './scripts/editor.js';
import { Tab } from './scripts/tab.js';
import { Language } from './scripts/languages.js';

async function onWindowLoaded() {
    window.Editor = Editor;
    window.Language = Language;

    let editor = new Editor();
    editor.selectTab(new Tab('Untitled-1', editor));
    new Tab('Untitled-2', editor);

    const tabDragArea = document.querySelector('.tabs');
    new Sortable(tabDragArea, {
        animation: 350
    });

    tabDragArea.addEventListener('dblclick', () => {
        let newTab = new Tab('Untitled', editor);
        editor.selectTab(newTab);
    });
}

window.addEventListener('DOMContentLoaded', onWindowLoaded);
