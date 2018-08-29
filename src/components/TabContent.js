import React from 'react';
import PropTypes from 'prop-types';

class TabContent extends React.Component {
  render() {
    return (
      <div className="tab-content">
        {this.props.children}
      </div>
    );
  }
}

TabContent.propTypes = {
  children: PropTypes.object.isRequired
};

export default TabContent;
