import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Space, Button, Dropdown } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

import { getPipelines as getPipelinesAction } from 'actions/pipelines';
import { addChart as addChartAction } from 'actions/dashboards';
import {
  StyledText,
  StyledH3,
  StyledButton,
  StyledInput,
  StyledModal,
  StyledModalGrid,
  StyledModalCard,
  StyledModalLabel,
  StyledMenu,
  StyledMenuItem,
  StyledDropdown,
  StyledGrid,
} from 'styles/app';
import {
  StyledAxisItem,
} from 'styles/dashboards';
import DownOutlined from 'icons/DownOutlined';
import CloseOutlined from 'icons/CloseOutlined';
import LinesImg from './images/lines.png';
import DonutImg from './images/donut.png';
import MapImg from './images/map.png';
import Graph from '../Graph';

function AddChartModal({
  handleOk,
  handleCancel,
  pipelines,
  getPipelines,
  PGELoadProfile,
  addChart,
  index,
}) {
  useEffect(() => {
    if (!pipelines.length) getPipelines();
  }, [pipelines, getPipelines]);

  const [step, setStep] = useState(0);

  const [pipeline, setPipeline] = useState();

  const [chartType, setChartType] = useState();

  const [graphName, setGraphName] = useState();

  const [xAxis, setXAxis] = useState();

  const [yAxis, setYAxis] = useState([]);

  const Y_AXIS_LIMIT = 5;

  const addYAxis = (item) => {
    if (yAxis.length < Y_AXIS_LIMIT) {
      const axes = yAxis.filter((axisItem) => axisItem !== item);
      axes.push(item);
      setYAxis(axes);
    }
  };

  const removeYAxis = (item) => {
    const axes = yAxis.filter((axisItem) => axisItem !== item);
    setYAxis(axes);
  };

  const chartTypesMenu = (
    <StyledMenu>
      <StyledMenuItem
        bordercolor="lightBg"
        hoverbgcolor="darkGray"
        hovercolor="white"
      >
        <span>Line Chart</span>
      </StyledMenuItem>
      <StyledMenuItem
        bordercolor="lightBg"
        hoverbgcolor="darkGray"
        hovercolor="white"
      >
        <span>Donut Chart</span>
      </StyledMenuItem>
      <StyledMenuItem
        bordercolor="lightBg"
        hoverbgcolor="darkGray"
        hovercolor="white"
      >
        <span>Map</span>
      </StyledMenuItem>
    </StyledMenu>
  );

  const tariffs = Object.keys(PGELoadProfile);

  const xAxisMenu = (
    <StyledMenu>
      <StyledMenuItem
        onClick={() => setXAxis('DateTime')}
        bordercolor="lightBg"
        hoverbgcolor="darkGray"
        hovercolor="white"
      >
        <span>DateTime</span>
      </StyledMenuItem>
      {tariffs.map((axis) => (
        <StyledMenuItem
          onClick={() => setXAxis(axis)}
          bordercolor="lightBg"
          hoverbgcolor="darkGray"
          hovercolor="white"
        >
          <span>
            {axis}
          </span>
        </StyledMenuItem>
      ))}
    </StyledMenu>
  );

  const yAxisMenu = (
    <StyledMenu>
      <StyledMenuItem
        onClick={() => addYAxis('DateTime')}
        bordercolor="lightBg"
        hoverbgcolor="darkGray"
        hovercolor="white"
      >
        <span>DateTime</span>
      </StyledMenuItem>
      {tariffs.map((axis) => (
        <StyledMenuItem
          onClick={() => addYAxis(axis)}
          bordercolor="lightBg"
          hoverbgcolor="darkGray"
          hovercolor="white"
        >
          <span>
            {axis}
          </span>
        </StyledMenuItem>
      ))}
    </StyledMenu>
  );

  const graphDataPreview = [];

  yAxis.forEach((tariff) => {
    const loadProfile = PGELoadProfile[tariff] || [];
    const data = [];

    if (loadProfile.length) {
      const { x } = loadProfile[loadProfile.length - 1];
      const momentStart = moment(x).subtract(7, 'days').startOf('day');
      const xStart = momentStart.format('YYYY-MM-DD HH');

      for (let i = loadProfile.length - 1; i >= 0; i -= 1) { // start from the end
        data.push(loadProfile[i]);
        if (loadProfile[i].x.match(xStart)) {
          break;
        }
      }

      graphDataPreview.push({
        id: tariff,
        data,
      });
    }
  });


  const steps = [
    <>
      <StyledH3>Select a pipeline</StyledH3>
      <Space direction="vertical" size={36} align="center">
        <Space direction="vertical" size={16} align="center">
          {pipelines.map(({ name: pipelineName }) => (
            <StyledGrid
              key={pipelineName}
              gridTemplateColumns="510px 124px"
              padding="12px 36px 12px 20px"
              margin="0 0 0 -10px"
              width="calc(100% + 10px)"
              bgcolor="white"
            >
              <StyledText
                size="middle"
                fontweight="bold"
              >
                {pipelineName}
              </StyledText>
              <StyledButton
                onClick={() => setPipeline(pipelineName)}
                active={pipeline === index ? 'active' : null}
                size="large"
                color="gray80"
                hoverbgcolor="green"
                height={48}
              >
                Select
              </StyledButton>
            </StyledGrid>
          ))}
        </Space>
        <StyledButton
          onClick={() => {
            setStep(1);
          }}
          disabled={!pipeline}
          color="blue"
          size="large"
          width={104}
          align="center"
        >
          Next
        </StyledButton>
      </Space>
    </>,
    <>
      <StyledH3 align="left">Select chart type</StyledH3>
      <Space direction="vertical" size={44} align="center">
        <div />
        <StyledModalGrid>
          <StyledModalCard height={178}>
            <Button onClick={() => setChartType('line')}>
              <StyledModalLabel>Line Chart</StyledModalLabel>
              <img src={LinesImg} alt="Lines" />
            </Button>
          </StyledModalCard>
          <StyledModalCard height={178}>
            <Button>
              <StyledModalLabel>Donut Chart</StyledModalLabel>
              <img src={DonutImg} alt="Donut" />
            </Button>
          </StyledModalCard>
          <StyledModalCard height={178}>
            <Button>
              <StyledModalLabel>Map</StyledModalLabel>
              <img src={MapImg} alt="Map" />
            </Button>
          </StyledModalCard>
        </StyledModalGrid>
        <StyledButton
          onClick={() => setStep(2)}
          active={chartType}
          disabled={!chartType}
          color="blue"
          size="large"
          width={104}
        >
          Next
        </StyledButton>
      </Space>
    </>,
    <Space direction="vertical" size={16}>
      <StyledDropdown overlay={chartTypesMenu} bordercolor="lightGray">
        <div>
          Line Chart
          <DownOutlined color="darkGray" />
        </div>
      </StyledDropdown>
      <StyledInput
        onChange={(event) => setGraphName(event.target.value)}
        bgcolor="white"
        fontWeight="500"
        placeholder="Edit Name of Chart"
        value={graphName}
      />
      <Graph
        data={xAxis && yAxis.length ? graphDataPreview : []}
        dateTimeFilterValue={7}
        index={index}
        yUnit="kWh"
        showMenu={false}
        hasTitleMargin={false}
        minheight="33vh"
      />
      <Space size={84} align="top">
        <Space direction="vertical" size={16}>
          <StyledText indent={8} fontweight={500}>X-axis</StyledText>
          <Dropdown overlay={xAxisMenu}>
            <StyledAxisItem active={xAxis ? 'active' : null}>
              {xAxis || (
              <StyledText color="lightGray" fontweight="500">
                Add X-axis
              </StyledText>
              )}
              {xAxis && <CloseOutlined onClick={() => setXAxis(null)} />}
            </StyledAxisItem>
          </Dropdown>
          <div />
          <StyledButton
            onClick={(event) => {
              addChart(graphName, yAxis, xAxis);
              handleOk(event);
            }}
            disabled={!xAxis || !yAxis.length}
            size="middle"
            color="blue"
            width={124}
            height={48}
          >
            Add Chart
          </StyledButton>
        </Space>
        <Space direction="vertical" size={16}>
          <Space size={8} align="baseline">
            <StyledText indent={8} fontweight={500}>Y-axis</StyledText>
            <Dropdown overlay={yAxisMenu}>
              <StyledButton type="text" size="small" color="transparent">
                + Add Column
              </StyledButton>
            </Dropdown>
            <small>(max 5 columns)</small>
          </Space>
          {yAxis.map((axisItem, axisIndex) => (
            <StyledAxisItem active>
              <Space size={25}>
                <StyledText color="lightGray" fontweight="500">
                  {`Column ${axisIndex + 1}`}
                </StyledText>
                {axisItem}
              </Space>
              {yAxis && <CloseOutlined onClick={() => removeYAxis(axisItem)} />}
            </StyledAxisItem>
          ))}
          {!yAxis.length && (
            <StyledAxisItem>
              Add Y-axis
            </StyledAxisItem>
          )}
        </Space>
      </Space>
    </Space>,
  ];

  return (
    <StyledModal
      title="Add a Chart"
      visible
      footer={null}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {step in steps && steps[step]}
    </StyledModal>
  );
}

AddChartModal.propTypes = {
  pipelines: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    last_updated: PropTypes.string.isRequired,
  })).isRequired,
  PGELoadProfile: PropTypes.objectOf(PropTypes.array).isRequired,
  getPipelines: PropTypes.func.isRequired,
  addChart: PropTypes.func.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  index: PropTypes.number,
};

AddChartModal.defaultProps = {
  index: 0,
};

const mapStateToProps = (state) => ({
  pipelines: state.pipelines.pipelines,
  PGELoadProfile: state.dashboards.PGELoadProfile,
});

const mapDispatch = (dispatch) => bindActionCreators({
  getPipelines: getPipelinesAction,
  addChart: addChartAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatch)(AddChartModal);
