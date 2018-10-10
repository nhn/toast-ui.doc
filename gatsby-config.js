const path = require('path');
const pwd = process.cwd();
const options = require(path.resolve(pwd, 'src/data/layout.json'));

const {header, destPrefix} = options[0];
const {version} = header;

const isLatest = process.argv.indexOf('latest') > -1;
const folderName = isLatest ? 'latest' : version;

module.exports = {
  pathPrefix: `/${destPrefix}/${folderName}`,
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `html`,
        path: `${__dirname}/static`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'tui-language-'
            }
          }
        ]
      }
    },
    `gatsby-transformer-json`
  ]
};
