import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import {
  StyledMenu,
  StyledMenuItem,
  StyledMenuItemButton,
  StyledMenuItemButtonRed,
} from 'styles/app';
import {
  StyledPipelineItem,
  StyledPipelineName,
  StyledPipelineLastUpdated,
  StyledPipelineItemButton,
} from 'styles/pipelines';
import {
  deletePipeline as deletePipelineAction,
} from 'actions/pipelines';

const Pipeline = ({ id, name, lastUpdated, deletePipeline }) => {
  const menu = (
    <StyledMenu>
      <StyledMenuItem>
        <StyledMenuItemButton>
          View Latest Output
        </StyledMenuItemButton>
      </StyledMenuItem>
      <StyledMenuItem>
        <StyledMenuItemButton>
          Update Now
        </StyledMenuItemButton>
      </StyledMenuItem>
      <StyledMenuItem>
        <StyledMenuItemButtonRed onClick={() => deletePipeline({ id })}>
          Delete
        </StyledMenuItemButtonRed>
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
        <StyledPipelineItemButton>
          Succeeded&nbsp;
          <DownOutlined />
        </StyledPipelineItemButton>
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
