const shell = require('shelljs');
const chalk = require('chalk');
const fs = require('fs');
const genHtml = require('./htmlTpl');

const {
    argv
} = process;
const fileName = argv[2];
const title = argv[3]

const scssFile = `./src/components/${fileName}.scss`;
const htmlFile = `./example/${fileName}.html`;
const indexFile = `./index.html`;

shell.touch(scssFile);
shell.touch(htmlFile);
fs.writeFileSync(scssFile, `// ${title}\r\n`);
fs.writeFileSync(htmlFile, genHtml(`${fileName}(${title})`));


// 增加连接到index.html
const content = fs.readFileSync(indexFile, 'utf8');

fs.writeFileSync(indexFile, content.replace(/<\/dl>/g, `    <dd class="a-list__item">        <a class="item__content" href="example/${fileName}.html">${fileName}(${title})</a>
            <i class="icon ion-ios-arrow-forward"></i>
    </dd>\r\n<\/dl>`));


console.log(chalk(`${fileName}生成完毕!`))