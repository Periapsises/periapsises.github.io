import Grammar from './js/grammar.js';
import Tokenize from './js/lexer.js';
import Editor from './js/editor.js';

function onContentLoaded() {
    window.Editor = new Editor();
    let gutter = window.Editor.gutter;
    let overlay = window.Editor.overlay;

    document.addEventListener('editortextchanged', (e) => {
        let text = e.text;

        gutter.innerHTML = '';
        overlay.innerHTML = '';

        let lineCount = text.split('\n').length;
        for (let i = 0; i < lineCount; i++) {
            let lineNum = document.createElement('span');
            lineNum.innerHTML = (i + 1).toString();
            gutter.appendChild(lineNum);
        }

        let tokens = Tokenize(text, Grammar);
        tokens.forEach(token => {
            let element = document.createElement('span');
            element.innerHTML = token.value;
            element.classList = 'token ' + token.type;

            overlay.appendChild(element);
        });
    });
}

document.addEventListener('DOMContentLoaded', onContentLoaded);
