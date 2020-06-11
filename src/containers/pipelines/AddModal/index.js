import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Button } from 'antd';
import PropTypes from 'prop-types';

import { ROUTE_PIPELINES_NEW_REPOSITORIES } from 'config/routes';
import {
  StyledPipelineModal,
  StyledPipelineCard,
  StyledPipelineLabel,
  StyledPipelineGrid,
} from 'styles/pipelines';
import {
  StyledH5,
} from 'styles/app';
import CustomImg from '../images/custom.svg';
import DatabaseImg from '../images/database.svg';
import FileImg from '../images/file.svg';
import GridLabDImg from '../images/gridlabd.svg';
import PresetImg from '../images/preset.svg';
import HttpImg from '../images/http.svg';

function AddModal({ handleOk, handleCancel }) {
  const history = useHistory();

  const goToImportCustom = (event) => {
    history.push(ROUTE_PIPELINES_NEW_REPOSITORIES);
  }

  return (
    <StyledPipelineModal
      title="Add Pipelines"
      visible
      footer={null}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <StyledH5>Select a pipeline type</StyledH5>
      <StyledPipelineGrid>
        <StyledPipelineCard>
          <Button onClick={null}>
            <StyledPipelineLabel>File</StyledPipelineLabel>
            <img src={FileImg} alt="File" />
          </Button>
        </StyledPipelineCard>
        <StyledPipelineCard>
          <Button onClick={null}>
            <StyledPipelineLabel>http</StyledPipelineLabel>
            <img src={HttpImg} alt="Http" />
          </Button>
        </StyledPipelineCard>
        <StyledPipelineCard>
          <Button onClick={null}>
            <StyledPipelineLabel>Database</StyledPipelineLabel>
            <img src={DatabaseImg} alt="Database" />
          </Button>
        </StyledPipelineCard>
        <StyledPipelineCard>
          <Button onClick={goToImportCustom}>
            <StyledPipelineLabel>Preset Pipelines</StyledPipelineLabel>
            <img src={PresetImg} alt="Preset" />
          </Button>
        </StyledPipelineCard>
        <StyledPipelineCard>
          <Button onClick={goToImportCustom}>
            <StyledPipelineLabel>Import Custom Pipeline</StyledPipelineLabel>
            <img src={CustomImg} alt="Custom" />
          </Button>
        </StyledPipelineCard>
        <StyledPipelineCard>
          <Button onClick={null}>
            <StyledPipelineLabel>GridLabD</StyledPipelineLabel>
            <img src={GridLabDImg} alt="GridLAB-D" />
          </Button>
        </StyledPipelineCard>
      </StyledPipelineGrid>
    </StyledPipelineModal>
  );
}

AddModal.propTypes = {
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default AddModal;
