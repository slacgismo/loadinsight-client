import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser as loginUserAction } from 'actions/user';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { ROUTE_DASHBOARDS } from 'config/routes';
import styles from './index.module.css';

class Login extends Component {
  constructor() {
    super();
    this.onEmailChanged = this.onEmailChanged.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    this.onLoginClicked = this.onLoginClicked.bind(this);
    this.state = {
      email: null,
      password: null,
    };
  }

  componentDidUpdate() {
    const { userProfile, history } = this.props;
    if (userProfile) {
      history.push(ROUTE_DASHBOARDS);
    }
  }

  onEmailChanged(e) {
    this.setState({ email: e.target.value });
  }

  onPasswordChanged(e) {
    this.setState({ password: e.target.value });
  }

  onLoginClicked() {
    const { email, password } = this.state;
    const { loginUser, isLoggingIn } = this.props;

    if (!isLoggingIn) {
      loginUser(email, password);
    }
  }

  render() {
    const { loginError } = this.props;
    const errorStyle = loginError ? styles.active : styles.inactive;

    return (
      <div className={styles.root}>
        <div className={styles.header}>Welcome to LoadInsight</div>
        <div className={styles.form}>
          <div className={styles.title}>Sign In</div>
          <div>
            <input className={styles.textField} placeholder="EMAIL" onChange={this.onEmailChanged} />
          </div>
          <div>
            <input type="password" className={styles.textField} placeholder="PASSWORD" onChange={this.onPasswordChanged} />
          </div>
          <div className={`${styles.error} ${errorStyle}`}>
            Invalid credentials entered.
          </div>
          <div className={styles.button} role="button" tabIndex={0} onClick={this.onLoginClicked} onKeyPress={this.onLoginClicked}>
            Sign In
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  loginUser: PropTypes.func.isRequired,
  userProfile: PropTypes.shape({}),
  isLoggingIn: PropTypes.bool,
  loginError: PropTypes.node,
};

Login.defaultProps = {
  userProfile: undefined,
  isLoggingIn: false,
  loginError: undefined,
};

const mapStateToProps = (state) => ({
  userProfile: state.user.profile,
  isLoggingIn: state.user.isLoggingIn,
  loginError: state.user.loginError,
});

const mapDispatch = (dispatch) => bindActionCreators({
  loginUser: loginUserAction,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatch)(Login));
