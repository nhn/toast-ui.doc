const path = require('path');

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

        createPage({
          path: `/${pid}`,
          component: path.resolve(`./src/templates/${type}-page.js`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            id: pid
          }
        });
      });

      resolve();
    });
  });
};
