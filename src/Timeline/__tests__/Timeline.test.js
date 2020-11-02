import React from 'react';
import dayjs from 'dayjs';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';

import Timeline from '../';
import TimelineGrid from '../TimelineGrid';
import TimelineHeader from '../TimelineHeader';

jest.mock('../TimelineGrid', () => () => 'MockTimelineGrid');
jest.mock('../TimelineHeader', () => () => 'MockTimelineGrid');

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
    {
      id: 3,
      start: '2018-01-06',
      end: '2018-02-25',
      name: 'Another item',
    },
  ];

  const subject = (overrides = {}, useMount = false) => {
    const props = {
      data: mockData,
      ...overrides,
    };

    return useMount ? mount(<Timeline {...props} />) : shallow(<Timeline {...props} />);
  };

  it('renders', () => {
    const wrapper = subject();
    expect(wrapper.find('StyledTimeline')).toHaveLength(1);
  });

  describe('TimelineHeader', () => {
    it('renders a TimelineHeader', () => {
      const wrapper = subject();
      expect(wrapper.find(TimelineHeader)).toHaveLength(1);
    });

    it('passes the correct props to TimelineHeader', () => {
      const wrapper = subject();
      const timelineHeader = wrapper.find(TimelineHeader);

      expect(timelineHeader.prop('setZoomMultiplier')).toEqual(expect.any(Function));
      expect(timelineHeader.prop('isAtZoomInLimit')).toBe(false);
      expect(timelineHeader.prop('isAtZoomOutLimit')).toBe(false);
    });

    it('sets isAtZoomOut correctly', () => {
      const wrapper = subject({}, true);

      const setZoomMultiplier = wrapper.find(TimelineHeader).prop('setZoomMultiplier');

      act(() => setZoomMultiplier(-4));
      wrapper.update();
      expect(wrapper.find(TimelineHeader).prop('isAtZoomOutLimit')).toBe(false);

      act(() => setZoomMultiplier(-5));
      wrapper.update();
      expect(wrapper.find(TimelineHeader).prop('isAtZoomOutLimit')).toBe(true);
    });

    it('sets isAtZoomInLimit correctly', () => {
      const wrapper = subject({}, true);

      const setZoomMultiplier = wrapper.find(TimelineHeader).prop('setZoomMultiplier');

      act(() => setZoomMultiplier(3));
      wrapper.update();
      expect(wrapper.find(TimelineHeader).prop('isAtZoomInLimit')).toBe(false);

      act(() => setZoomMultiplier(4));
      wrapper.update();
      expect(wrapper.find(TimelineHeader).prop('isAtZoomInLimit')).toBe(true);
    });
  });

  describe('TimelineGrid', () => {
    it('renders a TimelineGrid', () => {
      const wrapper = subject();
      expect(wrapper.find(TimelineGrid)).toHaveLength(1);
    });

    it('passes the correct props', () => {
      const wrapper = subject();
      const timelineGrid = wrapper.find(TimelineGrid);

      expect(timelineGrid.prop('weeks')).toEqual([
        dayjs('2017-12-31'),
        dayjs('2018-01-07'),
        dayjs('2018-01-14'),
        dayjs('2018-01-21'),
        dayjs('2018-01-28'),
        dayjs('2018-02-04'),
        dayjs('2018-02-11'),
        dayjs('2018-02-18'),
        dayjs('2018-02-25'),
        dayjs('2018-03-04'),
      ]);
      expect(timelineGrid.prop('sortedDates')).toEqual({
        1: [
          { end: '2018-01-05', id: 1, name: 'First item', start: '2018-01-01' },
          { end: '2018-01-13', id: 3, name: 'Another item', start: '2018-01-06' },
        ],
        2: [{ end: '2018-01-08', id: 2, name: 'Second item', start: '2018-01-02' }],
        3: [{ end: '2018-02-25', id: 3, name: 'Another item', start: '2018-01-06' }],
      });
      expect(timelineGrid.prop('zoomMultiplier')).toBe(0);
    });
  });
});
