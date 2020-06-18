import React from 'react';
import PropTypes from 'prop-types';

import {
  StyledDashboardsDropdown,
  StyledDashboardsGraph,
  StyledDashboardsMenu,
  StyledDashboardsMenuItem,
  StyledDashboardsMenuLabel,
} from 'styles/dashboards';
import { StyledH3, StyledIcon } from 'styles/app';
import IconDragndrop from './images/icon-dragndrop.svg';
import LineGraph from './LineGraph';

const Graph = ({
  title, data, dateTimeFilterValue, index,
}) => {
  const graphsMenu = (
    <StyledDashboardsMenu>
      <StyledDashboardsMenuItem>
        Edit chart
      </StyledDashboardsMenuItem>
      <StyledDashboardsMenuItem size="small">
        Download CSV
      </StyledDashboardsMenuItem>
      <StyledDashboardsMenuItem size="small">
        Share Chart
      </StyledDashboardsMenuItem>
      <StyledDashboardsMenuItem size="small" color="orangeRed">
        Remove Chart
      </StyledDashboardsMenuItem>
    </StyledDashboardsMenu>
  );

  return (
    <StyledDashboardsGraph>
      <div>
        <StyledDashboardsDropdown overlay={graphsMenu}>
          <StyledDashboardsMenuLabel>
            <StyledIcon>
              <img src={IconDragndrop} alt="Drag Load Profile" />
            </StyledIcon>
          </StyledDashboardsMenuLabel>
        </StyledDashboardsDropdown>
        <StyledH3>{ title }</StyledH3>
      </div>
      <LineGraph
        data={data}
        dateTimeFilterValue={dateTimeFilterValue}
        index={index}
      />
    </StyledDashboardsGraph>
  );
};

Graph.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.string.isRequired,
      y: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
  dateTimeFilterValue: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default Graph;
