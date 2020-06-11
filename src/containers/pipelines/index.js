import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { getPipelines as getPipelinesAction } from 'actions/pipelines';
import { StyledTitle } from 'styles/app';
import { StyledPipelines, StyledPipelinesButton } from 'styles/pipelines';
import PipelineItem from './pipeline';
import AddModal from './AddModal';

function Pipelines({ getPipelines, pipelines }) {
  useEffect(() => {
    getPipelines();
  }, []);

  const [addModalVisible, setAddModalVisible] = useState(false);

  const openModal = () => setAddModalVisible(true);
  const closeModal = () => setAddModalVisible(false);

  return (
    <>
      <StyledTitle>
        Pipelines
        <StyledPipelinesButton type="text" onClick={openModal}>
          + Add Pipeline
        </StyledPipelinesButton>
      </StyledTitle>
      <StyledPipelines>
        {
          pipelines.map(({ id, name, last_updated: lastUpdated }) => (
            <PipelineItem key={id} name={name} lastUpdated={lastUpdated} />
          ))
        }
      </StyledPipelines>
      {addModalVisible && (
      <AddModal
        handleOk={closeModal}
        handleCancel={closeModal}
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

const mapStateToProps = (state) => ({
  pipelines: state.pipelines.pipelines,
});

const mapDispatch = (dispatch) => bindActionCreators({
  getPipelines: getPipelinesAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatch)(Pipelines);
