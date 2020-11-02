import React, { useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled, { css, keyframes } from 'styled-components';

import { COLOR_SCHEME_MAPPINGS } from '../../colors';
import { selectSelectedColorScheme } from '../../selectors';

const grow = keyframes`
  from {
    transform: scaleX(0)
  }

  to {
    transform: scaleX(1)
  }
`;

const animationMixin = css`
  animation: ${grow} 1s forwards;
`;

const StyledTimelineItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 100%;
  border-radius: 0.2rem;
  color: white;
  z-index: 2;
  grid-column: ${({ start }) => start} / span ${({ gridDuration }) => gridDuration};
  grid-row: ${({ row }) => row};
  background: ${({ backgroundColor }) => backgroundColor};
  overflow: hidden;
  margin: 0.5rem 0;
  ${({ alreadyAnimated }) => !alreadyAnimated && animationMixin};
  transform-origin: left;
`;
StyledTimelineItem.displayName = 'StyledTimelineItem';

const StyledItemName = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
StyledItemName.displayName = 'StyledItemName';

StyledTimelineItem.propTypes = {
  start: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
};

const TimelineItem = React.memo(({ gridDuration, gridStart, name, row }) => {
  const selectedColorScheme = useSelector(selectSelectedColorScheme);

  const alreadyAnimated = useRef(false);

  const backgroundColor = useMemo(
    () =>
      COLOR_SCHEME_MAPPINGS[selectedColorScheme][
        Math.floor(Math.random() * COLOR_SCHEME_MAPPINGS[selectedColorScheme].length)
      ],
    [selectedColorScheme]
  );

  useEffect(() => {
    alreadyAnimated.current = true;
  }, []);

  return (
    gridDuration > 0 && (
      <StyledTimelineItem
        alreadyAnimated={alreadyAnimated.current}
        backgroundColor={backgroundColor}
        gridDuration={gridDuration}
        start={gridStart}
        row={row + 1}
      >
        <StyledItemName>{name}</StyledItemName>
      </StyledTimelineItem>
    )
  );
});
TimelineItem.displayName = 'TimelineItem';

TimelineItem.propTypes = {
  gridDuration: PropTypes.number.isRequired,
  gridStart: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  row: PropTypes.number.isRequired,
};

export default TimelineItem;
