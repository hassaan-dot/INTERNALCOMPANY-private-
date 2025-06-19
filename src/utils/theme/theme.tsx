import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';

const lightTheme = {
  background: '#F5F6FA',
  text: '#000000',
  primary: '#007AFF',
  secondary: '#34C759',
  accent: '#FF9500',
  error: '#FF3B30',
  border: '#D1D1D6',
  card: '#F8F8F8',
};

const darkTheme = {
  background: '#000000',
  text: '#FFFFFF',
  primary: '#0A84FF',
  secondary: '#30D158',
  accent: '#FF9F0A',
  error: '#FF453A',
  border: '#3A3A3C',
  card: '#1C1C1E',
};

const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(systemTheme === 'dark' ? darkTheme : lightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
