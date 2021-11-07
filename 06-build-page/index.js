const fs = require('fs')
const path = require('path')
const prDist = fs.createWriteStream(path.join(__dirname, 'project-dist'))
const htmlFile  = path.join(prDist, 'index.html');
const template = path.join(__dirname, 'template.html');
const cssFile = path.join(prDist, 'style.css');
const stylesComb = path.join(__dirname, 'styles');
const assetsDir = path.join(prDist, 'assets');
const assetsBasic = path.join(__dirname, 'assets');
const components = path.join(__dirname, 'components');



