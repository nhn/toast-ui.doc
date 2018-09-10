import React from 'react';
import PropTypes from 'prop-types';

class NormalTypeList extends React.Component {
  render() {
    return (
      <ul className="items">
        {this.props.items.map((item, index) => (
          <li
            key={`list-${index}`}
            className="item"
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }
}

NormalTypeList.propTypes = {
  items: PropTypes.array
};

export default NormalTypeList;
