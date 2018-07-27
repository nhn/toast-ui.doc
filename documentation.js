#!/usr/bin/env node

var documentation = require('documentation');
var fs = require('fs');
var path = require('path');

documentation.build('demo/src/*', {})
  .then(documentation.formats.json)
  .then(output => {
    // output is a string of JSON data
    fs.writeFileSync('src/data/output.json', output);
  });
