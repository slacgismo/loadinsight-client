import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Table, Space } from 'antd';

import { getCustomPipeline as getCustomPipelineAction } from 'actions/pipelines';
import { StyledTitle, StyledSection, StyledInput, StyledH5 } from 'styles/app';
import { StyledCustomPipelineImportButton } from 'styles/pipelines';

function ImportCustom({ getCustomPipeline, pipelineNewImport={}}) {
  useEffect(() => {
    getCustomPipeline();
  }, [getCustomPipeline]);

  const { inputs=[], outputs=[], load_profile: loadProfile=[] } = pipelineNewImport

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

  return (
    <>
      <StyledTitle>
        Import Custom Pipeline
      </StyledTitle>
      <StyledSection>
        <header>
          <StyledInput type="text" value="PG&E Load Profile Pipeline" />
          <StyledCustomPipelineImportButton>Import Pipeline</StyledCustomPipelineImportButton>
        </header>
        <Space direction="vertical" size={56}>
          <div>
            <StyledH5>THIS PIPELINE HAS {inputs.length} INPUT PARAMETERS</StyledH5>
            <Table
              columns={inputsColumns}
              dataSource={inputs}
              pagination={false}
            />
          </div>
          <div>
            <StyledH5>THIS PIPELINE HAS {outputs.length} OUTPUTS</StyledH5>
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
}, dispatch);

export default connect(mapStateToProps, mapDispatch)(ImportCustom);
