import React from 'react';
import { shallow } from 'enzyme';

import Timeline from '../';
import TimelineGrid from '../TimelineGrid';
import DateMark from '../DateMark';

describe('<Timeline />', () => {
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

    return shallow(<Timeline {...props} />);
  };

  it('renders', () => {
    const wrapper = subject();
    expect(wrapper.find('StyledTimeline')).toHaveLength(1);
  });

  it('passes the correct number of weeks to TimelineGrid', () => {
    const wrapper = subject();

    expect(wrapper.find(TimelineGrid).prop('numDates')).toBe(3);
  });

  it('generates the correct number of DateMarks with expected props', () => {
    const wrapper = subject();

    expect(wrapper.find(DateMark)).toHaveLength(3);
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
