import React from 'react';
import PropTypes from 'prop-types';

class Iframe extends React.Component {
  render() {
    return (
      <iframe
        className="tab-content iframe"
        frameBorder={'0'}
        width={'100%'}
        height={'800'}
        src={this.props.src}
      />
    );
  }
}

Iframe.propTypes = {
  src: PropTypes.string
};

export default Iframe;
