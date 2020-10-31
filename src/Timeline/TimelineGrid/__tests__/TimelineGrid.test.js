import React from 'react';
import { shallow } from 'enzyme';
import dayjs from 'dayjs';

import TimelineGrid from '../';

import DateMark from '../DateMark';
import TimelineItem from '../TimelineItem';

describe('<TimelineGrid>', () => {
  const mockData = [
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
    {
      id: 3,
      start: '2018-01-06',
      end: '2018-01-13',
      name: 'Another item',
    },
  ];

  const subject = (overrides = {}) => {
    const props = {
      data: mockData,
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

    expect(wrapper.find('StyledTimelineGrid').prop('numDates')).toBe(3);
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

      const expectedGridStartValues = [5, 10, 6];
      const expectedStartValues = [dayjs('2018-01-01'), dayjs('2018-01-06'), dayjs('2018-01-02')];
      const expectedEndValues = [dayjs('2018-01-05'), dayjs('2018-01-13'), dayjs('2018-01-08')];
      const expectedNameValues = ['First item', 'Another item', 'Second item'];
      const expectedRowValues = [1, 1, 2];

      expect(timelineItems).toHaveLength(3);
      timelineItems.forEach((timelineItem, index) => {
        expect(timelineItem.prop('gridStart')).toBe(expectedGridStartValues[index]);
        expect(timelineItem.prop('start')).toEqual(expectedStartValues[index]);
        expect(timelineItem.prop('end')).toEqual(expectedEndValues[index]);
        expect(timelineItem.prop('name')).toBe(expectedNameValues[index]);
        expect(timelineItem.prop('row')).toBe(expectedRowValues[index]);
      });
    });
  });
});
