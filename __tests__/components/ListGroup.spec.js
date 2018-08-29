import React from 'react';
import ListGroup from '../../src/components/ListGroup';
import ListItem from '../../src/components/ListItem';

describe('ListGroup component', () => {
  test('is not rendered when has no children.', () => {
    let wrapper = shallow(
      <ListGroup
        items={[]}
      />
    );

    expect(wrapper.find('.nav-group')).toHaveLength(0);
  });

  test('has group title.', () => {
    let wrapper = shallow(
      <ListGroup
        items={[
          {node: 'foo'}
        ]}
      />
    );

    expect(wrapper.find('.title')).toHaveLength(0);

    wrapper = shallow(
      <ListGroup
        title="foo"
        items={[
          {node: 'foo'}
        ]}
      />
    );

    expect(wrapper.find('.title')).toHaveLength(1);
  });

  test('set title.', function() {
    const wrapper = shallow(
      <ListGroup
        title="bar"
        items={[
          {node: 'foo'}
        ]}
      />
    );

    expect(wrapper.find('.title').text()).toBe('bar');
  });

  test('render list of items.', () => {
    const wrapper = shallow(
      <ListGroup
        items={[
          {node: 'foo'},
          {node: 'bar'},
          {node: 'baz'}
        ]}
      />
    );

    expect(wrapper.find(ListItem)).toHaveLength(3);
  });
});
