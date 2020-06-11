import React from 'react';
import PropTypes from 'prop-types';

class MixedTypeList extends React.Component {
  getListItemComponent(item) {
    const { url, value, description } = item;

    let component;

    if (url) {
      component = (
        <span>
          <a href={url}>{value}</a>
          {description}
        </span>
      );
    } else {
      component = (
        <span>
          {value}
          {description}
        </span>
      );
    }

    return component;
  }

  render() {
    const { items } = this.props;

    if (items.length) {
      return (
        <ul className="items">
          {items.map((item, index) => (
            <li key={`list-${index}`} className="item">
              {this.getListItemComponent(item)}
            </li>
          ))}
        </ul>
      );
    }

    return null;
  }
}

MixedTypeList.propTypes = {
  items: PropTypes.array
};

export default MixedTypeList;
