import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import Footer from '../components/Footer';
import LNB from '../components/LNB';
import Resizable from '../components/Resizable';

const LNB_WIDTH = 260;
const LNB_MIN_WIDTH = 212;

class Layout extends React.Component {
  constructor() {
    super();

    this.state = {
      width: LNB_WIDTH
    };

    this.handleMouseMove = this.changeWidth.bind(this);
  }

  changeWidth(ev) {
    ev.preventDefault(); // to prevent user-select's work

    this.setState({
      width: Math.max(ev.pageX, LNB_MIN_WIDTH)
    });
  }

  render() {
    const {
      tabIndex,
      selectedId,
      children
    } = this.props;
    const lnbWidth = this.state.width;

    return (
      <div className="wrapper">
        <Header />
        <main className="body">
          <LNB
            tabIndex={tabIndex}
            selectedId={selectedId}
            width={lnbWidth}
          />
          <section
            className="content"
            style={{paddingLeft: lnbWidth}}
          >
            {children}
          </section>
          <Resizable
            left={lnbWidth}
            handleMouseMove={this.handleMouseMove}
          />
        </main>
        <Footer />
      </div>
    );
  }
}

Layout.propTypes = {
  tabIndex: PropTypes.number,
  selectedId: PropTypes.string,
  children: PropTypes.object
};

export default Layout;
