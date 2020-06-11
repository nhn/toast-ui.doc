import React from 'react';
import PropTypes from 'prop-types';

class Resizable extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseMove = props.handleMouseMove;
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  handleMouseDown() {
    document.addEventListener('mousemove', this.handleMouseMove, false);
    document.addEventListener('mouseup', this.handleMouseUp, false);
  }

  handleMouseUp() {
    document.removeEventListener('mousemove', this.handleMouseMove, false);
    document.removeEventListener('mouseup', this.handleMouseUp, false);
  }

  render() {
    return (
      <div
        className="resize-handle"
        onMouseDown={this.handleMouseDown}
        style={{ left: this.props.left }}
      >
        Resizable
      </div>
    );
  }
}

Resizable.propTypes = {
  handleMouseMove: PropTypes.func,
  left: PropTypes.number
};

export default Resizable;
