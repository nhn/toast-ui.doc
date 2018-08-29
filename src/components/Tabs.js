import React from 'react';
import PropTypes from 'prop-types';

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.tabIndex || 0
    };
  }

  selectTab(index) {
    this.setState({
      selected: index
    });
  }

  getTabButtonComponent(name, index) {
    return (
      <button
        key={`tab-${index}`}
        className={`tab${this.state.selected === index ? ' selected' : ''}`}
        onClick={() => (this.selectTab(index))}
      >
        {name}
      </button>
    );
  }

  render() {
    const {
      children
    } = this.props;

    return (
      <div className="tabs">
        <div className="tab-buttons">
          {children.map((child, index) => (
            this.getTabButtonComponent(child.props.name, index)
          ))}
        </div>
        {children[this.state.selected]}
      </div>
    );
  }
}

Tabs.propTypes = {
  tabIndex: PropTypes.number,
  children: PropTypes.array.isRequired
};

export default Tabs;
