import React from 'react';
import PropTypes from 'prop-types';
import {StaticQuery, graphql} from 'gatsby';

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
      data,
      tabIndex,
      selectedNavItemId,
      children
    } = this.props;
    const {
      header,
      footer,
      useExample
    } = data;
    const lnbWidth = this.state.width;

    return (
      <div className="wrapper">
        <Header data={header} />
        <main
          className="body"
          style={{paddingLeft: lnbWidth}}
        >
          <LNB
            useExample={useExample}
            tabIndex={tabIndex}
            selectedNavItemId={selectedNavItemId}
            width={lnbWidth}
          />
          <section className="content">
            {children}
          </section>
          <Resizable
            left={lnbWidth}
            handleMouseMove={this.handleMouseMove}
          />
        </main>
        <Footer infoList={footer} />
      </div>
    );
  }
}

const LayoutWrapper = (props) => (
  <StaticQuery
    query={graphql`
      query {
        allLayoutJson {
          edges {
            node {
              header {
                logo {
                  src
                  linkUrl
                }
                title {
                  text
                  linkUrl
                }
                version
              }
              footer {
                title
                linkUrl
              }
              useExample
            }
          }
        }
      }
    `}
    render={data => <Layout data={data.allLayoutJson.edges[0].node} {...props} />}
  />
);

Layout.propTypes = {
  data: PropTypes.object,
  tabIndex: PropTypes.number,
  selectedNavItemId: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
};

export default LayoutWrapper;
