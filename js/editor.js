import { Parser } from './parser.js'
import { Lua } from './lua.js'

let defaultCode = "/*\n    Simple Hello World program\n    Uses the io library\n*/\n\n#include io\n\nstart:\n    lda #message\n    pha\n    jsr print\n    jmp (end)\n\n// We can use labels to point to data\nmessage:\n    .db \"Hello, world!\\n\", 0x00\n\nend:\n    jmp (end)\n";

class Editor {
    static editor = document.getElementById('editor');
    static gutter = document.getElementById('gutter');
    static input = document.getElementById('input');
    static overlay = document.getElementById('overlay');

    static setCode(code) {
        this.input.innerHTML = code;
        this.onTextChanged();
    }

    static setDefaultCode() {
        this.setCode(defaultCode);
    }

    static onTextChanged() {
        Parser.setText(this.input.value);
        Parser.setHighlight(this.overlay);

        let lineCount = this.input.value.split('\n').length;
        this.gutter.innerHTML = '';

        for (let i = 1; i <= lineCount; i++) {
            const line = document.createElement('span');
            line.innerHTML = i;

            this.gutter.appendChild(line);
        }
    }

    static setFontSize(size) {
        this.editor.style.fontSize = size + 'pt';
    }
}

function onWindowLoaded() {
    Editor.setDefaultCode();

    Editor.input.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 's') {
            Lua.save(Editor.input.value);

            e.preventDefault();
        }

        if (e.key === 'Tab') {
            document.execCommand('insertText', false, '    ');
            Editor.onTextChanged();

            e.preventDefault('open_node', 'branch1');
        }
    });
}

window.Editor = Editor;
window.addEventListener('load', onWindowLoaded)
