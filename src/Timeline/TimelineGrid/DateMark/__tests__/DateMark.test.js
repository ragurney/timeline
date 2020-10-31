import React from 'react';
import { shallow } from 'enzyme';

import DateMark from '..';

describe('<DateMark />', () => {
  it('renders', () => {
    const wrapper = shallow(<DateMark weekPosition={0} />);

    expect(wrapper.find('div')).toHaveLength(1);
  });
});
