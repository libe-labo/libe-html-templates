const fs = require('fs'),
      Mustache = require('mustache'),
      dataView = require('./dataView'),
      templateType = process.argv[2] || false

var mainVars = {
  base: null,
  partials: {}
}

if (templateType) {

  dataView.page.trackindSlug = dataView.page.year + '-' + dataView.page.month + '-' + dataView.page.slug

  // load base template
  mainVars[templateType] = fs.readFileSync('./templates/' + templateType + '.mustache').toString()

  // load all partials templates
  let allTemplates = fs.readdirSync('./templates/_partials/')
  allTemplates.forEach(partials => {
    let fileName = partials.split('.')[0]
    mainVars.partials[fileName] = fs.readFileSync('./templates/_partials/' + partials).toString()
  })

  // mustache render
  let index = Mustache.render(mainVars[templateType], dataView, mainVars.partials)

  // write html
  fs.writeFile('./dist/index.html', index.toString(), function (err) {
    if (err) console.log(err);
    console.log('./dist/index.html have been created succesfuly !');
    fs.createReadStream('./node_modules/libe-bulma/css/six-plus.css').pipe(fs.createWriteStream('./dist/static/css/six-plus.css'))
    console.log('./dist/static/css/six-plus.css have benn copyed from libe-bulma succesfuly !');
    console.log('template ' + templateType + ' is ready in ./dist !')
  });

}

