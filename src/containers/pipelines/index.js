import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPipelines as getPipelinesAction } from 'actions/pipelines';
import PropTypes from 'prop-types';
import Pipeline from './pipeline';
import styles from './index.module.css';

class Pipelines extends Component {
  componentDidMount() {
    const { getPipelines } = this.props;
    getPipelines();
  }

  render() {
    const { pipelines } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <div className={styles.title}>
            Pipelines
          </div>
          <div className={styles.addPipelineButton}>
            +Add Pipeline
          </div>
        </div>
        <div className={styles.pipelines}>
          {
                    pipelines.map((p) => (
                      <div className={styles.item}>
                        <Pipeline key={p.id} name={p.name} lastUpdated={p.last_updated} />
                      </div>
                    ))
                }
        </div>
      </div>
    );
  }
}

Pipelines.propTypes = {
  getPipelines: PropTypes.func.isRequired,
  pipelines: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    last_updated: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  pipelines: state.pipelines.pipelines,
});

const mapDispatch = (dispatch) => bindActionCreators({
  getPipelines: getPipelinesAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatch)(Pipelines);
