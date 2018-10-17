import React from 'react';
import PropTypes from 'prop-types';
import {navigate} from 'gatsby';

import ToggleButton from '../components/ToggleButton';
import SubListGroups from '../components/SubListGroups';

/* global __PATH_PREFIX__*/
const pathPrefix = __PATH_PREFIX__;

class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: this.isSelected()
    };

    this.toggleItemState = this.toggleItemState.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(ev) {
    ev.preventDefault();

    if (!this.isSelected()) {
      navigate(`/${this.props.pid}`);
    } else {
      this.toggleItemState();
    }
  }

  toggleItemState() {
    this.setState((prevState) => ({
      opened: !prevState.opened
    }));
  }

  isSelected() {
    const {
      selectedId,
      pid
    } = this.props;

    return selectedId ? (selectedId.split('#').shift() === pid) : false;
  }

  render() {
    const {
      selectedId,
      pid,
      name,
      childNodes
    } = this.props;
    const {opened} = this.state;
    const hasChildNodes = !!(childNodes && childNodes.length);
    const selected = this.isSelected();

    return (
      <li>
        <p className={`nav-item${selected ? ' selected' : ''}`}>
          <a
            href={`${pathPrefix}/${pid}`}
            className="ellipsis"
            onClick={this.handleClick}
          >
            <span>
              {name}
            </span>
          </a>
          {hasChildNodes &&
            <ToggleButton
              hasChildNodes={hasChildNodes}
              opened={opened}
              handleClick={this.toggleItemState}
            />}
        </p>
        {hasChildNodes &&
          <SubListGroups
            selectedId={selectedId}
            hasChildNodes={hasChildNodes}
            opened={opened}
            items={childNodes}
          />}
      </li>
    );
  }
}

ListItem.propTypes = {
  selectedId: PropTypes.string,
  pid: PropTypes.string,
  name: PropTypes.string,
  childNodes: PropTypes.array
};

export default ListItem;
