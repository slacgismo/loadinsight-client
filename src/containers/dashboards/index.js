import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Space } from 'antd';

import { Line } from 'react-chartjs-2';

import {
  StyledTitle,
  StyledH2,
  StyledH3,
  StyledH4,
} from 'styles/app';
import {
  StyledDashboardHeader,
  StyledDashboardSummaryCard,
  StyledDashboardGraph,
  StyledDashboardGraphSpace,
} from 'styles/dashboards';

export default () => {
  const data = [
    {
      id: 'japan',
      color: 'hsl(329, 70%, 50%)',
      data: [
        {
          x: 'April',
          y: 8,
        },
        {
          x: 'May',
          y: 135,
        },
        {
          x: 'June',
          y: 176,
        },
        {
          x: 'July',
          y: 142,
        },
        {
          x: 'August',
          y: 252,
        },
        {
          x: 'September',
          y: 59,
        },
        {
          x: 'October',
          y: 197,
        },
        {
          x: 'November',
          y: 25,
        },
        {
          x: 'December',
          y: 206,
        },
        {
          x: 'January',
          y: 175,
        },
        {
          x: 'February',
          y: 73,
        },
        {
          x: 'March',
          y: 36,
        },
      ],
    },
    {
      id: 'france',
      color: 'hsl(232, 70%, 50%)',
      data: [
        {
          x: 'April',
          y: 118,
        },
        {
          x: 'May',
          y: 226,
        },
        {
          x: 'June',
          y: 275,
        },
        {
          x: 'July',
          y: 45,
        },
        {
          x: 'August',
          y: 66,
        },
        {
          x: 'September',
          y: 28,
        },
        {
          x: 'October',
          y: 41,
        },
        {
          x: 'November',
          y: 296,
        },
        {
          x: 'December',
          y: 65,
        },
        {
          x: 'January',
          y: 169,
        },
        {
          x: 'February',
          y: 221,
        },
        {
          x: 'March',
          y: 141,
        },
      ],
    },
    {
      id: 'us',
      color: 'hsl(44, 70%, 50%)',
      data: [
        {
          x: 'April',
          y: 230,
        },
        {
          x: 'May',
          y: 171,
        },
        {
          x: 'June',
          y: 179,
        },
        {
          x: 'July',
          y: 191,
        },
        {
          x: 'August',
          y: 210,
        },
        {
          x: 'September',
          y: 64,
        },
        {
          x: 'October',
          y: 196,
        },
        {
          x: 'November',
          y: 229,
        },
        {
          x: 'December',
          y: 227,
        },
        {
          x: 'January',
          y: 247,
        },
        {
          x: 'February',
          y: 76,
        },
        {
          x: 'March',
          y: 152,
        },
      ],
    },
    {
      id: 'germany',
      color: 'hsl(229, 70%, 50%)',
      data: [
        {
          x: 'April',
          y: 174,
        },
        {
          x: 'May',
          y: 253,
        },
        {
          x: 'June',
          y: 130,
        },
        {
          x: 'July',
          y: 73,
        },
        {
          x: 'August',
          y: 165,
        },
        {
          x: 'September',
          y: 70,
        },
        {
          x: 'October',
          y: 90,
        },
        {
          x: 'November',
          y: 179,
        },
        {
          x: 'December',
          y: 127,
        },
        {
          x: 'January',
          y: 25,
        },
        {
          x: 'February',
          y: 101,
        },
        {
          x: 'March',
          y: 156,
        },
      ],
    },
  ];

  const MyResponsiveLine = ({ data /* see data tab */ }) => (
    <ResponsiveLine
      data={data}
      margin={{
        top: 50, right: 110, bottom: 50, left: 60,
      }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false,
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Date Time',
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Energy Used',
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      colors={['#FEDF88', '#76C2AD', '#3BA889', '#318466']}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabel="y"
      pointLabelYOffset={-12}
      useMesh
    />
  );

  const chartData = {
    labels: ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March'],
    datasets: [
      {
        label: 'First dataset',
        data: [8, 135, 176, 142, 252, 59, 197, 25, 206, 175, 73, 36],
        fill: false,
        backgroundColor: '#3BA889',
        borderColor: '#3BA889',
        lineTension: 0
      },
      {
        label: 'Second dataset',
        data: [118, 226, 275, 45, 66, 28, 41, 296, 65, 169, 221, 141],
        fill: false,
        backgroundColor: '#95E1CC',
        borderColor: '#95E1CC',
      },
      {
        label: 'Third dataset',
        data: [230, 171, 179, 191, 210, 64, 196, 229, 227, 247, 76, 152],
        fill: false,
        backgroundColor: '#76C2AD',
        borderColor: '#76C2AD',
      },
      {
        label: 'Holy Cross',
        data: [174, 253, 130, 73, 165, 70, 90, 179, 127, 25, 101, 156],
        fill: false,
        backgroundColor: '#FEDF88',
        borderColor: '#FEDF88',
      },
    ],
  };

  const chartOptions = {
    options: {
      legend: {
        display: false,
      },
    },
  };

  const options = {
    elements: {
      line: {
        tension: 0
      }
    }
  };

  return (
    <>
      <StyledTitle margin={0}>
        Dashboards
      </StyledTitle>
      <StyledDashboardHeader>
        <StyledH2 color="white">Load Profile</StyledH2>
        <Space size={25} style={{ marginLeft: 20 }}>
          <StyledDashboardSummaryCard>
            <StyledH3 color="algaeGreen">Update Status</StyledH3>
            Last updated 3 minutes ago
          </StyledDashboardSummaryCard>
          <StyledDashboardSummaryCard>
            <StyledH3 color="algaeGreen">Filter by</StyledH3>
            Last 7 days
          </StyledDashboardSummaryCard>
          <StyledDashboardSummaryCard>
            <StyledH3 color="algaeGreen">Average Source Update</StyledH3>
            Content copy appears here
          </StyledDashboardSummaryCard>
          <StyledDashboardSummaryCard>
            <StyledH3 color="algaeGreen">Need Additional Status</StyledH3>
            Main copy here
          </StyledDashboardSummaryCard>
        </Space>
      </StyledDashboardHeader>
      <StyledDashboardGraphSpace direction="vertical" size="middle">
        <StyledDashboardGraph>
          <StyledH4>Load Profile Composition by Tariff</StyledH4>
          <MyResponsiveLine data={data} />
        </StyledDashboardGraph>
        <StyledDashboardGraph>
          <Line data={chartData} legend={false} height={70} options={options} />
        </StyledDashboardGraph>
      </StyledDashboardGraphSpace>
    </>
  );
};
