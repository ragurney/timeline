import React from 'react';
import { shallow } from 'enzyme';

import TimelineGrid from '../';

describe('<TimelineGrid>', () => {
  it('renders', () => {
    const wrapper = shallow(<TimelineGrid numDates={10} />);
    expect(wrapper.find('div')).toHaveLength(1);
  });
});
