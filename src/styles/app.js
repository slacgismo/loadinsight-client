import styled, { css } from 'styled-components';
import {
  Layout,
  Input,
  Checkbox,
  Menu,
  Table,
  Button,
  Modal,
  Card,
  Dropdown,
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

export const StyledText = styled.span`
  width: 100%;
  ${({
    color, fontweight, indent, size, bordercolor, padding, margin, align,
  }) => (`
  ${color in colors ? (`
  color: ${colors[color]};
  `) : ''}
  ${fontweight ? (`
  font-weight: ${fontweight};
  `) : ''}
  ${indent ? (`
  text-indent: ${indent}px;
  `) : ''}
  ${size === 'large' ? (`
  font-size: 18px;
  line-height: 21px;
  `) : ''}
  ${size === 'middle' ? (`
  font-size: 16px;
  line-height: 19px;
  `) : ''}
  ${size === 'small' ? (`
  font-size: 12px;
  line-height: 14px;
  `) : ''}
  ${bordercolor ? (`
  border: 1px solid ${bordercolor in colors ? colors[bordercolor] : bordercolor};
  border-radius: 2px;
  `) : ''}
  ${padding ? (`
  padding: ${padding};
  `) : ''}
  ${margin ? (`
  margin: ${margin};
  `) : ''}
  ${align ? (`
  text-align: ${align};
  `) : ''}
  `)}
`;

export const StyledH2 = styled.h2`
  color: ${(props) => (props.color in colors ? colors[props.color] : (props.color || colors.darkGray))};
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
`;

export const StyledH3 = styled.h3`
  color: ${colors.gray};
  font-size: 16px;
  line-height: 19px;
  font-weight: 500;
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
  font-weight: 500;
  border-radius: 2px;
  &.ant-btn-sm {
    font-size: 12px;
    line-height: 14px;
    font-weight: 400;
    border-radius: 3px;
    padding: 5px 8px;
  }
  &.ant-btn[disabled], &.ant-btn[disabled]:hover, &.ant-btn[disabled]:focus {
    background-color: ${colors.lightGray};
    color: ${colors.white};
    cursor: default;
  }
  ${({
    type, color, width, height, hoverbgcolor,
  }) => (`
  ${type === 'text' ? (`
  color: ${colors.blue};
  &, &.ant-btn-sm, &.ant-btn-lg {
    padding: 0;
  }
  &:hover, &:focus {
    background-color: transparent;
  }
  `) : (`
  padding: 8px 12px;
  &.ant-btn-sm {
    padding: 5px 8px;
  }
  &, &:hover, &:focus {
    background-color: ${(color in colors ? colors[color] : 'transparent')};
    color: ${(color in colors ? colors.white : colors.blue)};
  }
  &:hover, &:focus {
    color: ${(color in colors ? colors.white : colors.blue)};
  }
  &.ant-btn-sm, &.ant-btn-lg {
    color: ${colors.white};
    ${color in colors ? (`
    background-color: ${colors[color]};
    ${hoverbgcolor in colors ? (`
    &:hover, &:focus {
      background-color: ${hoverbgcolor in colors ? colors[hoverbgcolor] : colors[color]};
    }
    `) : (`
    &:hover, &:focus {
      background-color: ${colors[color]};
    }
    `)}
    `) : (`
    background-color: ${colors.black};
    &:hover, &:focus {
      background-color: ${colors.blue};
    }
    `)}
  }
  `)}
  ${width ? (`
  width: ${width}px;
  `) : ''}
  ${height ? (`
  height: ${height}px;
  `) : ''}
  `)}
`;

export const StyledInput = styled(Input)`
  width: auto;
  min-width: 280px;
  padding: 10px; // TODO: test this out, it was 9px before
  background-color: ${colors.darkOverlay};
  &, &:hover:focus {
    color: ${colors.darkText};
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
  ${({
    size, shape, bgcolor, fontWeight,
  }) => (`
  ${size === 'large' ? (`
  font-size: 18px;
  line-height: 21px;
  font-weight: 500;
  background-color: ${colors.overlay20};
  width: 100%;
  `) : (`
  font-size: 12px;
  line-height: 14px;
  `)}
  ${(shape === 'round' ? (`
  background-color: ${colors.white};
  border: 1px solid ${colors.lightGray};
  font-size: 14px;
  line-height: 16px;
  &:hover, &:focus {
    border: 1px solid ${colors.lightBlue};
  }
  &::placeholder {
    color: ${colors.darkgray};
  }
  &:focus:placeholder-shown::placeholder {
    font-size: 0;
  }
  `) : (`
  ${bgcolor ? (`
  background-color: ${bgcolor};
  `) : ''}
  ${fontWeight ? (`
  font-weight: ${fontWeight};
  `) : ''}
  &::placeholder {
    color: ${colors.darkText};
  }
  border: 0;
  &:hover, &:focus {
    box-shadow: none;
  }
  `))}
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
  ${({ bordercolor, hoverbgcolor, hovercolor }) => (`
  &, &:hover, &:focus {
    border: 1px solid ${bordercolor in colors ? colors[bordercolor] : colors.lightBg};
  }
  &:hover, &:focus {
    background-color: ${hoverbgcolor in colors ? colors[hoverbgcolor] : colors.lightBg};
    color: ${hovercolor in colors ? colors[hovercolor] : colors.blue};
  }
  `)}
`;

export const StyledMenuItem = styled(Menu.Item)`
  padding: 0;
  background-color: transparent;
  &:hover {
    background-color: transparent;
  }
  span {
    ${CSSMenuItemSpan}
  }
  ${({ marginbottom }) => (`
  &:not(:last-child) {
    margin-bottom: ${marginbottom || 5}px;
  }
  `)}
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
      font-weight: 500;
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

export const StyledModal = styled(Modal)`
  min-width: 732px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  &.ant-modal {
    color: ${colors.darkText};
  }
  .ant-modal-header {
    padding: 16px 36px;
    border-bottom: 1px solid ${colors.lightGray};
  }
  .ant-modal-title {
    ${StyledTitleText}
  }
  h3 {
    color: ${colors.darkText};
    margin-bottom: 16px;
  }
  .ant-modal-body {
    display: flex;
    flex-direction: column;
    width: 732px;
    padding: 20px 36px 36px 36px;
    background-color: ${colors.lightBg};
    font-size: 14px;
    line-height: 16px;
  }
`;

export const StyledModalGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 58px;
  grid-row-gap: 25px;
`;

export const StyledModalCard = styled(Card)`
  text-align: center;
  height: ${({ height }) => (height > 0 ? height : 132)}px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 3px;
  margin: 0 -1px;
  img {
    margin-top: 25px;
  }
  button {
    border: 0;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    color: ${colors.darkText};
    font-size: 14px;
    line-height: 16px;
    &:hover, &:focus {
      border: 3px solid ${colors.blue};
      color: ${colors.blue}; // TODO: override antd's blue hover color in general
    }
    img {
      filter: grayscale(100%);
    }
    &:hover, &:active, &:focus {
      img {
        filter: none;
      }
    }
  }
  .ant-card-body {
    padding: 0;
    width: 100%;
    height: 100%;
  }
`;

export const StyledModalLabel = styled.div`
  font-weight: 500;
  position: absolute;
  top: 15px;
  left: 0;
  right: 100%;
  text-align: center;
  width: 100%;
`;

export const StyledDropdown = styled(Dropdown)`
  &.ant-dropdown-trigger {
    cursor: pointer;
    border-radius: 3px;
    padding: 3px 9px;
    display: inline-flex;
    align-items: center;
    margin-top: -4px;
    font-weight: 500;
    ${({ color, bordercolor }) => (`
    color: ${color in colors ? colors[color] : colors.darkText};
    border: 1px solid ${bordercolor in colors ? colors[bordercolor] : bordercolor};
    .anticon {
      margin-left: 8px;
      color: ${bordercolor in colors ? colors[bordercolor] : bordercolor};
    }
    `)}
  }
`;

export const StyledGrid = styled.div`
  display: grid;
  align-items: center;
  color: ${colors.darkText};
  ${({
    gridTemplateColumns, gridgap, padding, margin, width, bgcolor,
  }) => (`
  ${bgcolor ? (`
  background-color: ${bgcolor in colors ? colors[bgcolor] : bgcolor};
  `) : ''}
  width: ${width || '100%'};
  grid-template-columns: ${gridTemplateColumns || '1fr'};
  ${gridgap ? (`
  grid-gap: ${gridgap}px;
  `) : ''} 
  padding: ${padding || '16px 25px'};
  margin: ${margin || 0};
  `)}
`;
