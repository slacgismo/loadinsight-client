import React from 'react';
import PropTypes from 'prop-types';

import {
  StyledPipelineItem,
  StyledPipelineName,
  StyledPipelineLastUpdated,
  StyledPipelineItemButton,
} from 'styles/pipelines';

const Pipeline = ({ name, lastUpdated }) => (
  <StyledPipelineItem>
    <StyledPipelineName>{name}</StyledPipelineName>
    <StyledPipelineLastUpdated>
      Last updated&nbsp;
      {lastUpdated}
    </StyledPipelineLastUpdated>
    <StyledPipelineItemButton>Succeeded</StyledPipelineItemButton>
  </StyledPipelineItem>
);

Pipeline.propTypes = {
  name: PropTypes.string.isRequired,
  lastUpdated: PropTypes.string.isRequired,
};

export default Pipeline;
