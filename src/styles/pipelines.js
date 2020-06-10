import styled from 'styled-components';
import { Button } from 'antd';

import {
  ColorWhite,
  ColorDarkGray,
  ColorBlack,
  ColorBlue,
  ColorGreen,
} from 'styles/colors';

export const StyledPipelines = styled.div`
  margin-top: 30px;
`;

export const StyledPipelineItem = styled.div`
  position: relative;
  width: 100%;
  height: 72px;
  background-color: ${ColorWhite};
  margin-bottom: 15px;
`;

export const StyledPipelineName = styled.div`
  display: table-cell;
  vertical-align: middle;
  height: 72px;
  width: 450px;
  padding-left: 25px;
  font-size: 18px;
  font-weight: 500;
  color: ${ColorBlue};
`;

export const StyledPipelineLastUpdated = styled.div`
  display: table-cell;
  vertical-align: middle;
  height: 72px;
  padding-left: 25px;
  font-size: 14px;
  color: ${ColorDarkGray};
`;

export const StyledPipelineItemButton = styled(Button)`
  position: absolute;
  top: 18px;
  right: 25px;
  width: 133px;
  height: 36px;
  background-color: ${ColorGreen};
  border-radius: 2px;
  color: #fff;
  font-size: 18px;
  text-align: left;
  padding: 7px 0px 0px 10px;
  cursor: pointer;
`;

export const StyledPipelinesButton = styled(Button)`
  width: 98px;
  height: 24px;
  margin: 5px 0px 0px 10px;
  border: 0;
  border-radius: 3px;
  font-size: 12px;
  background-color: ${ColorBlack};
  &, &:hover, &:focus {
    color: #fff;
  }
  &:hover, &:focus {
    background-color: ${ColorBlue};
  }
`;
