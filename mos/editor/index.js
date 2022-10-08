import { Editor } from './scripts/editor.js';
import { Tab } from './scripts/tab.js';
import { Language } from './scripts/languages.js';

async function onWindowLoaded() {
    window.Editor = Editor;
    window.Language = Language;

    let editor = new Editor();
    let tab = new Tab('unknown', editor);
    tab.setActive(true);
}

window.addEventListener('DOMContentLoaded', onWindowLoaded);
