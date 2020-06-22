import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import PropTypes from 'prop-types';
import moment from 'moment';

import colors from 'styles/colors';
import { StyledLegendIcon } from 'styles/dashboards';
import theme from './theme';

const LineGraph = ({
  data, dateTimeFilterValue, index = 0, maxY = 'auto', yUnit,
}) => {
  const graphColors = [colors.yellow, colors.lightGreen, colors.oceanGreen, colors.green];

  let tickValues = 'every hour';
  let axisBottomFormat = '%-I %p';
  if (dateTimeFilterValue !== 1) {
    tickValues = 'every day';
    axisBottomFormat = '%d';
  }

  const CustomTick = (tick) => {
    const {
      tickIndex, value, x, y,
    } = tick;
    const day = moment(value).format('DD');
    const showMonth = tickIndex === 0 || day === '01';

    return (
      <g transform={`translate(${x},${y + 28})`}>
        {showMonth && (
        <text
          textAnchor="middle"
          style={{
            ...theme.axis.ticks.text,
          }}
          transform="translate(0, -5)"
        >
          {moment(value).format('MMM')}
        </text>
        )}
        <text
          textAnchor="middle"
          style={{
            ...theme.axis.ticks.text,
            fontSize: showMonth ? 10 : 12,
          }}
          transform={showMonth ? 'translate(0, 5)' : ''}
        >
          {day}
        </text>
      </g>
    );
  };

  const ScaledYTick = (tick) => {
    const {
      value, x, y,
    } = tick;

    return (
      <g transform={`translate(${x - 28},${y})`}>
        <text
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            ...theme.axis.ticks.text,
          }}
        >
          {yUnit === 'MWh' ? value / 1000 : value}
        </text>
      </g>
    );
  };

  return (
    <ResponsiveLine
      data={data}
      margin={{
        top: 9, right: 20, bottom: 120, left: 78, // 4 or 5 is minimum to fit tick values
      }}
      xScale={{
        format: '%Y-%m-%d %H:%M:%S',
        type: 'time',
        precision: 'second',
      }}
      xFormat="time:%b %d, %Y|%H:%M:%S" // delimeter |
      yScale={{
        type: 'linear',
        min: 0,
        max: maxY,
      }}
      style={{ overflow: 'hidden' }}
      yFormat={(y) => (yUnit === 'MWh' ? (y / 1000).toFixed(1) : y)}
      tooltip={({ point }) => {
        const { xFormatted, yFormatted } = point.data;
        const { serieColor } = point;
        const [date, time] = xFormatted.split('|'); // split at delimeter |
        return (
          <div style={{ ...theme.tooltip.container }}>
            <StyledLegendIcon serieColor={serieColor} />
            <span>
              {date}
              <br />
              {time}
              <br />
              {yFormatted}
            </span>
          </div>
        );
      }}
      gridYValues={5}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: axisBottomFormat,
        tickValues,
        orient: 'bottom',
        tickSize: 0,
        tickPadding: 20,
        tickRotation: 0,
        // legend: 'December 2017',
        legendOffset: 46,
        legendPosition: 'middle',
        renderTick: CustomTick,
      }}
      axisLeft={{
        orient: 'left',
        tickValues: 5,
        tickSize: 0,
        tickPadding: 16,
        tickRotation: 0,
        legend: `Energy Used (${yUnit})`,
        legendOffset: -72,
        legendPosition: 'middle',
        renderTick: ScaledYTick,
      }}
      colors={graphColors[index]}
      pointSize={0} // could remove props related to point
      pointColor={{ theme: 'background' }}
      pointBorderWidth={1}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabel="y"
      pointLabelYOffset={-12}
      useMesh
      enableArea
      theme={theme}
      enableGridX={false}
      layers={['grid', 'markers', 'axes', 'areas', 'lines', 'points', 'slices', 'crosshair', 'mesh', 'legends']}
    />
  );
};

LineGraph.propTypes = {
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
  yUnit: PropTypes.string.isRequired,
};

export default LineGraph;
