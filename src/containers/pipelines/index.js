import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { getPipelines as getPipelinesAction } from 'actions/pipelines';
import { StyledHeader, StyledTitle } from 'styles/app';
import { StyledPipelines, StyledPipelinesButton } from 'styles/pipelines';
import PipelineItem from './pipeline';

class Pipelines extends Component {
  componentDidMount() {
    const { getPipelines } = this.props;
    getPipelines();
  }

  render() {
    const { pipelines } = this.props;
    return (
      <>
        <StyledHeader>
          <StyledTitle>
            Pipelines
          </StyledTitle>
          <StyledPipelinesButton type="text">
            + Add Pipeline
          </StyledPipelinesButton>
        </StyledHeader>
        <StyledPipelines>
          {
            // eslint-disable-next-line camelcase
            pipelines.map(({ id, name, last_updated }) => (
              // eslint-disable-next-line camelcase
              <PipelineItem key={id} name={name} lastUpdated={last_updated} />
            ))
          }
        </StyledPipelines>
      </>
    );
  }
}

Pipelines.propTypes = {
  getPipelines: PropTypes.func.isRequired,
  pipelines: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    last_updated: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  pipelines: state.pipelines.pipelines,
});

const mapDispatch = (dispatch) => bindActionCreators({
  getPipelines: getPipelinesAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatch)(Pipelines);
