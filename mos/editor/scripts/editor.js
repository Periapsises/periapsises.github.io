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
        this.input.setAttribute('spellcheck', 'true');
        container.appendChild(this.input);

        this.overlay = document.createElement('pre');
        this.overlay.id = 'overlay';
        container.appendChild(this.overlay);
    }
}