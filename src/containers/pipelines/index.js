import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  ROUTE_PIPELINES,
  ROUTE_PIPELINES_NEW_REPOSITORIES,
  ROUTE_PIPELINES_NEW_IMPORT,
} from 'config/routes';
import { getPipelines as getPipelinesAction } from 'actions/pipelines';
import { getRepositories as getRepositoriesAction } from 'actions/repositories';
import { StyledTitle } from 'styles/app';
import { StyledPipelinesButton } from 'styles/pipelines';
import PipelineItem from './pipeline';
import RepositoryItem from '../repositories/repository';
import AddModal from './AddModal';

function Pipelines({ getPipelines, pipelines, getRepositories, repositories }) {
  useEffect(() => {
    getPipelines();
    getRepositories();
  }, [getPipelines]);

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
  repositories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  pipelines: state.pipelines.pipelines,
  repositories: state.repositories.repositories,
});

const mapDispatch = (dispatch) => bindActionCreators({
  getPipelines: getPipelinesAction,
  getRepositories: getRepositoriesAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatch)(Pipelines);
