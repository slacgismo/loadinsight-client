import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Menu } from 'antd';

import {
  ROUTE_DASHBOARDS,
  ROUTE_PIPELINES,
  ROUTE_JOBS,
} from 'config/routes';
import colors from 'styles/colors';

const StyledMenu = styled(Menu)`
  padding: 23px 9px 0 0;
  &.ant-menu-vertical {
    border-right: 0;
    .ant-menu-item-selected {
      background-color: ${colors.black};
      color: ${colors.white};
      cursor: default;
    }
     > .ant-menu-item {
    margin: 0;
    height: auto;
    line-height: 47px;
  }
`;

const StyledMenuItem = styled(Menu.Item)`
  padding-left: 16px 13px; 
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  border-radius: 2px;
  &, &:hover {
    color: #404040;
  }
  &:hover {
    background-color: ${colors.lightGray};
  }
`;

const MainMenu = () => {
  const history = useHistory();
  const navigate = (path) => (() => history.push(path));
  const location = useLocation();
  const path = location.pathname;

  const selectedKeys = [];
  if (path.includes(ROUTE_DASHBOARDS)) selectedKeys.push('dashboards');
  if (path.includes(ROUTE_PIPELINES)) selectedKeys.push('pipelines');
  if (path.includes(ROUTE_JOBS)) selectedKeys.push('jobs');

  return (
    <StyledMenu selectedKeys={selectedKeys}>
      <StyledMenuItem key="dashboards" onClick={navigate(ROUTE_DASHBOARDS)}>Dashboards</StyledMenuItem>
      <StyledMenuItem key="pipelines" onClick={navigate(ROUTE_PIPELINES)}>Pipelines</StyledMenuItem>
      <StyledMenuItem key="jobs" onClick={navigate(ROUTE_JOBS)}>Jobs</StyledMenuItem>
    </StyledMenu>
  );
};

export default MainMenu;
