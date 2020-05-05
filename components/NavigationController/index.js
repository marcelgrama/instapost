import React from 'react';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '../AppBar';
import Navigationbar from '../NavigationBar';
import { ListItems } from '../NavigationBar/Items';
import { isUp } from '../../services/responsive';

class NavigationController extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showStatus: isUp('md'),
    };
  }

  handleChange = () => {
    this.setState((previousState) => ({ showStatus: !previousState }));
  };

  render() {
    if (!this.props.showNav) {
      return this.props.children;
    }
    return (
      <div>
        <Hidden smDown>
          <AppBar
            onMenuClick={this.handleChange}
            title={this.props.title}
            showMenu={this.state.showStatus}
            viewport="desktop"
          />
          <Navigationbar
            items={ListItems}
            showMenu={this.state.showStatus}
            onMenuClick={this.handleChange}
            viewport="desktop"
          >
            {this.props.children}
          </Navigationbar>
        </Hidden>
        <Hidden mdUp>
          <AppBar
            onMenuClick={this.handleChange}
            title={this.props.title}
            showMenu={this.state.showStatus}
            viewport="mobile"
          />
          <Navigationbar
            items={ListItems}
            showMenu={this.state.showStatus}
            onMenuClick={this.handleChange}
            viewport="mobile"
          >
            {this.props.children}
          </Navigationbar>
        </Hidden>
      </div>
    );
  }
}

NavigationController.propTypes = {
  children: PropTypes.node.isRequired,
  showNav: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

NavigationController.defaultProps = {
  showNav: false,
};

export default NavigationController;
