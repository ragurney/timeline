import React from 'react';
import { shallow } from 'enzyme';
import dayjs from 'dayjs';

import TimelineGrid from '../';

import DateMark from '../DateMark';
import TimelineItem from '../TimelineItem';

describe('<TimelineGrid>', () => {
  const mockSortedDates = {
    1: [
      {
        id: 1,
        start: '2018-01-01',
        end: '2018-01-05',
        name: 'First item',
      },
      {
        id: 2,
        start: '2018-01-02',
        end: '2018-01-08',
        name: 'Second item',
      },
    ],
    2: [
      {
        id: 3,
        start: '2018-01-06',
        end: '2018-01-13',
        name: 'Another item',
      },
    ],
  };

  const mockWeeks = [dayjs('2017-12-31'), dayjs('2018-01-07'), dayjs('2018-01-14')];

  const subject = (overrides = {}) => {
    const props = {
      weeks: mockWeeks,
      sortedDates: mockSortedDates,
      startDate: dayjs('2017-12-31'),
      zoomMultiplier: 0,
      ...overrides,
    };

    return shallow(<TimelineGrid {...props} />);
  };

  it('renders', () => {
    const wrapper = subject();
    expect(wrapper.find('StyledTimelineGrid')).toHaveLength(1);
  });

  it('passes the correct number of weeks to TimelineGrid', () => {
    const wrapper = subject();

    expect(wrapper.find('StyledTimelineGrid').prop('numWeeks')).toBe(3);
  });

  describe('DateMarks', () => {
    it('generates the correct number of DateMarks with expected props', () => {
      const wrapper = subject();
      const dateMarks = wrapper.find(DateMark);

      expect(dateMarks).toHaveLength(3);
      dateMarks.forEach((dateMark, index) => expect(dateMark.prop('weekPosition')).toBe(index));
    });

    it('shows each week in the correct format', () => {
      const wrapper = subject();

      const expectedWeeks = ['Dec 31', 'Jan 7', 'Jan 14'];

      wrapper
        .find(DateMark)
        .forEach((dateMarkWrapper, index) =>
          expect(dateMarkWrapper.childAt(0).text()).toBe(expectedWeeks[index])
        );
    });
  });

  describe('TimelineItems', () => {
    it('generates the correct number of TimelineItems with expected props', () => {
      const wrapper = subject();
      const timelineItems = wrapper.find(TimelineItem);

      const expectedGridStartValues = [6, 7, 11];
      const expectedGridDurationValues = [4, 6, 7];
      const expectedNameValues = ['First item', 'Second item', 'Another item'];
      const expectedRowValues = [1, 1, 2];

      expect(timelineItems).toHaveLength(3);
      timelineItems.forEach((timelineItem, index) => {
        expect(timelineItem.prop('gridStart')).toBe(expectedGridStartValues[index]);
        expect(timelineItem.prop('gridDuration')).toBe(expectedGridDurationValues[index]);
        expect(timelineItem.prop('name')).toBe(expectedNameValues[index]);
        expect(timelineItem.prop('row')).toBe(expectedRowValues[index]);
      });
    });
  });
});
