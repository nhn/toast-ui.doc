import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'gatsby';

import ToggleButton from '../components/ToggleButton';
import SubListGroups from '../components/SubListGroups';

class ListItem extends React.Component {
  constructor() {
    super();

    this.state = {
      opened: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({
      opened: !prevState.opened
    }));
  }

  isSelected() {
    const {
      selectedId,
      pid
    } = this.props;

    return selectedId ? selectedId.split('#')[0] === pid : false;
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
    const isOpened = opened || selected;

    return (
      <li>
        <p className={`nav-item ellipsis${selected ? ' selected' : ''}`}>
          <Link to={`/${pid}`}>{name}</Link>
          {hasChildNodes &&
            <ToggleButton
              hasChildNodes={hasChildNodes}
              opened={isOpened}
              handleClick={this.handleClick}
            />}
        </p>
        {hasChildNodes &&
          <SubListGroups
            selectedId={selectedId}
            hasChildNodes={hasChildNodes}
            opened={isOpened}
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
