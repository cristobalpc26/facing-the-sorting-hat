const getDirectory = require('./getDirectory.js')
const fs = require('fs')
const fsExtra = require('fs-extra')
const path = require('path')
const parse = require('vue-docgen-api').parse
const glob = require('glob')

console.log(__dirname)
console.log(getDirectory)
let files = getFiles(path.resolve(__dirname, '../../..'))

componentsPath = path.resolve(__dirname, '../../components/')
viewsPath = path.resolve(__dirname, '../../views')

if (!fs.existsSync(componentsPath)) fs.mkdirSync(componentsPath)
if (!fs.existsSync(viewsPath)) fs.mkdirSync(viewsPath)

fsExtra.emptyDirSync(componentsPath)
fsExtra.emptyDirSync(viewsPath)

let componentsNames = [' ']
let viewsNames = [' ']

console.log('/home/cris/Programas/WithMadrid/facing-the-sorting-hat/frontend/components/BotTextDialog.vue'.match(/components|pages/g)[0])

module.exports = async () => {
    createREADMEs()
    let dataToWrite = ''
    let componentDoc = {}
    let exampleCompDir = ''
    let exampleCode = ''
    console.log('Ficheros a registrar\n')
    console.log(files)
    for (const key of Object.keys(files)) {
        keyName = toKebabCase(key)
        try {
            componentDoc = await parse(files[key])

        } catch (err) {
            componentDoc = {}
        }

        if (Object.keys(componentDoc).length > 0) {
            try {
                dataToWrite = `# ${key}`
                if (getDirectory(files[key]) === 'components') {
                    // First we look for DESCRIPTION
                    if (componentDoc.description.length > 0) {
                        dataToWrite += `\n\n## Description\n\n${componentDoc.description.replace(/\n/g, '<br>')}`
                    }

                    // Second, we look for the file with an example of the component
                    exampleCompDir = path.resolve(__dirname, `../../../examples-docs/${keyName}.md`)
                    if (fs.existsSync(exampleCompDir)) {
                        exampleCode = fs.readFileSync(exampleCompDir)
                        dataToWrite += `\n\n## Demo \n\n<div class=\'example-code\'>\n\n${exampleCode}\n\n</div>`
                    }

                    // Check if there are props
                    if (componentDoc.props !== undefined) {
                        dataToWrite += '\n\n## Properties\n\n<div class="table-div">\n\n|Name|Description|\n|---|---|'
                        componentDoc.props.forEach(el => {
                            dataToWrite += `\n|\`${el.name}\`|Type: \`${el.type.name}\`` // |
                            if (el.required === true) dataToWrite += `<br>Required: \`true\``
                            if (el.defaultValue !== undefined) dataToWrite += `<br>Default: \`${el.defaultValue.value}\``
                            if (el.description !== undefined) {
                                dataToWrite += `<br><br>${el.description.replace(/\n/g, '<br>')}`
                            }
                            dataToWrite += '|'
                        })

                        dataToWrite += '\n\n</div>'
                    }

                    // Check if there are slots

                    if (componentDoc.slots !== undefined) {
                        dataToWrite += '\n\n## Slots\n\n<div class="table-div">\n\n|Name|Description|\n|---|---|'
                        componentDoc.slots.forEach(el => {
                            if (el.description !== undefined) {
                                dataToWrite += `\n|\`${el.name}\`|${el.description.replace(/\n/g, '<br>')}|`
                            }
                            else dataToWrite += `\n|\`${el.name}\`||`
                        })

                        dataToWrite += '\n\n</div>'
                    }

                    // Check if there are events

                    if (componentDoc.events !== undefined) {
                        dataToWrite += '\n\n## Events\n\n<div class="table-div">\n\n|Name|Description|\n|---|---|'
                        componentDoc.events.forEach(el => {
                            if (el.description !== undefined) {
                                dataToWrite += `\n|\`${el.name}\`|${el.description.replace(/\n/g, '<br>')}|`
                            }
                            else dataToWrite += `\n|\`${el.name}\`||`
                        })

                        dataToWrite += '\n\n</div>'
                    }

                    // Last, add the code example/s

                    if (fs.existsSync(exampleCompDir)) dataToWrite += `\n\n## Example Code\n\`\`\` vue \n${exampleCode}\n\`\`\``

                    fs.writeFileSync(componentsPath + `/${keyName}.md`, dataToWrite)
                    componentsNames.push(keyName + '.md')
                }

                else if (getDirectory(files[key]) === 'pages') {
                    console.log(componentDoc)
                    if (componentDoc.description.length > 0) {
                        dataToWrite += `\n\n## Description\n\n${componentDoc.description.replace(/\n/g, '<br>')}`
                    }
                    fs.writeFileSync(viewsPath + `/${keyName}.md`, dataToWrite)
                    viewsNames.push(keyName + '.md')
                }

            } catch (err) {
                console.log(`Error, element ${key} couldn´t be registered`)
                console.log(err)
            }
        }

        else {
            console.log(`File ${key} is empty`)
        }
    }

    componentsNames.sort()
    viewsNames.sort()

    fs.writeFileSync(path.resolve(__dirname, '../configData.json'), JSON.stringify({ cn: componentsNames, vn: viewsNames, fls: files }))
}

function createREADMEs() {
    let dataToWrite = ''
    dataToWrite = '## Components\n\nComponents created/used in the development'
    fs.writeFileSync(path.resolve(__dirname, '../../components/README.md'), dataToWrite)
    dataToWrite = '## Views\n\nPickgeo views description'
    fs.writeFileSync(path.resolve(__dirname, '../../views/README.md'), dataToWrite)
}

function toKebabCase(str) {
    return str.replace(/\B(?:([A-Z])(?=[a-z]))|(?:(?<=[a-z0-9])([A-Z]))/g, '-$1$2').toLowerCase()
}

function getFiles(src) {
    let dict = {}, files = glob.sync(src + '/+(components|pages)/**/*.vue')
    files.forEach(el => {
        dict[path.parse(el).name] = el
    })

    return dict
}