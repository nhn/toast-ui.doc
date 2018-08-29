import React from 'react';
import Tabs from '../../src/components/Tabs';
import TabContent from '../../src/components/TabContent';

describe('Tabs component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Tabs>
        <TabContent name="foo title">
          <div>foo</div>
        </TabContent>
        <TabContent name="bar title">
          <div>bar</div>
        </TabContent>
      </Tabs>
    );
  });

  test('should have only one TabContent component.', () => {
    expect(wrapper.find(TabContent)).toHaveLength(1);
  });

  test('create tab-buttons as TabContent component count.', () => {
    expect(wrapper.find('button')).toHaveLength(2);

    wrapper = shallow(
      <Tabs>
        <TabContent name="foo title">
          <div>foo</div>
        </TabContent>
        <TabContent name="bar title">
          <div>bar</div>
        </TabContent>
        <TabContent name="baz title">
          <div>baz</div>
        </TabContent>
      </Tabs>
    );

    expect(wrapper.find('button')).toHaveLength(3);
  });

  test('set title of tab-button by TabContent name property.', () => {
    const buttons = wrapper.find('button');

    expect(buttons.at(0).text()).toBe('foo title');
    expect(buttons.at(1).text()).toBe('bar title');
  });

  describe('when tab-button is clicked,', () => {
    test('changing selected button.', () => {
      let buttons = wrapper.find('button');

      expect(buttons.at(0).hasClass('selected')).toBe(true);
      expect(buttons.at(1).hasClass('selected')).toBe(false);

      wrapper.find('button').at(1).simulate('click');
      buttons = wrapper.find('button');

      expect(buttons.at(0).hasClass('selected')).toBe(false);
      expect(buttons.at(1).hasClass('selected')).toBe(true);
    });

    test('only show tab-content of current tab-buttons index.', () => {
      expect(wrapper.find(TabContent).childAt(0).text()).toBe('foo');

      wrapper.find('button').at(1).simulate('click');

      expect(wrapper.find(TabContent).childAt(0).text()).toBe('bar');
    });
  });
});
