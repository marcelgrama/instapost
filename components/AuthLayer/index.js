import PropTypes from 'prop-types';
import React from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import Loader from '../Loader/index';
import fetch from '../../services/fetch';
import { signIn } from '../../actions/user';
import { getAuthToken } from '../../services/sessionStore';
import { authUser } from '../../api/endpoints';

class AuthLayer extends React.Component {
  constructor(props) {
    super(props);
    // TODO permisions
    this.state = { hasPermission: true };
  }

  componentDidMount() {
    this.checkPermission().then((hasPermission) => {
      if (hasPermission) {
        return this.setState({ hasPermission: true });
      }
      return Router.push(`/signin?redirect=${encodeURI(Router.router.asPath)}`);
    });
  }

  checkPermission = () => {
    const { authRequired, isUserAuth, dispatch } = this.props;

    const checkPermision = new Promise((resolve) => {
      if (authRequired) {
        if (isUserAuth) {
          return resolve(true);
        }
        const token = getAuthToken();
        if (token) {
          return fetch.get(authUser).then((response) => {
            const userData = response.data;
            dispatch(signIn(userData));
            return resolve(true);
          });
        }
        return resolve(false);
      }
      return resolve(true);
    });
    return checkPermision;
  };

  render() {
    const { hasPermission } = this.state;
    const { children } = this.props;
    return hasPermission ? children : <Loader />;
  }
}

AuthLayer.propTypes = {
  children: PropTypes.node.isRequired,
  isUserAuth: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  authRequired: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isUserAuth: state.User.isAuth,
});

export default connect(mapStateToProps)(AuthLayer);
