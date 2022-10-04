import { Editor } from './scripts/editor.js';
import { Language } from './scripts/languages.js';

async function onWindowLoaded() {
    window.Editor = Editor;
    window.Language = Language;

    let editor = new Editor();
    let lang = await Language.getLanguage('assembly');
}

window.addEventListener('DOMContentLoaded', onWindowLoaded);
