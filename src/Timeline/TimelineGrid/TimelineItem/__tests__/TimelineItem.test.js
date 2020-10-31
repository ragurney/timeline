import React from 'react';
import { shallow } from 'enzyme';
import dayjs from 'dayjs';

import TimelineItem from '../';

describe('<TimelineItem />', () => {
  const subject = (overrides = {}) => {
    const props = {
      gridStart: 1,
      start: dayjs('2020-10-31'),
      end: dayjs('2020-10-31'),
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
      expect(styledTimelineItem.prop('start')).toBe(1);
      expect(styledTimelineItem.prop('duration')).toBe(1);
      expect(styledTimelineItem.prop('row')).toBe(-2);
    });

    it('gives the correct duration value to StyledTimelineItem when the diff is not 0', () => {
      const wrapper = subject({ start: dayjs('2020-10-31'), end: dayjs('2020-10-33') });
      expect(wrapper.find('StyledTimelineItem').prop('duration')).toBe(2);
    });
  });

  describe('StyledItemName', () => {
    it('displays the name of the item', () => {
      const wrapper = subject();

      expect(wrapper.find('StyledItemName').childAt(0).text()).toBe('Halloween');
    });
  });
});
