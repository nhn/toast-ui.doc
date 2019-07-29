#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');
const runScript = require('runscript');
const documentation = require('documentation');

const apiDataFactory = require('./apiDataFactory.js');
const exampleDataFactory = require('./exampleDataFactory.js');

const pwd = process.cwd();
const isDev = process.argv.indexOf('--dev') > -1;
const isServe = process.argv.indexOf('--serv') > -1;

const pkg = require(path.resolve(pwd, 'package.json'));
const config = require(path.resolve(pwd, 'tuidoc.config.json'));

const {version} = pkg || '1.0.0';
const {main: {filePath: main}} = config;

// path of data files
const BASE_DATA_PATH = path.resolve(__dirname, '../src/data');
const PUBLIC_FOLDER_PATH = path.resolve(__dirname, '../public');
const MAIN_DATA_PATH = path.resolve(pwd, main);
const LAYOUT_DATA_PATH = `${BASE_DATA_PATH}/layout.json`;
const NAV_DATA_PATH = `${BASE_DATA_PATH}/navigation.json`;
const SEARCH_DATA_PATH = `${BASE_DATA_PATH}/searchKeywords.json`;

/**
 * Make json file
 * @param {string} fullPath - path + filename
 * @param {object} data - data to make file
 */
function makeJsonFile(fullPath, data) {
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
}

/**
 * Make data for layout(header & footer)
 */
function makeLayoutData() {
  const {
    header,
    footer,
    api: {fileLink},
    examples,
    pathPrefix // using for gatsby-config.js
  } = config;

  if (!header.logo.linkUrl) {
    header.logo.linkUrl = '/';
  }

  if (!header.title) {
    header.title = {
      text: '',
      linkUrl: ''
    };
  }

  header.version = header.version === false ? '' : version;

  const data = {
    header,
    footer,
    fileLink,
    pathPrefix: pathPrefix || pkg.name,
    useExample: !!examples
  };

  makeJsonFile(LAYOUT_DATA_PATH, [data]);
}

/**
 * Make data using in main page via config file's option
 */
function makeMainPageData() {
  fs.readFile(MAIN_DATA_PATH, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    fs.writeFileSync(`${BASE_DATA_PATH}/README.md`, data);
  });
}

/**
 * Make path of parsing file
 * @returns {string} file path
 */
function makeParsingFilePath() {
  const {api: {filePath}} = config;

  if (typeof filePath === 'string') {
    return path.resolve(pwd, filePath);
  }

  return filePath.map(file => path.resolve(pwd, file));
}

/**
 * Make all data using in component via documentation.js
 */
function makeAllData() {
  const filePath = makeParsingFilePath();

  documentation.build(filePath, {
    shallow: true
  }).then(documentation.formats.json)
    .then(output => {
      let navigation = [];
      let searchKeywords = [];

      const apiData = apiDataFactory.createData(JSON.parse(output));
      const exampleData = exampleDataFactory.createData();

      const allNavData = navigation.concat(apiData.navigation)
        .concat(exampleData.navigation);
      const allSearchData = searchKeywords.concat(apiData.searchKeywords)
        .concat(exampleData.searchKeywords);

      makeJsonFile(NAV_DATA_PATH, allNavData);
      makeJsonFile(SEARCH_DATA_PATH, allSearchData);
    })
    .then(() => {
      build();
    });
}

/**
 * Init
 */
function init() {
  fs.emptyDir(PUBLIC_FOLDER_PATH, err => {
    if (err) {
      throw err;
    }

    createData();
  });
}

/**
 * Create data
 */
function createData() {
  fs.emptyDir(BASE_DATA_PATH, err => {
    if (err) {
      throw err;
    }

    makeLayoutData();
    makeMainPageData();
    makeAllData();
  });
}

/**
 * Build gatsby script
 */
function build() {
  try {
    let versionDir = path.resolve(pwd, `_${version}`);
    let latestDir = path.resolve(pwd, '_latest');
    let cmd;

    if (isDev) {
      cmd = `npm run clean && npm run develop`;
    } else if (isServe) {
      cmd = `npm run serve`;
    } else {
      cmd = `npm run clean && npm run build && cp -r public ${latestDir} &&`;
      cmd += `npm run clean && npm run build && cp -r public ${versionDir}`;
    }

    process.chdir(path.resolve(__dirname, '../')); // change working directory

    runScript(cmd).then(() => {
      console.log('build success');
    });
  } catch (err) {
    console.error(`chdir: ${err}`);
  }
}

init();
