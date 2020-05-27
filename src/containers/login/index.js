import React, { Component } from 'react';
import { Input, Button } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser as loginUserAction } from 'actions/user';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
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
      history.push('/dashboards');
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
    const { loginUser } = this.props;

    loginUser(email, password);
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.header}>Welcome to LoadInsight</div>
        <div>
          <Input className={styles.textField} placeholder="Email" onChange={this.onEmailChanged} />
        </div>
        <div>
          <Input type="password" className={styles.textField} placeholder="Password" onChange={this.onPasswordChanged} />
        </div>
        <Button className={styles.button} htmlType="submit" onClick={this.onLoginClicked}>
          Sign In
        </Button>
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
};

Login.defaultProps = {
  userProfile: undefined,
};

const mapStateToProps = (state) => ({
  userProfile: state.user.profile,
});

const mapDispatch = (dispatch) => bindActionCreators({
  loginUser: loginUserAction,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatch)(Login));
