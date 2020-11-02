import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { IconButton } from '@zendeskgarden/react-buttons';
import { Tooltip } from '@zendeskgarden/react-tooltips';

import { ReactComponent as MaximizeIcon } from '@zendeskgarden/svg-icons/src/16/maximize-stroke.svg';
import { ReactComponent as MinimizeIcon } from '@zendeskgarden/svg-icons/src/16/minimize-stroke.svg';
import { ReactComponent as ResetIcon } from '@zendeskgarden/svg-icons/src/16/original-size-stroke.svg';
import { ReactComponent as GearIcon } from '@zendeskgarden/svg-icons/src/16/gear-stroke.svg';

import SettingsDrawer from './SettingsDrawer';

const StyledTimelineHeader = styled.div`
  display: flex;
  width: 100%;
  height: 5rem;
  align-items: center;
  justify-content: space-between;
  background-color: #f8f9f9;
  border-radius: 0 0 0.2rem 0.2rem;
  border: 1px solid #d8dcde;
  box-sizing: border-box;
  z-index: 3;
  padding: 0 2rem;
`;

const StyledButtonContainer = styled.div`
  padding: 0 0.5rem;
`;

const StyledZoomContainer = styled.div`
  display: flex;
`;

const TimelineHeader = React.memo(({ isAtZoomInLimit, isAtZoomOutLimit, setZoomMultiplier }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMaximizeOnClick = useCallback(
    () => !isAtZoomInLimit && setZoomMultiplier((prevValue) => prevValue + 1),
    [isAtZoomInLimit, setZoomMultiplier]
  );

  const handleMinimizeOnClick = useCallback(
    () => !isAtZoomOutLimit && setZoomMultiplier((prevValue) => prevValue - 1),
    [isAtZoomOutLimit, setZoomMultiplier]
  );

  const handleResetOnClick = useCallback(() => setZoomMultiplier(0), [setZoomMultiplier]);

  const handleOnOnSettingsDrawerOpen = useCallback(() => setIsDrawerOpen(true), [setIsDrawerOpen]);
  const handleOnSettingsDrawerClose = useCallback(() => setIsDrawerOpen(false), [setIsDrawerOpen]);

  const zoomInTooltipContent = 'Zoom in';
  const zoomOutTooltipContent = 'Zoom out';
  const resetToolipContent = 'Reset zoom';

  return (
    <>
      <StyledTimelineHeader>
        <StyledZoomContainer>
          <StyledButtonContainer>
            <Tooltip type="light" content={zoomInTooltipContent}>
              <IconButton
                aria-label="maximize"
                onClick={handleMaximizeOnClick}
                disabled={isAtZoomInLimit}
              >
                <MaximizeIcon />
              </IconButton>
            </Tooltip>
          </StyledButtonContainer>
          <StyledButtonContainer>
            <Tooltip type="light" content={zoomOutTooltipContent}>
              <IconButton
                aria-label="minimize"
                onClick={handleMinimizeOnClick}
                disabled={isAtZoomOutLimit}
              >
                <MinimizeIcon />
              </IconButton>
            </Tooltip>
          </StyledButtonContainer>
          <StyledButtonContainer>
            <Tooltip type="light" content={resetToolipContent}>
              <IconButton aria-label="reset-zoom" onClick={handleResetOnClick}>
                <ResetIcon />
              </IconButton>
            </Tooltip>
          </StyledButtonContainer>
        </StyledZoomContainer>
        <div>
          <IconButton aria-label="settings" onClick={handleOnOnSettingsDrawerOpen}>
            <GearIcon />
          </IconButton>
        </div>
      </StyledTimelineHeader>
      <SettingsDrawer isOpen={isDrawerOpen} onClose={handleOnSettingsDrawerClose} />
    </>
  );
});
TimelineHeader.displayName = 'TimelineHeader';

TimelineHeader.propTypes = {
  isAtZoomInLimit: PropTypes.bool.isRequired,
  isAtZoomOutLimit: PropTypes.bool.isRequired,
  setZoomMultiplier: PropTypes.func.isRequired,
};

export default TimelineHeader;
