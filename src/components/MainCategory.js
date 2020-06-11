import React from 'react';
import PropTypes from 'prop-types';

class MainCategory extends React.Component {
  render() {
    const { title, children } = this.props;

    return (
      <div className="subsection main-category">
        <h3 className="title">{title}</h3>
        {children}
      </div>
    );
  }
}

MainCategory.propTypes = {
  title: PropTypes.string,
  children: PropTypes.array
};

export default MainCategory;
