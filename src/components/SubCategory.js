import React from 'react';
import PropTypes from 'prop-types';

import NormalTypeList from '../components/NormalTypeList';
import MixedTypeList from '../components/MixedTypeList';

class SubCategory extends React.Component {
  getListComponent() {
    const {
      listType,
      items
    } = this.props;

    let component;

    if (listType === 'normal') {
      component = (<NormalTypeList items={items} />);
    } else {
      component = (<MixedTypeList items={items} />);
    }

    return component;
  }

  render() {
    return (
      <div className="subsection">
        <h5 className="title">{this.props.title}</h5>
        {this.getListComponent()}
      </div>
    );
  }
}

SubCategory.propTypes = {
  title: PropTypes.string,
  listType: PropTypes.string,
  items: PropTypes.array
};

export default SubCategory;
