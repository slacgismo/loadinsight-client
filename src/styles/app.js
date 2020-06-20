import styled, { css } from 'styled-components';
import {
  Layout,
  Input,
  Checkbox,
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

export const StyledIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

export const StyledMenu = styled(Menu)`
  padding: 8px 10px;
  border: 1px solid ${colors.lightGray};
  border-radius: 3px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.05);
  width: 10
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

export const StyledMenuLabel = styled.div`
  color: ${({ color }) => (color in colors ? colors[color] : colors.black)};
  cursor: pointer;
  ${({ borderColor }) => (
    borderColor && `border: 1px solid ${(
      borderColor in colors ? colors[borderColor] : 'transparent'
    )};`
  )}
  border-radius: 3px;
  padding: 0 9px;
  display: inline-block;
}};
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
