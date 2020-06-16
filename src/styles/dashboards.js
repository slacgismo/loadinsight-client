import styled from 'styled-components';
import { Card, Space } from 'antd';

import colors from 'styles/colors';
import React from "react";

export const StyledDashboardHeader = styled.div`
  background-color: ${colors.gray};
  height: 105px;
  margin-bottom: 95px;
  h2 {
    padding: 20px 0 0 36px;
  }
`;

export const StyledDashboardSummaryCard = styled(Card)`
  width: 227px;
  height: 107px;
  background-color: ${colors.oceanGreen};
  border: 0;
  border-radius: 6px;
  color: ${colors.white};
`;

export const StyledDashboardGraph = styled.div`
  height: 300px;
  background-color: ${colors.white};
  border-radius: 6px;
  padding: 25px 20px;
  width: calc(100% - 40px);
  margin: 0 20px;
`;

export const StyledDashboardGraphSpace = styled(Space)`
  width: 100%;
`;