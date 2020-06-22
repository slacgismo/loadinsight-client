import colors from 'styles/colors';

export default {
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
