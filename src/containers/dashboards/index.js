import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Space, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import moment from 'moment';

import { getDashboards as getDashboardsAction } from 'actions/dashboards';
import {
  StyledTitle,
  StyledH2,
  StyledH3,
  StyledH4,
  StyledMenu,
  StyledMenuItem,
  StyledMenuLabel,
  StyledIcon,
} from 'styles/app';
import {
  StyledDashboardsButton,
  StyledDashboardsDropdown,
  StyledDashboardsMenu,
  StyledDashboardsMenuItem,
  StyledDashboardsMenuLabel,
  StyledDashboardsMenuItemButton,
  StyledDashboardsFilterMenuItemButton,
  StyledDashboardsHeader,
  StyledDashboardsSummaryCard,
  StyledDashboardsGraph,
  StyledDashboardsGraphSpace,
} from 'styles/dashboards';
import LineGraph from './LineGraph';
import IconMenu from './images/icon-menu.svg';
import IconDragndrop from './images/icon-dragndrop.svg';

const Dashboards = ({ getDashboards, dashboards = [] }) => {
  useEffect(() => {
    getDashboards();
  }, [getDashboards]);

  const [dateTimeFilterValue, setDateTimeFilterValue] = useState(1); // in days

  const dateTimeFilterMenu = (
    <StyledMenu>
      <StyledMenuItem>
        <StyledDashboardsFilterMenuItemButton
          onClick={() => setDateTimeFilterValue(1)}
        >
          Last 24 hours
        </StyledDashboardsFilterMenuItemButton>
      </StyledMenuItem>
      <StyledMenuItem>
        <StyledDashboardsFilterMenuItemButton
          onClick={() => setDateTimeFilterValue(7)}
        >
          Last week
        </StyledDashboardsFilterMenuItemButton>
      </StyledMenuItem>
      <StyledMenuItem>
        <StyledDashboardsFilterMenuItemButton
          onClick={() => setDateTimeFilterValue(31)}
        >
          Last month
        </StyledDashboardsFilterMenuItemButton>
      </StyledMenuItem>
    </StyledMenu>
  );

  const dateTimeFilterOptions = {
    1: 'Last 24 hours',
    7: 'Last week',
    31: 'Last month',
  };

  const dashboardsMenu = (
    <StyledDashboardsMenu>
      <StyledDashboardsMenuItem>
        <StyledDashboardsMenuItemButton>
          Holy Cross Energy
        </StyledDashboardsMenuItemButton>
      </StyledDashboardsMenuItem>
      <StyledDashboardsMenuItem>
        <StyledDashboardsMenuItemButton>
          PG&E Load Profile
        </StyledDashboardsMenuItemButton>
      </StyledDashboardsMenuItem>
      <StyledDashboardsMenuItem>
        <StyledDashboardsMenuItemButton>
          Silicon Valley Clean Energy
        </StyledDashboardsMenuItemButton>
      </StyledDashboardsMenuItem>
      <StyledDashboardsMenuItem>
        <StyledDashboardsMenuItemButton size="small">
          + Add a new dashboard
        </StyledDashboardsMenuItemButton>
      </StyledDashboardsMenuItem>
    </StyledDashboardsMenu>
  );

  const graphsMenu = (
    <StyledDashboardsMenu>
      <StyledDashboardsMenuItem>
        <StyledDashboardsMenuItemButton>
          Edit chart
        </StyledDashboardsMenuItemButton>
      </StyledDashboardsMenuItem>
      <StyledDashboardsMenuItem>
        <StyledDashboardsMenuItemButton size="small">
          Download CSV
        </StyledDashboardsMenuItemButton>
      </StyledDashboardsMenuItem>
      <StyledDashboardsMenuItem>
        <StyledDashboardsMenuItemButton size="small">
          Share Chart
        </StyledDashboardsMenuItemButton>
      </StyledDashboardsMenuItem>
      <StyledDashboardsMenuItem>
        <StyledDashboardsMenuItemButton size="small" color="orangeRed">
          Remove Chart
        </StyledDashboardsMenuItemButton>
      </StyledDashboardsMenuItem>
    </StyledDashboardsMenu>
  );

  const graphData = [];

  if (dashboards.length) {
    const { name, dataset } = dashboards[0];
    const momentEnd = moment(dataset[dataset.length - 1].x);
    const momentStart = momentEnd.subtract(dateTimeFilterValue, 'days');

    const sampleDataset = dataset.filter(({ x }) => moment(x).isAfter(momentStart));

    graphData.push({
      id: name,
      data: sampleDataset,
    });
    graphData.push({
      id: `${name}2`,
      data: sampleDataset,
    });
    graphData.push({
      id: `${name}3`,
      data: sampleDataset,
    });
    graphData.push({
      id: `${name}4`,
      data: sampleDataset,
    });
  }

  return (
    <>
      <StyledTitle margin={0}>
        <div>
          <h1>Dashboards</h1>
          <StyledDashboardsButton type="text">
            + Add Dashboard
          </StyledDashboardsButton>
          <StyledDashboardsDropdown overlay={dashboardsMenu}>
            <StyledDashboardsMenuLabel>
              My Dashboards&nbsp;&nbsp;
              <DownOutlined />
            </StyledDashboardsMenuLabel>
          </StyledDashboardsDropdown>
        </div>
      </StyledTitle>
      <StyledDashboardsHeader>
        <div>
          <StyledH2 color="white">Load Profile</StyledH2>
          <StyledIcon>
            <img src={IconMenu} alt="Load Profile Menu" />
          </StyledIcon>
          <Space size={25}>
            <StyledDashboardsSummaryCard>
              <StyledH4 color="algaeGreen">Update Status</StyledH4>
              Last updated 3 minutes ago
            </StyledDashboardsSummaryCard>
            <StyledDashboardsSummaryCard>
              <StyledH4 color="algaeGreen">Filter by</StyledH4>
              <Dropdown overlay={dateTimeFilterMenu}>
                <StyledMenuLabel color="white" borderColor="algaeGreen">
                  {dateTimeFilterOptions[dateTimeFilterValue]}
                  &nbsp;&nbsp;
                  <DownOutlined />
                </StyledMenuLabel>
              </Dropdown>
            </StyledDashboardsSummaryCard>
            <StyledDashboardsSummaryCard>
              <StyledH4 color="algaeGreen">Average Source Update</StyledH4>
              Content copy appears here
            </StyledDashboardsSummaryCard>
            <StyledDashboardsSummaryCard>
              <StyledH4 color="algaeGreen">Need Additional Status</StyledH4>
              Main copy here
            </StyledDashboardsSummaryCard>
          </Space>
        </div>
      </StyledDashboardsHeader>
      <StyledDashboardsGraphSpace direction="vertical" size="middle">
        <StyledDashboardsGraph>
          <div>
            <StyledDashboardsDropdown overlay={graphsMenu}>
              <StyledDashboardsMenuLabel>
                <StyledIcon>
                  <img src={IconDragndrop} alt="Drag Load Profile" />
                </StyledIcon>
              </StyledDashboardsMenuLabel>
            </StyledDashboardsDropdown>
            <StyledH3>Load Profile Composition by Tariff</StyledH3>
          </div>
          <LineGraph data={graphData} dateTimeFilterValue={dateTimeFilterValue} />
        </StyledDashboardsGraph>
      </StyledDashboardsGraphSpace>
    </>
  );
};

Dashboards.propTypes = {
  getDashboards: PropTypes.func.isRequired,
  dashboards: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    dataset: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.string.isRequired,
      y: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  dashboards: state.dashboards.dashboards,
});

const mapDispatch = (dispatch) => bindActionCreators({
  getDashboards: getDashboardsAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatch)(Dashboards);
