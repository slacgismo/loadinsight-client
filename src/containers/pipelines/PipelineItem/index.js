import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Dropdown } from 'antd';

import {
  deletePipeline as deletePipelineAction,
} from 'actions/pipelines';
import DownOutlined from 'icons/DownOutlined';
import {
  StyledMenu,
  StyledMenuItem,
  StyledButton,
} from 'styles/app';
import {
  StyledPipelineItem,
  StyledPipelineName,
  StyledPipelineLastUpdated,
} from 'styles/pipelines';

const Pipeline = ({
  id, name, lastUpdated, deletePipeline,
}) => {
  const menu = (
    <StyledMenu>
      <StyledMenuItem>
        <span>View Latest Output</span>
      </StyledMenuItem>
      <StyledMenuItem>
        <span>Update Now</span>
      </StyledMenuItem>
      <StyledMenuItem hoverColor="orangeRed" onClick={() => deletePipeline({ id })}>
        <span>Delete</span>
      </StyledMenuItem>
    </StyledMenu>
  );

  return (
    <StyledPipelineItem>
      <StyledPipelineName>{name}</StyledPipelineName>
      <StyledPipelineLastUpdated>
        Last updated&nbsp;
        {lastUpdated}
      </StyledPipelineLastUpdated>
      <Dropdown overlay={menu}>
        <StyledButton size="large" color="green">
          Succeeded
          <DownOutlined />
        </StyledButton>
      </Dropdown>
    </StyledPipelineItem>
  );
};

Pipeline.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  lastUpdated: PropTypes.string.isRequired,
  deletePipeline: PropTypes.func.isRequired,
};

const mapDispatch = (dispatch) => bindActionCreators({
  deletePipeline: deletePipelineAction,
}, dispatch);

export default connect(undefined, mapDispatch)(Pipeline);
