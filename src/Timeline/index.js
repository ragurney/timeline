import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './reducers';

import TimelineHeader from './TimelineHeader';
import TimelineGrid from './TimelineGrid';
import TimelineContainer from './TimelineContainer';

dayjs.extend(minMax);

const store = createStore(rootReducer);

const StyledTimeline = styled.div`
  font-family: Mulish, sans-serif;
  width: 100%;
  height: 100%;
`;
StyledTimeline.displayName = 'StyledTimeline';

const Timeline = React.memo(({ data }) => {
  const [zoomMultiplier, setZoomMultiplier] = useState(0);

  // Calculate first and last week of timeline date span
  const [minStartDate, maxEndDate, startDate, endDate] = useMemo(() => {
    const dates = data.flatMap((timelineItem) => [
      dayjs(timelineItem.start),
      dayjs(timelineItem.end),
    ]);

    const minStartDate = dayjs.min(...dates).startOf('week');
    const maxEndDate = dayjs
      .max(...dates)
      .add(1, 'week')
      .startOf('week');

    return [
      minStartDate,
      maxEndDate,
      minStartDate.add(zoomMultiplier, 'week'),
      maxEndDate.subtract(zoomMultiplier, 'week'),
    ];
  }, [data, zoomMultiplier]);

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
    <Provider store={store}>
      <StyledTimeline>
        <TimelineContainer>
          <TimelineHeader
            setZoomMultiplier={setZoomMultiplier}
            isAtZoomInLimit={
              endDate.subtract(1, 'week').diff(startDate.add(1, 'week'), 'weeks') <= 0
            }
            isAtZoomOutLimit={
              Math.max(minStartDate.diff(startDate, 'week'), maxEndDate.diff(endDate, 'week')) > 4
            }
          />
          <TimelineGrid
            weeks={weeks}
            sortedDates={sortedDates}
            startDate={startDate}
            zoomMultiplier={zoomMultiplier}
          />
        </TimelineContainer>
      </StyledTimeline>
    </Provider>
  );
});
Timeline.displayName = 'Timeline';

Timeline.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Timeline;
