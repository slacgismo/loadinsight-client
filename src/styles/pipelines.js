import styled from 'styled-components';

import colors from 'styles/colors';

export const StyledPipelineItem = styled.div`
  display: grid;
  ${({ gridTemplateColumns, padding, margin }) => (`
  grid-template-columns: ${gridTemplateColumns || '1fr 1fr 0.25fr 0.5fr'};
  padding: ${padding || '16px 25px'};
  margin: ${margin || 0};
  `)}
  align-items: center;
  background-color: ${colors.white};
  font-size: 16px;
  line-height: 19px;
  color: ${colors.darkText};
`;

export const StyledPipelineName = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.blue};
`;

export const StyledPipelineLastUpdated = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.darkGray};
`;
