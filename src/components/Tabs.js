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

  render() {
    const {
      children
    } = this.props;

    return (
      <div className="tabs">
        <div className="tab-buttons">
          {children.map((child, index) => {
            if (child) {
              return (
                <button
                  key={`tab-${index}`}
                  className={`tab${this.state.selected === index ? ' selected' : ''}`}
                  onClick={() => (this.selectTab(index))}
                >
                  {child.props.name}
                </button>
              );
            }

            return null;
          })}
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
