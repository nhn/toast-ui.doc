import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

const TYPE_MAP = {
  'class': 'CLASSES',
  'namespace': 'NAMESAPCES',
  'module': 'MODULES',
  'external': 'EXTERNALS',
  'mixin': 'MIXINS',
  'global': 'GLOBALS',
  'example': 'Examples'
};

class SearchList extends React.Component {
  hightliging(fullText) {
    let pattern = new RegExp(this.props.value, 'ig');

    return fullText.replace(pattern, (text) => {
      return `<strong>${text}</strong>`;
    });
  }

  getListItemComponent(item, index) {
    const {
      movedIndex
    } = this.props;

    const {
      pid,
      name,
      parentType
    } = item.node;

    return (
      <li
        className={`item ellipsis${movedIndex === index ? ' selected' : ''}`}
        key={`search-item-${index}`}
      >
        <Link
          to={`/${pid}`}
          dangerouslySetInnerHTML={{__html: this.hightliging(name)}}
        />
        <span>{TYPE_MAP[parentType] || parentType}</span>
      </li>
    );
  }

  getResultComponent() {
    const {
      result
    } = this.props;

    let component;

    if (result.length) {
      component = (
        <ul>
          {result.map((item, index) => this.getListItemComponent(item, index))}
        </ul>
      );
    } else {
      component = (
        <p className="no-result">No Result</p>
      );
    }

    return component;
  }

  render() {
    if (this.props.searching) {
      return (
        <div className="search-list">
          {this.getResultComponent()}
        </div>
      );
    }

    return null;
  }
}

SearchList.propTypes = {
  searching: PropTypes.bool,
  value: PropTypes.string,
  result: PropTypes.array,
  movedIndex: PropTypes.number
};

export default SearchList;
