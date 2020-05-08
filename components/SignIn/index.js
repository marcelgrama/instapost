import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router from 'next/router';
import { connect } from 'react-redux';
import React from 'react';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import LinearProgress from '@material-ui/core/LinearProgress';
import Logo from '../Logo';
import fetch from '../../services/fetch';
import { setAuthToken } from '../../services/sessionStore';
import ErrorMsg from '../ErrorMsg';
import { signIn } from '../../actions/user';
import { OutterGrid, InnerGrid, ProgressWrapper, StyledPaper, StyledLink } from './style';
import { authSignin } from '../../api/endpoints';

const SignIn = class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.formData = {};
    this.state = {
      error: '',
    };
  }

  componentDidMount() {
    this.loadFbLoginApi();
  }

  signIn = ({ status, authResponse }) => {
    if (status !== 'connected') {
      this.setState({ error: status });
    } else {
      fetch
        .post(authSignin, authResponse)
        .then(() => {
          const { accessToken } = authResponse;
          if (accessToken) {
            setAuthToken(accessToken);

            if (this.props.redirectUrl) {
              Router.push(decodeURI(this.props.redirectUrl));
            } else {
              Router.push('/dashboard');
            }
          }
        })
        .catch((error) => {
          this.setState({ error });
        });
    }
  };

  handleFBLogin = () => {
    // eslint-disable-next-line no-undef
    FB.login((response) => {
      const getUserDetails = (res) => {
        this.props.dispatch(signIn(res));
      };
      if (response.status === 'connected') {
        // eslint-disable-next-line no-undef
        FB.api('/me', function (res) {
          getUserDetails(res);
        });
      } else if (response.status === 'not_authorized') {
        this.setState({ error: 'Please log into this app.' });
      } else {
        this.setState({ error: 'Please log into this facebook.' });
      }

      this.signIn(response);
    });
  };

  loadFbLoginApi() {
    // eslint-disable-next-line func-names
    window.fbAsyncInit = function () {
      // eslint-disable-next-line no-undef
      FB.init({
        appId: 233167624769391,
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.5', // use version 2.1
      });
    };

    // Load the SDK asynchronously
    // eslint-disable-next-line func-names
    (function (d, s, id) {
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=YOUR-APP'S-ID";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  render() {
    const { loading } = this.props;
    return (
      <OutterGrid
        container
        alignItems="center"
        direction="column"
        justify="center"
        className="main-grid"
        spacing={0}
      >
        <StyledPaper>
          <ProgressWrapper>{loading ? <LinearProgress /> : ''}</ProgressWrapper>
          <InnerGrid container direction="column" spacing={16}>
            <Grid item>
              <Link href="/">
                <StyledLink>
                  <Logo />
                </StyledLink>
              </Link>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" fullWidth onClick={this.handleFBLogin}>
                Sign in with Facebook
              </Button>
            </Grid>
            {this.state.error ? (
              <Grow in>
                <Grid item>
                  <ErrorMsg justify="center">{this.state.error}</ErrorMsg>
                </Grid>
              </Grow>
            ) : null}
          </InnerGrid>
        </StyledPaper>
      </OutterGrid>
    );
  }
};

SignIn.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  redirectUrl: PropTypes.string,
};
SignIn.defaultProps = {
  redirectUrl: '',
};

const mapStateToProps = (state) => ({
  loading: state.Loading[authSignin],
});

export default connect(mapStateToProps)(SignIn);
