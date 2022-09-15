class LanguageInfo {
    constructor(content) {
        this.name = content.name;
        this.extension = content.extension;
        this.states = {};
        let common = [];

        if (content.common != null)
            common = content.common;

        for (let key in content.states) {
            this.states[key] = content.states[key];
            this.states[key].push.apply(common);
        }
    }
}
class Language {
    static getLanguage(name) {
        if (Language.languages[name] != null)
            return Language.languages[name];

        fetch(name + '.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }
                return response.json();
            })
            .then((content) => {
                Language.languages[name] = new LanguageInfo(content);
            })
            .catch((error) => {
                throw new Error(`Could not fetch ${name}.json: ${error}`);
            });

        return Language.languages[name];
    }
}
Language.languages = {};

export { Language };
