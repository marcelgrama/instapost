import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#9e8dea',
      main: '#684EDE',
      dark: '#4326ca',
      contrastText: '#fff',
      green: '#4CAF50',
    },
    secondary: {
      light: '#DBEB94',
      main: '#C3DE4E',
      dark: '#AFC746',
      contrastText: '#000',
    },
  },
});
