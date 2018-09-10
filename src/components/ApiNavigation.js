import React from 'react';
import PropTypes from 'prop-types';
import {StaticQuery, graphql} from 'gatsby';

import ListGroup from '../components/ListGroup';

class ApiNavigation extends React.Component {
  filterItems(type) {
    return this.props.items.filter(item => {
      return item.node.parentPid === type;
    });
  }

  render() {
    const {
      selectedId
    } = this.props;

    return (
      <div>
        <ListGroup
          selectedId={selectedId}
          title={'MODULES'}
          items={this.filterItems('module')}
        />
        <ListGroup
          selectedId={selectedId}
          title={'EXTERNALS'}
          items={this.filterItems('external')}
        />
        <ListGroup
          selectedId={selectedId}
          title={'CLASSES'}
          items={this.filterItems('class')}
        />
        <ListGroup
          selectedId={selectedId}
          title={'NAMESPACES'}
          items={this.filterItems('namespace')}
        />
        <ListGroup
          selectedId={selectedId}
          title={'MIXINS'}
          items={this.filterItems('mixin')}
        />
        <ListGroup
          selectedId={selectedId}
          title={'GLOBAL'}
          items={this.filterItems('global')}
        />
      </div>
    );
  }
}

const NavigationWrapper = (props) => (
  <StaticQuery
    query={graphql`
      query {
        allNavigationJson(filter: {type: {eq: "api"}}) {
          edges {
            node {
              pid
              parentPid
              name
              opened
              childNodes {
                pid
                name
                kind
              }
            }
          }
        }
      }
    `}
    render={data => <ApiNavigation items={data.allNavigationJson.edges} {...props} />}
  />
);

ApiNavigation.propTypes = {
  selectedId: PropTypes.string,
  items: PropTypes.array
};

export default NavigationWrapper;
