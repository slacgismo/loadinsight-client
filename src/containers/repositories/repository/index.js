import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ROUTE_PIPELINES_NEW_IMPORT } from 'config/routes';
import { StyledButton } from 'styles/app';
import {
  StyledRepositoryName,
  StyledRepositoryItem,
} from 'styles/repositories';

const Repository = ({ name }) => {
  const history = useHistory();

  const goToImport = () => history.push(ROUTE_PIPELINES_NEW_IMPORT);

  return (
    <StyledRepositoryItem>
      <StyledRepositoryName>{name}</StyledRepositoryName>
      <div />
      <StyledButton size="large" color="lightBlue" onClick={goToImport}>
        Set-up Pipeline
      </StyledButton>
    </StyledRepositoryItem>
  );
};

Repository.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Repository;
