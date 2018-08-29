import React from 'react';
import Layout from '../../src/components/layout';

describe('Layout component', () => {
  test('render children.', () => {
    const wrapper = shallow(
      <Layout>
        <div className="foo" />
      </Layout>
    );

    expect(wrapper.contains(<div className="foo" />)).toEqual(true);
  });
});
