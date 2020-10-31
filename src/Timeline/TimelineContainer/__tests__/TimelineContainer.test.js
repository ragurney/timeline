import React from 'react';
import { shallow } from 'enzyme';

import TimelineContainer from '../';

describe('<TimelineContainer />', () => {
  it('renders', () => {
    const wrapper = shallow(<TimelineContainer />);

    expect(wrapper.find('div')).toHaveLength(1);
  });
});
