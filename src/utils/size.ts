import {PixelRatio} from 'react-native';
import {HEIGHT, WIDTH} from '../theme';

const normalize = (size: number, based: 'width' | 'height' = 'width') => {
  let newSize: number = size * (WIDTH / 414);
  if (based === 'height') newSize = size * (HEIGHT / 896);
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// for width  pixel
export const normalizeWidth = (size: number) => {
  return normalize(size, 'width');
};

// for height  pixel
export const normalizeHeight = (size: number) => {
  return normalize(size, 'height');
};

// for font  pixel
export const normalizeFont = (size: number) => {
  return normalize(size, 'height');
};

// for Margin and Padding vertical pixel
export const pixelSizeY = (size: number) => {
  return normalize(size, 'height');
};

// for Margin and Padding horizontal pixel
export const pixelSizeX = (size: number) => {
  return normalize(size, 'height');
};
