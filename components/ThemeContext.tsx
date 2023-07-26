import { createContext, useState } from 'react';
import { ReactNode } from 'react';
type ThemeMode = 'light' | 'dark';

interface ThemeContextProps {
  themeMode: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  themeMode: 'light',
  toggleTheme: () => {},
});
type Props = {
  children: ReactNode;
};

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
