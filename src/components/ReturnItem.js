import React from 'react';
import PropTypes from 'prop-types';

import Types from '../components/Types';

const OPEN_BRACE = '{';
const CLOSE_BRACE = '}';

class ReturnItem extends React.Component {
  render() {
    const { data } = this.props;

    if (data) {
      const { types, description } = data;

      const desc = description ? ` - ${description}` : '';

      return (
        <div className="returns">
          <h5 className="title">RETURNS:</h5>
          <span className="description">
            {OPEN_BRACE} <Types data={types} /> {CLOSE_BRACE}
            {desc}
          </span>
        </div>
      );
    }

    return null;
  }
}

ReturnItem.propTypes = {
  data: PropTypes.object
};

export default ReturnItem;
