import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import styled from 'styled-components';

import TimelineGrid from './TimelineGrid';
import TimelineContainer from './TimelineContainer';
import DateMark from './DateMark';

dayjs.extend(minMax);

const StyledTimeline = styled.div`
  font-family: Mulish, sans-serif;
  width: 100%;
  height: 100%;
`;
StyledTimeline.displayName = 'StyledTimeline';

const Timeline = React.memo(({ data }) => {
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
    <StyledTimeline>
      <TimelineContainer>
        <TimelineGrid numDates={weeks.length}>
          {weeks.map((week, index) => (
            // In this case, assuming the number of weeks is not dynamic index will be safe as a key
            <DateMark key={index} weekPosition={index}>
              {week.format('MMM D')}
            </DateMark>
          ))}
        </TimelineGrid>
      </TimelineContainer>
    </StyledTimeline>
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
