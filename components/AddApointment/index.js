import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import { omit } from 'lodash';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import { addApointmentSchema } from '../../services/validation';
import ErrorMsg from '../ErrorMsg';

import fetch from '../../services/fetch';
import { addAppointmentEndpoint } from '../../api/endpoints';
import { setSuccess } from '../../actions/success';
import { setGeneralError } from '../../actions/error';
import { addApointmentAction } from '../../actions/appointment';

class AddApointment extends React.Component {
  constructor(props) {
    super(props);
    // TODO permisions
    this.state = { story: false, post: false, title: '', startTime: '', error: '' };
  }

  componentDidMount() {
    const date = moment().format('YYYY-MM-DDTkk:mm');
    this.setState({ startTime: date });
  }

  handleChange = (event) => {
    if (event.target.name === 'story' || event.target.name === 'post') {
      return this.setState({ [event.target.name]: event.target.checked });
    }
    return this.setState({ [event.target.name]: event.target.value });
  };

  handleOnAddApointment = () => {
    const dataToValidate = omit(this.state, ['error']);

    const validationResult = addApointmentSchema.validate(dataToValidate);

    if (validationResult.error || (!this.state.story && !this.state.post)) {
      if (validationResult.error && validationResult.error.details) {
        return this.setState({ error: validationResult.error.details[0].message });
      }
      return this.setState({ error: 'Choose appointment type (story / post)' });
    }
    this.setState({ error: '' });
    return fetch.post(addAppointmentEndpoint, dataToValidate).then((response) => {
      const { error } = response.data;
      if (error) {
        return this.props.dispatch(setGeneralError('Operation failed!'));
      }
      this.props.dispatch(setSuccess('Appointment added!'));
      return this.props.dispatch(addApointmentAction(response.data));
    });
  };

  render() {
    return (
      <>
        <CssBaseline />
        <Container
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            component="div"
            style={{
              backgroundColor: '#cfe8fc',
              height: '35vh',
              width: '30vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 0px 10px 0px',
            }}
          >
            <TextField
              id="outlined-basic"
              label="Instagram post title"
              variant="outlined"
              value={this.state.title}
              onChange={this.handleChange}
              name="title"
            />
            <TextField
              id="datetime-local"
              label="Appointment time"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.startTime}
              onChange={this.handleChange}
              name="startTime"
            />
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox checked={this.state.story} onChange={this.handleChange} name="story" />
                }
                label="Story"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.post}
                    onChange={this.handleChange}
                    name="post"
                    color="primary"
                  />
                }
                label="Post"
              />
            </FormGroup>
            <Button variant="contained" color="primary" onClick={this.handleOnAddApointment}>
              Add Apointment
            </Button>
          </Typography>
          <Grid item>
            {this.state.error ? (
              <Grow in>
                <ErrorMsg>{this.state.error}</ErrorMsg>
              </Grow>
            ) : null}
          </Grid>
        </Container>
      </>
    );
  }
}

AddApointment.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(AddApointment);
