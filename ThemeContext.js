import React, { createContext, useContext, useState } from 'react';
import { Appearance } from 'react-native';

const defaultTheme = Appearance.getColorScheme(); // claro u oscuro por defecto

const themes = {
  light: {
    dark: false,
    colors: {
      background: '#fff',
      text: '#000',
      button: '#2196F3',
      buttonText: '#fff',
    },
  },
  dark: {
    dark: true,
    colors: {
      background: '#121212',
      text: '#fff',
      button: '#4444aa',
      buttonText: '#fff',
    },
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState(defaultTheme || 'light');

  const toggleTheme = () => {
    setThemeName(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = themes[themeName];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
