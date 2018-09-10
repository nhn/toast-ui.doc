import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';

import Layout from '../components/layout';

import '../styles/main.scss';

class Index extends React.Component {
  render() {
    const {html} = this.props.data.allMarkdownRemark.edges[0].node;

    return (
      <Layout
        tabIndex={0}
        selectedNavItemId={''}
      >
        <div className="content-markdown" dangerouslySetInnerHTML={{__html: html}} />
      </Layout>
    );
  }
}

Index.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.object.isRequired
  })
};

export default Index;

export const query = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          html
        }
      }
    }
  }
`;
