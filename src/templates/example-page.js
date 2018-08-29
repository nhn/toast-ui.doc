import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/layout';

class ExamplePage extends React.Component {
  render() {
    const {
      pathname,
      hash
    } = this.props.location;

    const selectedId = `${pathname.replace('/', '')}${hash}`;

    return (
      <Layout
        tabIndex={1}
        selectedId={selectedId}
      />
    );
  }
}

ExamplePage.propTypes = {
  location: PropTypes.object
};

export default ExamplePage;
