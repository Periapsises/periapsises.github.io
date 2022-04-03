import { Tab } from './tabs.js'
import { Parser } from './parser.js'

let defaultCode = "/*\n    Simple Hello World program\n    Uses the io library\n*/\n\n#include io\n\nstart:\n    lda #message\n    pha\n    jsr print\n    jmp (end)\n\n// We can use labels to point to data\nmessage:\n    .db \"Hello, world!\\n\", 0x00\n\nend:\n    jmp (end)";

class Editor {
    static gutter = document.getElementById('editor-gutter');
    static input = document.getElementById('editor-input');
    static overlay = document.getElementById('editor-overlay');

    static newTab(name) {
        let tab = new Tab(name);

        this.input.innerHTML = defaultCode;
        this.onTextChanged();
    }

    static onTextChanged() {
        this.overlay.innerHTML = Parser.tokenize(this.input.value);
    }
}

function onWindowLoaded() {
    Editor.newTab('Default');
}

window.onTextChanged = function() {
    Editor.onTextChanged();
}

window.addEventListener('load', onWindowLoaded)
