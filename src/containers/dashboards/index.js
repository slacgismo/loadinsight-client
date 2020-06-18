import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Space, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import moment from 'moment';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

//import reorder from 'util/reorder';
import { getDashboards as getDashboardsAction } from 'actions/dashboards';
import {
  StyledTitle,
  StyledH2,
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
  StyledDashboardsHeader,
  StyledDashboardsSummaryCard,
  StyledDashboardsGraphsGrid,
} from 'styles/dashboards';
import IconMenu from './images/icon-menu.svg';
import Graph from './Graph';

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

  const graphData = [];

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
      <StyledDashboardsMenuItem size="small">
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
      const momentEnd = moment(dataset[dataset.length - 1].x);
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

  /*const graphs = graphsData
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
    }))); // TODO: remove concat. doubled up for presentation purposes*/

  //const [items, setItems] = useState(graphs);

  /*const onDragEnd = ((result) => {
    if (!result.destination) return;

    setItems(reorder(
      items,
      result.source.index,
      result.destination.index,
    ));
  });*/

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
    </StyledMenu>
  );

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
          <StyledDashboardsDropdown overlay={dashboardMenu}>
            <StyledDashboardsMenuLabel>
              <StyledIcon>
                <img src={IconMenu} alt="Load Profile Menu" />
              </StyledIcon>
            </StyledDashboardsMenuLabel>
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
                <StyledMenuLabel color="white" borderColor="algaeGreen">
                  {dateTimeFilterOptions[dateTimeFilterValue]}
                  &nbsp;&nbsp;
                  <DownOutlined />
                </StyledMenuLabel>
              </Dropdown>
            </StyledDashboardsSummaryCard>
            <StyledDashboardsSummaryCard>
              <StyledH4 color="algaeGreen">Additional Filter</StyledH4>
              <Dropdown overlay={additionalFilterMenu}>
                <StyledMenuLabel color="white" borderColor="algaeGreen">
                  Energy Used (kWh)
                  &nbsp;&nbsp;
                  <DownOutlined />
                </StyledMenuLabel>
              </Dropdown>
            </StyledDashboardsSummaryCard>
            <StyledDashboardsSummaryCard>
              <StyledH4 color="algaeGreen">Average Source Update</StyledH4>
              Content copy appears here
            </StyledDashboardsSummaryCard>
          </Space>
        </div>
      </StyledDashboardsHeader>
      <StyledDashboardsGraphsGrid>
        {graphsData.map((data, i) => (
          <Graph
            key={`graph${i}`}
            title={graphNames[i]}
            data={data}
            dateTimeFilterValue={dateTimeFilterValue}
            index={i}
          />
        ))}
      </StyledDashboardsGraphsGrid>
      {/*<DragDropContext onDragEnd={onDragEnd}>
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
      </DragDropContext>*/}
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
