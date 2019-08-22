const path = require('path');

exports.onCreateWebpackConfig = ({
  rules,
  actions
}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules(?!\/@toast-ui\/doc)|bower_components(?!\/@toast-ui\/doc))/,
          use: rules.js().use
        }
      ]
    }
  });
};

exports.createPages = ({
  graphql,
  actions
}) => {
  const {createPage} = actions;

  return new Promise((resolve) => {
    graphql(`
      {
        allNavigationJson {
          edges {
            node {
              pid
              type
            }
          }
        }
      }
    `).then(result => {
      result.data.allNavigationJson.edges.forEach(({node}) => {
        const {
          pid,
          type
        } = node;

        let filename = '';

        if (type === 'example') { // for static file using in iframe
          filename = pid.replace('tutorial-', '');
        }

        createPage({
          path: `/${pid}`,
          component: path.resolve(`./src/templates/${type}-page.js`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            id: pid,
            filename: filename
          }
        });
      });

      resolve();
    });
  });
};
