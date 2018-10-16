import React from 'react';
import PropTypes from 'prop-types';
import {StaticQuery, graphql} from 'gatsby';

import ListGroup from '../components/ListGroup';

class ExampleNavigation extends React.Component {
  render() {
    const {
      selectedId,
      items
    } = this.props;

    return (
      <div className="nav-example">
        <ListGroup
          selectedId={selectedId}
          items={items}
        />
      </div>
    );
  }
}

const NavigationWrapper = (props) => (
  <StaticQuery
    query={graphql`
      query {
        allNavigationJson(filter: {type: {eq: "example"}}) {
          edges {
            node {
              pid
              name
            }
          }
        }
      }
    `}
    render={data => <ExampleNavigation items={data.allNavigationJson.edges} {...props} />}
  />
);

ExampleNavigation.propTypes = {
  selectedId: PropTypes.string,
  items: PropTypes.array
};

export default NavigationWrapper;
