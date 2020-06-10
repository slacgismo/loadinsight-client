import styled from 'styled-components';

import {
  ColorWhite,
  ColorLightGray,
  ColorBlack,
} from 'styles/colors';

export const StyledHeader = styled.div`
  width: 100%;
  height: 78px;
  background-color: ${ColorWhite};
  border-bottom: 1px solid ${ColorLightGray};
  padding: 22px 15px 0px 15px;
`;

export const StyledTitle = styled.div`
  display: inline-block;
  vertical-align: top;
  font-weight: 700;
  font-size: 28px;
  color: ${ColorBlack};
`;
