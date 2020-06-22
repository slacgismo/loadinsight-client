import styled from 'styled-components';
import { Card, Menu, Dropdown } from 'antd';

import colors from 'styles/colors';

export const StyledDashboardsDropdown = styled(Dropdown)`
  position: absolute;
  right: 0;
  color: ${colors.gray};
  font-size: 18px;
  line-height: 21px;
  font-weight: 500;
  display: flex;
  align-items: center;
  cursor: pointer;
  &.anticon, .anticon:only-child {
    padding-top: 7px;
  }
  .anticon {
    margin-left: 8px;
  }
`;

export const StyledDashboardsMenu = styled(Menu)`
  padding: 8px 10px;
  border: 1px solid ${colors.lightGray};
  border-radius: 3px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.05);
`;

export const StyledDashboardsMenuItem = styled(Menu.Item)`
  padding: 8px 10px;
  margin: 0;
  text-align: right;
  background-color: transparent;
  ${({ color, size }) => (`
  &:hover {
    background-color: transparent;
    color: ${color in colors ? `${colors[color]};` : colors.blue};
  } 
  ${size === 'small' ? `
  font-size: 12px;
  line-height: 14px;
  font-weight: 400;
  ` : `
  font-size: 16px;
  line-height: 19px;
  font-weight: 500; 
  `}`)}
`;

export const StyledDashboardsHeader = styled.div`
  background-color: ${colors.gray};
  height: 105px;
  margin-bottom: 95px;
  padding: 20px 25px 0 20px;
  > div {
    position: relative;
  }
  h2 {
    margin-left: 16px;
  }
  .ant-popover-open {
    float: right;
    position: relative;
    top: -2px;
    .ant-popover {
      padding: 0;
    }
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.05);
    border: 1px solid ${colors.gray};
    border-radius: 3px;
    a {
      font-size: 12px;
      line-height: 14px;
      padding: 0 10px;
    }
  }
  .ant-popover-arrow {
    display: none;
  }
  .ant-popover-title {
    border: 0;
    padding: 12px 12px 0 20px;
    width: 474px;
  }
  .ant-popover-inner-content {
    padding: 12px 20px;
  }
  .ant-space {
    width: 100%;
  }
`;

export const StyledDashboardsSummaryCard = styled(Card)`
  position: relative;
  width: 227px;
  height: 107px;
  background-color: ${colors.oceanGreen};
  border: 0;
  border-radius: 6px;
  color: ${colors.white};
  font-size: 14px;
  line-height: 16px;
  h4 {
    text-transform: uppercase;
    margin-bottom: 16px;
  }
  .ant-card-body {
    padding: 24px 20px;
  }
  .ant-dropdown-trigger {
    color: ${colors.white};
    cursor: pointer;
    border: 1px solid ${colors.algaeGreen};
    border-radius: 3px;
    padding: 3px 9px;
    display: inline-flex;
    align-items: center;
    margin-top: -4px;
    .anticon {
      margin-left: 8px;
    }
  }
`;

export const StyledDashboardsGraphsGrid = styled.div`
  padding: 0 15px 0 10px;
`;

export const StyledDashboardsGraph = styled.div`
  min-height: 33vh;
  height: 20vw;
  background-color: ${colors.white};
  border-radius: 6px;
  padding: 16px 12px 16px 20px;
  margin: 20px 10px;
  display: flex;
  > div {
    position: relative;
    flex-basis: 100%;
  }
  h3 {
    padding: 9px 0 32px 0;
  }
`;

export const StyledLegendIcon = styled.div`
  width: 12px;
  height: 12px;
  margin-top: 3px;
  border-radius: 3px;
  background-color: ${({ serieColor }) => serieColor};
`;
