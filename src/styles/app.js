import styled, { css } from 'styled-components';
import { Layout, Input } from 'antd';

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
  margin-bottom: 30px;
  ${StyledTitleText}
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
  font-weight: bold;
  padding: 8px;
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
`;
