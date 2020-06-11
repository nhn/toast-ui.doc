import React from 'react';
import PropTypes from 'prop-types';

class NormalList extends React.Component {
  render() {
    return (
      <div>
        <h5 className="title">{this.props.title}</h5>
        <ul className="items">
          {this.props.items.map((item, index) => (
            <li key={`list-${index}`} className="item" dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      </div>
    );
  }
}

NormalList.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array
};

export default NormalList;
