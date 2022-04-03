import { Tab } from './tabs.js'
import { Parser } from './parser.js'

let defaultCode = "/*\n    Simple Hello World program\n    Uses the io library\n*/\n\n#include io\n\nstart:\n    lda #message\n    pha\n    jsr print\n    jmp (end)\n\n// We can use labels to point to data\nmessage:\n    .db \"Hello, world!\\n\", 0x00\n\nend:\n    jmp (end)\n";

class Editor {
    static container = document.getElementById('editor-container');
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

        let lineCount = this.input.value.split('\n').length;
        this.gutter.innerHTML = '';

        for (let i = 1; i <= lineCount; i++) {
            const line = document.createElement('span');
            line.innerHTML = i;

            this.gutter.appendChild(line);
        }
    }

    static setFontSize(size) {
        this.container.style.fontSize = size + 'pt';
    }
}

function onWindowLoaded() {
    Editor.newTab('Default');
    Editor.input.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
        }

        if (e.key === 'Tab') {
            document.execCommand('insertText', false, '    ');
            Editor.onTextChanged();

            e.preventDefault();
        }
    });
}

window.Editor = Editor;
window.addEventListener('load', onWindowLoaded)
