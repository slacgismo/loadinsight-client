import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
  yUnit,
  showMenu,
  graphheight,
  removeChart,
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
    <StyledDashboardsGraph graphheight={graphheight}>
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
        dateTimeFilterValue={dateTimeFilterValue}
        index={index}
        maxY={maxY}
        yUnit={yUnit}
        hasTitleMargin={!!title}
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
  dateTimeFilterValue: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  maxY: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  yUnit: PropTypes.string,
  showMenu: PropTypes.bool,
  graphheight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  removeChart: PropTypes.func.isRequired,
};

Graph.defaultProps = {
  title: '',
  maxY: 'auto',
  yUnit: '',
  showMenu: true,
  graphheight: null,
};

const mapDispatch = (dispatch) => bindActionCreators({
  removeChart: removeChartAction,
}, dispatch);

export default connect(undefined, mapDispatch)(Graph);
