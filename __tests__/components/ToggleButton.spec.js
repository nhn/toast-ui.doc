import React from 'react';
import ToggleButton from '../../src/components/ToggleButton';

describe('ToggleButton component', () => {
  test('is created.', () => {
    const wrapper = shallow(
      <ToggleButton />
    );

    expect(wrapper.find('.btn-toggle')).toHaveLength(1);
  });

  test('is closed.', () => {
    const wrapper = shallow(
      <ToggleButton
        opened={false}
      />
    );

    expect(wrapper.find('.btn-toggle').hasClass('opened')).toBe(false);
  });

  test('is opened.', () => {
    const wrapper = shallow(
      <ToggleButton
        opened={true}
      />
    );

    expect(wrapper.find('.btn-toggle').hasClass('opened')).toBe(true);
  });

  test('simulates click events.', () => {
    const onButtonClick = jest.fn();
    const wrapper = shallow(
      <ToggleButton
        handleClick={onButtonClick}
      />
    );

    wrapper.find('button').simulate('click');

    expect(onButtonClick).toHaveBeenCalled();
  });
});
