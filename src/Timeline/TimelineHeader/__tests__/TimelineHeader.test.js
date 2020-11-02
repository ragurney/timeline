import React from 'react';
import { shallow } from 'enzyme';

import { IconButton } from '@zendeskgarden/react-buttons';
import { Tooltip } from '@zendeskgarden/react-tooltips';
import { ReactComponent as MaximizeIcon } from '@zendeskgarden/svg-icons/src/16/maximize-stroke.svg';
import { ReactComponent as MinimizeIcon } from '@zendeskgarden/svg-icons/src/16/minimize-stroke.svg';
import { ReactComponent as ResetIcon } from '@zendeskgarden/svg-icons/src/16/original-size-stroke.svg';

import TimelineHeader from '../';

const NOOP = () => {};

describe('<TimelineHeader />', () => {
  const subject = (overrides = {}) => {
    const props = {
      isAtZoomInLimit: false,
      isAtZoomOutLimit: false,
      setZoomMultiplier: NOOP,
      ...overrides,
    };

    return shallow(<TimelineHeader {...props} />);
  };

  it('renders three expected buttons', () => {
    const wrapper = subject();
    const iconButtons = wrapper.find(IconButton);

    expect(iconButtons).toHaveLength(3);

    const expectedIconButtonTypes = [MaximizeIcon, MinimizeIcon, ResetIcon];
    iconButtons.forEach((iconButton, index) => {
      expect(iconButton.find(expectedIconButtonTypes[index])).toHaveLength(1);
    });
  });

  it('renders expected number of tooltips', () => {
    const wrapper = subject();

    expect(wrapper.find(Tooltip)).toHaveLength(3);
  });

  describe('zoom in button', () => {
    it('increments the zoomMultiplier when clicked', () => {
      const mockSetZoomMultiplier = jest.fn();
      const wrapper = subject({ setZoomMultiplier: mockSetZoomMultiplier });

      wrapper.find(IconButton).first().simulate('click');

      expect(mockSetZoomMultiplier).toHaveBeenCalledTimes(1);

      const setZoomCallback = mockSetZoomMultiplier.mock.calls[0][0];

      expect(setZoomCallback(1)).toBe(2);
    });
  });

  describe('zoom out button', () => {
    it('decrements the zoomMultiplier when clicked', () => {
      const mockSetZoomMultiplier = jest.fn();
      const wrapper = subject({ setZoomMultiplier: mockSetZoomMultiplier });

      wrapper.find(IconButton).at(1).simulate('click');

      expect(mockSetZoomMultiplier).toHaveBeenCalledTimes(1);

      const setZoomCallback = mockSetZoomMultiplier.mock.calls[0][0];

      expect(setZoomCallback(1)).toBe(0);
    });
  });

  describe('zoom reset button', () => {
    it('resets the zoomMultiplier to 0 when clicked', () => {
      const mockSetZoomMultiplier = jest.fn();
      const wrapper = subject({ setZoomMultiplier: mockSetZoomMultiplier });

      wrapper.find(IconButton).at(2).simulate('click');

      expect(mockSetZoomMultiplier).toHaveBeenCalledTimes(1);
      expect(mockSetZoomMultiplier).toHaveBeenCalledWith(0);
    });
  });
});
