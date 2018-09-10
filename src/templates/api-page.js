import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';

import Layout from '../components/layout';
import Overview from '../components/Overview';
import MainCategory from '../components/MainCategory';
import PropertyItem from '../components/PropertyItem';
import FunctionItem from '../components/FunctionItem';

import '../styles/main.scss';

class ApiPage extends React.Component {
  render() {
    const {
      pathname,
      hash
    } = this.props.location;
    const {
      parentPid,
      title,
      items
    } = this.props.data.apiPageJson;

    const selectedNavItemId = `${pathname.replace('/', '')}${hash}`;

    const overview = items.filter(item => item.type === 'overview')[0];
    const staticProperies = items.filter(item => item.type === 'static-property');
    const staticMethods = items.filter(item => item.type === 'static-function');
    const instanceMethods = items.filter(item => item.type === 'instance-function');
    const events = items.filter(item => item.type === 'event');

    return (
      <Layout
        tabIndex={0}
        selectedNavItemId={selectedNavItemId}
      >
        <header>
          <h2 className="title">{title}</h2>
        </header>
        <article>
          <Overview
            data={overview}
            isClass={parentPid === 'class'}
          />
          {staticProperies.length ?
            <MainCategory title="Static Properties">
              {staticProperies.map((item, index) => (
                <PropertyItem
                  key={`static-method-${index}`}
                  isFirstItem={index === 0}
                  data={item}
                />
              ))}
            </MainCategory> : null}
          {staticMethods.length ?
            <MainCategory title="Static Methods">
              {staticMethods.map((item, index) => (
                <FunctionItem
                  key={`static-method-${index}`}
                  isFirstItem={index === 0}
                  data={item}
                />
              ))}
            </MainCategory> : null}
          {instanceMethods.length ?
            <MainCategory title="Instance Methods">
              {instanceMethods.map((item, index) => (
                <FunctionItem
                  key={`instance-method-${index}`}
                  isFirstItem={index === 0}
                  data={item}
                />
              ))}
            </MainCategory> : null}
          {events.length ?
            <MainCategory title="Events">
              {events.map((item, index) => (
                <FunctionItem
                  key={`event-${index}`}
                  isFirstItem={index === 0}
                  data={item}
                />
              ))}
            </MainCategory> : null}
        </article>
      </Layout>
    );
  }
}

ApiPage.propTypes = {
  data: PropTypes.shape({
    apiPageJson: PropTypes.object.isRequired
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
    hash: PropTypes.string
  })
};

export default ApiPage;

export const query = graphql`
  query($id: String!) {
    apiPageJson(pid: {eq: $id}) {
      pid
      parentPid
      title
      items {
        pid
        type
        override
        deprecated
        name
        types {
          prefix
          type
          names
        }
        description
        codeInfo {
          filename
          lineNum
          linkUrl
        }
        sees {
          url
          value
          description
        }
        todos
        augments
        params {
          name
          description
          defaultVal
          types {
            prefix
            type
            names
          }
          properties {
            name
            description
            defaultVal
            types {
              prefix
              type
              names
            }
            properties {
              name
              description
              defaultVal
              types {
                prefix
                type
                names
              }
              properties {
                name
                description
                defaultVal
                types {
                  prefix
                  type
                  names
                }
              }
            }
          }
        }
        examples {
          description
          code
        }
        returns {
          types {
            prefix
            type
            names
          }
          description
        }
      }
    }
  }
`;
