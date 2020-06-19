import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import PropTypes from 'prop-types';
import moment from 'moment';

import colors from 'styles/colors';
import { StyledLegendIcon } from 'styles/dashboards';

const LineGraph = ({
  data, dateTimeFilterValue, index = 0, maxY = 'auto',
}) => {
  const graphColors = [colors.yellow, colors.lightGreen, colors.oceanGreen, colors.green];

  let tickValues = 'every hour';
  let axisBottomFormat = '%-I %p';
  if (dateTimeFilterValue !== 1) {
    tickValues = 'every day';
    axisBottomFormat = '%d';
  }

  const theme = {
    fontSize: '12px',
    textColor: colors.gray20,
    crosshair: {
      line: {
        stroke: colors.gray,
        strokeWidth: 1,
        strokeOpacity: 1,
        strokeDasharray: '3 3',
      },
    },
    axis: {
      domain: {
        line: {
          stroke: colors.lightOverlay20,
          strokeWidth: 1,
        },
      },
      range: {
        line: {
          stroke: colors.lightOverlay20,
          strokeWidth: 1,
        },
      },
      legend: {
        text: {
          fontSize: 12,
          fill: colors.gray,
          fontWeight: 'bold',
        },
      },
      ticks: {
        text: {
          fontSize: 12,
          fill: colors.gray20,
          fontWeight: 400,
        },
      },
    },
    grid: {
      line: {
        stroke: colors.lightOverlay20,
        strokeWidth: 1,
      },
    },
    tooltip: {
      container: {
        background: 'white',
        color: colors.gray,
        fontSize: 12,
        lineHeight: '20px',
        borderRadius: '2px',
        boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.05)',
        padding: '5px 9px',
        border: `1px solid ${colors.lightGray}`,
        display: 'grid',
        gridTemplateColumns: '16px 1fr',
        gridGap: '5px',
      },
      basic: {
        whiteSpace: 'pre',
        display: 'flex',
        alignItems: 'center',
      },
      table: {},
      tableCell: {
        padding: '3px 5px',
      },
    },
  };

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
      xFormat="time:%b %d, %Y|%H:%M:%S"
      yScale={{
        type: 'linear', min: 0, max: maxY, stacked: true, reverse: false, precision: '0.1',
      }}
      yFormat={(value) => Math.floor(value)}
      tooltip={({ point }) => {
        const { xFormatted, yFormatted } = point.data;
        const { serieColor } = point;
        const [date, time] = xFormatted.split('|');
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
        legend: 'Energy Used (kWh)',
        legendOffset: -72,
        legendPosition: 'middle',
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
};

export default LineGraph;
