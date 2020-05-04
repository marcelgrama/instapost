import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Title from '../Email/Title';
import fetch from '../../services/fetch';
import { setSuccess } from '../../actions/success';

class AcceptInvitation extends React.Component {
  componentDidMount() {
    this.getCircleInvitation();
  }

  getCircleInvitation = () => {
    fetch.get(circleInvitation, { params: { id: this.props.id } }).then((response) => {
      const circleInvitationData = response.data;
      this.props.dispatch(setCircleInvitation(circleInvitationData));
    });
  };

  acceptClick = () => {
    fetch.post(invitationAccept, { params: { id: this.props.id } }).then((response) => {
      if (response.data.message !== 'Already invited') {
        fetch.post(activityInvitationAccept, {
          params: { id: this.props.id },
        });
        const { error } = response.data;
        if (error) {
          this.setState({ error });
        } else {
          this.props.onCreatePermision(this.state);
        }

        Router.push({
          pathname: '/polls',
          query: { id: this.props.id },
        });
      } else {
        this.props.dispatch(setSuccess(`Already invited`));
        Router.push({
          pathname: '/polls',
          query: { id: this.props.id },
        });
      }
    });
  };

  declineClick = () => {
    Router.push({
      pathname: '/',
    });
  };

  render() {
    const data = this.props.InvitationCircle;
    const loading = _.isEmpty(data);
    if (loading) return <LinearProgress />;
    return (
      <div>
        <Title>{data.name}</Title>
        <p>{data.description}</p>
        <Grid container spacing={16}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={this.acceptClick}>
              Accept Invitation
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" onClick={this.declineClick}>
              Decline Invitation
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  InvitationCircle: state.InvitationCircle,
});

AcceptInvitation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  onCreatePermision: PropTypes.func.isRequired,
  InvitationCircle: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(AcceptInvitation);
