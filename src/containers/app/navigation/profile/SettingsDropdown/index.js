import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import { ROUTE_LOGIN } from 'config/routes';
import { logoutUser as logoutUserAction } from 'actions/user';

const { Item } = Menu;

const StyledMenu = styled(Menu)`
  width: 118px;
  margin: 0 auto;
  background: #f7f7f7; 
  margin-top: 1px;
  padding: 10px 0;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.05);
  top: 6px;
`;

const StyledMenuItem = styled(Item)`
  width: 80%;
  margin: 0 auto;
  font-size: 12px;
  font-weight: 500;
  padding: 8px 0;
  text-align: center;
  &:hover {
    background: #f7f7f7;
  }
`;

const StyledMenuLabel = styled.div`
  font-size: 12px;
  line-height: 14px;
  margin-top: 15px;
  color: #404040;
`;

const SettingsDropdown = ({ logoutUser }) => {
  const history = useHistory();

  const onSignOut = (event) => {
    event.preventDefault();
    logoutUser();
    history.push(ROUTE_LOGIN);
  };

  const menu = (
    <StyledMenu>
      <StyledMenuItem>
        Account Profile
      </StyledMenuItem>
      <StyledMenuItem onClick={onSignOut} onKeyPress={onSignOut}>
        Sign Out
      </StyledMenuItem>
    </StyledMenu>
  );

  return (
    <Dropdown overlay={menu}>
      <StyledMenuLabel>
        Manage settings
        <DownOutlined />
      </StyledMenuLabel>
    </Dropdown>
  );
};

SettingsDropdown.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

const mapDispatch = (dispatch) => bindActionCreators({
  logoutUser: logoutUserAction,
}, dispatch);

export default connect(undefined, mapDispatch)(SettingsDropdown);
