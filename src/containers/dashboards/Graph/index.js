import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';

import {
  removeChart as removeChartAction,
} from 'actions/dashboards';
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
  title,
  data,
  dateTimeFilterValue,
  index,
  maxY,
  showMenu,
  removeChart,
}) => {
  const headers = ['DateTime'];
  const hashedRows = new Map([]);

  let graphMax = 0;
  let yUnit = 'kWh';

  data.forEach(({ id, data: graphData }) => {
    headers.push(id);
    graphData.forEach(({ x, y }) => {
      if (hashedRows.has(x)) {
        hashedRows.get(x).push(y);
      } else {
        hashedRows.set(x, [x, y]);
      }

      const yTotal = hashedRows.get(x).slice(1).reduce((a, b) => (a + b), 0);
      if (yTotal > graphMax) graphMax = yTotal;
    });
  });

  if (graphMax >= 1000) {
    yUnit = 'MWh';
    graphMax = Math.ceil(graphMax / 1000) * 1000;
  } else if (graphMax === 0) {
    graphMax = 'auto';
  } else {
    graphMax = Math.ceil(graphMax / 10) * 10;
  }

  const csvData = [...hashedRows.values()];

  const graphsMenu = (
    <StyledDashboardsMenu>
      <StyledDashboardsMenuItem>
        Edit chart
      </StyledDashboardsMenuItem>
      <StyledDashboardsMenuItem size="small">
        <CSVLink
          data={csvData}
          filename={title || 'Untitled.csv'}
          headers={headers}
        >
          Download CSV
        </CSVLink>
      </StyledDashboardsMenuItem>
      <StyledDashboardsMenuItem size="small">
        Share Chart
      </StyledDashboardsMenuItem>
      <StyledDashboardsMenuItem
        onClick={() => removeChart(index)}
        size="small"
        olor="orangeRed"
      >
        Remove Chart
      </StyledDashboardsMenuItem>
    </StyledDashboardsMenu>
  );

  return (
    <StyledDashboardsGraph>
      <header>
        {showMenu && (
        <StyledDashboardsDropdown overlay={graphsMenu}>
          <div>
            <MenuOutlined color="darkGray" />
          </div>
        </StyledDashboardsDropdown>
        )}
        <StyledH3>{title}</StyledH3>
      </header>
      <LineGraph
        title={title}
        data={data}
        index={index}
        maxY={maxY || graphMax}
        yUnit={yUnit}
        hasTitleMargin={!!title}
        dateTimeFilterValue={dateTimeFilterValue}
      />
    </StyledDashboardsGraph>
  );
};

Graph.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
      y: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
  dateTimeFilterValue: PropTypes.number,
  index: PropTypes.number.isRequired,
  maxY: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showMenu: PropTypes.bool,
  removeChart: PropTypes.func.isRequired,
};

Graph.defaultProps = {
  title: '',
  showMenu: true,
  dateTimeFilterValue: null,
  maxY: 'auto',
};

const mapDispatch = (dispatch) => bindActionCreators({
  removeChart: removeChartAction,
}, dispatch);

export default connect(undefined, mapDispatch)(Graph);
