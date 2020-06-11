import React from 'react';
import PropTypes from 'prop-types';

const ToggleButton = (props) => {
  const { opened, handleClick } = props;

  return (
    <button className={`btn-toggle${opened ? ' opened' : ''}`} onClick={handleClick}>
      <span className="icon"></span>
    </button>
  );
};

ToggleButton.propTypes = {
  opened: PropTypes.bool,
  handleClick: PropTypes.func
};

export default ToggleButton;
