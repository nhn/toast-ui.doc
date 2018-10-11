import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';

import Layout from '../components/layout';
import Tabs from '../components/Tabs';
import TabContent from '../components/TabContent';
import Iframe from '../components/Iframe';
import CodeBlock from '../components/CodeBlock';

import '../styles/main.scss';

/* global __PATH_PREFIX__*/
const pathPrefix = __PATH_PREFIX__;

class ExamplePage extends React.Component {
  render() {
    const {pathname, hash} = this.props.location;
    const {examplePageJson, file} = this.props.data;
    const {
      title,
      codeJs,
      codeHtml
    } = examplePageJson;

    const selectedNavItemId = `${pathname.replace('/', '')}${hash}`;

    return (
      <Layout
        tabIndex={1}
        selectedNavItemId={selectedNavItemId}
      >
        <header><h2 className="title">{title}</h2></header>
        <article>
          <Tabs>
            <TabContent
              name="Result"
              hasIframe={true}
            >
              <Iframe src={`${pathPrefix}/${file.relativePath}`} />
            </TabContent>
            {codeJs ?
              <TabContent name="JavaScript">
                <CodeBlock code={codeJs}/>
              </TabContent> : null}
            {codeHtml ?
              <TabContent name="HTML">
                <CodeBlock code={codeHtml}/>
              </TabContent> : null}
          </Tabs>
        </article>
      </Layout>
    );
  }
}

ExamplePage.propTypes = {
  data: PropTypes.shape({
    examplePageJson: PropTypes.object.isRequired,
    file: PropTypes.object.isRequired
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
    hash: PropTypes.string
  })
};

export default ExamplePage;

export const query = graphql`
  query($id: String!, $filename: String!) {
    # query for example page data
    examplePageJson(pid: {eq: $id}) {
      title
      codeJs
      codeHtml
    }

    # query for iframe src
    file(
      extension: {eq: "html"}
      name: {eq: $filename}
    ) {
      relativePath
    }
  }
`;
