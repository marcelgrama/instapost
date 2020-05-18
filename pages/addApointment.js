import React from 'react';
import Page from '../components/Page';
import AddApointment from '../components/AddApointment';
import connectPage from '../store/connectPage';

class addApointment extends React.PureComponent {
  render() {
    return (
      <Page title="Add Apointment">
        <AddApointment />
      </Page>
    );
  }
}
addApointment.propTypes = {};

export default connectPage()(addApointment);
