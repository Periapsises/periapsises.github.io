export class Editor {
    scroller;
    gutter;
    input;
    overlay;

    constructor() {
        this.scroller = document.createElement('div');
        this.scroller.id = 'scroller';
        document.body.appendChild(this.scroller);

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

        this.input.addEventListener('input', () => { this.onTextChanged(this.input.value); })
        this.input.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
            }

            if (e.key === 'Tab') {
                document.execCommand('insertText', false, '    ');
                e.preventDefault('open_node', 'branch1');
            }
        })

        container.appendChild(this.input);

        this.overlay = document.createElement('pre');
        this.overlay.id = 'overlay';
        container.appendChild(this.overlay);
    }

    onTextChanged(text) {
    }
}