import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import PropTypes from 'prop-types';

import colors from 'styles/colors';

const LineGraph = ({ data, dateTimeFilterValue, index = 0 }) => {
  const graphColors = [colors.yellow, colors.lightGreen, colors.oceanGreen, colors.green];

  let tickValues = 'every hour';
  let axisBottomFormat = '%H:%M:%S';
  if (dateTimeFilterValue !== 1) {
    tickValues = 'every day';
    axisBottomFormat = '%Y-%m-%d';
  }

  return (
    <ResponsiveLine
      data={data}
      margin={{
        top: 4, right: 4, bottom: 150, left: 68, // 4 is minimum to fit tick values
      }}
      xScale={{
        format: '%Y-%m-%d %H:%M:%S',
        type: 'time',
        precision: 'second',
      }}
      xFormat="time:%Y-%m-%d %H:%M:%S"
      yScale={{
        type: 'linear', min: 0, max: 'auto', stacked: true, reverse: false,
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: axisBottomFormat,
        tickValues,
        orient: 'bottom',
        tickSize: 10,
        tickPadding: 5,
        tickRotation: -90,
        legend: 'Date and Time',
        legendOffset: 80,
        legendPosition: 'middle',
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Energy Used (kWh)',
        legendOffset: -62,
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
};

export default LineGraph;
