import { useColorScheme } from 'react-native';

const light = {
  background: 'white',
  text: 'black',
  textDim: '#6f6f6f',
  searchBarBackground: '#ebebeb',
  isDark: false,
};

const dark = {
  background: '#101010',
  text: '#afafaf',
  textDim: '#afafafab',
  searchBarBackground: '#303337',
  isDark: true,
};

const useThemedColors = () => {
  const theme = useColorScheme();

  if (theme === 'dark') {
    return dark;
  } else {
    return light;
  }
};

export default useThemedColors;
