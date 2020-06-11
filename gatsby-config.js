const path = require('path');
const options = require(path.resolve(process.cwd(), 'src/data/layout.json'));

const activeEnv = process.env.GATSBY_ACTIVE_ENV;
let pathPrefix;

if (activeEnv) {
  const [
    {
      header: { version },
      pathPrefix: optPathPrefix
    }
  ] = options;
  const folderName = activeEnv.indexOf('latest') > -1 ? 'latest' : version;

  pathPrefix = `/${optPathPrefix}/${folderName}`;
}

module.exports = {
  pathPrefix,
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
