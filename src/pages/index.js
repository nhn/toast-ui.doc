import React from 'react';
import Layout from '../components/layout';

import '../styles/main.scss';

class Index extends React.Component {
  render() {
    return (
      <Layout
        tabIndex={0}
        selectedId={''}
      />
    );
  }
}

export default Index;
