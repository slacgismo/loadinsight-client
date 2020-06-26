import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Space, Button, Dropdown } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

import { getPipelines as getPipelinesAction } from 'actions/pipelines';
import {
  getPGELoadProfile as getPGELoadProfileAction,
  addChart as addChartAction,
} from 'actions/dashboards';
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
  getPGELoadProfile,
  addChart,
  index,
}) {
  useEffect(() => {
    if (!pipelines.length) getPipelines();
  }, [pipelines, getPipelines]);

  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!Object.keys(PGELoadProfile).length && step === 1) getPGELoadProfile();
  }, [PGELoadProfile, getPGELoadProfile, step]);

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
    </StyledMenu>
  );

  const yAxes = Object.keys(PGELoadProfile);

  const yAxisMenu = (
    <StyledMenu>
      {yAxes.map((axis) => (
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

  const graphData = [];
  const graphDataPreview = [];

  yAxis.forEach((tariff) => {
    const loadProfile = PGELoadProfile[tariff] || [];
    const data = [];

    const momentStart = moment(loadProfile[loadProfile.length - 1].x)
      .subtract(7, 'days').startOf('day');
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
    graphData.push({
      id: tariff,
      data: loadProfile,
    });
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
              addChart(graphName, graphData);
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
  getPGELoadProfile: PropTypes.func.isRequired,
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
  getPGELoadProfile: getPGELoadProfileAction,
  addChart: addChartAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatch)(AddChartModal);
