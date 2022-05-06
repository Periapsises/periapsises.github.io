let path = 'Home'

async function getFile(path) {
    var response = await fetch('./contents/' + path + '.md');

    if (response.status != 200) {
        throw new Error('Server error');
    }

    var data = await response.text();
    return data;
}

async function onLoaded() {
    const docSection = document.getElementById('markdown-docs');
    var text = await getFile(path)

    docSection.innerHTML = marked.parse(text);
}

window.addEventListener('load', onLoaded);
