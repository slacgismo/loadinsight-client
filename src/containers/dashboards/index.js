import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Space } from 'antd';
import moment from 'moment';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// import reorder from 'util/reorder';
import {
  getDashboards as getDashboardsAction,
  deleteDashboard as deleteDashboardAction,
  setCurrentDashboard as setCurrentDashboardAction,
  getPGELoadProfile as getPGELoadProfileAction,
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
}) => {
  const [dateTimeFilterValue, setDateTimeFilterValue] = useState(1); // in days

  const [dateRange, setDateRange] = useState([{
    startDate: new Date('5/27/2020'),
    endDate: new Date('6/27/2020'),
    key: 'selection',
  }]);

  const [sharePopoverVisible, setSharePopoverVisible] = useState(false);
  const [addChartModalVisible, setAddChartModalVisible] = useState(false);
  const [addDashboardModalVisible, setAddDashboardModalVisible] = useState(false);

  const toggleSharePopoverVisible = () => setSharePopoverVisible(!sharePopoverVisible);
  const toggleAddChartModal = () => setAddChartModalVisible(!addChartModalVisible);
  const toggleAddDashboardModal = () => setAddDashboardModalVisible(!addDashboardModalVisible);

  const currentDashboardName = currentDashboard in dashboards ? dashboards[currentDashboard].name : '';

  useEffect(() => {
    getDashboards();
  }, [getDashboards]);

  useEffect(() => {
    getPGELoadProfile(dateRange[0].startDate, dateRange[0].endDate);
  }, [getPGELoadProfile, dateRange[0].startDate, dateRange[0].endDate]);

  const dashboardsMenu = (
    <StyledDashboardsMenu>
      {dashboards.map(({ name: dashboardName }, index) => (
        <StyledDashboardsMenuItem
          onClick={() => setCurrentDashboard(index)}
          key={dashboardName}
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

  const getGraphs = () => {
    const graphsData = {
      1: [],
      7: [],
      31: [],
    };

    const graphNames = [];
    const graphsMaxY = [];
    const graphsYUnit = [];

    const filterData = (data, filterValue) => {
      const dataPoints = [];

      const momentStart = moment(data[data.length - 1].x)
        .subtract(filterValue, 'days');
      const xStart = momentStart.format('YYYY-MM-DD HH');

      for (let i = data.length - 1; i >= 0; i -= 1) { // start from the end
        if (filterValue !== 31 || i % 4 === 0) {
          dataPoints.push(data[i]);
        }
        if (data[i].x.match(xStart)) {
          break;
        }
      }

      return dataPoints;
    };

    if (currentDashboard in dashboards) {
      const { charts } = dashboards[currentDashboard];

      charts.forEach(({
        name: graphName, maxY, yUnit, datasets, yAxis,
      }, index) => {
        graphNames.push(graphName);
        graphsMaxY.push(maxY);
        graphsYUnit.push(yUnit);


        if (datasets) {
          datasets.forEach(({ id, data }) => {
            ([1, 7, 31]).forEach((filterValue) => {
              const dataPoints = filterData(data, filterValue);

              const graphData = ({
                id,
                data: dataPoints,
              });

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
                const dataPoints = filterData(data, filterValue);

                const graphData = ({
                  id: axis,
                  data: dataPoints,
                });

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

    return [graphsData, graphNames, graphsMaxY, graphsYUnit];
  };

  const [
    graphsData,
    graphNames,
    graphsMaxY,
    graphsYUnit,
  ] = useMemo(getGraphs, [dashboards, currentDashboard, PGELoadProfile]);

  const getGraphsCustomRange = () => {
    const graphsCustomRangeData = {
      0: [],
    };

    if (dateTimeFilterValue === 0) {
      if (currentDashboard in dashboards) {
        const { charts } = dashboards[currentDashboard];

        const momentStart = moment(dateRange[0].startDate);
        const momentEnd = moment(dateRange[0].endDate);
        const momentEndFormatted = momentEnd.format('YYYY-MM-DD HH');

        charts.forEach(({ datasets, yAxis }, index) => {
          if (datasets) {
            datasets.forEach((set) => {
              const { id, data } = set;

              const dataPoints = [];

              let endIndex = data.findIndex(({ x }) => x.match(momentEndFormatted));

              if (endIndex < 0) {
                endIndex = data.length - 1;
              }

              for (let i = endIndex; i >= 0; i -= 1) { // start from the end
                const momentX = moment(data[i].x);
                if (momentX.isSameOrAfter(momentStart) && momentX.isSameOrBefore(momentEnd)) {
                  if ((endIndex - i) % 4 === 0) {
                    dataPoints.push(data[i]);
                  }
                } else {
                  break;
                }
              }

              const graphData = ({
                id,
                data: dataPoints,
              });

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
                const dataPoints = [];

                let endIndex = data.findIndex(({ x }) => x.match(momentEndFormatted));

                if (endIndex < 0) {
                  endIndex = data.length - 1;
                }

                for (let i = endIndex; i >= 0; i -= 1) { // start from the end
                  const momentX = moment(data[i].x);
                  if (momentX.isSameOrAfter(momentStart) && momentX.isSameOrBefore(momentEnd)) {
                    if ((endIndex - i) % 4 === 0) {
                      dataPoints.push(data[i]);
                    }
                  } else {
                    break;
                  }
                }

                const graphData = ({
                  id: axis,
                  data: dataPoints,
                });

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

  /* const graphs = graphsData
    .map((data, i) => ({
      id: `graph${i}`,
      content: (
        <Graph
          title={graphNames[i]}
          data={data}
          dateTimeFilterValue={dateTimeFilterValue}
          index={i}
        />
      ),
    }))
    .concat(graphsData.map((data, i) => ({
      id: `graph${i + 2}`,
      content: (
        <Graph
          title={graphNames[i]}
          data={data}
          dateTimeFilterValue={dateTimeFilterValue}
          index={i + 2}
        />
      ),
    }))); // TODO: remove concat. doubled up for presentation purposes */

  // const [items, setItems] = useState(graphs);

  /* const onDragEnd = ((result) => {
    if (!result.destination) return;

    setItems(reorder(
      items,
      result.source.index,
      result.destination.index,
    ));
  }); */

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
        hoverbgcolor="darkGray"
        hovercolor="white"
      >
        <span>AMI Meter ID</span>
      </StyledMenuItem>
      <StyledMenuItem
        bordercolor="lightBg"
        hoverbgcolor="darkGray"
        hovercolor="white"
      >
        <span>Channel</span>
      </StyledMenuItem>
      <StyledMenuItem
        bordercolor="lightBg"
        hoverbgcolor="darkGray"
        hovercolor="white"
      >
        <span>Flow Direction</span>
      </StyledMenuItem>
      <StyledMenuItem
        bordercolor="lightBg"
        hoverbgcolor="darkGray"
        hovercolor="white"
      >
        <span>ServiceLocationNumber</span>
      </StyledMenuItem>
      <StyledMenuItem
        bordercolor="lightBg"
        hoverbgcolor="darkGray"
        hovercolor="white"
      >
        <span>Substation</span>
      </StyledMenuItem>
      <StyledMenuItem
        bordercolor="lightBg"
        hoverbgcolor="darkGray"
        hovercolor="white"
      >
        <span>Feeder</span>
      </StyledMenuItem>
      <StyledMenuItem
        bordercolor="lightBg"
        hoverbgcolor="darkGray"
        hovercolor="white"
      >
        <span>Zip Code</span>
      </StyledMenuItem>
      <StyledMenuItem
        bordercolor="lightBg"
        hoverbgcolor="darkGray"
        hovercolor="white"
      >
        <span>Meter Type</span>
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
                      moveRangeOnFirstSelection={false}
                      ranges={dateRange}
                      direction="horizontal"
                      scroll={{
                        enabled: true,
                        monthWidth: 227,
                        monthHeight: 100,
                        longMonthHeight: 170,
                        calendarWidth: 214,
                      }}
                      rangeColors={[colors.algaeGreen]}
                      color={colors.lightGray}
                      showMonthAndYearPickers={false}
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
            key={graphNames[index]}
            title={graphNames[index]}
            data={data}
            dateTimeFilterValue={dateTimeFilterValue}
            index={index}
            maxY={graphsMaxY[index][dateTimeFilterValue]}
            yUnit={index in graphsYUnit ? graphsYUnit[index] : 'kWh'}
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
      {/* <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <StyledDashboardsGraphsGrid
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </StyledDashboardsGraphsGrid>
          )}
        </Droppable>
      </DragDropContext> */}
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
};

const mapStateToProps = (state) => ({
  dashboards: state.dashboards.dashboards,
  currentDashboard: state.dashboards.currentDashboard,
  PGELoadProfile: state.dashboards.PGELoadProfile,
});

const mapDispatch = (dispatch) => bindActionCreators({
  getDashboards: getDashboardsAction,
  deleteDashboard: deleteDashboardAction,
  setCurrentDashboard: setCurrentDashboardAction,
  getPGELoadProfile: getPGELoadProfileAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatch)(Dashboards);
