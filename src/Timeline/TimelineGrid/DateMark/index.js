import PropTypes from 'prop-types';
import styled from 'styled-components';

const DateMark = styled.div`
  height: 2rem;
  width: 100%;
  background: white;
  text-align: center;
  align-self: end;
  position: relative;
  border-top: 1px solid #cee6f0;
  padding-top: 1rem;
  grid-row: -1;
  grid-column: ${(props) => props.weekPosition * 7 + 1} / span 8;

  &::before {
    content: '';
    position: absolute;
    bottom: 3rem;
    left: 50%;
    transform: translate(-50%, 0);
    height: 100vh;
    width: 1px;
    background: #cee6f0;
  }
`;
DateMark.displayName = 'DateMark';

DateMark.propTypes = {
  weekPosition: PropTypes.number.isRequired,
};

export default DateMark;
