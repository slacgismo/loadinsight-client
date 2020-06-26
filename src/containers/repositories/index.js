import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { getRepositories as getRepositoriesAction } from 'actions/repositories';
import { StyledTitle } from 'styles/app';
import RepositoryItem from './repository';

function Repositories({ getRepositories, repositories }) {
  useEffect(() => {
    getRepositories();
  }, [getRepositories]);

  return (
    <>
      <StyledTitle>
        <h1>Import Custom Pipeline</h1>
      </StyledTitle>
      {repositories.map(({ id, name }) => (
        <RepositoryItem key={id} name={name} />
      ))}
    </>
  );
}

Repositories.propTypes = {
  getRepositories: PropTypes.func.isRequired,
  repositories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  repositories: state.repositories.repositories,
});

const mapDispatch = (dispatch) => bindActionCreators({
  getRepositories: getRepositoriesAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatch)(Repositories);
