const { build } = require('esbuild')
const { readFileSync ,writeFileSync} = require('fs')
const { minify } = require('terser')

build({
    entryPoints: ['./index.ts'],
    outfile: './public/index.js',
    stdio: 'inherit',
    minify: true
})
.catch(() => process.exit(1))
.then(() => {
    let minified = minify({
        "./public/index.js": readFileSync('./public/index.js', 'utf8')
    }, {
        ecma: 8
    }).code
    let trimRegex = /"\\n([^"]*)\\n".trim\(\)/gm
    minified = minified.replace(trimRegex, `"$1"`)
    writeFileSync(`./public/index.js`, minified, "utf8")
})