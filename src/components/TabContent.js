import React from 'react';
import PropTypes from 'prop-types';

class TabContent extends React.Component {
  render() {
    const { hasIframe, children } = this.props;

    return <div className={`tab-content${hasIframe ? ' iframe' : ''}`}>{children}</div>;
  }
}

TabContent.propTypes = {
  hasIframe: PropTypes.bool,
  children: PropTypes.object.isRequired
};

export default TabContent;
