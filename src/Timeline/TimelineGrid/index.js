import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';
import DateMark from './DateMark';
import TimelineItem from './TimelineItem';

const DAYS_IN_WEEK = 7; // Because who knows these days ¯\_(ツ)_/¯
const GRID_BUFFER = 4;

const StyledTimelineGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.numWeeks * DAYS_IN_WEEK + 1}, 1fr);
  grid-template-rows: repeat(auto-fit, 3rem);
  align-items: start;
  height: 100%;
  width: 100%;
  background: white;
`;
StyledTimelineGrid.displayName = 'StyledTimelineGrid';

StyledTimelineGrid.propTypes = {
  numWeeks: PropTypes.number.isRequired,
  zoomMultiplier: PropTypes.number.isRequired,
};

const TimelineGrid = React.memo(({ weeks, sortedDates, startDate, zoomMultiplier }) => {
  return (
    <StyledTimelineGrid numWeeks={weeks.length} zoomMultiplier={zoomMultiplier}>
      <>
        {weeks.map((week, index) => (
          // In this case, assuming the number of weeks is not dynamic index will be safe as a key
          <DateMark key={index} weekPosition={index}>
            {week.format('MMM D')}
          </DateMark>
        ))}
        {Object.keys(sortedDates).flatMap((row) =>
          sortedDates[row].map(({ start, end, id, name }) => {
            const dayjsStart = dayjs(start);
            const dayjsEnd = dayjs(end);

            const gridStartDiff = dayjsStart.diff(startDate, 'day') + GRID_BUFFER + 1;
            const gridDuration =
              (dayjsEnd.diff(dayjsStart, 'day') || 1) + Math.min(0, gridStartDiff - 1); // clamp [-Infinity, 0]
            const gridStart = Math.max(1, gridStartDiff); // clamp [1, Infinity]

            return (
              <TimelineItem
                key={id}
                gridDuration={gridDuration}
                gridStart={gridStart}
                name={name}
                row={parseInt(row)}
              />
            );
          })
        )}
      </>
    </StyledTimelineGrid>
  );
});
TimelineGrid.displayName = 'TimelineGrid';

TimelineGrid.propTypes = {
  weeks: PropTypes.arrayOf(PropTypes.instanceOf(dayjs)),
  sortedDates: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    )
  ),
  startDate: PropTypes.instanceOf(dayjs),
  zoomMultiplier: PropTypes.number.isRequired,
};

export default TimelineGrid;
