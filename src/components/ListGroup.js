import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '../components/ListItem';

class ListGroup extends React.Component {
  render() {
    const { selectedId, title, items } = this.props;

    if (items.length) {
      return (
        <div className="nav-group">
          {title && <h2 className="title">{title}</h2>}
          <ul>
            {items.map((item, index) => {
              const { pid, name, childNodes } = item.node;

              return (
                <ListItem
                  key={`nav-item-${index}`}
                  selectedId={selectedId}
                  pid={pid}
                  name={name}
                  childNodes={childNodes}
                />
              );
            })}
          </ul>
        </div>
      );
    }

    return null;
  }
}

ListGroup.propTypes = {
  selectedId: PropTypes.string,
  title: PropTypes.string,
  items: PropTypes.array
};

export default ListGroup;
