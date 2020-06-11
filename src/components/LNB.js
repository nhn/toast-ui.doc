import React from 'react';
import PropTypes from 'prop-types';

import SearchBar from '../components/SearchBar';
import Tabs from '../components/Tabs';
import TabContent from '../components/TabContent';
import ApiNavigation from '../components/ApiNavigation';
import ExampleNavigation from '../components/ExampleNavigation';

class LNB extends React.Component {
  render() {
    const { useExample, tabIndex, selectedNavItemId, width } = this.props;

    return (
      <aside className="lnb" style={{ width }}>
        <SearchBar />
        {useExample ? (
          <Tabs tabIndex={tabIndex}>
            <TabContent name="API">
              <ApiNavigation selectedId={selectedNavItemId} />
            </TabContent>
            <TabContent name="Examples">
              <ExampleNavigation selectedId={selectedNavItemId} />
            </TabContent>
          </Tabs>
        ) : (
          <ApiNavigation selectedId={selectedNavItemId} />
        )}
      </aside>
    );
  }
}

LNB.propTypes = {
  useExample: PropTypes.bool,
  tabIndex: PropTypes.number,
  selectedNavItemId: PropTypes.string,
  width: PropTypes.number
};

export default LNB;
