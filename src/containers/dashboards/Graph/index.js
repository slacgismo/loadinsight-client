import React from 'react';
import PropTypes from 'prop-types';

import {
  StyledDashboardsDropdown,
  StyledDashboardsGraph,
  StyledDashboardsMenu,
  StyledDashboardsMenuItem,
} from 'styles/dashboards';
import { StyledH3 } from 'styles/app';
import MenuOutlined from 'icons/MenuOutlined';
import LineGraph from './LineGraph';

const Graph = ({
  title, data, dateTimeFilterValue, index, maxY, yUnit,
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
          <div>
            <MenuOutlined color="darkGray" />
          </div>
        </StyledDashboardsDropdown>
        <StyledH3>{ title }</StyledH3>
        <LineGraph
          data={data}
          dateTimeFilterValue={dateTimeFilterValue}
          index={index}
          maxY={maxY}
        />
      </div>
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
  maxY: PropTypes.number.isRequired,
  yUnit: PropTypes.string,
};

Graph.defaultProps = {
  yUnit: '',
};

export default Graph;
