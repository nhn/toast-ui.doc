#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const documentation = require('documentation');

const pwd = process.cwd();
const config = require(path.resolve(pwd, 'tui-doc-config.json'));
const pkg = require(path.resolve(pwd, 'package.json'));

const customDataPath = path.resolve(__dirname, '../src/data/customData.json');
const docDataPath = path.resolve(__dirname, '../src/data/output.json');

const version = pkg.version || '1.0.0';

/**
 * Create custom data for component
 */
function createCustomData() {
  if (config.header) {
    config.header.version = version;
  }

  fs.writeFileSync(customDataPath, JSON.stringify(config, null, 2));
}

/**
 * Create documentation data
 */
function createDocData() {
  documentation.build('demo/src/*', {})
    .then(documentation.formats.json)
    .then(output => {
      fs.writeFileSync(docDataPath, output);
    });
}

createCustomData();
createDocData();
