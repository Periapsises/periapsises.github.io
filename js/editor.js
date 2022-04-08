import { Parser } from './parser.js'

String.prototype.getHash = function () {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

let defaultCode = "/*\n    Simple Hello World program\n    Uses the io library\n*/\n\n#include io\n\nstart:\n    lda #message\n    pha\n    jsr print\n    jmp (end)\n\n// We can use labels to point to data\nmessage:\n    .db \"Hello, world!\\n\", 0x00\n\nend:\n    jmp (end)\n";

class Editor {
    static editor = document.getElementById('editor');
    static gutter = document.getElementById('gutter');
    static input = document.getElementById('input');
    static overlay = document.getElementById('overlay');

    static setCode(code) {
        this.hash = code.getHash()

        this.input.innerHTML = code;
        this.onTextChanged();
    }

    static setDefaultCode() {
        this.setCode(defaultCode);
    }

    static onTextChanged() {
        const text = this.input.value;

        Parser.setText(text);
        Parser.setHighlight(this.overlay);

        let lineCount = text.split('\n').length;
        this.gutter.innerHTML = '';

        for (let i = 1; i <= lineCount; i++) {
            const line = document.createElement('span');
            line.innerHTML = i;

            this.gutter.appendChild(line);
        }

        this.changed = text.getHash() == this.hash;

        Lua.onTextChanged( text, this.changed )
    }

    static setFontSize(size) {
        this.editor.style.fontSize = size + 'pt';
    }
}

function onWindowLoaded() {
    Editor.setDefaultCode();

    Editor.input.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.key === 's') {
            Lua.onSave(Editor.input.value);

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
