import { Language } from './scripts/languages';

function onWindowLoaded() {
    let lang = Language.getLanguage('assembly');
    let container = document.getElementById('container') as HTMLDivElement;

    console.log(lang);
}

window.addEventListener('DOMContentLoaded', onWindowLoaded);
