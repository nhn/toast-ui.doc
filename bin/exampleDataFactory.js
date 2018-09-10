const path = require('path');

const fs = require('fs-extra'); // to create folder and file
const mkdirp = require('mkdirp'); // to create folder
const dir = require('node-dir'); // to read

const cheerio = require('cheerio');
const Prism = require('prismjs');

const pwd = process.cwd();
const config = require(path.resolve(pwd, 'tui-doc-config.json'));

const {
  filePath,
  titles
} = config.examples;

const ORIGIN_FILES_PATH = path.resolve(pwd, filePath);
const COPY_FILES_PATH = path.resolve(__dirname, `../static/examples`);
const DATA_FILES_PATH = path.resolve(__dirname, `../src/data/examplePage`);

const navItems = [];
const searchItems = [];

/**
 * Get file name via file name of pull path
 * @param {string} longname - file name of full path
 * @returns {string} splited name
 */
function getFileName(longname) {
  return path.parse(longname).base.split('.').shift();
}

/**
 * Get pid (foramt: example-foo)
 * @param {string} filename - file name to create pid
 * @returns {string} pid
 */
function getPid(filename) {
  return `example-${filename}`;
}

/**
 * Get title
 * @param {string} filename - file name to create title
 * @returns {string} title
 */
function getTitle(filename) {
  return titles[filename] || filename;
}

/**
 * Parse content of each file
 * @param {string} content - file's content
 * @returns {object} parsed content data using cheerio
 */
function parseContent(content) {
  const $ = cheerio.load(content, {
    decodeEntities: false,
    normalizeWhitespace: false
  });

  return {
    js: $('script.code-js').html(),
    html: $('div.code-html').html()
  };
}

/**
 * Make data of example page
 * @param {string} parsedContent - parsed content
 * @param {string} longname - file name of full path
 * @returns {object} data
 */
function makeExamplePageData(parsedContent, longname) {
  const {
    js,
    html
  } = parsedContent;

  const codeJs = js ? Prism.highlight(js, Prism.languages.javascript, 'javascript') : '';
  const codeHtml = html ? Prism.highlight(html, Prism.languages.html, 'html') : '';
  const filename = getFileName(longname);

  return {
    pid: getPid(filename),
    title: getTitle(filename),
    codeJs,
    codeHtml
  };
}
/**
 * Make json file to using in example page
 * @param {object} data - data to make file
 */
function makeExamplePageDataFile(data) {
  mkdirp(DATA_FILES_PATH, err => {
    if (err) {
      throw err;
    }

    fs.writeFileSync(`${DATA_FILES_PATH}/${data.pid}.json`, JSON.stringify(data, null, 2));
  });
}

/**
 * Read example files
 */
function readExampleFiles() {
  dir.readFiles(ORIGIN_FILES_PATH, {
    match: /.html$/,
    recursive: true
  }, (err, content, filename, next) => {
    if (err) {
      throw err;
    }

    const parsedContent = parseContent(content);
    const data = makeExamplePageData(parsedContent, filename);

    makeExamplePageDataFile(data);
    next(); // read next file
  });
}

/**
 * Copy example files to static folder
 */
function copyExampleFiles() {
  fs.copy(ORIGIN_FILES_PATH, COPY_FILES_PATH, err => {
    if (err) {
      throw err;
    }

    readExampleFiles();
  });
}

/**
 * Make data of navigation and search keywords
 */
function makeNavAndSearchData() {
  const files = dir.files(ORIGIN_FILES_PATH, {sync: true});

  files.forEach(file => {
    if (file.match(/.html$/)) {
      const filename = getFileName(file);
      const pid = getPid(filename);
      const name = getTitle(filename);

      navItems.push({
        pid,
        name,
        parentPid: 'example',
        type: 'example'
      });

      searchItems.push({
        pid,
        name,
        parentPid: 'example'
      });
    }
  });
}

module.exports = {
  createData: function() {
    copyExampleFiles();
    makeNavAndSearchData();

    return {
      navigation: navItems,
      searchKeywords: searchItems
    };
  }
};
