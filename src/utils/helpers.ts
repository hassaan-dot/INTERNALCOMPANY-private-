import { Dimensions, PixelRatio } from 'react-native';

const helpers = {
  // Returns the screen width
  screen_width: (): number => {
    const dim = Dimensions.get('screen');
    return dim.width;
  },

  // Returns the screen height
  screen_height: (): number => {
    const dim = Dimensions.get('screen');
    return dim.height;
  },

  // Normalizes th  e size according to screen size, with a maximum scale of 2.0
  normalize: (size: number): number => {
    const dim = Dimensions.get('screen');
    let scale = Dimensions.get('window').width / 375;

    if (dim.width >= dim.height) {
      scale = Dimensions.get('window').height / 375;
    }

    // Limit the scale factor to 2.0
    if (scale > 2.0) {
      scale = 2.0;
    }

    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  },

  // Returns width percentage based on the window width
  wp: (value: number): number => {
    return (Dimensions.get('window').width * value) / 100;
  },

  // Returns height percentage based on the window height
  hp: (value: number): number => {
    return (Dimensions.get('window').height * value) / 100;
  },
};

export default helpers;
