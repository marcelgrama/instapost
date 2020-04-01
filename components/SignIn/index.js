import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router from 'next/router';
import { connect } from 'react-redux';
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grow from '@material-ui/core/Grow';
import LinearProgress from '@material-ui/core/LinearProgress';
import Logo from '../Logo/';
import fetch from '../../services/fetch';
import { setAuthToken } from '../../services/sessionStore';
import ErrorMsg from '../ErrorMsg';
import { signIn } from '../../actions/user';
import { signInSchema } from '../../services/validation';
import {
  OutterGrid,
  InnerGrid,
  ProgressWrapper,
  StyledPaper,
  StyledLink
} from './style';
import { authSignin } from '../../api/endpoints';
import { authUser } from '../../api/endpoints';

const SignIn = class extends React.Component {
  constructor(props) {
    super(props);
    this.formData = {};
    this.state = {
      error: ''
    };
  }
  onInputChange = e => {
    const { value, name } = e.target;
    this.formData[name] = value;
  };

  onKeyPress = e => {
    if (e.key === 'Enter') {
      this.signIn();
    }
  };

  signIn = () => {
    const validationResult = signInSchema.validate(this.formData);
    if (validationResult.error) {
      this.setState({ error: validationResult.error.details[0].message });
    } else {
      fetch.post(authSignin, this.formData).then(response => {
        const { error, authToken, ...userData } = response.data;
        if (authToken) {
          setAuthToken(authToken);
          fetch
            .get(authUser)
            .then(responseUser => {
              userData.role = responseUser.data.role;
              this.props.dispatch(signIn(userData));
              if (this.props.redirectUrl) {
                Router.push(decodeURI(this.props.redirectUrl));
              } else {
                Router.push('/');
              }
            })
            .catch(err => {
              this.setState({ err });
            });
          if (error) {
            this.setState({ error });
          }
        }
      });
    }
  };

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
              <TextField
                autoFocus
                name="username"
                label="Username"
                onChange={this.onInputChange}
                onKeyPress={this.onKeyPress}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                label="Password"
                type="password"
                name="password"
                onChange={this.onInputChange}
                onKeyPress={this.onKeyPress}
                autoComplete="current-password"
                fullWidth
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={this.signIn}
                color="primary"
                fullWidth
              >
                Sign In
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
  redirectUrl: PropTypes.string
};
SignIn.defaultProps = {
  redirectUrl: ''
};

const mapStateToProps = state => ({
  loading: state.Loading[authSignin]
});

export default connect(mapStateToProps)(SignIn);
