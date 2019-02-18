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

const REPLACED_PATTERN = /[-[\]/{}()*+?.\\^$|]/g;
const REPLACED_VALUE = '\\$&';

class SearchList extends React.Component {
  hightliging(fullText) {
    const escapeValue = this.props.value.replace(REPLACED_PATTERN, REPLACED_VALUE);

    let pattern = new RegExp(escapeValue, 'ig');

    const joined = fullText.replace(pattern, (text) => {
      return `<strong>${text}</strong>`;
    });

    return (
      <span dangerouslySetInnerHTML={{__html: joined}} />
    );
  }

  getListItemComponent(item, index) {
    const {
      movedIndex
    } = this.props;

    const {
      pid,
      name,
      parentPid
    } = item.node;

    return (
      <li
        className={`item${movedIndex === index ? ' selected' : ''}`}
        key={`search-item-${index}`}
      >
        <Link
          to={`/${pid}`}
          className="ellipsis"
        >
          {this.hightliging(name)}
          <span className="nav-group-title">
            {TYPE_MAP[parentPid] || parentPid}
          </span>
        </Link>
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
