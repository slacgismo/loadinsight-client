import styled from 'styled-components';
import {
  Button, Card, Menu, Dropdown,
} from 'antd';

import colors from 'styles/colors';

export const StyledDashboardsButton = styled(Button)`
  width: 109px;
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

export const StyledDashboardsDropdown = styled(Dropdown)`
  position: absolute;
  right: 0;
`;

export const StyledDashboardsMenu = styled(Menu)`
  padding: 8px 10px;
  border: 1px solid ${colors.lightGray};
  border-radius: 3px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.05);
  .ant-menu-vertical {
    border-right: 0;
  }
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

export const StyledDashboardsMenuLabel = styled.div`
  cursor: pointer;
  color: ${colors.gray};
  font-size: 18px;
  line-height: 21px;
  font-weight: 500;
}};
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
`;

export const StyledDashboardsSummaryCard = styled(Card)`
  position: relative;
  width: 227px;
  height: 107px;
  background-color: ${colors.oceanGreen};
  border: 0;
  border-radius: 6px;
  color: ${colors.white};
  h4 {
    text-transform: uppercase;
    margin-bottom: 12px;
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
  padding: 16px 20px;
  margin: 20px 10px;
  > div {
    position: relative;
  }
  h3 {
    padding: 9px 0 25px 0;
  }
`;
