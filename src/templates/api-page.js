import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/layout';

class ApiPage extends React.Component {
  render() {
    const {
      pathname,
      hash
    } = this.props.location;

    const selectedId = `${pathname.replace('/', '')}${hash}`;

    return (
      <Layout
        tabIndex={0}
        selectedId={selectedId}
      />
    );
  }
}

ApiPage.propTypes = {
  location: PropTypes.object
};

export default ApiPage;
