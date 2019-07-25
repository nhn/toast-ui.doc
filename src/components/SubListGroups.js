import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'gatsby';

class SubListGroups extends React.Component {
  filter(kind) {
    return this.props.items.filter(item => {
      return item.kind === kind;
    });
  }

  getSubListGroupComponent(title, items) {
    const {
      selectedId
    } = this.props;

    if (items && items.length) {
      return (
        <div className="subnav-group">
          <h3 className="title">{title}</h3>
          <ul>
            {items.map((item, index) => {
              const {
                pid,
                name
              } = item;

              return (
                <li key={`nav-item-${index}`}>
                  <p className={`nav-item${selectedId === pid ? ' selected' : ''}`}>
                    <Link
                      to={`/${pid}`}
                      className="ellipsis"
                    >
                      <span>
                        {name}
                      </span>
                    </Link>
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }

    return null;
  }

  render() {
    const {
      opened
    } = this.props;

    return (
      <div className={opened ? 'show' : 'hide'}>
        {this.getSubListGroupComponent('EXTENDS', this.filter('augment'))}
        {this.getSubListGroupComponent('MIXES', this.filter('mix'))}
        {this.getSubListGroupComponent('STATIC PROPERTIES', this.filter('static-property'))}
        {this.getSubListGroupComponent('STATIC METHODS', this.filter('static-method'))}
        {this.getSubListGroupComponent('INSTANCE METHODS', this.filter('instance-method'))}
        {this.getSubListGroupComponent('EVENTS', this.filter('event'))}
      </div>
    );
  }
}

SubListGroups.propTypes = {
  selectedId: PropTypes.string,
  name: PropTypes.string,
  opened: PropTypes.bool,
  items: PropTypes.array
};

export default SubListGroups;
