import styled from 'styled-components';
import { Button } from 'antd';

import colors from 'styles/colors';

export const StyledPipelines = styled.div`
  margin-top: 30px;
`;

export const StyledPipelinesButton = styled(Button)`
  width: 98px;
  height: 24px;
  padding: 0;
  margin-left: 16px;
  border: 0;
  border-radius: 3px;
  font-size: 12px;
  line-height: 14px;
  background-color: ${colors.black};
  &, &:hover, &:focus {
    color: ${colors.white};
  }
  &:hover, &:focus {
    background-color: ${colors.blue};
  }
`;

export const StyledPipelineItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 0.25fr 0.5fr;
  align-items: center;
  padding: 16px 25px;
  margin-bottom: 16px;
  background-color: ${colors.white};
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

export const StyledPipelineItemButton = styled(Button)`
  background-color: ${colors.green};
  font-size: 18px;
  line-height: 21px;
  border: 0;
  border-radius: 2px;
  color: ${colors.white};
`;
