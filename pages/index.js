import React from 'react';

import Page from '../components/Page';
import connectPage from '../store/connectPage';

const App = class extends React.PureComponent {
  render() {
    // const { user } = this.props;
    return <Page title="Home Page" />;
  }
};

// App.propTypes = {
//   user: PropTypes.object.isRequired,
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = (state) => ({
  user: state.User,
});

export default connectPage(mapStateToProps)(App);
