import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Table, Space } from 'antd';

import { ROUTE_PIPELINES } from 'config/routes';
import {
  getCustomPipeline as getCustomPipelineAction,
  addPipeline as addPipelineAction,
} from 'actions/pipelines';
import {
  StyledTitle, StyledSection, StyledInput, StyledH5,
} from 'styles/app';
import { StyledCustomPipelineImportButton } from 'styles/pipelines';

function ImportCustom({ getCustomPipeline, addPipeline, pipelineNewImport = {} }) {
  const history = useHistory();

  useEffect(() => {
    getCustomPipeline();
  }, [getCustomPipeline]);

  const { inputs = [], outputs = [], load_profile: loadProfile = [] } = pipelineNewImport;

  const [pipelineNewImportName, setPipelineNewImportName] = useState('PG&E Load Profile Pipeline');

  const inputsColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Parameter',
      dataIndex: 'parameter',
      key: 'parameter',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  const outputsColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Field',
      dataIndex: 'field',
      key: 'field',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  const loadProfileColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Field',
      dataIndex: 'field',
      key: 'field',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  const addNewPipelineImport = () => {
    addPipeline({
      name: pipelineNewImportName,
      ...pipelineNewImport,
    });
    history.push(ROUTE_PIPELINES);
  };

  inputs.forEach((input, i) => {
    inputs[i].key = input.name;
  });
  outputs.forEach((output, i) => {
    outputs[i].key = output.name;
  });
  loadProfile.forEach((profile, i) => {
    loadProfile[i].key = profile.name;
  });

  return (
    <>
      <StyledTitle>
        Import Custom Pipeline
      </StyledTitle>
      <StyledSection>
        <header>
          <StyledInput
            type="text"
            defaultValue={pipelineNewImportName}
            onChange={(event) => setPipelineNewImportName(event.target.value)}
          />
          <StyledCustomPipelineImportButton onClick={addNewPipelineImport}>
            Import Pipeline
          </StyledCustomPipelineImportButton>
        </header>
        <Space direction="vertical" size={56}>
          <div>
            <StyledH5>
              THIS PIPELINE HAS
              {inputs.length}
              &nbsp;
              INPUT PARAMETERS
            </StyledH5>
            <Table
              columns={inputsColumns}
              dataSource={inputs}
              pagination={false}
            />
          </div>
          <div>
            <StyledH5>
              THIS PIPELINE HAS
              {outputs.length}
              &nbsp;
              OUTPUTS
            </StyledH5>
            <Table
              columns={outputsColumns}
              dataSource={outputs}
              pagination={false}
            />
          </div>
          <div>
            <StyledH5>LOAD PROFILE BY TARRIF</StyledH5>
            <Table
              columns={loadProfileColumns}
              dataSource={loadProfile}
              pagination={false}
            />
          </div>
        </Space>
      </StyledSection>
    </>
  );
}

ImportCustom.propTypes = {
  getCustomPipeline: PropTypes.func.isRequired,
  addPipeline: PropTypes.func.isRequired,
  pipelineNewImport: PropTypes.shape({
    inputs: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      parameter: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })),
    outputs: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      field: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })),
    load_profile: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      field: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  pipelineNewImport: state.pipelines.pipelineNewImport,
});

const mapDispatch = (dispatch) => bindActionCreators({
  getCustomPipeline: getCustomPipelineAction,
  addPipeline: addPipelineAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatch)(ImportCustom);
