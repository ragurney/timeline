import React from 'react';
import { useSelector } from 'react-redux';
import { shallow } from 'enzyme';

import TimelineItem from '../';

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation((selector) => selector()),
}));

describe('<TimelineItem />', () => {
  beforeEach(() => {
    useSelector.mockImplementation(() => 'vivid');
  });

  const subject = (overrides = {}) => {
    const props = {
      gridDuration: 1,
      gridStart: 1,
      name: 'Halloween',
      row: 1,
      ...overrides,
    };

    return shallow(<TimelineItem {...props} />);
  };

  it('renders', () => {
    const wrapper = subject();

    expect(wrapper.find('StyledTimelineItem')).toHaveLength(1);
  });

  describe('StyledTimelineItem', () => {
    it('gives the correct values to the StyledTimelineItem', () => {
      const wrapper = subject();

      const styledTimelineItem = wrapper.find('StyledTimelineItem');
      expect(styledTimelineItem).toHaveLength(1);
      expect(styledTimelineItem.prop('alreadyAnimated')).toBe(false);
      expect(styledTimelineItem.prop('gridDuration')).toBe(1);
      expect(styledTimelineItem.prop('start')).toBe(1);
      expect(styledTimelineItem.prop('row')).toBe(2);
    });
  });

  describe('StyledItemName', () => {
    it('displays the name of the item', () => {
      const wrapper = subject();

      expect(wrapper.find('StyledItemName').childAt(0).text()).toBe('Halloween');
    });
  });
});
