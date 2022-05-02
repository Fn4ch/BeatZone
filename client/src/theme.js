import { createTheme} from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#49494c',
      light: '#808a9c',
      dark: '#333435',
    },
    secondary: {
      main: '#e8dd27',
      light: '#fff842',
      dark: '#7b6123',
    },
    background: {
      default: '#333333',
      paper: '#434242',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
      disabled: '#bdbdbd',
      hint: '#ffffff',
    },
  },
})



export default theme