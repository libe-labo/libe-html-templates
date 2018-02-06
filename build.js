const fs = require('fs'),
      Mustache = require('mustache'),
      dataView = require('./dataView'),
      templateType = process.argv[2] || false

var mainVars = {}

if (templateType) {

  dataView.page.trackindSlug = dataView.page.year + '-' + dataView.page.month + '-' + dataView.page.slug

  // load all templates
  let allTemplates = ['chapo', 'columnsMultiline', 'head', 'headerTop', 'social', 'tabs', 'tracking', 'sideLeft', 'mainRight']

  // template base
  mainVars[templateType] = fs.readFileSync('./templates/' + templateType + '.mustache').toString()

  // template partials
  let chapo = fs.readFileSync('./templates/_partials/chapo.mustache').toString(),
      columnsMultiline = fs.readFileSync('./templates/_partials/columnsMultiline.mustache').toString(),
      head = fs.readFileSync('./templates/_partials/head.mustache').toString(),
      headerTop = fs.readFileSync('./templates/_partials/headerTop.mustache').toString(),
      social = fs.readFileSync('./templates/_partials/social.mustache').toString(),
      tabs = fs.readFileSync('./templates/_partials/tabs.mustache').toString(),
      tracking = fs.readFileSync('./templates/_partials/tracking.mustache').toString(),
      sideLeft = fs.readFileSync('./templates/_partials/sideLeft.mustache').toString(),
      mainRight = fs.readFileSync('./templates/_partials/mainRight.mustache').toString()

  // mustache render
  let index = Mustache.render(mainVars[templateType], dataView, {
    chapo, columnsMultiline, head, headerTop, social, tabs, tracking, sideLeft, mainRight
  })

  // write html
  fs.writeFile('./dist/index.html', index.toString(), function (err) {
    if (err) console.log(err);
    console.log('./dist/index.html have benn created succesfuly !');
  });

} else {
  console.log('please defined a template type !')
}

