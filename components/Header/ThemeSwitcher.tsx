import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
const ThemeSwitcher: React.FC = () => {
  const { themeMode, toggleTheme } = useContext(ThemeContext);
  return (
    <IconButton  onClick={toggleTheme} color="inherit">
      {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default ThemeSwitcher;
