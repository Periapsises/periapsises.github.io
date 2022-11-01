import { Language } from '../language.js'

let states = {
    "initial": [{ "token": "text", "regex": "^.*$" }]
}

let TextLanguage = new Language('Text', '.txt', 'text', states);
export { TextLanguage }
