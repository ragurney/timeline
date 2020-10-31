import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';

import DateMark from './DateMark';
import TimelineItem from './TimelineItem';

dayjs.extend(minMax);

const DAYS_IN_WEEK = 7; // Because who knows these days ¯\_(ツ)_/¯
const GRID_BUFFER = 4;

const StyledTimelineGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.numDates * DAYS_IN_WEEK + 1}, 1fr);
  grid-template-rows: repeat(auto-fit, 3rem);
  align-items: start;
  height: 100%;
  width: 100%;
  background: white;
  overflow: scroll;
`;
StyledTimelineGrid.displayName = 'StyledTimelineGrid';

StyledTimelineGrid.propTypes = {
  numDates: PropTypes.number.isRequired,
};

const TimelineGrid = React.memo(({ data }) => {
  // Calculate first and last week of timeline date span
  const [startDate, endDate] = useMemo(() => {
    const dates = data.flatMap((timelineItem) => [
      dayjs(timelineItem.start),
      dayjs(timelineItem.end),
    ]);

    return [
      dayjs.min(...dates).startOf('week'),
      dayjs
        .max(...dates)
        .add(1, 'week')
        .startOf('week'),
    ];
  }, [data]);

  // Get each week included in the timeline date span
  const weeks = useMemo(
    () =>
      Array(endDate.diff(startDate, 'weeks'))
        .fill(0)
        .reduce(
          (weekCollection) => {
            weekCollection.push(weekCollection.slice(-1)[0].add(1, 'week'));
            return weekCollection;
          },
          [startDate]
        ),
    [endDate, startDate]
  );

  // Map timeline events to the correct grid row
  const sortedDates = useMemo(
    () =>
      data
        .sort((a, b) => a.start - b.start)
        .reduce((gridRowHash, date) => {
          const gridRows = Object.keys(gridRowHash);

          const gridRowToPlace =
            gridRows.find((gridRow) => gridRowHash[gridRow].slice(-1)[0].end <= date.start) ||
            gridRows.length + 1;

          gridRowHash[gridRowToPlace]
            ? gridRowHash[gridRowToPlace].push(date)
            : (gridRowHash[gridRowToPlace] = [date]);

          return gridRowHash;
        }, {}),
    [data]
  );

  return (
    <StyledTimelineGrid numDates={weeks.length}>
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

            const gridStart = dayjsStart.diff(startDate, 'day') + GRID_BUFFER;
            return (
              <TimelineItem
                key={id}
                gridStart={gridStart}
                start={dayjsStart}
                end={dayjsEnd}
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
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TimelineGrid;
