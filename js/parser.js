class Parser {
    static states = {
        'start': [
            {token: 'comment', regex: '//[^\n]*'},
            {token: 'comment', regex: '/\\*', state: 'comment'},
            {token: 'preprocessor', regex: '#[^ ]+', state: 'args'},
            {token: 'directive', regex: '\\.[a-z]+', state: 'args'},
            {token: 'label', regex: '[\\._a-z][_a-z0-9]+:'},
            {token: 'instruction', regex: '[^ \n]+', state: 'args'},
            {token: 'string-quote', regex: '"', state: 'string'},
            {token: 'whitespace', regex: ' +'},
            {token: 'text', regex: '[^\n]+'},
            {token: 'newline', regex: '\n'}
        ],
        'comment': [
            {token: 'comment', regex: '\\*/', state: 'start'},
            {token: 'comment', regex: '[^\\*]+'},
            {token: 'comment', regex: '\\*'}
        ],
        'args': [
            {token: 'argument', regex: '[^ \n"]+'},
            {token: 'string-quote', regex: '"', state: 'string'},
            {token: 'whitespace', regex: ' +'},
            {token: 'newline', regex: '\n', state: 'start'}
        ],
        'string': [
            {token: 'string-text', regex: '[^"\n\\\\]+'},
            {token: 'string-quote', regex: '"', state: 'last'},
            {token: 'newline', regex: '\n', state: 'start'},
            {token: 'string-escape', regex: '\\\\.'}
        ]
    };

    static tokenize(input) {
        let last = 'start';
        let state = 'start';
        let compiled = '';

        while (input !== '') {
            let fail = true;

            for (let pattern of this.states[state]) {
                const found = input.match(new RegExp(`^${pattern.regex}`, 'gi'));

                if (found != null) {
                    input = input.substring(found[0].length);
                    compiled = compiled + `<span class="${pattern.token}">${found[0]}</span>`;

                    if (pattern.state != null) {
                        if (pattern.state === 'last') {
                            let temp = state;
                            state = last;
                            last = temp;
                        }
                        else {
                            last = state;
                            state = pattern.state;
                        }
                    }

                    fail = false;
                    break;
                }
            };

            if (fail) input = '';
        }

        return '<pre>' + compiled + '</pre>';
    }
}

export { Parser };
