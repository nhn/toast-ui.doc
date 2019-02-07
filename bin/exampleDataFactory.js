const path = require('path');

const fs = require('fs-extra'); // to create folder and file
const mkdirp = require('mkdirp'); // to create folder
const nodedir = require('node-dir'); // to read files
const copydir = require('copy-dir'); // to copy folder
const directoryExists = require('directory-exists');

const cheerio = require('cheerio');
const Prism = require('prismjs');

const pwd = process.cwd();
const config = require(path.resolve(pwd, 'tui-doc-config.json'));
const examples = config.examples || false;

const {
  filePath,
  titles
} = examples;

const EXAMPLE_FILES_PATH = path.resolve(pwd, filePath || '');
const BUNDLE_FILES_PATH = path.resolve(pwd, `dist`);
const LIB_FILES_PATH = path.resolve(pwd, `lib`);
const COPY_FILES_PATH = path.resolve(__dirname, `../static`);
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
 * Get pid (foramt: tutorial-foo)
 * @param {string} filename - file name to create pid
 * @returns {string} pid
 */
function getPid(filename) {
  return `tutorial-${filename}`;
}

/**
 * Get title
 * @param {string} filename - file name to create title
 * @returns {string} title
 */
function getTitle(filename) {
  if (titles) {
    return titles[filename] || filename;
  }

  return '';
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
  nodedir.readFiles(EXAMPLE_FILES_PATH, {
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
  copydir(EXAMPLE_FILES_PATH, `${COPY_FILES_PATH}/examples`, err => {
    if (err) {
      throw err;
    }

    readExampleFiles();
  });
}

/**
 * Copy bundle files of dist to static folder
 */
function copyBundleFiles() {
  directoryExists(BUNDLE_FILES_PATH, (error, result) => {
    if (!result) {
      console.log('create bundle files on dist folder.');

      return;
    }

    copydir(BUNDLE_FILES_PATH, `${COPY_FILES_PATH}/dist`, err => {
      if (err) {
        throw err;
      }
    });
  });
}

/**
 * Copy library files on lib to static folder
 */
function copyLibraryFiles() {
  directoryExists(LIB_FILES_PATH, (error, result) => {
    if (!result) {
      return;
    }

    copydir(LIB_FILES_PATH, `${COPY_FILES_PATH}/lib`, err => {
      if (err) {
        throw err;
      }
    });
  });
}

/**
 * Make data of navigation and search keywords
 */
function makeNavAndSearchData() {
  const files = nodedir.files(EXAMPLE_FILES_PATH, {sync: true});

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
    fs.emptyDirSync(COPY_FILES_PATH);

    if (examples) {
      copyBundleFiles();
      copyExampleFiles();
      copyLibraryFiles();
      makeNavAndSearchData();
    } else { // make dummy file for graphql
      makeExamplePageDataFile({
        pid: 'tutorial-dummy',
        title: '',
        codeJs: '',
        codeHtml: ''
      });
    }

    return {
      navigation: navItems,
      searchKeywords: searchItems
    };
  }
};
