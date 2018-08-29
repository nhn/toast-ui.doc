import React from 'react';
import PropTypes from 'prop-types';

import SearchBar from '../components/SearchBar';
import Tabs from '../components/Tabs';
import TabContent from '../components/TabContent';
import ApiNavigation from '../components/ApiNavigation';
import ExampleNavigation from '../components/ExampleNavigation';

class LNB extends React.Component {
  render() {
    const {
      tabIndex,
      selectedId,
      width
    } = this.props;

    return (
      <aside
        className="lnb"
        style={{width}}
      >
        <SearchBar />
        <Tabs tabIndex={tabIndex}>
          <TabContent name="API">
            <ApiNavigation
              selectedId={selectedId}
            />
          </TabContent>
          <TabContent name="Examples">
            <ExampleNavigation
              selectedId={selectedId}
            />
          </TabContent>
        </Tabs>
      </aside>
    );
  }
}

LNB.propTypes = {
  tabIndex: PropTypes.number,
  selectedId: PropTypes.string,
  width: PropTypes.number
};

export default LNB;
