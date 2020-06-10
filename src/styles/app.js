import styled from 'styled-components';

import Colors from 'styles/colors';

export const StyledHeader = styled.div`
  width: 100%;
  height: 78px;
  background-color: ${Colors.White};
  border-bottom: 1px solid ${Colors.LightGray};
  padding: 22px 15px 0px 15px;
`;

export const StyledTitle = styled.div`
  display: inline-block;
  vertical-align: top;
  font-weight: 700;
  font-size: 28px;
  color: ${Colors.Black};
`;
