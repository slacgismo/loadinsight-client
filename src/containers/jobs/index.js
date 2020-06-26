import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Space, Dropdown } from 'antd';

import { getJobs as getJobsAction } from 'actions/jobs';
import DownOutlined from 'icons/DownOutlined';
import {
  StyledTitle,
  StyledText,
  StyledGrid,
  StyledButton, StyledMenu, StyledMenuItem,
} from 'styles/app';

import {
  StyledLegendIcon,
  StyledDashboardsDropdown,
} from 'styles/dashboards';

const Jobs = ({ jobs, getJobs }) => {
  useEffect(() => {
    getJobs();
  }, [jobs, getJobs]);

  const jobsDateFilterOptions = {
    1: 'Last 24 hours',
    7: 'Last week',
    31: 'Last 30 days',
  };

  const jobsStatusFilterOptions = {
    title: 'Job Title',
    succeeded: 'Succeeded',
    failed: 'Failed',
  };

  const jobsFilterMenu = (
    <StyledMenu>
      {Object.keys(jobsDateFilterOptions).map((key) => (
        <StyledMenuItem key={key}>
          <span>{jobsDateFilterOptions[key]}</span>
        </StyledMenuItem>
      ))}
      {Object.keys(jobsStatusFilterOptions).map((key) => (
        <StyledMenuItem key={key} marginbottom={9}>
          <span>{jobsStatusFilterOptions[key]}</span>
        </StyledMenuItem>
      ))}
    </StyledMenu>
  );

  const jobMenu = (
    <StyledMenu>
      <StyledMenuItem>
        <span>Restart Job</span>
      </StyledMenuItem>
      <StyledMenuItem>
        <span>View Output</span>
      </StyledMenuItem>
      <StyledMenuItem>
        <span>Debug Console</span>
      </StyledMenuItem>
      <StyledMenuItem>
        <span>View on Github</span>
      </StyledMenuItem>
    </StyledMenu>
  );

  const statusColors = {
    running: 'lightGray',
    failed: 'orange',
    succeeded: 'green',
  };

  const statusText = {
    running: 'In Progress',
    failed: 'Failed',
    succeeded: 'Succeeded',
  };

  return (
    <>
      <StyledTitle>
        <div>
          <h1>Jobs</h1>
          <StyledText size="middle" color="darkText" align="right" margin="0 116px 0 0">Filter by</StyledText>
          <StyledDashboardsDropdown overlay={jobsFilterMenu}>
            <StyledButton size="small" color="darkText">
              Last 24 hours
              <DownOutlined />
            </StyledButton>
          </StyledDashboardsDropdown>
        </div>
      </StyledTitle>
      <Space direction="vertical" size={16}>
        {jobs.map(({ name: jobName, status, last_updated: lastUpdated }) => (
          <StyledGrid bgcolor="white" gridTemplateColumns="1fr 1fr 0.25fr 0.5fr">
            <StyledText
              size="large"
              fontweight={500}
              color={status === 'failed' ? 'orangeRed' : 'darkText'}
              padding="0 28px 0 0"
            >
              {jobName}
              <StyledLegendIcon serieColor={statusColors[status]} float="right" />
            </StyledText>
            <StyledText size="middle" fontweight={500} color="darkGray">
              {`Last updated ${lastUpdated}`}
            </StyledText>
            <Dropdown overlay={jobMenu}>
              <StyledButton size="large" width={134} color={statusColors[status]}>
                <StyledText>
                  {statusText[status]}
                </StyledText>
                <DownOutlined />
              </StyledButton>
            </Dropdown>
          </StyledGrid>
        ))}
      </Space>
    </>
  );
};

Jobs.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    last_updated: PropTypes.string.isRequired,
  })).isRequired,
  getJobs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  jobs: state.jobs.jobs,
});

const mapDispatch = (dispatch) => bindActionCreators({
  getJobs: getJobsAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatch)(Jobs);
