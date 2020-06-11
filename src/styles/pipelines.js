import styled from 'styled-components';
import { Button, Modal, Card } from 'antd';

import { StyledTitleText, StyledButtonGreen, StyledButtonBlue } from 'styles/app';
import colors from 'styles/colors';

export const StyledPipelinesButton = styled(Button)`
  width: 98px;
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

export const StyledPipelineItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 0.25fr 0.5fr;
  align-items: center;
  padding: 16px 25px;
  margin-bottom: 16px;
  background-color: ${colors.white};
`;

export const StyledPipelineName = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.blue};
`;

export const StyledPipelineLastUpdated = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.darkGray};
`;

export const StyledPipelineItemButton = styled(Button)`
  ${StyledButtonGreen}
`;

export const StyledPipelineGrid = styled.div`
  margin: 15px 0 15px 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 58px;
  grid-row-gap: 25px;
`;

export const StyledPipelineModal = styled(Modal)`
  min-width: 732px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  .ant-modal-header {
    padding: 16px 36px;
    border-bottom: 1px solid ${colors.lightGray};
  }
  .ant-modal-title {
    ${StyledTitleText}
  }
  .ant-modal-body {
    width: 732px;
    padding: 18px 37px;
    background-color: ${colors.lightBg};
  }
`;

export const StyledPipelineCard = styled(Card)`
  text-align: center;
  height: 132px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 3px;
  img {
    margin-top: 25px;
  }
  button {
    border: 0;
    width: 100%;
    height: 100%;
    border 3px solid transparent;
    &:hover, &:focus {
      border: 3px solid ${colors.blue};
      color: ${colors.blue}; // TODO: override antd's blue hover color in general
    }
  }
  .ant-card-body {
    padding: 0;
    width: 100%;
    height: 100%;
  }
`;

export const StyledPipelineLabel = styled.div`
  font-weight: 500;
  position: absolute;
  top: 15px;
  left: 0;
  right: 100%;
  text-align: center;
  width: 100%;
`;

export const StyledCustomPipelineImportButton = styled(Button)`
  ${StyledButtonBlue}
`;
