import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import PropTypes from 'prop-types';
import moment from 'moment';

import colors from 'styles/colors';
import { StyledLegendIcon } from 'styles/dashboards';
import theme from './theme';

const LineGraph = ({
  data, dateTimeFilterValue, index = 0, maxY = 'auto', yUnit, hasTitleMargin,
}) => {
  const graphColors = [
    colors.yellow,
    colors.lightGreen,
    colors.oceanGreen,
    colors.green,
    colors.gray40,
  ];
  const dataColors = [
    graphColors[index],
    graphColors[(index + 1) % 5],
    graphColors[(index + 2) % 5],
    graphColors[(index + 3) % 5],
    graphColors[(index + 4) % 5],
  ];

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
    const momentDate = moment(value);

    if (dateTimeFilterValue === 1) {
      return (
        <g transform={`translate(${x},${y + 28})`}>
          <text
            textAnchor="middle"
            style={{
              fontSIze: 12,
              ...theme.axis.ticks.text,
            }}
            transform="translate(0, -5)"
          >
            {momentDate.format('h')}
          </text>
          <text
            textAnchor="middle"
            style={{
              ...theme.axis.ticks.text,
              fontSize: 10,
            }}
            transform="translate(0, 5)"
          >
            {momentDate.format('A')}
          </text>
        </g>
      );
    }

    const day = momentDate.format('DD');
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
        top: hasTitleMargin ? 93 : 60,
        right: 30,
        bottom: 68,
        left: 98,
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
        stacked: true,
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
      gridXValues={dateTimeFilterValue === 1 ? 24 : dateTimeFilterValue}
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
      colors={dataColors}
      pointSize={0}
      useMesh
      enableArea
      theme={theme}
      layers={['grid', 'markers', 'axes', 'areas', 'lines', 'points', 'slices', 'crosshair', 'mesh', 'legends']}
    />
  );
};

LineGraph.propTypes = {
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
  yUnit: PropTypes.string.isRequired,
  hasTitleMargin: PropTypes.bool,
};

LineGraph.defaultProps = {
  hasTitleMargin: true,
  maxY: 'auto',
};

export default LineGraph;
