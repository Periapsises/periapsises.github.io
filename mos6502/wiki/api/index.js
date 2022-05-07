let path = ['Api', 'Home']
const paths = {
    'Api': {
        'Home': '/index.md'
    },
    'Classes': [
    ],
    'Types': {
        'Node': '/Node.md'
    }
}

let docSection = null

async function getCurrentFile() {
    let file = path[1] == null ? '/index.md' : paths[path[0]][path[1]]
    let filePath = './contents/' + path[0] + file

    let response = await fetch(filePath);

    if (response.status != 200) {
        throw new Error('Server error');
    }

    let data = await response.text();
    return data;
}

async function updateLocation() {
    let text = await getCurrentFile()
    docSection.innerHTML = marked.parse(text);
}

async function onLoaded() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('category')) {
        path[0] = params.get('category');
        path[1] = null

        if (params.has('section')) {
            path[1] = params.get('section');
        }
    }

    docSection = document.getElementById('docs-markdown');
    updateLocation();
}

window.addEventListener('load', onLoaded);
