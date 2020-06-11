import React from 'react';
import { Layout } from '../../src/components/layout';

describe('Layout component', () => {
  test('render children.', () => {
    const wrapper = shallow(
      <Layout
        data={{
          header: {},
          footer: [],
          useExample: true
        }}
      >
        <div className="foo" />
      </Layout>
    );

    expect(wrapper.contains(<div className="foo" />)).toEqual(true);
  });
});
