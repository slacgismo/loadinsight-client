import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Space } from 'antd';
import moment from 'moment';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// import reorder from 'util/reorder';
import { getDashboards as getDashboardsAction } from 'actions/dashboards';
import MenuOutlined from 'icons/MenuOutlined';
import DownOutlined from 'icons/DownOutlined';
import {
  StyledTitle,
  StyledH2,
  StyledH4,
  StyledButton,
  StyledMenu,
  StyledMenuItem,
  StyledDropdown,
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

const Dashboards = ({ getDashboards, dashboards = [] }) => {
  useEffect(() => {
    getDashboards();
  }, [getDashboards]);

  const [dateTimeFilterValue, setDateTimeFilterValue] = useState(1); // in days

  const dashboardsMenu = (
    <StyledDashboardsMenu>
      <StyledDashboardsMenuItem>
        Holy Cross Energy
      </StyledDashboardsMenuItem>
      <StyledDashboardsMenuItem>
        PG&E Load Profile
      </StyledDashboardsMenuItem>
      <StyledDashboardsMenuItem>
        Silicon Valley Clean Energy
      </StyledDashboardsMenuItem>
      <StyledDashboardsMenuItem size="small">
        + Add a new dashboard
      </StyledDashboardsMenuItem>
    </StyledDashboardsMenu>
  );

  const [sharePopoverVisible, setSharePopoverVisible] = useState(false);
  const [addChartModalVisible, setAddChartModalVisible] = useState(false);

  const toggleSharePopoverVisible = () => setSharePopoverVisible(!sharePopoverVisible);
  const toggleAddChartModal = () => setAddChartModalVisible(!addChartModalVisible);

  const dashboardMenu = (
    <StyledDashboardsMenu>
      <StyledDashboardsMenuItem>
        Holy Cross Dashboard
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
      <StyledDashboardsMenuItem size="small" color="orangeRed">
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

    if (dashboards.length) {
      const { charts } = dashboards[0]; // show only first dashboard

      charts.forEach(({
        name, maxY, yUnit, datasets,
      }, index) => {
        graphNames.push(name);
        graphsMaxY.push(maxY);
        graphsYUnit.push(yUnit);

        datasets.forEach((set) => {
          const { id, data } = set;

          ([1, 7, 31]).forEach((filterValue) => {
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
      });
    }

    return [graphsData, graphNames, graphsMaxY, graphsYUnit];
  };

  const [
    graphsData,
    graphNames,
    graphsMaxY,
    graphsYUnit,
  ] = useMemo(getGraphs, [dashboards]);

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
    </StyledMenu>
  );

  const dateTimeFilterOptions = {
    1: 'Last 24 hours',
    7: 'Last week',
    31: 'Last month',
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
          <StyledButton size="small">
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
            />
          )}
          <StyledDashboardsDropdown overlay={dashboardMenu}>
            <span>
              <MenuOutlined />
            </span>
          </StyledDashboardsDropdown>
          <StyledH2 color="white">Holy Cross Dashboard</StyledH2>
          <Space size={25}>
            <StyledDashboardsSummaryCard>
              <StyledH4 color="algaeGreen">Update Status</StyledH4>
              Last updated 3 minutes ago
            </StyledDashboardsSummaryCard>
            <StyledDashboardsSummaryCard>
              <StyledH4 color="algaeGreen">Filter by</StyledH4>
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
        </div>
      </StyledDashboardsHeader>
      <StyledDashboardsGraphsGrid>
        {graphsData[dateTimeFilterValue].map((data, index) => (
          <Graph
            key={graphNames[index]}
            title={graphNames[index]}
            data={data}
            dateTimeFilterValue={dateTimeFilterValue}
            index={index}
            maxY={index in graphsMaxY ? graphsMaxY[index][dateTimeFilterValue] : 'auto'}
            yUnit={index in graphsYUnit ? graphsYUnit[index] : 'kWh'}
          />
        ))}
      </StyledDashboardsGraphsGrid>
      {addChartModalVisible && (
        <AddChartModal
          handleOk={toggleAddChartModal}
          handleCancel={toggleAddChartModal}
          index={graphsData[dateTimeFilterValue].length}
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
};

const mapStateToProps = (state) => ({
  dashboards: state.dashboards.dashboards,
});

const mapDispatch = (dispatch) => bindActionCreators({
  getDashboards: getDashboardsAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatch)(Dashboards);
