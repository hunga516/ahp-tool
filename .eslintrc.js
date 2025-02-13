module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        // Adverte sobre o uso de debugger em produção
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",

        // Define a indentação como 4 espaços
        indent: ["warn", 4],

        // Recomenda o uso de aspas duplas
        quotes: ["warn", "double"],

        // Recomenda não usar ponto e vírgula
        semi: ["warn", "never"],

        // Deleta virgulas no final de objetos
        "comma-dangle": "warn",

        "prefer-const": "warn",

        "vue/no-dupe-keys": "warn",

        // Nova linha no final
        "eol-last": ["off", "off"],

        // Força o uso de dot-notation para acessar objetos
        "dot-notation": "off",

        "no-multiple-empty-lines": "warn", // Desativa a regra

        // Adverte sobre blocos vazios
        "no-empty": "warn",

        // Adverte sobre atribuições em condições
        "no-cond-assign": ["warn", "always"],

        // Adverte sobre espaços vazios após declarações
        "no-trailing-spaces": "warn",

        // Desativa verificação de loop infinito
        "for-direction": "warn",

        // Desativa comentários inline
        "no-inline-comments": "off",

        // Adverte sobre variáveis não definidas
        "no-undef": "warn",

        // Recomenda estilo de chaves 1TBS
        "brace-style": ["warn", "1tbs", {
            allowSingleLine: true
        }],

        // Recomenda espaçamento antes de blocos
        "space-before-blocks": ["warn", {
            functions: "always",
            keywords: "always",
            classes: "never"
        }],

        // Recomenda espaçamento em operadores
        "space-infix-ops": ["warn", {
            int32Hint: false
        }],

        // Recomenda espaçamento após vírgula
        "comma-spacing": ["warn", {
            before: false, after: true
        }],

        // Evita quebras de linha antes da tag de fechamento de um elemento
        "vue/html-closing-bracket-newline": ["warn", {
            singleline: "never",
            multiline: "always"
        }],

        // Permite o uso de v-if junto ao v-for
        "vue/no-use-v-if-with-v-for": ["off", {
            allowUsingIterationVar: false
        }],

        // Requer espaços entre atributos em elementos com múltiplas linhas
        "vue/singleline-html-element-content-newline": ["warn", {
            ignoreWhenNoAttributes: true,
            ignoreWhenEmpty: true
        }],

        // Requer espaços antes e depois de chaves em objetos
        "object-curly-spacing": ["warn", "always"],

        // Requer espaços antes de parênteses em funções e declarações de controle
        "space-before-function-paren": ["warn", {
            anonymous: "always",
            named: "never",
            asyncArrow: "always"
        }],

        // Requer que nomes de variáveis usem camelCase
        camelcase: ["warn", {
            properties: "always",
            ignoreDestructuring: true
        }],

        // Evita reatribuição de parâmetros de função
        "no-param-reassign": ["off", {
            props: true,
            ignorePropertyModificationsFor: ["state"]
        }],

        // Evita uso de console.log
        "no-console": "warn",

        // Requer uso de === e !== em vez de == e !=
        eqeqeq: "warn",

        // Requer que componentes Vue tenham nome PascalCase
        "vue/component-name-in-template-casing": ["warn", "PascalCase"],

        // Evita declaração de variáveis não utilizadas
        "no-unused-vars": "warn",

        // Requer que diretivas v-for tenham um valor de key
        "vue/require-v-for-key": "warn",

        // Requer que métodos de ciclo de vida do Vue sejam definidos na ordem correta
        "vue/order-in-components": "warn",

        // Define indentação do HTML para 2 espaços
        "vue/html-indent": ["warn", 4]

    }
}
