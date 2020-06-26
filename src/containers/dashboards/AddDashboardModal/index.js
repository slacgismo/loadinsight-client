import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Space } from 'antd';

import { addDashboard as addDashboardAction } from 'actions/dashboards';
import {
  StyledText,
  StyledInput,
  StyledModal,
  StyledButton,
  StyledGrid,
} from 'styles/app';

function AddDashboardModal({
  handleOk,
  handleCancel,
  addDashboard,
}) {
  const [dashboardName, setDashboardName] = useState('');

  const handleSubmit = (event) => {
    addDashboard(dashboardName);
    handleOk(event);
  };

  return (
    <StyledModal
      title="Add a Dashboard"
      visible
      footer={null}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <form onSubmit={handleSubmit}>
        <Space direction="vertical" size={12}>
          <StyledText size="middle" fontweight="bold">
            Name Dashboard
          </StyledText>
          <StyledGrid
            margin="0 0 0 -20px"
            padding="10px"
            width="calc(100% + 20px)"
            bgcolor="white"
          >
            <StyledInput
              onChange={(event) => setDashboardName(event.target.value)}
              size="large"
              bgcolor="white"
              autofocus
            />
          </StyledGrid>
        </Space>
        <Space direction="vertical" size={60} align="center">
          <div />
          <StyledButton
            onClick={handleSubmit}
            disabled={!dashboardName}
            color="blue"
            size="large"
            width={104}
            align="center"
          >
            Next
          </StyledButton>
        </Space>
      </form>
    </StyledModal>
  );
}

AddDashboardModal.propTypes = {
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  addDashboard: PropTypes.func.isRequired,
};

const mapDispatch = (dispatch) => bindActionCreators({
  addDashboard: addDashboardAction,
}, dispatch);

export default connect(undefined, mapDispatch)(AddDashboardModal);
