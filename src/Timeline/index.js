import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TimelineGrid from './TimelineGrid';
import TimelineContainer from './TimelineContainer';

const StyledTimeline = styled.div`
  font-family: Mulish, sans-serif;
  width: 100%;
  height: 100%;
`;
StyledTimeline.displayName = 'StyledTimeline';

const Timeline = React.memo(({ data }) => {
  return (
    <StyledTimeline>
      <TimelineContainer>
        <TimelineGrid data={data} />
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
