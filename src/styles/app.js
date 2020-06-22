import styled, { css } from 'styled-components';
import {
  Layout,
  Input,
  Checkbox,
  Menu,
  Table,
  Button,
} from 'antd';
import Icon from '@ant-design/icons';

import colors from 'styles/colors';

export const StyledLayout = styled(Layout)`
  height: 100vh;
  width: 100vw;
  .ant-dropdown-trigger {
    .anticon {
      margin-left: 8px;
    }
  }
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
  margin: 0;
`;

export const StyledTitle = styled.div`
  width: 100%;
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.lightGray};
  padding: 25px 15px 20px 15px;
  margin-bottom: ${(props) => (props.margin >= 0 ? props.margin : 30)}px;
  h1 {
    ${StyledTitleText}
    margin-right: 16px;
  }
  > div {
    position: relative;
    display: flex;
    align-items: center;
  }
`;

export const StyledH2 = styled.h2`
  color: ${(props) => (props.color in colors ? colors[props.color] : (props.color || colors.darkGray))};
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
`;

export const StyledH3 = styled.h3`
  font-size: 16px;
  line-height: 19px;
  color: ${colors.gray};
`;

export const StyledH4 = styled.h4`
  color: ${(props) => (props.color in colors ? colors[props.color] : (props.color || colors.darkGray))};
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
`;

export const StyledH5 = styled.div`
  color: ${colors.gray};
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
`;

export const StyledButton = styled(Button)`
  border: 0;
  padding: 8px 12px;
  height: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: none;
  .anticon {
    line-height: 0;
  }
  &.ant-btn-lg { 
    border-radius: 2px;
    font-size: 18px;
    line-height: 21px;
    font-weight: 500;
  }
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
  border-radius: 2px;
  &.ant-btn-sm {
    font-size: 12px;
    line-height: 14px;
    font-weight: 400;
    border-radius: 3px;
    padding: 5px 8px;
  }
  ${({ color }) => (`
  &, &:hover, &:focus {
    background-color: ${(color in colors ? colors[color] : 'transparent')};
  }
  &:hover, &:focus {
    color: ${(color in colors ? colors.white : colors.blue)};
  }
  &.ant-btn-sm, &.ant-btn-lg {
    background-color: ${(color in colors ? colors[color] : colors.black)};
    color: ${colors.white};
  }
  &.ant-btn-sm:hover, &.ant-btn-sm:focus {
    background-color: ${colors.blue};
  }
  `)}
`;

export const StyledInput = styled(Input)`
  width: auto;
  min-width: 280px;
  padding: 9px;
  background-color: ${colors.darkOverlay};
  border: 0;
  border-bottom: 1px solid transparent;
  &, &:hover:focus {
    color: ${colors.darkText};
  }
  &:hover, &:focus {
    box-shadow: none;
    border-bottom: 1px solid ${colors.lightBlue};
  }
  &:hover {
    &, &::placeholder {
      color: ${colors.lightBlue};
    }
  }
  &:focus:placeholder-shown::placeholder {
    color: ${colors.lightGray};
  }
  &::selection {
    background-color: ${colors.blue};
  }
  ${({ size }) => (size === 'large' ? `
  font-size: 18px;
  line-height: 21px;
  font-weight: 500;
  background-color: ${colors.overlay20};
  width: 360px;
  ` : `
  font-size: 12px;
  line-height: 14px;
  `)}
  ${({ shape }) => (shape === 'round' ? `
  background-color: ${colors.white};
  border: 1px solid ${colors.lightGray};
  font-size: 14px;
  line-height: 16px;
  &:hover, &:focus {
    border: 1px solid ${colors.lightBlue};
  }
  &::placeholder {
    color: ${colors.lightGray};
  }
  &:focus:placeholder-shown::placeholder {
    font-size: 0;
  }
` : `
  &::placeholder {
    color: ${colors.lightOverlay20};
  }
  `)}
`;

export const StyledCheckbox = styled(Checkbox)`
  font-size: 14px;
  line-height: 16px;
  color: ${colors.gray};
  &:hover {
    color: ${colors.blue};
  }
  .ant-checkbox-inner {
    border: 1px solid ${colors.gray};
    border-radius: 3px;
  }
`;

export const StyledIcon = styled(Icon)`
  position: absolute;
  top: 0;
  right: 0;
`;

export const StyledMenu = styled(Menu)`
  padding: 8px 10px;
  border: 1px solid ${colors.lightGray};
  border-radius: 3px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.05);
`;

export const CSSMenuItemSpan = css`
  display: inline-block;
  font-size: 12px;
  line-height: 14px;
  width: 100%;
  color: ${colors.gray};
  text-align: left;
  padding: 5px;
  height: auto;
  transition: none;
  border-radius: 3px;
  ${({ borderColor, hoverBgColor, hoverColor }) => (`
  &, &:hover, &:focus {
    border: 1px solid ${borderColor in colors ? colors[borderColor] : colors.lightBg};
  }
  &:hover, &:focus {
    background-color: ${hoverBgColor in colors ? colors[hoverBgColor] : colors.lightBg};
    color: ${hoverColor in colors ? colors[hoverColor] : colors.blue};
  }
  `)}
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
  span {
    ${CSSMenuItemSpan}
  }
`;

export const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    padding: 8px;
    color: ${colors.gray40};
    font-size: 13px;
    line-height: 18px;
    background-color: transparent;
    font-weight: 400;
  }
  .ant-table-tbody > tr > td {
    padding: 12px 8px;
    color: ${colors.black};
    font-size: 14px;
    line-height: 20px;
    font-weight: 300;
    background-color: ${colors.lightBg};
    border: 0;
  }
  ${({ alternateRowColors }) => (alternateRowColors ? (`
  .ant-table-tbody > tr:nth-child(2n) > td {
    background-color: ${colors.white};
  }
  .ant-table-tbody > tr {
    &:first-child > td {
      font-weight: 400;
      background-color: ${colors.lightGrey};
    }
  }
  `) : (`
  .ant-table-tbody > tr > td {
    padding: 4px 8px;
    border-bottom: 16px solid ${colors.white};
  }
  `))}
`;
