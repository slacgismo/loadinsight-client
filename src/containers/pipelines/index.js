import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { USER_KEY } from 'util/auth';
import { getPipelines as getPipelinesAction } from 'actions/pipelines';
import { StyledTitle } from 'styles/app';
import { StyledPipelinesButton } from 'styles/pipelines';
import PipelineItem from './pipeline';
import AddModal from './AddModal';

function Pipelines({ getPipelines, pipelines }) {
  useEffect(() => {
    if (!pipelines.length) getPipelines();
  }, [pipelines, getPipelines]);

  const [addModalVisible, setAddModalVisible] = useState(false);

  const toggleModal = () => setAddModalVisible(!addModalVisible);

  return (
    <>
      <StyledTitle>
        Pipelines
        <StyledPipelinesButton type="text" onClick={toggleModal}>
          + Add Pipeline
        </StyledPipelinesButton>
      </StyledTitle>
      {pipelines.map(({ id, name, last_updated: lastUpdated }) => (
        <PipelineItem key={id} name={name} lastUpdated={lastUpdated} />
      ))}
      {addModalVisible && (
      <AddModal
        handleOk={toggleModal}
        handleCancel={toggleModal}
      />
      )}
    </>
  );
}

Pipelines.propTypes = {
  getPipelines: PropTypes.func.isRequired,
  pipelines: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    last_updated: PropTypes.string.isRequired,
  })).isRequired,
};

const localPipelines = window.localStorage.getItem(`${USER_KEY}Pipelines`) || [];

const mapStateToProps = (state) => ({
  pipelines: localPipelines.length ? JSON.parse(localPipelines) : state.pipelines.pipelines,
});

const mapDispatch = (dispatch) => bindActionCreators({
  getPipelines: getPipelinesAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatch)(Pipelines);
