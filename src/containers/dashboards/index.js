import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Space } from 'antd';
import moment from 'moment';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';

import {
  getDashboards as getDashboardsAction,
  deleteDashboard as deleteDashboardAction,
  setCurrentDashboard as setCurrentDashboardAction,
  getPGELoadProfile as getPGELoadProfileAction,
  setDateTimeFilterValue as setDateTimeFilterValueAction,
} from 'actions/dashboards';
import MenuOutlined from 'icons/MenuOutlined';
import DownOutlined from 'icons/DownOutlined';
import colors from 'styles/colors';
import {
  StyledTitle,
  StyledH2,
  StyledH4,
  StyledText,
  StyledButton,
  StyledMenu,
  StyledMenuItem,
  StyledDropdown,
  StyledGrid,
} from 'styles/app';
import {
  StyledDashboardsHeader,
  StyledDashboardsGraphsGrid,
  StyledDashboardsMenu,
  StyledDashboardsMenuItem,
  StyledDashboardsDropdown,
  StyledDashboardsSummaryCard,
} from 'styles/dashboards';
import Graph from './Graph';
import SharePopover from './SharePopover';
import AddChartModal from './AddChartModal';
import AddDashboardModal from './AddDashboardModal';

const Dashboards = ({
  getDashboards,
  dashboards = [],
  currentDashboard,
  deleteDashboard,
  setCurrentDashboard,
  PGELoadProfile,
  getPGELoadProfile,
  dateTimeFilterValue,
  setDateTimeFilterValue,
}) => {
  const currentDashboardName = currentDashboard in dashboards ? dashboards[currentDashboard].name : '';

  const dateNow = new Date();
  const dateNowYear = dateNow.getFullYear();
  const dateNowMonth = dateNow.getMonth();
  const dateNowDate = dateNow.getDate();

  const datePGEStart = new Date(dateNowYear, dateNowMonth - 1, dateNowDate);
  const datePGEStop = new Date(dateNowYear, dateNowMonth, dateNowDate);

  const [dateRange, setDateRange] = useState([{
    startDate: datePGEStart,
    endDate: datePGEStop,
    key: 'selection',
  }]);

  useEffect(() => {
    const currName = currentDashboard in dashboards ? dashboards[currentDashboard].name : '';
    if (currName.match('Holy Cross Dashboard')) {
      setDateRange([{
        startDate: new Date('12/1/17'),
        endDate: new Date('12/31/17'),
        key: 'selection',
      }]);
    } else {
      const newDateNow = new Date();
      const newDateNowYear = newDateNow.getFullYear();
      const newDateNowMonth = newDateNow.getMonth();
      const newDateNowDate = newDateNow.getDate();

      setDateRange([{
        startDate: new Date(newDateNowYear, newDateNowMonth - 1, newDateNowDate),
        endDate: new Date(newDateNowYear, newDateNowMonth, newDateNowDate),
        key: 'selection',
      }]);
    }
  }, [currentDashboard, dashboards]);

  const maxDate = new Date();
  const minDate = currentDashboardName === 'Holy Cross Dashboard' ? (
    new Date(maxDate.getFullYear() - 3, 0, 1) // have calendar go back 3 years
  ) : (
    new Date(dateNowYear, 0, 1)
  );

  const [sharePopoverVisible, setSharePopoverVisible] = useState(false);
  const [addChartModalVisible, setAddChartModalVisible] = useState(false);
  const [addDashboardModalVisible, setAddDashboardModalVisible] = useState(false);

  const toggleSharePopoverVisible = () => setSharePopoverVisible(!sharePopoverVisible);
  const toggleAddChartModal = () => setAddChartModalVisible(!addChartModalVisible);
  const toggleAddDashboardModal = () => setAddDashboardModalVisible(!addDashboardModalVisible);

  useEffect(() => {
    getDashboards();
  }, [getDashboards]);

  useEffect(() => {
    if (dashboards.length && currentDashboard > 0) { // only get if not on Holy Cross Dashboard
      if (dateTimeFilterValue || addChartModalVisible) {
        const newDateNow = new Date();
        const newDateNowYear = newDateNow.getFullYear();
        const newDateNowMonth = newDateNow.getMonth();
        const newDateNowDate = newDateNow.getDate();

        const start = new Date(newDateNowYear, newDateNowMonth - 1, newDateNowDate);
        const end = new Date(newDateNowYear, newDateNowMonth, newDateNowDate);
        getPGELoadProfile(start, end, addChartModalVisible);
      } else {
        getPGELoadProfile(dateRange[0].startDate, dateRange[0].endDate);
      }
    }
  }, [
    getPGELoadProfile,
    dateRange,
    dateTimeFilterValue,
    dashboards,
    currentDashboard,
    addChartModalVisible,
  ]);

  const dashboardsMenu = (
    <StyledDashboardsMenu>
      {dashboards.map(({ name: dashboardName }, index) => (
        <StyledDashboardsMenuItem
          key={dashboardName}
          onClick={() => setCurrentDashboard(index)}
        >
          {dashboardName}
        </StyledDashboardsMenuItem>
      ))}
      <StyledDashboardsMenuItem
        onClick={toggleAddDashboardModal}
        size="small"
      >
        + Add a new dashboard
      </StyledDashboardsMenuItem>
    </StyledDashboardsMenu>
  );

  const dashboardMenu = (
    <StyledDashboardsMenu>
      <StyledDashboardsMenuItem>
        {currentDashboardName}
      </StyledDashboardsMenuItem>
      <StyledDashboardsMenuItem
        onClick={toggleAddChartModal}
        size="small"
      >
        Add a chart
      </StyledDashboardsMenuItem>
      <StyledDashboardsMenuItem size="small">
        Edit dashboard name
      </StyledDashboardsMenuItem>
      <StyledDashboardsMenuItem
        onClick={toggleSharePopoverVisible}
        size="small"
      >
        Share this dashboard
      </StyledDashboardsMenuItem>
      <StyledDashboardsMenuItem
        onClick={() => deleteDashboard(currentDashboard)}
        size="small"
        color="orangeRed"
      >
        Delete dashboard
      </StyledDashboardsMenuItem>
    </StyledDashboardsMenu>
  );

  const filterData = (data, numDatasets, filterValue, start, end) => {
    let momentStart;
    let momentEnd;

    if (filterValue) {
      momentStart = moment(data[data.length - 1].x).subtract(filterValue, 'days');
      momentEnd = moment(data[data.length - 1].x).endOf('day');
    } else {
      momentStart = moment(start).startOf('day');
      momentEnd = moment(end).add(1, 'day').startOf('day');
    }

    const momentStartFormatted = momentStart.format('YYYY-MM-DD HH:mm');
    const momentEndFormatted = momentEnd.format('YYYY-MM-DD HH:mm');

    let sliceStart = data.findIndex(({ x }) => x.match(momentStartFormatted));
    if (sliceStart < 0) sliceStart = 0;

    let sliceEnd = filterValue ? undefined : data.findIndex(({ x }) => (
      x.match(momentEndFormatted)
    ));
    if (sliceEnd < 0) sliceEnd = undefined;

    return data.slice(sliceStart, sliceEnd);
  };

  const getGraphs = () => {
    const graphsData = {
      1: [],
      7: [],
      31: [],
    };

    const graphNames = [];

    if (currentDashboard in dashboards) {
      const { charts } = dashboards[currentDashboard];

      charts.forEach(({
        name: graphName, datasets, yAxis,
      }, index) => {
        graphNames.push(graphName);

        if (datasets) {
          datasets.forEach(({ id, data }) => {
            ([1, 7, 31]).forEach((filterValue) => {
              const graphData = {
                id,
                data: filterData(data, datasets.length, filterValue),
              };

              if (index in graphsData[filterValue]) {
                graphsData[filterValue][index].push(graphData);
              } else {
                graphsData[filterValue][index] = [graphData];
              }
            });
          });
        } else if (yAxis) {
          yAxis.forEach((axis) => {
            if (axis in PGELoadProfile) {
              const data = PGELoadProfile[axis];

              ([1, 7, 31]).forEach((filterValue) => {
                const graphData = {
                  id: axis,
                  data: filterData(data, 1, filterValue),
                };

                if (index in graphsData[filterValue]) {
                  graphsData[filterValue][index].push(graphData);
                } else {
                  graphsData[filterValue][index] = [graphData];
                }
              });
            }
          });
        }
      });
    }

    return [graphsData, graphNames];
  };

  const [
    graphsData,
    graphNames,
  ] = useMemo(getGraphs, [dashboards, currentDashboard, PGELoadProfile]);

  const getGraphsCustomRange = () => {
    const graphsCustomRangeData = {
      0: [],
    };

    if (dateTimeFilterValue === 0) {
      if (currentDashboard in dashboards) {
        const { charts } = dashboards[currentDashboard];

        const { startDate, endDate } = dateRange[0];

        charts.forEach(({ datasets, yAxis }, index) => {
          if (datasets) {
            datasets.forEach(({ id, data }) => {
              const graphData = {
                id,
                data: filterData(data, datasets.length, 0, startDate, endDate),
              };

              if (index in graphsCustomRangeData[0]) {
                graphsCustomRangeData[0][index].push(graphData);
              } else {
                graphsCustomRangeData[0][index] = [graphData];
              }
            });
          } else if (yAxis) {
            yAxis.forEach((axis) => {
              if (axis in PGELoadProfile) {
                const data = PGELoadProfile[axis];

                const graphData = {
                  id: axis,
                  data: filterData(data, 1, 0, startDate, endDate),
                };

                if (index in graphsCustomRangeData[0]) {
                  graphsCustomRangeData[0][index].push(graphData);
                } else {
                  graphsCustomRangeData[0][index] = [graphData];
                }
              }
            });
          }
        });
      }
    }

    return graphsCustomRangeData;
  };

  const customGraphsData = useMemo(getGraphsCustomRange, [
    dashboards,
    currentDashboard,
    dateTimeFilterValue,
    dateRange,
    PGELoadProfile,
  ]);

  const charts = dateTimeFilterValue === 0 ? customGraphsData[0] : graphsData[dateTimeFilterValue];

  const dateTimeFilterMenu = (
    <StyledMenu>
      <StyledMenuItem
        bordercolor="lightBg"
        hoverbgcolor="darkGray"
        hovercolor="white"
        onClick={() => setDateTimeFilterValue(1)}
      >
        <span>Last 24 hours</span>
      </StyledMenuItem>
      <StyledMenuItem
        bordercolor="lightBg"
        hoverbgcolor="darkGray"
        hovercolor="white"
        onClick={() => setDateTimeFilterValue(7)}
      >
        <span>Last week</span>
      </StyledMenuItem>
      <StyledMenuItem
        bordercolor="lightBg"
        hoverbgcolor="darkGray"
        hovercolor="white"
        onClick={() => setDateTimeFilterValue(31)}
      >
        <span>Last month</span>
      </StyledMenuItem>
      <StyledMenuItem
        bordercolor="lightBg"
        hoverbgcolor="darkGray"
        hovercolor="white"
        onClick={() => setDateTimeFilterValue(0)}
      >
        <span>Custom</span>
      </StyledMenuItem>
    </StyledMenu>
  );

  const dateTimeFilterOptions = {
    1: 'Last 24 hours',
    7: 'Last week',
    31: 'Last month',
    0: 'Custom',
  };

  const additionalFilterMenu = (
    <StyledMenu>
      <StyledMenuItem
        bordercolor="lightBg"
        hoverbgcolor="darkGray"
        hovercolor="white"
      >
        <span>Energy Used (kWh)</span>
      </StyledMenuItem>
      <StyledMenuItem
        bordercolor="lightBg"
        hoverbgcolor="white"
        hovercolor="gray"
        style={{ cursor: 'default' }}
      >
        <span style={{ color: 'rgba(112, 112, 112, 0.3)' }}>AMI Meter ID</span>
      </StyledMenuItem>
      <StyledMenuItem
        bordercolor="lightBg"
        hoverbgcolor="white"
        hovercolor="gray"
        style={{ cursor: 'default' }}
      >
        <span style={{ color: 'rgba(112, 112, 112, 0.3)' }}>Channel</span>
      </StyledMenuItem>
      <StyledMenuItem
        bordercolor="lightBg"
        hoverbgcolor="white"
        hovercolor="gray"
        style={{ cursor: 'default' }}
      >
        <span style={{ color: 'rgba(112, 112, 112, 0.3)' }}>Flow Direction</span>
      </StyledMenuItem>
      <StyledMenuItem
        bordercolor="lightBg"
        hoverbgcolor="white"
        hovercolor="gray"
        style={{ cursor: 'default' }}
      >
        <span style={{ color: 'rgba(112, 112, 112, 0.3)' }}>Service Location Number</span>
      </StyledMenuItem>
      <StyledMenuItem
        bordercolor="lightBg"
        hoverbgcolor="white"
        hovercolor="gray"
        style={{ cursor: 'default' }}
      >
        <span style={{ color: 'rgba(112, 112, 112, 0.3)' }}>Substation</span>
      </StyledMenuItem>
      <StyledMenuItem
        bordercolor="lightBg"
        hoverbgcolor="white"
        hovercolor="gray"
        style={{ cursor: 'default' }}
      >
        <span style={{ color: 'rgba(112, 112, 112, 0.3)' }}>Feeder</span>
      </StyledMenuItem>
      <StyledMenuItem
        bordercolor="lightBg"
        hoverbgcolor="white"
        hovercolor="gray"
        style={{ cursor: 'default' }}
      >
        <span style={{ color: 'rgba(112, 112, 112, 0.3)' }}>Zip Code</span>
      </StyledMenuItem>
      <StyledMenuItem
        bordercolor="lightBg"
        hoverbgcolor="white"
        hovercolor="gray"
        style={{ cursor: 'default' }}
      >
        <span style={{ color: 'rgba(112, 112, 112, 0.3)' }}>Meter Type</span>
      </StyledMenuItem>
    </StyledMenu>
  );

  return (
    <>
      <StyledTitle margin={0}>
        <div>
          <h1>Dashboards</h1>
          <StyledButton
            onClick={toggleAddDashboardModal}
            size="small"
          >
            + Add Dashboard
          </StyledButton>
          <StyledDashboardsDropdown overlay={dashboardsMenu}>
            <div>
              <span>My Dashboards</span>
              <DownOutlined color="gray" />
            </div>
          </StyledDashboardsDropdown>
        </div>
      </StyledTitle>
      <StyledDashboardsHeader>
        <div>
          {sharePopoverVisible && (
            <SharePopover
              visible={sharePopoverVisible}
              setSharePopoverVisible={setSharePopoverVisible}
              currentDashboardName={currentDashboardName}
            />
          )}
          <StyledDashboardsDropdown overlay={dashboardMenu}>
            <span>
              <MenuOutlined />
            </span>
          </StyledDashboardsDropdown>
          <StyledH2 color="white">
            {currentDashboardName}
          </StyledH2>
          {currentDashboard in dashboards && (
          <Space size={25}>
            <StyledDashboardsSummaryCard>
              <StyledH4 color="algaeGreen">Update Status</StyledH4>
              Last updated 3 minutes ago
            </StyledDashboardsSummaryCard>
            <StyledDashboardsSummaryCard>
              <StyledH4 color="algaeGreen">Filter by</StyledH4>
              <Space direction="vertical" size={5}>
                <StyledDropdown
                  color="white"
                  bordercolor="algaeGreen"
                  overlay={dateTimeFilterMenu}
                >
                  <div>
                    {dateTimeFilterOptions[dateTimeFilterValue]}
                    <DownOutlined color="algaeGreen" />
                  </div>
                </StyledDropdown>
                {dateTimeFilterValue === 0 && (
                <StyledDropdown
                  color="white"
                  bordercolor="transparent"
                  overlay={(
                    <DateRange
                      editableDateInputs
                      onChange={(item) => setDateRange([item.selection])}
                      ranges={dateRange}
                      direction="horizontal"
                      scroll={{
                        enabled: true,
                        monthWidth: 224,
                        longMonthHeight: 214,
                        calendarWidth: 214,
                      }}
                      rangeColors={[colors.algaeGreen]}
                      color={colors.lightGray}
                      showMonthAndYearPickers={false}
                      dateDisplayFormat="M/d/yyyy"
                      weekdayDisplayFormat="EEEEE"
                      minDate={minDate}
                      maxDate={maxDate}
                      fixedHeight
                    />
                  )}
                >
                  <StyledGrid gridTemplateColumns="1fr 1fr" gridgap={10}>
                    <StyledText
                      size="small"
                      bordercolor="algaeGreen"
                      padding="3px 9px"
                      margin="0 0 0 -9px"
                      fontweight="400"
                    >
                      {dateRange[0].startDate && moment(dateRange[0].startDate).format('M/D/YYYY')}
                    </StyledText>
                    <StyledText
                      size="small"
                      bordercolor="algaeGreen"
                      padding="3px 9px"
                      margin="0 0 0 9px"
                      fontweight="400"
                    >
                      {dateRange[0].endDate && moment(dateRange[0].endDate).format('M/D/YYYY')}
                    </StyledText>
                  </StyledGrid>
                </StyledDropdown>
                )}
              </Space>
            </StyledDashboardsSummaryCard>
            <StyledDashboardsSummaryCard>
              <StyledH4 color="algaeGreen">Additional Filter</StyledH4>
              <StyledDropdown
                color="white"
                bordercolor="algaeGreen"
                overlay={additionalFilterMenu}
              >
                <div>
                  Energy Used (kWh)
                  <DownOutlined color="algaeGreen" />
                </div>
              </StyledDropdown>
            </StyledDashboardsSummaryCard>
          </Space>
          )}
        </div>
      </StyledDashboardsHeader>
      <StyledDashboardsGraphsGrid>
        {charts.map((data, index) => (
          <Graph
            key={`${graphNames[index]}${data.map((dataset) => dataset.id)}`}
            title={graphNames[index]}
            data={data}
            dateTimeFilterValue={dateTimeFilterValue}
            index={index}
          />
        ))}
      </StyledDashboardsGraphsGrid>
      {addChartModalVisible && (
        <AddChartModal
          handleOk={toggleAddChartModal}
          handleCancel={toggleAddChartModal}
          index={charts.length}
        />
      )}
      {addDashboardModalVisible && (
        <AddDashboardModal
          handleOk={toggleAddDashboardModal}
          handleCancel={toggleAddDashboardModal}
        />
      )}
    </>
  );
};

Dashboards.propTypes = {
  getDashboards: PropTypes.func.isRequired,
  dashboards: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentDashboard: PropTypes.number.isRequired,
  deleteDashboard: PropTypes.func.isRequired,
  setCurrentDashboard: PropTypes.func.isRequired,
  PGELoadProfile: PropTypes.objectOf(PropTypes.array).isRequired,
  getPGELoadProfile: PropTypes.func.isRequired,
  dateTimeFilterValue: PropTypes.number.isRequired,
  setDateTimeFilterValue: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  dashboards: state.dashboards.dashboards,
  currentDashboard: state.dashboards.currentDashboard,
  PGELoadProfile: state.dashboards.PGELoadProfile,
  dateTimeFilterValue: state.dashboards.dateTimeFilterValue,
});

const mapDispatch = (dispatch) => bindActionCreators({
  getDashboards: getDashboardsAction,
  deleteDashboard: deleteDashboardAction,
  setCurrentDashboard: setCurrentDashboardAction,
  getPGELoadProfile: getPGELoadProfileAction,
  setDateTimeFilterValue: setDateTimeFilterValueAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatch)(Dashboards);
