import Grammar from './js/grammar.js';
import Tokenize from './js/lexer.js';

/**
 * Handles tokenizing the new text and adjusting the gutter line numbers
 * @param {string} text 
 * @param {HTMLDivElement} overlay 
 * @param {HTMLDivElement} gutter
 */
const onTextinputChanged = function (text, overlay, gutter) {
    overlay.innerHTML = '';
    gutter.innerHTML = '';

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
}

/**
 * Handle key shortcuts
 * @param {KeyboardEvent} e The event that was triggered
 */
const onKeyDownEvent = function (e) {
    let isCtrl = e.ctrlKey;
    let key = e.key;

    // Ctrl+S
    if (isCtrl && key === 's') {
        e.preventDefault();

        let event = new Event('editorsave');
        event.text = Editor.input.value;
        document.dispatchEvent(event);
    }

    // Tab
    if (!isCtrl && key === 'Tab') {
        e.preventDefault();
        document.execCommand('insertText', false, '    ');
        Editor.input.dispatchEvent(new Event('input'));
    }
}

/**
 * Creates the required HTML elements to form an Editor
 */
const createEditorHTML = function () {
    let editor = document.createElement('div');
    editor.className = 'editor';

    let container = document.createElement('div');
    container.className = 'container';

    let gutter = document.createElement('div');
    gutter.className = 'gutter';

    let input = document.createElement('textarea');
    input.className = 'input';
    input.placeholder = 'Enter your code here';
    input.spellcheck = false;

    let overlay = document.createElement('div');
    overlay.className = 'overlay';

    input.addEventListener('input', () => onTextinputChanged(input.value, overlay, gutter));
    input.addEventListener('keydown', onKeyDownEvent)

    let e = new Event('input');
    input.dispatchEvent(e);

    container.appendChild(input);
    container.appendChild(overlay);
    editor.appendChild(gutter);
    editor.appendChild(container);
    document.body.appendChild(editor);

    window.Editor.input = input;
}

function onContentLoaded() {
    let Editor = {
        setCode: text => {
            Editor.input.value = text;
            let e = new Event('input');
            Editor.input.dispatchEvent(e);
        }
    };

    window.Editor = Editor;
    createEditorHTML();
}

document.addEventListener('DOMContentLoaded', onContentLoaded);
