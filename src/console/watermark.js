const { stripIndent } = require("common-tags");
const colors = require('colors')

console.log(stripIndent`
hi
    `.red.bold)

