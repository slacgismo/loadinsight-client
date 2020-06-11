import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ROUTE_PIPELINES_NEW_IMPORT } from 'config/routes';
import {
  StyledRepositoryName,
  StyledRepositoryItem,
  StyledRepositoryItemButton,
} from 'styles/repositories';

const Repository = ({ name }) => {
  const history = useHistory();

  const goToImport = () => history.push(ROUTE_PIPELINES_NEW_IMPORT);

  return (
    <StyledRepositoryItem>
      <StyledRepositoryName>{name}</StyledRepositoryName>
      <div />
      <StyledRepositoryItemButton onClick={goToImport}>
        Set-up Pipeline
      </StyledRepositoryItemButton>
    </StyledRepositoryItem>
  );
};

Repository.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Repository;
