import React from 'react';
import ListItem from '../../src/components/ListItem';
import ToggleButton from '../../src/components/ToggleButton';
import SubListGroups from '../../src/components/SubListGroups';

describe('ListItem component', () => {
  test('is created with name.', () => {
    const wrapper = shallow(
      <ListItem
        name="foo"
      />
    );

    expect(wrapper.find('a').text()).toBe('foo');
  });

  describe('when has no children,', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <ListItem
          name="foo"
        />
      );
    });

    test('has toggle button.', () => {
      expect(wrapper.find(ToggleButton)).toHaveLength(0);
    });

    test('has sublist group.', () => {
      expect(wrapper.find(SubListGroups)).toHaveLength(0);
    });
  });

  describe('when has children,', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <ListItem
          name="foo"
          childNodes={[{}]}
        />
      );
    });

    test('has toggle button.', () => {
      expect(wrapper.find(ToggleButton)).toHaveLength(1);
    });

    test('has sublist group.', () => {
      expect(wrapper.find(SubListGroups)).toHaveLength(1);
    });
  });
});
