import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import PropTypes from 'prop-types';

import { ROUTE_PIPELINES_NEW_REPOSITORIES } from 'config/routes';
import {
  StyledModal,
  StyledH3,
  StyledModalCard,
  StyledModalLabel,
  StyledModalGrid,
} from 'styles/app';
import CustomImg from '../images/custom.svg';
import DatabaseImg from '../images/database.svg';
import FileImg from '../images/file.svg';
import GridLabDImg from '../images/gridlabd.svg';
import PresetImg from '../images/preset.svg';
import HttpImg from '../images/http.svg';

function AddModal({ handleOk, handleCancel }) {
  const history = useHistory();

  const goToImportCustom = () => {
    history.push(ROUTE_PIPELINES_NEW_REPOSITORIES);
  };

  return (
    <StyledModal
      title="Add Pipelines"
      visible
      footer={null}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <StyledH3>Select a pipeline type</StyledH3>
      <StyledModalGrid>
        <StyledModalCard>
          <Button onClick={null}>
            <StyledModalLabel>File</StyledModalLabel>
            <img src={FileImg} alt="File" />
          </Button>
        </StyledModalCard>
        <StyledModalCard>
          <Button onClick={null}>
            <StyledModalLabel>http</StyledModalLabel>
            <img src={HttpImg} alt="Http" />
          </Button>
        </StyledModalCard>
        <StyledModalCard>
          <Button onClick={null}>
            <StyledModalLabel>Database</StyledModalLabel>
            <img src={DatabaseImg} alt="Database" />
          </Button>
        </StyledModalCard>
        <StyledModalCard>
          <Button onClick={goToImportCustom}>
            <StyledModalLabel>Preset Pipelines</StyledModalLabel>
            <img src={PresetImg} alt="Preset" />
          </Button>
        </StyledModalCard>
        <StyledModalCard>
          <Button onClick={goToImportCustom}>
            <StyledModalLabel>Import Custom Pipeline</StyledModalLabel>
            <img src={CustomImg} alt="Custom" />
          </Button>
        </StyledModalCard>
        <StyledModalCard>
          <Button onClick={null}>
            <StyledModalLabel>GridLabD</StyledModalLabel>
            <img src={GridLabDImg} alt="GridLAB-D" />
          </Button>
        </StyledModalCard>
      </StyledModalGrid>
    </StyledModal>
  );
}

AddModal.propTypes = {
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default AddModal;
