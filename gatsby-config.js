const path = require('path');
const pwd = process.cwd();
const pkg = require(path.resolve(pwd, 'package.json'));
const config = require(path.resolve(pwd, 'tui-doc-config.json'));

const {version} = pkg;
const {repository} = config.fileLink;

const repoName = repository.split('/').pop();

module.exports = {
  pathPrefix: `/${repoName}/${version}`,
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
