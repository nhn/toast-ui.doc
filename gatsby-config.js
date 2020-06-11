const path = require('path');
const options = require(path.resolve(process.cwd(), 'src/data/layout.json'));

const [{ header, pathPrefix }] = options;
const { version } = header;

const isLatest = process.argv.indexOf('latest') > -1;
const folderName = isLatest ? 'latest' : version;

module.exports = {
  pathPrefix: `/${pathPrefix}/${folderName}`,
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
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-plugin-polyfill-io`,
      options: {
        features: [`Map`, `Set`, `requestAnimationFrame`]
      }
    }
  ]
};
