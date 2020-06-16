import styled, { css } from 'styled-components';
import {
  Layout,
  Input,
  Button,
  Menu,
  Table,
} from 'antd';

import colors from 'styles/colors';

export const StyledLayout = styled(Layout)`
  height: 100vh;
  width: 100vw;
`;

export const StyledSider = styled(Layout.Sider)`
  border-right: 1px solid ${colors.lightGray};
`;

export const StyledContent = styled(Layout.Content)`
  height: 100vh;
  background-color: ${colors.lightBg};
`;

export const StyledSection = styled.section`
  background-color: ${colors.white};
  margin: 25px 36px 25px 25px;
  header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${colors.lightGray};
    padding: 12px 25px;
  }
  > div {
    padding: 40px 25px;
  }
`;

export const StyledTitleText = css`
  font-weight: 700;
  font-size: 28px;
  line-height: 33px;
  color: ${colors.black};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.lightGray};
  padding: 25px 15px 20px 15px;
  margin-bottom: ${(props) => props.margin >= 0 ? props.margin : 30}px;
  ${StyledTitleText}
`;

export const StyledH2 = styled.h2`
  color: ${(props) => (props.color in colors ? colors[props.color] : (props.color || colors.darkGray))};
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
`;

export const StyledH3 = styled.div`
  color: ${(props) => (props.color in colors ? colors[props.color] : (props.color || colors.darkGray))}
`;

export const StyledH4 = styled.h4`
  font-size: 16px;
  line-height: 19px;
  color: ${colors.gray};
`;

export const StyledH5 = styled.div`
  font-size: 16px;
  line-height: 19px;
  font-weight: 500;
`;

export const StyledButton = css`
  font-size: 18px;
  line-height: 21px;
  border: 0;
  border-radius: 2px;
  font-weight: 500;
  padding: 8px 12px;
  height: auto;
`;

export const StyledButtonGreen = css`
  ${StyledButton}
  &, &:hover, &:focus {
    background-color: ${colors.green};
    color: ${colors.white};
  }
`;

export const StyledButtonBlue = css`
  ${StyledButton}
  &, &:hover, &:focus {
    background-color: ${colors.lightBlue};
    color: ${colors.white};
  }
`;

export const StyledInput = styled(Input)`
  max-width: 370px;
  font-weight: 500;
  background-color: ${colors.lightBg};
  color: ${colors.darkText};
  &::placeholder {
    color: ${colors.lightGray};
  }
`;

export const StyledChevron = styled.span`
  font-weight: bold;
`;

export const StyledMenu = styled(Menu)`
  padding: 8px 10px;
  border: 1px solid ${colors.lightGray};
  border-radius: 3px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.05);
  .ant-menu-vertical {
    border-right: 0;
  }
  .ant-btn {
  font-size: 12px;
  line-height: 14px;
  }
`;

export const StyledMenuItem = styled(Menu.Item)`
  padding: 0;
  background-color: transparent;
  &:hover {
    background-color: transparent;
  }
  &:not(:last-child) {
    margin-bottom: 5px;
  }
`;

const MenuItemButton = css`
  width: 100%;
  color: ${colors.gray};
  text-align: left;
  padding: 5px;
  height: auto;
  &, &:hover, &:focus {
    border: 1px solid ${colors.lightBg};
  }
  &:hover, &:focus {
    background-color: ${colors.lightBg};
    color: ${colors.blue};
  }
`;

export const StyledMenuItemButton = styled(Button)`
  ${MenuItemButton}
`;

export const StyledMenuItemButtonRed = styled(Button)`
  ${MenuItemButton}
  &:hover, &:focus {
    background-color: ${colors.lightBg};
    color: ${colors.orangeRed};
  }
`;

export const StyledTable = styled(Table)`
  .ant-table-tbody > tr > td, .ant-table-thead > tr > th {
    padding: 8px;
    margin: 8px;
  }
  .ant-table-thead > tr > th {
    color: ${colors.gray40};
    font-size: 13px;
    line-height: 18px;
    background-color: transparent;
    font-weight: normal;
  }
  .ant-table-tbody > tr > td {
    color: black;
    font-weight: normal;
    background-color: ${colors.lightBg};
  }
  .ant-table-tbody > tr:nth-child(2n) > td {
    background-color: ${colors.white};
  } 
`;
