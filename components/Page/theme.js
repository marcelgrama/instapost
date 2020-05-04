import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#FFDC80',
      main: '#405DE6',
      dark: '#C13584',
      contrastText: '#000',
      red: '#FD1D1D',
      blue: '#405DE6',
      darkBlue: '#5851DB',
      purple: '#833AB4',
      darkOrange: '#F56040',
      lightOrange: '#F77737',
    },
    secondary: {
      light: '#E1306C',
      main: '#E1306C',
      dark: '#F19236',
      contrastText: '#fff',
    },
  },
});
