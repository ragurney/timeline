import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';

import DateMark from './DateMark';

dayjs.extend(minMax);

const DAYS_IN_WEEK = 7; // Because who knows these days ¯\_(ツ)_/¯

const StyledTimelineGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.numDates * DAYS_IN_WEEK + 1}, 1fr);
  grid-template-rows: repeat(auto-fit, 2rem);
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

  return (
    <StyledTimelineGrid numDates={weeks.length}>
      {weeks.map((week, index) => (
        // In this case, assuming the number of weeks is not dynamic index will be safe as a key
        <DateMark key={index} weekPosition={index}>
          {week.format('MMM D')}
        </DateMark>
      ))}
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
