import { Language } from './scripts/languages.js';

async function onWindowLoaded() {
    let lang = await Language.getLanguage('assembly');
    let container = document.getElementById('container');
    console.log(lang);
}

window.addEventListener('DOMContentLoaded', onWindowLoaded);
