import React from 'react';
import { shallow } from 'enzyme';

import Timeline from '../';
import TimelineGrid from '../TimelineGrid';

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

  it('pases data to TimelineGrid', () => {
    const wrapper = subject();
    expect(wrapper.find(TimelineGrid).prop('data')).toEqual([
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
    ]);
  });
});
