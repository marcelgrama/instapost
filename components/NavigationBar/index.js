import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Router from 'next/router';
import {
  StyledDivNavigationBar,
  StyledList,
  StyledDivListContainer,
  MainContainer,
  ListItemHeader,
  GridSvgIcon,
  StyledGridItemList,
  GridCloseIcon,
  StyledListItem,
} from './style';

class NavigationBar extends React.PureComponent {
  onMenuClick = (route) => () => Router.push(route);

  render() {
    const { user, children, viewport, showMenu, onMenuClick, items } = this.props;
    return (
      <div>
        <StyledDivNavigationBar viewport={viewport}>
          <Slide direction="right" in={showMenu} mountOnEnter unmountOnExit>
            <StyledList
              subheader={
                <ListItemHeader viewport={viewport}>
                  <Grid container spacing={16} alignItems="center" wrap="nowrap">
                    <Grid item>
                      <Typography variant="h6">
                        <p>
                          {user.name.first} {user.name.last}
                        </p>
                      </Typography>
                    </Grid>
                    <GridCloseIcon item>
                      {viewport === 'mobile' ? (
                        <IconButton color="inherit" onClick={onMenuClick}>
                          <ClearIcon />
                        </IconButton>
                      ) : (
                        ''
                      )}
                    </GridCloseIcon>
                  </Grid>
                </ListItemHeader>
              }
            >
              <StyledDivListContainer>
                {items.map((item) => (
                  <StyledListItem key={item.route} onClick={this.onMenuClick(item.route)}>
                    <Grid container spacing={16} alignItems="center" wrap="nowrap">
                      <GridSvgIcon item>
                        <item.icon />
                      </GridSvgIcon>
                      <StyledGridItemList item viewport={viewport}>
                        <Typography variant="subtitle1" color="inherit">
                          {item.name}
                        </Typography>
                      </StyledGridItemList>
                    </Grid>
                  </StyledListItem>
                ))}
              </StyledDivListContainer>
            </StyledList>
          </Slide>
        </StyledDivNavigationBar>
        <MainContainer childport={showMenu}>{children}</MainContainer>
      </div>
    );
  }
}

NavigationBar.propTypes = {
  items: PropTypes.arrayOf.isRequired,
  showMenu: PropTypes.bool.isRequired,
  viewport: PropTypes.string.isRequired,
  user: PropTypes.shape.isRequired,
  onMenuClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.User,
});

export default connect(mapStateToProps)(NavigationBar);
