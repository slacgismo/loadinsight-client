import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Space } from 'antd';
import PropTypes from 'prop-types';

import { getPipelines as getPipelinesAction } from 'actions/pipelines';
import { StyledTitle, StyledButton } from 'styles/app';
import PipelineItem from './PipelineItem';
import AddModal from './AddModal';

function Pipelines({ getPipelines, pipelines }) {
  useEffect(() => {
    getPipelines();
  }, [getPipelines]);

  const [addModalVisible, setAddModalVisible] = useState(false);

  const toggleModal = () => setAddModalVisible(!addModalVisible);

  return (
    <>
      <StyledTitle>
        <div>
          <h1>Pipelines</h1>
          <StyledButton size="small" onClick={toggleModal}>
            + Add Pipeline
          </StyledButton>
        </div>
      </StyledTitle>
      <Space direction="vertical" size={16}>
        {pipelines.map(({ id, name, last_updated: lastUpdated }) => (
          <PipelineItem key={id} id={id} name={name} lastUpdated={lastUpdated} />
        ))}
      </Space>
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

const mapStateToProps = (state) => ({
  pipelines: state.pipelines.pipelines,
});

const mapDispatch = (dispatch) => bindActionCreators({
  getPipelines: getPipelinesAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatch)(Pipelines);
