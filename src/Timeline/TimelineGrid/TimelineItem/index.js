import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const COLORS = ['#1bbd22', '#35aef5', '#f41f52', '#f0a300'];

const StyledTimelineItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 100%;
  border-radius: 0.2rem;
  color: white;
  z-index: 2;
  grid-column: ${(props) => props.start} / span ${(props) => props.duration};
  grid-row: ${(props) => props.row};
  background: ${() => COLORS[Math.floor(Math.random() * COLORS.length)]};
  overflow: hidden;
  margin: 0.5rem 0;
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
  duration: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
};

const TimelineItem = React.memo(({ gridStart, start, end, name, row }) => {
  return (
    <StyledTimelineItem start={gridStart} duration={end.diff(start, 'day') || 1} row={-(row + 1)}>
      <StyledItemName>{name}</StyledItemName>
    </StyledTimelineItem>
  );
});
TimelineItem.displayName = 'TimelineItem';

TimelineItem.propTypes = {
  gridStart: PropTypes.number.isRequired,
  start: PropTypes.object.isRequired,
  end: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  row: PropTypes.number.isRequired,
};

export default TimelineItem;
