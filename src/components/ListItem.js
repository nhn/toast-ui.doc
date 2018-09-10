import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'gatsby';

import ToggleButton from '../components/ToggleButton';
import SubListGroups from '../components/SubListGroups';

class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: this.isSelected()
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
        <p className={`nav-item ellipsis${selected ? ' selected' : ''}`}>
          <Link to={`/${pid}`}>{name}</Link>
          {hasChildNodes &&
            <ToggleButton
              hasChildNodes={hasChildNodes}
              opened={opened}
              handleClick={this.handleClick}
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
