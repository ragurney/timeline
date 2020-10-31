import PropTypes from 'prop-types';
import styled from 'styled-components';

const DAYS_IN_WEEK = 7; // Because who knows these days ¯\_(ツ)_/¯

const TimelineGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.numDates * DAYS_IN_WEEK + 1}, 1fr);
  grid-template-rows: repeat(auto-fit, 2rem);
  align-items: start;
  height: 100%;
  width: 100%;
  background: white;
  overflow: scroll;
`;
TimelineGrid.displayName = 'TimelineGrid';

TimelineGrid.propTypes = {
  numDates: PropTypes.number.isRequired,
};

export default TimelineGrid;
