import React from 'react';
import Page from '../components/Page';
import Dashboard from '../components/Dashboard';
import connectPage from '../store/connectPage';

class DashboardPage extends React.PureComponent {
  render() {
    return (
      <Page>
        <Dashboard />
      </Page>
    );
  }
}
DashboardPage.propTypes = {};

export default connectPage()(DashboardPage);
