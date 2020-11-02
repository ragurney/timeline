import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { shallow } from 'enzyme';
import { DrawerModal } from '@zendeskgarden/react-modals';
import { Tiles } from '@zendeskgarden/react-forms';

import SettingsDrawer from '../';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(() => () => {}),
  useSelector: jest.fn(() => ({})),
}));

const NOOP = () => {};

describe('<SettingsDrawer />', () => {
  const subject = (overrides = {}) => {
    const props = {
      isOpen: false,
      onClose: NOOP,
      ...overrides,
    };

    return shallow(<SettingsDrawer {...props} />);
  };

  beforeEach(() => {
    useSelector.mockImplementation(() => 'vivid');
    useDispatch.mockReset();
  });

  it('renders', () => {
    const wrapper = subject();
    expect(wrapper.find(DrawerModal)).toHaveLength(1);
  });

  describe('color schemes', () => {
    it('sets the correct initial value', () => {
      const wrapper = subject();

      expect(wrapper.find(Tiles).prop('value')).toBe('vivid');
    });

    it('renders the corect number of tiles with expected values and text', () => {
      const wrapper = subject();
      const tiles = wrapper.find('Styled(Tile)');

      expect(tiles).toHaveLength(6);

      const expectedTileValues = [
        { value: 'vivid', text: 'Vivid' },
        { value: 'greyscale', text: 'Greyscale' },
        { value: 'ocean', text: 'Ocean' },
        { value: 'spring', text: 'Spring' },
        { value: 'retro', text: 'Retro' },
        { value: 'pastel', text: 'Pastel' },
      ];

      tiles.forEach((tile, index) => {
        expect(tile.prop('value')).toBe(expectedTileValues[index].value);
        expect(tile.childAt(0).text()).toBe(expectedTileValues[index].text);
      });
    });

    it('updates the color scheme on tile select', () => {
      const mockDispatch = jest.fn();
      useDispatch.mockImplementation(() => mockDispatch);
      const wrapper = subject();

      wrapper.find(Tiles).prop('onChange')({ target: { value: 'greyscale' } });

      expect(mockDispatch).toHaveBeenCalledWith({
        payload: { selectedColorScheme: 'greyscale' },
        type: 'UPDATE_COLOR_SCHEME',
      });
    });
  });
});
