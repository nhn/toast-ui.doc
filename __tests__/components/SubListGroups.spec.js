import React from 'react';
import SubListGroups from '../../src/components/SubListGroups';

describe('SubListGroups component', () => {
  test('is hidden by default.', () => {
    const wrapper = shallow(<SubListGroups items={[{}]} />);

    expect(wrapper.find('.hide')).toHaveLength(1);
  });

  test('is shown.', () => {
    const wrapper = shallow(<SubListGroups items={[{}]} opened={true} />);

    expect(wrapper.find('.show')).toHaveLength(1);
  });

  describe('should create group', () => {
    const createWrapper = (kind) => {
      return shallow(
        <SubListGroups
          items={[
            {
              kind: kind,
              name: 'foo',
              url: ''
            }
          ]}
          opened={true}
        />
      );
    };
    let wrapper;

    test('when data has augment items.', () => {
      wrapper = createWrapper('augment');
      expect(wrapper.find('.title').text()).toBe('EXTENDS');
    });

    test('when data has mix items.', () => {
      wrapper = createWrapper('mix');
      expect(wrapper.find('.title').text()).toBe('MIXES');
    });

    test('when data has static propery items.', () => {
      wrapper = createWrapper('static-property');
      expect(wrapper.find('.title').text()).toBe('STATIC PROPERTIES');
    });

    test('when data has static method items.', () => {
      wrapper = createWrapper('static-method');
      expect(wrapper.find('.title').text()).toBe('STATIC METHODS');
    });

    test('when data has instance method items.', () => {
      wrapper = createWrapper('instance-method');
      expect(wrapper.find('.title').text()).toBe('INSTANCE METHODS');
    });

    test('when data has event items.', () => {
      wrapper = createWrapper('event');
      expect(wrapper.find('.title').text()).toBe('EVENTS');
    });
  });

  test('should create group as item data of different type.', () => {
    const wrapper = shallow(
      <SubListGroups
        items={[
          {
            kind: 'augment',
            name: 'foo',
            url: ''
          },
          {
            kind: 'instance-method',
            name: 'bar',
            url: ''
          },
          {
            kind: 'event',
            name: 'baz',
            url: ''
          }
        ]}
        opened={true}
      />
    );

    expect(wrapper.find('.subnav-group')).toHaveLength(3);
  });

  test('should create list as item data of same type.', () => {
    const wrapper = shallow(
      <SubListGroups
        items={[
          {
            kind: 'augment',
            name: 'foo',
            url: ''
          },
          {
            kind: 'augment',
            name: 'bar',
            url: ''
          },
          {
            kind: 'augment',
            name: 'baz',
            url: ''
          }
        ]}
        opened={true}
      />
    );

    expect(wrapper.find('li')).toHaveLength(3);
  });
});
