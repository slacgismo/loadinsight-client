import styled from 'styled-components';

import colors from 'styles/colors';

export const StyledRepositoryItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 0.25fr 0.5fr;
  align-items: center;
  padding: 16px 25px;
  margin-bottom: 16px;
  background-color: ${colors.white};
`;

export const StyledRepositoryName = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.gray};
`;
