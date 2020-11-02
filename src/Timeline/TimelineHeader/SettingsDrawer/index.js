import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { DrawerModal } from '@zendeskgarden/react-modals';
import { Row, Col } from '@zendeskgarden/react-grid';
import { Tiles } from '@zendeskgarden/react-forms';

import { updateColorScheme } from '../../actions';
import { COLOR_SCHEME_MAPPINGS } from '../../colors';
import { selectSelectedColorScheme } from '../../selectors';

const VIVID_VALUE = 'vivid';
const OCEAN_VALUE = 'ocean';
const RETRO_VALUE = 'retro';
const GREYSCALE_VALUE = 'greyscale';
const SPRING_VALUE = 'spring';
const PASTEL_VALUE = 'pastel';

const {
  [VIVID_VALUE]: VIVID_COLORS,
  [OCEAN_VALUE]: OCEAN_COLORS,
  [RETRO_VALUE]: RETRO_COLORS,
  [GREYSCALE_VALUE]: GREYSCALE_COLORS,
  [SPRING_VALUE]: SPRING_COLORS,
  [PASTEL_VALUE]: PASTEL_COLORS,
} = COLOR_SCHEME_MAPPINGS;

const StyledVividThemeTile = styled(Tiles.Tile)`
  -webkit-text-stroke-width: 0.2px;
  -webkit-text-stroke-color: white;
  margin-top: 1rem;
  background: repeating-linear-gradient(
    45deg,
    ${VIVID_COLORS.map(
      (color, index) => `${color} ${(index + 1) * 10}px, ${color} ${(index + 2) * 10}px`
    ).join(', ')}
  );
`;

const StyledOceanThemeTile = styled(Tiles.Tile)`
  -webkit-text-stroke-width: 0.2px;
  -webkit-text-stroke-color: white;
  margin-top: 1rem;
  background: repeating-linear-gradient(
    45deg,
    ${OCEAN_COLORS.map(
      (color, index) => `${color} ${(index + 1) * 10}px, ${color} ${(index + 2) * 10}px`
    ).join(', ')}
  );
`;

const StyledRetroThemeTile = styled(Tiles.Tile)`
  -webkit-text-stroke-width: 0.2px;
  -webkit-text-stroke-color: white;
  margin-top: 1rem;
  background: repeating-linear-gradient(
    45deg,
    ${RETRO_COLORS.map(
      (color, index) => `${color} ${(index + 1) * 10}px, ${color} ${(index + 2) * 10}px`
    ).join(', ')}
  );
`;

const StyledGreyscaleThemeTile = styled(Tiles.Tile)`
  -webkit-text-stroke-width: 0.2px;
  -webkit-text-stroke-color: white;
  margin-top: 1rem;
  background: repeating-linear-gradient(
    45deg,
    ${GREYSCALE_COLORS.map(
      (color, index) => `${color} ${(index + 1) * 10}px, ${color} ${(index + 2) * 10}px`
    ).join(', ')}
  );
`;

const StyledSpringThemeTile = styled(Tiles.Tile)`
  -webkit-text-stroke-width: 0.2px;
  -webkit-text-stroke-color: white;
  margin-top: 1rem;
  background: repeating-linear-gradient(
    45deg,
    ${SPRING_COLORS.map(
      (color, index) => `${color} ${(index + 1) * 10}px, ${color} ${(index + 2) * 10}px`
    ).join(', ')}
  );
`;

const StyledPastelThemeTile = styled(Tiles.Tile)`
  -webkit-text-stroke-width: 0.2px;
  -webkit-text-stroke-color: white;
  margin-top: 1rem;
  background: repeating-linear-gradient(
    45deg,
    ${PASTEL_COLORS.map(
      (color, index) => `${color} ${(index + 1) * 10}px, ${color} ${(index + 2) * 10}px`
    ).join(', ')}
  );
`;

const SettingsDrawer = React.memo(({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const selectedColorScheme = useSelector(selectSelectedColorScheme);

  const handleOnColorSchemeChange = useCallback(
    (e) => {
      dispatch(updateColorScheme(e.target.value));
    },
    [dispatch]
  );

  return (
    <DrawerModal isOpen={isOpen} onClose={onClose}>
      <DrawerModal.Header>Settings</DrawerModal.Header>
      <DrawerModal.Body>
        Color Scheme:
        <Tiles
          name="tiles"
          aria-label="color scheme options"
          onChange={handleOnColorSchemeChange}
          value={selectedColorScheme}
        >
          <Row>
            <Col sm={4}>
              <StyledVividThemeTile value={VIVID_VALUE}>
                <Tiles.Label>Vivid</Tiles.Label>
              </StyledVividThemeTile>
              <StyledGreyscaleThemeTile value={GREYSCALE_VALUE}>
                <Tiles.Label>Greyscale</Tiles.Label>
              </StyledGreyscaleThemeTile>
            </Col>
            <Col sm={4}>
              <StyledOceanThemeTile value={OCEAN_VALUE}>
                <Tiles.Label>Ocean</Tiles.Label>
              </StyledOceanThemeTile>
              <StyledSpringThemeTile value={SPRING_VALUE}>
                <Tiles.Label>Spring</Tiles.Label>
              </StyledSpringThemeTile>
            </Col>
            <Col sm={4}>
              <StyledRetroThemeTile value={RETRO_VALUE}>
                <Tiles.Label>Retro</Tiles.Label>
              </StyledRetroThemeTile>
              <StyledPastelThemeTile value={PASTEL_VALUE}>
                <Tiles.Label>Pastel</Tiles.Label>
              </StyledPastelThemeTile>
            </Col>
          </Row>
        </Tiles>
      </DrawerModal.Body>
      <DrawerModal.Close />
    </DrawerModal>
  );
});
SettingsDrawer.displayName = 'SettingsDrawer';

SettingsDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SettingsDrawer;
