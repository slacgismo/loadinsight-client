import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown, Space } from 'antd';
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

  const toggleSharePopoverVisible = () => setSharePopoverVisible(!sharePopoverVisible);

  const dashboardMenu = (
    <StyledDashboardsMenu>
      <StyledDashboardsMenuItem>
        Holy Cross Dashboard
      </StyledDashboardsMenuItem>
      <StyledDashboardsMenuItem size="small">
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

  const graphsData = [];

  if (dashboards.length) {
    const { name, datasets } = dashboards[0];

    datasets.forEach((dataset, index) => {
      const momentEnd = moment(dataset[dataset.length - 1].x).subtract(1, 'hour');
      const momentStart = momentEnd.subtract(dateTimeFilterValue, 'days');

      let sampleDataset = dataset.filter(({ x }) => moment(x).isAfter(momentStart));

      const ratio = Math.ceil(dataset.length / 10000); // this works really nicely, every 4th
      if (sampleDataset.length > 1000) {
        sampleDataset = sampleDataset.filter((point, i) => i % ratio === 0);
      }

      graphsData.push([{
        id: `${name}${index}`,
        data: sampleDataset,
      }]);
    });
  }

  const graphNames = [
    'Load Profile - 15 minutes',
    'Load Profile - 60 minutes',
  ];

  const graphsMaxY = [
    {
      1: 16000,
      7: 22000,
      31: 24000,
    },
    {
      1: 220000,
      7: 220000,
      31: 220000,
    },
  ];

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
        borderColor="lightBg"
        hoverBgColor="darkGray"
        hoverColor="white"
        onClick={() => setDateTimeFilterValue(1)}
      >
        <span>Last 24 hours</span>
      </StyledMenuItem>
      <StyledMenuItem
        borderColor="lightBg"
        hoverBgColor="darkGray"
        hoverColor="white"
        onClick={() => setDateTimeFilterValue(7)}
      >
        <span>Last week</span>
      </StyledMenuItem>
      <StyledMenuItem
        borderColor="lightBg"
        hoverBgColor="darkGray"
        hoverColor="white"
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
        borderColor="lightBg"
        hoverBgColor="darkGray"
        hoverColor="white"
      >
        <span>Energy Used (kWh)</span>
      </StyledMenuItem>
      <StyledMenuItem
        borderColor="lightBg"
        hoverBgColor="darkGray"
        hoverColor="white"
      >
        <span>AMI Meter ID</span>
      </StyledMenuItem>
      <StyledMenuItem
        borderColor="lightBg"
        hoverBgColor="darkGray"
        hoverColor="white"
      >
        <span>Channel</span>
      </StyledMenuItem>
      <StyledMenuItem
        borderColor="lightBg"
        hoverBgColor="darkGray"
        hoverColor="white"
      >
        <span>Flow Direction</span>
      </StyledMenuItem>
      <StyledMenuItem
        borderColor="lightBg"
        hoverBgColor="darkGray"
        hoverColor="white"
      >
        <span>ServiceLocationNumber</span>
      </StyledMenuItem>
      <StyledMenuItem
        borderColor="lightBg"
        hoverBgColor="darkGray"
        hoverColor="white"
      >
        <span>Substation</span>
      </StyledMenuItem>
      <StyledMenuItem
        borderColor="lightBg"
        hoverBgColor="darkGray"
        hoverColor="white"
      >
        <span>Feeder</span>
      </StyledMenuItem>
      <StyledMenuItem
        borderColor="lightBg"
        hoverBgColor="darkGray"
        hoverColor="white"
      >
        <span>Zip Code</span>
      </StyledMenuItem>
      <StyledMenuItem
        borderColor="lightBg"
        hoverBgColor="darkGray"
        hoverColor="white"
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
              <Dropdown overlay={dateTimeFilterMenu}>
                <div>
                  {dateTimeFilterOptions[dateTimeFilterValue]}
                  <DownOutlined color="algaeGreen" />
                </div>
              </Dropdown>
            </StyledDashboardsSummaryCard>
            <StyledDashboardsSummaryCard>
              <StyledH4 color="algaeGreen">Additional Filter</StyledH4>
              <Dropdown overlay={additionalFilterMenu}>
                <div>
                  Energy Used (kWh)
                  <DownOutlined color="algaeGreen" />
                </div>
              </Dropdown>
            </StyledDashboardsSummaryCard>
          </Space>
        </div>
      </StyledDashboardsHeader>
      <StyledDashboardsGraphsGrid>
        {graphsData.map((data, i) => (
          <Graph
            key={graphNames[i]}
            title={graphNames[i]}
            data={data}
            dateTimeFilterValue={dateTimeFilterValue}
            index={i}
            maxY={graphsMaxY[i][dateTimeFilterValue]}
            yUnit={(i === 1 ? 'MWh' : 'kWh')}
          />
        ))}
      </StyledDashboardsGraphsGrid>
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
  dashboards: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    datasets: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.string.isRequired,
      y: PropTypes.number.isRequired,
    }))).isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  dashboards: state.dashboards.dashboards,
});

const mapDispatch = (dispatch) => bindActionCreators({
  getDashboards: getDashboardsAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatch)(Dashboards);
