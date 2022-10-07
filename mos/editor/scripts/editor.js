export class Editor {
    scroller;
    gutter;
    input;
    overlay;

    lines = [''];
    lineNumberCount = 0;

    constructor() {
        this.scroller = document.createElement('div');
        this.scroller.id = 'scroller';
        document.getElementById('editor').appendChild(this.scroller);

        this.gutter = document.createElement('div');
        this.gutter.id = 'gutter'
        this.scroller.appendChild(this.gutter);

        let container = document.createElement('div');
        container.id = 'container';
        this.scroller.appendChild(container);

        this.input = document.createElement('textarea');
        this.input.id = 'input';
        this.input.setAttribute('placeholder', 'Write your code here...')
        this.input.setAttribute('spellcheck', 'false');

        this.input.addEventListener('input', () => { this.onTextChanged(); });
        this.input.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 's') {
                let event = new Event('save');
                event.text = this.input.value;
                this.dispatchEvent(event);

                e.preventDefault();
            }

            if (e.key === 'Tab') {
                document.execCommand('insertText', false, '    ');
                e.preventDefault('open_node', 'branch1');
            }
        });

        container.appendChild(this.input);

        this.overlay = document.createElement('pre');
        this.overlay.id = 'overlay';
        container.appendChild(this.overlay);

        this.addLineNumbers();
        this.input.focus();
    }

    onTextChanged() {
        let inputText = this.input.value;

        let cursor = this.input.selectionStart;
        let char = inputText.charAt(cursor);

        this.lines = inputText.split('\n');
        let lineNumber = inputText.substring(0, this.input.selectionStart).split('\n').length;
        let lineContent = this.lines[lineNumber - 1];

        this.addLineNumbers();
    }

    addLineNumbers() {
        let newCount = this.lines.length;
        let prevCount = this.lineNumberCount;
        if (newCount == prevCount) return;

        this.gutter.innerHTML = '';

        for (let line = 1; line <= newCount; line++) {
            let span = document.createElement('span');
            span.innerHTML = line.toString();
            this.gutter.appendChild(span);
        }
    }
}